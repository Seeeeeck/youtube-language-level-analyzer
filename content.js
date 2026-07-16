const OLLAMA_DEFAULT = 'http://localhost:11434'

console.log('[YT-Level] Content script loaded v2')
;(async () => {
  const { cacheVer } = await chrome.storage.local.get('cacheVer')
  if (cacheVer !== 'v2') {
    const all = await chrome.storage.local.get(null)
    for (const key of Object.keys(all)) {
      if (key.match(/^[a-zA-Z0-9_-]{11}$/)) await chrome.storage.local.remove(key)
    }
    await chrome.storage.local.set({ cacheVer: 'v2' })
    console.log('[YT-Level] Cache viejo eliminado')
  }
})()

const BADGE_CLASS = 'yt-level-badge'
const PROCESSED_ATTR = 'data-level-video'

const LEVEL_COLORS = {
  A1: '#4CAF50', A2: '#8BC34A',
  B1: '#FFC107', B2: '#FF9800',
  C1: '#F44336', C2: '#B71C1C'
}

const CARD_SELECTORS = [
  'ytd-rich-item-renderer', 'ytd-video-renderer',
  'ytd-grid-video-renderer', 'ytd-compact-video-renderer',
  'yt-lockup-view-model'
]

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const GRAMMAR_PATTERNS = [
  { level: 0, regex: /\b(is|am|are|have|has|do|does|like|want|need|can)\b/gi },
  { level: 1, regex: /\b(did|was|were|went|ate|saw|took|made|said|told|gave|going to|had to|used to)\b/gi },
  { level: 2, regex: /\b(have been|has been|had been|will have|would like|because|although|however|therefore|if (you|he|she|it|they|we|i))\b/gi },
  { level: 3, regex: /\b(would have|could have|should have|might have|must have|is being|was being|are being|having been|nevertheless|furthermore|consequently|meanwhile)\b/gi },
  { level: 4, regex: /\b(not only|no sooner|hardly when|scarcely|on the contrary|notwithstanding|consequently|subsequently)\b/gi },
  { level: 5, regex: /\b(heretofore|thereupon|hitherto|aforementioned|thereby|wherein|whereby)\b/gi }
]

function scoreGrammar(text) {
  const lower = text.toLowerCase()
  let maxLevel = 0
  for (let i = 0; i < GRAMMAR_PATTERNS.length; i++) {
    const matches = lower.match(GRAMMAR_PATTERNS[i].regex)
    if (matches && matches.length >= 2) maxLevel = Math.max(maxLevel, i + 1)
  }
  return maxLevel
}

function scoreSentenceLength(avg) {
  if (avg < 7) return 0; if (avg < 10) return 1; if (avg < 13) return 2
  if (avg < 17) return 3; if (avg < 22) return 4; return 5
}

function scoreTTR(ttr) {
  if (ttr < 0.25) return 0; if (ttr < 0.35) return 1; if (ttr < 0.45) return 2
  if (ttr < 0.55) return 3; if (ttr < 0.65) return 4; return 5
}

function scoreLongWords(pct) {
  if (pct < 0.08) return 0; if (pct < 0.15) return 1; if (pct < 0.22) return 2
  if (pct < 0.30) return 3; if (pct < 0.38) return 4; return 5
}

function analyzeHeuristic(text) {
  if (!text || text.trim().length < 20) return null
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []
  const totalWords = words.length
  if (totalWords < 5) return null
  const uniqueWords = new Set(words)
  const typeTokenRatio = uniqueWords.size / totalWords
  const avgWordsPerSentence = totalWords / sentences.length
  const longWords = words.filter(w => w.length > 6).length
  const longWordPct = longWords / totalWords
  const rawScore = (scoreSentenceLength(avgWordsPerSentence) + scoreTTR(typeTokenRatio) + scoreLongWords(longWordPct) + scoreGrammar(text)) / 4
  return CEFR_LEVELS[Math.max(0, Math.min(5, Math.round(rawScore)))]
}

async function getServerUrl() {
  const { ollamaServer } = await chrome.storage.local.get('ollamaServer')
  return ollamaServer || OLLAMA_DEFAULT
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'get_models') {
    getModels().then(sendResponse)
    return true
  }
  if (msg.type === 'set_model') {
    setModel(msg.model).then(sendResponse)
    return true
  }
  if (msg.type === 'set_server') {
    setServer(msg.server).then(sendResponse)
    return true
  }
})

async function getModels() {
  try {
    const base = await getServerUrl()
    const resp = await fetch(`${base}/api/tags`, { signal: AbortSignal.timeout(3000) })
    if (!resp.ok) return []
    const data = await resp.json()
    return (data?.models || []).map(m => m.name)
  } catch { return [] }
}

async function setModel(model) {
  await chrome.storage.local.set({ ollamaModel: model })
  const all = await chrome.storage.local.get(null)
  for (const key of Object.keys(all)) {
    if (key.match(/^[a-zA-Z0-9_-]{11}$/)) await chrome.storage.local.remove(key)
  }
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(scanFeed, 100)
  return true
}

async function getModel() {
  const { ollamaModel } = await chrome.storage.local.get('ollamaModel')
  return ollamaModel || 'gemma3:1b'
}

async function setServer(server) {
  await chrome.storage.local.set({ ollamaServer: server })
  const all = await chrome.storage.local.get(null)
  for (const key of Object.keys(all)) {
    if (key.match(/^[a-zA-Z0-9_-]{11}$/)) await chrome.storage.local.remove(key)
  }
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(scanFeed, 100)
  return true
}

async function analyzeWithOllama(text, model) {
  console.log('[YT-Level] analyzeWithOllama called, text length:', text.length, 'model:', model)
  try {
    const base = await getServerUrl()
    const resp = await fetch(`${base}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt: `Classify English level of this transcript as A1/A2/B1/B2/C1/C2. Reply ONLY the code.\n\n${text.slice(0, 1000)}`,
        stream: false,
        options: { temperature: 0.1 }
      }),
      signal: AbortSignal.timeout(60000)
    })
    if (!resp.ok) { console.log('[YT-Level] Ollama error:', resp.status); return null }
    const data = await resp.json()
    const raw = data?.response || ''
    const result = raw.trim().toUpperCase()
    console.log('[YT-Level] Ollama raw response:', raw)
    const level = CEFR_LEVELS.find(l => result.includes(l))
    console.log('[YT-Level] Ollama parsed level:', level)
    return level || null
  } catch (e) {
    console.log('[YT-Level] Ollama fetch error:', e)
    return null
  }
}

async function analyzeLevel(text) {
  const model = await getModel()
  const ollamaLevel = await analyzeWithOllama(text, model)
  if (ollamaLevel) return { level: ollamaLevel, method: 'ollama', model }

  return null
}

async function fetchTranscript(videoId) {
  const resp = await fetch(`https://youtube-transcript.ai/transcript/${videoId}.txt`)
  if (!resp.ok) return null
  let text = await resp.text()
  const match = text.match(/## Transcript\n([\s\S]+?)\n---/)
  if (match) text = match[1]
  return text.replace(/\[\d+:\d+\]\s*/g, '').replace(/[♪\-]/g, '').trim()
}

function getVideoId(element) {
  let link = element.querySelector('a[href*="/watch?v="]')
  if (!link) link = element.closest('a[href*="/watch?v="]')
  if (!link) return null
  const match = link.href.match(/v=([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function injectBadge(element, level, method, model) {
  if (element.querySelector(`.${BADGE_CLASS}`)) return
  const badge = document.createElement('div')
  badge.className = BADGE_CLASS
  badge.textContent = level
  badge.title = `Nivel ${level} (${model || 'Ollama'})`
  Object.assign(badge.style, {
    position: 'absolute', top: '8px', left: '8px', zIndex: 10,
    width: '38px', height: '38px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: LEVEL_COLORS[level] || '#666', color: 'white',
    fontSize: '16px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
  })
  element.style.position = 'relative'
  element.appendChild(badge)
}

const SPINNER_CLASS = 'yt-level-spinner'

function injectSpinner(element) {
  if (element.querySelector(`.${SPINNER_CLASS}`)) return
  const spinner = document.createElement('div')
  spinner.className = SPINNER_CLASS
  Object.assign(spinner.style, {
    position: 'absolute', top: '8px', left: '8px', zIndex: 10,
    width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center'
  })
  spinner.innerHTML = `<svg viewBox="0 0 24 24" style="width:24px;height:24px;animation:ytLevelSpin 1s linear infinite"><circle cx="12" cy="12" r="10" fill="none" stroke="#4CAF50" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>`
  element.style.position = 'relative'
  element.querySelector('.yt-level-badge')?.remove()
  element.appendChild(spinner)
}

function removeSpinner(element) {
  element.querySelector(`.${SPINNER_CLASS}`)?.remove()
}

const styleEl = document.createElement('style')
styleEl.textContent = `@keyframes ytLevelSpin{to{transform:rotate(360deg)}}`
document.documentElement.appendChild(styleEl)

async function processVideoElement(element) {
  const videoId = getVideoId(element)
  if (!videoId) return
  const processedId = element.getAttribute(PROCESSED_ATTR)
  if (processedId === videoId) return

  const existingBadge = element.querySelector(`.${BADGE_CLASS}`)
  if (existingBadge) existingBadge.remove()
  element.setAttribute(PROCESSED_ATTR, videoId)

  try {
    const cached = await chrome.storage.local.get(videoId)
    if (cached[videoId]) {
      const c = cached[videoId]
      if (typeof c === 'string') return
      const currentModel = await getModel()
      if (c.method === 'ollama' && c.model === currentModel) {
        injectBadge(element, c.level, c.method, c.model)
        return
      }
      await chrome.storage.local.remove(videoId)
    }

    injectSpinner(element)

    const transcript = await fetchTranscript(videoId)
    if (!transcript) { removeSpinner(element); return }

    const result = await analyzeLevel(transcript)
    removeSpinner(element)
    if (result) {
      await chrome.storage.local.set({ [videoId]: { level: result.level, method: result.method, model: result.model } })
      injectBadge(element, result.level, result.method, result.model)
    }
  } catch (e) {
    removeSpinner(element)
    console.log('[YT-Level] Error processing', videoId, ':', e.message)
  }
}

function scanFeed() {
  for (const sel of CARD_SELECTORS) {
    for (const el of document.querySelectorAll(sel)) {
      processVideoElement(el)
    }
  }
}

let scanScheduled = false
function scheduleScan() {
  if (scanScheduled) return
  scanScheduled = true
  setTimeout(() => { scanScheduled = false; scanFeed() }, 400)
}

const observer = new MutationObserver(scheduleScan)
observer.observe(document.body, { childList: true, subtree: true })
window.addEventListener('scroll', scheduleScan, { passive: true })
window.addEventListener('scrollend', scanFeed, { passive: true })
document.addEventListener('yt-navigate-finish', () => setTimeout(scanFeed, 1000))
setTimeout(scanFeed, 500)
setTimeout(scanFeed, 2000)
scanFeed()
