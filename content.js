console.log('[YT-Level] Content script loaded')

const BADGE_CLASS = 'yt-level-badge'
const ENGINE_BADGE_CLASS = 'yt-level-engine-badge'
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

const DEEP_PROMPT = text => `Act as a certified CEFR (MCER) examiner with years of experience assessing spoken and written English production.

Your task is to analyze the following transcript and classify the speaker's level according to the Common European Framework of Reference.

Evaluate based on these criteria, in order of importance:
1. Grammatical range and accuracy (verb tenses, subordinate structures, agreement)
2. Lexical range and precision (general vs. specialized vocabulary, collocations, nuance)
3. Discourse coherence and cohesion (connectors, idea organization)
4. Apparent fluency (self-corrections, filler words, pauses reflected in the text)
5. Complexity of ideas expressed (ability to argue, qualify, hypothesize)

Rules:
- Base your decision on the most consistent evidence throughout the text, not on a single isolated fragment.
- If there are mixed signals between two levels, choose the level where most criteria are sustained consistently.
- Do not explain your reasoning.
- Do not add comments, justifications, or additional text.

Your response must be EXCLUSIVELY one of these six codes, with no other character, word, period, or extra space:
A1
A2
B1
B2
C1
C2

Any other response format is considered invalid.

Transcript:
"""
${text.slice(0, 1000)}
"""`

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
  if (msg.type === 'set_engine') {
    setEngine(msg.engine).then(sendResponse)
    return true
  }
})

async function getModels() {
  try {
    const result = await chrome.runtime.sendMessage({ type: 'ollama_get_models' })
    return result?.models || []
  } catch { return [] }
}

async function setModel(model) {
  await chrome.storage.local.set({ ollamaModel: model })
  const all = await chrome.storage.local.get(null)
  for (const key of Object.keys(all)) {
    if (key.match(/^[a-zA-Z0-9_-]{11}$/)) await chrome.storage.local.remove(key)
  }
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(runScans, 100)
  return true
}

async function getModel() {
  const { ollamaModel } = await chrome.storage.local.get('ollamaModel')
  if (ollamaModel) return ollamaModel
  const models = await getModels()
  if (models.length > 0) {
    await chrome.storage.local.set({ ollamaModel: models[0] })
    return models[0]
  }
  return 'gemma3:1b'
}

async function setServer(server) {
  await chrome.storage.local.set({ ollamaServer: server })
  const all = await chrome.storage.local.get(null)
  for (const key of Object.keys(all)) {
    if (key.match(/^[a-zA-Z0-9_-]{11}$/)) await chrome.storage.local.remove(key)
  }
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(runScans, 100)
  return true
}

async function getEngine() {
  const { aiEngine } = await chrome.storage.local.get('aiEngine')
  return aiEngine || 'nano'
}

async function setEngine(engine) {
  await chrome.storage.local.set({ aiEngine: engine })
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(runScans, 100)
  return true
}

async function analyzeWithNano(text) {
  console.log('[YT-Level] analyzeWithNano called, text length:', text.length)
  try {
    const { nanoLang } = await chrome.storage.local.get('nanoLang')
    const lang = nanoLang || 'en'

    const nanoInputLang = ['en','es','ja'].includes(lang) ? lang : 'en'

    const availability = await LanguageModel.availability({
      expectedInputs: [{ type: 'text', languages: [nanoInputLang] }],
      expectedOutputs: [{ type: 'text', languages: ['en'] }]
    })
    if (availability !== 'available') {
      console.log('[YT-Level] Gemini Nano not available:', availability)
      return null
    }

    const session = await LanguageModel.create({
      expectedInputs: [{ type: 'text', languages: [nanoInputLang] }],
      expectedOutputs: [{ type: 'text', languages: ['en'] }]
    })

    const response = await session.prompt(DEEP_PROMPT(text))
    session.destroy()

    const trimmed = response.trim().toUpperCase()
    console.log('[YT-Level] Nano raw response:', response)
    const level = CEFR_LEVELS.find(l => trimmed.includes(l))
    console.log('[YT-Level] Nano parsed level:', level)
    return level || null
  } catch (e) {
    console.log('[YT-Level] Nano error:', e)
    return null
  }
}

let requestSeq = 0

class AbortedAnalysisError extends Error {}

async function analyzeWithOllama(text, model) {
  console.log('[YT-Level] analyzeWithOllama called, text length:', text.length, 'model:', model)
  const result = await chrome.runtime.sendMessage({
    type: 'ollama_generate',
    model,
    prompt: DEEP_PROMPT(text),
    requestId: `req-${++requestSeq}`
  })
  if (!result || result.error) {
    if (result?.aborted) throw new AbortedAnalysisError('ollama request aborted')
    console.log('[YT-Level] Ollama error:', result?.error)
    return null
  }
  const raw = result.response || ''
  const trimmed = raw.trim().toUpperCase()
  console.log('[YT-Level] Ollama raw response:', raw)
  const level = CEFR_LEVELS.find(l => trimmed.includes(l))
  console.log('[YT-Level] Ollama parsed level:', level)
  return level || null
}

async function analyzeLevel(text) {
  const engine = await getEngine()

  if (engine === 'nano') {
    const level = await analyzeWithNano(text)
    if (level) return { level, method: 'nano', model: 'Gemini Nano' }
    return null
  }

  const model = await getModel()
  const ollamaLevel = await analyzeWithOllama(text, model)
  if (ollamaLevel) return { level: ollamaLevel, method: 'ollama', model }

  return null
}

async function fetchTranscript(videoId) {
  try {
    return await chrome.runtime.sendMessage({ type: 'fetch_transcript', videoId })
  } catch { return null }
}

function getVideoId(element) {
  let link = element.querySelector('a[href*="/watch?v="]')
  if (!link) link = element.closest('a[href*="/watch?v="]')
  if (!link) return null
  const match = link.href.match(/v=([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function isCompilationCard(element) {
  const link = element.querySelector('a[href*="/watch?v="]')
  if (link && link.getAttribute('href').includes('list=')) return true
  const badges = Array.from(element.querySelectorAll('badge-shape, .badge-shape-wiz__text'))
    .map(b => b.textContent.trim().toLowerCase())
  return badges.some(t => t === 'mix' || /^\d+\s+(video|videos|episodio|episodios)$/.test(t))
}

const THUMBNAIL_SELECTOR = 'ytd-thumbnail, yt-thumbnail-view-model, #thumbnail'

function getBadgeAnchor(element) {
  return element.querySelector(THUMBNAIL_SELECTOR) || element
}

function injectBadge(element, level, method, model) {
  const anchor = getBadgeAnchor(element)
  if (anchor.querySelector(`.${BADGE_CLASS}`)) return
  const badge = document.createElement('div')
  badge.className = BADGE_CLASS
  badge.textContent = level
  badge.title = `Nivel ${level} (${model || 'Ollama'})`
  Object.assign(badge.style, {
    position: 'absolute', top: '8px', left: '8px', zIndex: 999,
    width: '44px', height: '44px', borderRadius: '6px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: LEVEL_COLORS[level] || '#666', color: 'white',
    fontSize: '18px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'none'
  })
  anchor.style.position = 'relative'
  anchor.appendChild(badge)

  const engineBadge = document.createElement('div')
  engineBadge.className = ENGINE_BADGE_CLASS
  engineBadge.textContent = method === 'nano' ? 'Nano' : 'Ollama'
  engineBadge.title = model || (method === 'nano' ? 'Gemini Nano' : 'Ollama')
  Object.assign(engineBadge.style, {
    position: 'absolute', top: '14px', left: '58px', zIndex: 999,
    padding: '4px 10px', borderRadius: '999px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: method === 'nano' ? '#1a73e8' : '#0ac700', color: 'white',
    fontSize: '11px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'none', whiteSpace: 'nowrap'
  })
  anchor.appendChild(engineBadge)
}

const SPINNER_CLASS = 'yt-level-spinner'

function injectSpinner(element) {
  const anchor = getBadgeAnchor(element)
  if (anchor.querySelector(`.${SPINNER_CLASS}`)) return
  const spinner = document.createElement('div')
  spinner.className = SPINNER_CLASS
  Object.assign(spinner.style, {
    position: 'absolute', top: '8px', left: '8px', zIndex: 999,
    width: '44px', height: '44px', borderRadius: '6px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
  })
  spinner.innerHTML = `<svg viewBox="0 0 24 24" style="width:26px;height:26px;animation:ytLevelSpin 1s linear infinite"><circle cx="12" cy="12" r="10" fill="none" stroke="#4CAF50" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>`
  anchor.style.position = 'relative'
  anchor.querySelector(`.${BADGE_CLASS}`)?.remove()
  anchor.querySelector(`.${ENGINE_BADGE_CLASS}`)?.remove()
  anchor.appendChild(spinner)
}

function removeSpinner(element) {
  getBadgeAnchor(element).querySelector(`.${SPINNER_CLASS}`)?.remove()
}

const styleEl = document.createElement('style')
styleEl.textContent = `@keyframes ytLevelSpin{to{transform:rotate(360deg)}}`
document.documentElement.appendChild(styleEl)

const videoResultCache = new Map()
const videoInFlight = new Set()

async function processVideoElement(element) {
  const videoId = getVideoId(element)
  if (!videoId) return
  if (isCompilationCard(element)) return
  const processedId = element.getAttribute(PROCESSED_ATTR)
  if (processedId === videoId) return

  if (videoResultCache.has(videoId)) {
    const cached = videoResultCache.get(videoId)
    element.setAttribute(PROCESSED_ATTR, videoId)
    if (cached) injectBadge(element, cached.level, cached.method, cached.model)
    return
  }

  if (videoInFlight.has(videoId)) return

  const existingBadge = element.querySelector(`.${BADGE_CLASS}`)
  if (existingBadge) existingBadge.remove()
  element.querySelector(`.${ENGINE_BADGE_CLASS}`)?.remove()
  element.setAttribute(PROCESSED_ATTR, videoId)
  videoInFlight.add(videoId)

  try {
    injectSpinner(element)

    const transcript = await fetchTranscript(videoId)
    if (!transcript) { removeSpinner(element); videoResultCache.set(videoId, null); return }

    const result = await analyzeLevel(transcript)
    removeSpinner(element)
    videoResultCache.set(videoId, result)
    if (result) {
      injectBadge(element, result.level, result.method, result.model)
    }
  } catch (e) {
    removeSpinner(element)
    if (e instanceof AbortedAnalysisError) {
      console.log('[YT-Level] Analysis aborted for', videoId)
      element.removeAttribute(PROCESSED_ATTR)
    } else {
      console.log('[YT-Level] Error processing', videoId, ':', e.message)
    }
  } finally {
    videoInFlight.delete(videoId)
  }
}

const MAX_CONCURRENT_ANALYSIS = 2
let activeAnalysisCount = 0
const pendingElements = []

function queueVideoElement(element) {
  const videoId = getVideoId(element)
  if (!videoId) return
  if (isCompilationCard(element)) return
  const processedId = element.getAttribute(PROCESSED_ATTR)
  if (processedId === videoId) return

  if (videoResultCache.has(videoId)) {
    processVideoElement(element)
    return
  }

  if (videoInFlight.has(videoId) || pendingElements.includes(element)) return
  injectSpinner(element)
  pendingElements.push(element)
  pumpAnalysisQueue()
}

function pumpAnalysisQueue() {
  while (activeAnalysisCount < MAX_CONCURRENT_ANALYSIS && pendingElements.length) {
    const element = pendingElements.shift()
    if (!element.isConnected) continue
    activeAnalysisCount++
    processVideoElement(element).finally(() => {
      activeAnalysisCount--
      pumpAnalysisQueue()
    })
  }
}

function scanFeed() {
  for (const sel of CARD_SELECTORS) {
    for (const el of document.querySelectorAll(sel)) {
      if (CARD_SELECTORS.some(s => el.parentElement && el.parentElement.closest(s))) continue
      queueVideoElement(el)
    }
  }
}

const WATCH_BADGE_CLASS = 'yt-level-watch-badge'
const WATCH_TITLE_SELECTOR = 'ytd-watch-metadata #title, #above-the-fold #title'

function getWatchVideoId() {
  const match = location.href.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function buildWatchBadgeRow(videoId, result) {
  const row = document.createElement('div')
  row.className = WATCH_BADGE_CLASS
  row.dataset.videoId = videoId
  Object.assign(row.style, {
    display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0'
  })

  const badge = document.createElement('span')
  badge.textContent = result.level
  badge.title = `Nivel ${result.level} (${result.model || 'Ollama'})`
  Object.assign(badge.style, {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: '32px', height: '32px', borderRadius: '6px',
    background: LEVEL_COLORS[result.level] || '#666', color: 'white',
    fontSize: '14px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif'
  })

  const engineBadge = document.createElement('span')
  engineBadge.textContent = result.method === 'nano' ? 'Nano' : 'Ollama'
  engineBadge.title = result.model || (result.method === 'nano' ? 'Gemini Nano' : 'Ollama')
  Object.assign(engineBadge.style, {
    display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '999px',
    background: result.method === 'nano' ? '#1a73e8' : '#0ac700', color: 'white',
    fontSize: '11px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap'
  })

  row.appendChild(badge)
  row.appendChild(engineBadge)
  return row
}

async function processWatchPage() {
  const videoId = getWatchVideoId()
  if (!videoId) return

  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => {
    if (el.dataset.videoId !== videoId) el.remove()
  })

  const titleContainer = document.querySelector(WATCH_TITLE_SELECTOR)
  if (!titleContainer) return
  if (titleContainer.parentElement.querySelector(`.${WATCH_BADGE_CLASS}[data-video-id="${videoId}"]`)) return

  if (videoResultCache.has(videoId)) {
    const cached = videoResultCache.get(videoId)
    if (cached) titleContainer.after(buildWatchBadgeRow(videoId, cached))
    return
  }

  if (videoInFlight.has(videoId)) return
  videoInFlight.add(videoId)
  try {
    const transcript = await fetchTranscript(videoId)
    if (!transcript) { videoResultCache.set(videoId, null); return }
    const result = await analyzeLevel(transcript)
    videoResultCache.set(videoId, result)
    if (result) titleContainer.after(buildWatchBadgeRow(videoId, result))
  } catch (e) {
    if (e instanceof AbortedAnalysisError) {
      console.log('[YT-Level] Watch page analysis aborted for', videoId)
    } else {
      console.log('[YT-Level] Error processing watch page video', videoId, ':', e.message)
    }
  } finally {
    videoInFlight.delete(videoId)
  }
}

function runScans() {
  scanFeed()
  processWatchPage()
}

let scanScheduled = false
function scheduleScan() {
  if (scanScheduled) return
  scanScheduled = true
  setTimeout(() => { scanScheduled = false; runScans() }, 400)
}

const observer = new MutationObserver(scheduleScan)
observer.observe(document.body, { childList: true, subtree: true })
window.addEventListener('scroll', scheduleScan, { passive: true })
window.addEventListener('scrollend', runScans, { passive: true })
document.addEventListener('yt-navigate-finish', () => {
  pendingElements.forEach(el => removeSpinner(el))
  pendingElements.length = 0
  chrome.runtime.sendMessage({ type: 'ollama_abort_all' }).catch(() => {})
  setTimeout(runScans, 300)
  setTimeout(runScans, 1000)
  setTimeout(runScans, 2500)
})
setTimeout(runScans, 500)
setTimeout(runScans, 2000)
runScans()
