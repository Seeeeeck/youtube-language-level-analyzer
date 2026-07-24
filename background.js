const OLLAMA_DEFAULT = 'http://localhost:11434'

async function getServerUrl() {
  const { ollamaServer } = await chrome.storage.local.get('ollamaServer')
  return ollamaServer || OLLAMA_DEFAULT
}

const generateControllers = new Map()
const requestsByTab = new Map()

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'ollama_get_models') {
    getModels(msg.server).then(sendResponse)
    return true
  }
  if (msg.type === 'ollama_generate') {
    generate({ model: msg.model, prompt: msg.prompt, requestId: msg.requestId, tabId: sender.tab?.id }).then(sendResponse)
    return true
  }
  if (msg.type === 'gemini_get_models') {
    getGeminiModels(msg.apiKey).then(sendResponse)
    return true
  }
  if (msg.type === 'gemini_generate') {
    generateGemini({ model: msg.model, prompt: msg.prompt, apiKey: msg.apiKey, requestId: msg.requestId, tabId: sender.tab?.id }).then(sendResponse)
    return true
  }
  if (msg.type === 'abort_all_requests') {
    for (const controller of generateControllers.values()) controller.abort()
    generateControllers.clear()
    requestsByTab.clear()
    sendResponse(true)
    return true
  }
  if (msg.type === 'abort_request') {
    generateControllers.get(msg.requestId)?.abort()
    sendResponse(true)
    return true
  }
  if (msg.type === 'fetch_transcript') {
    fetchTranscript(msg.videoId).then(sendResponse)
    return true
  }
})

// A closed tab never gets to send 'abort_all_requests' from its unload
// handler in time, so the request would otherwise keep running server-side
// until it finishes or the 60s timeout hits.
chrome.tabs.onRemoved.addListener(tabId => {
  const requestIds = requestsByTab.get(tabId)
  if (!requestIds) return
  for (const requestId of requestIds) generateControllers.get(requestId)?.abort()
  requestsByTab.delete(tabId)
})

async function withAbortableRequest(requestId, tabId, task) {
  const controller = new AbortController()
  if (requestId) generateControllers.set(requestId, controller)
  if (requestId && tabId != null) {
    if (!requestsByTab.has(tabId)) requestsByTab.set(tabId, new Set())
    requestsByTab.get(tabId).add(requestId)
  }
  const timeoutId = setTimeout(() => controller.abort(), 60000)
  try {
    return await task(controller.signal)
  } catch (e) {
    return { error: e.message, aborted: e.name === 'AbortError' }
  } finally {
    clearTimeout(timeoutId)
    if (requestId) generateControllers.delete(requestId)
    if (requestId && tabId != null) requestsByTab.get(tabId)?.delete(requestId)
  }
}

async function getModels(server) {
  try {
    const base = server || await getServerUrl()
    const resp = await fetch(`${base}/api/tags`, { signal: AbortSignal.timeout(30000) })
    if (resp.status === 403) return { error: 'CORS', cors: true }
    if (!resp.ok) return { error: `HTTP ${resp.status}` }
    const data = await resp.json()
    return { models: (data?.models || []).map(m => m.name) }
  } catch (e) { return { error: e.message } }
}

async function fetchFromPrimaryTranscriptApi(videoId) {
  try {
    const resp = await fetch(`https://youtube-transcript.ai/transcript/${videoId}.txt`)
    if (resp.status === 429) return { transcript: null, rateLimited: true }
    if (!resp.ok) return { transcript: null, rateLimited: true }
    const text = await resp.text()
    if (/calling this API at high volume/i.test(text)) return { transcript: null, rateLimited: true }
    const match = text.match(/## Transcript\n([\s\S]+?)\n---/)
    if (match) return { transcript: match[1].replace(/\[\d+:\d+\]\s*/g, '').replace(/[♪\-]/g, '').trim(), rateLimited: false }
    if (/no captions available/i.test(text)) return { transcript: null, rateLimited: false }
    return { transcript: null, rateLimited: true }
  } catch { return { transcript: null, rateLimited: true } }
}

async function fetchFromFallbackTranscriptApi(videoId) {
  try {
    const resp = await fetch('https://kome.ai/api/transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ video_id: videoId, format: true })
    })
    if (resp.status === 429) return { transcript: null, rateLimited: true }
    if (!resp.ok) return { transcript: null, rateLimited: true }
    const data = await resp.json()
    const text = (data?.transcript || '').trim()
    if (/rate limit|too many requests|quota exceeded/i.test(text)) return { transcript: null, rateLimited: true }
    if (/transcripts? (aren'?t|isn'?t|is not|are not) available/i.test(text)) return { transcript: null, rateLimited: false }
    if (!text) return { transcript: null, rateLimited: true }
    return { transcript: text, rateLimited: false }
  } catch { return { transcript: null, rateLimited: true } }
}

async function fetchTranscript(videoId) {
  const primary = await fetchFromPrimaryTranscriptApi(videoId)
  if (primary.transcript) return primary
  if (!primary.rateLimited) return primary

  const fallback = await fetchFromFallbackTranscriptApi(videoId)
  if (fallback.transcript) return { transcript: fallback.transcript, rateLimited: false }
  if (!fallback.rateLimited) return fallback

  return { transcript: null, rateLimited: true }
}

async function generate({ model, prompt, requestId, tabId }) {
  return withAbortableRequest(requestId, tabId, async signal => {
    const base = await getServerUrl()
    // Ollama defaults to a 2048-token context regardless of the model's real
    // capacity, silently truncating longer prompts. Size it to the prompt.
    const numCtx = Math.min(32768, Math.max(4096, Math.ceil(prompt.length / 3) + 512))
    const resp = await fetch(`${base}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: { temperature: 0.1, num_ctx: numCtx }
      }),
      signal
    })
    if (!resp.ok) return { error: `HTTP ${resp.status}` }
    const data = await resp.json()
    return { response: data?.response || '' }
  })
}

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta'

// Models whose name matches this are technically generateContent-capable but
// aren't plain text-in/text-out (image/video/audio generation, TTS, live
// sessions, embeddings, agentic specialty models) — picking one of these for
// a text-only CEFR prompt fails or returns garbage, so keep them out of the list.
const GEMINI_NON_TEXT_MODEL_RE = /image|vision|veo|tts|-live|embedding|aqa|learnlm|computer-use|robotics|deep-research|antigravity|banana/i

// Generations Google has confirmed fully shut down (not just "not preferred") —
// ListModels can keep listing a shut-down model for a while after retirement,
// where it still 200s on chat but silently fails or 429s on every real call.
// This is a historical fact, not a preference we'll need to keep updating.
const GEMINI_RETIRED_GENERATION_RE = /gemini-1\.[05]-|gemini-2\.0-/i

function extractGeminiVersion(model) {
  const match = model.name.match(/gemini-(\d+(?:\.\d+)?)/) || model.version?.match(/(\d+(?:\.\d+)?)/)
  return match ? parseFloat(match[1]) : 0
}

async function getGeminiModels(apiKey) {
  if (!apiKey) return { error: 'No API key' }
  try {
    const rawModels = []
    let pageToken = ''
    do {
      const url = `${GEMINI_API_BASE}/models?pageSize=1000${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ''}&key=${encodeURIComponent(apiKey)}`
      const resp = await fetch(url, { signal: AbortSignal.timeout(30000) })
      if (resp.status === 400 || resp.status === 403) return { error: 'Invalid API key' }
      if (!resp.ok) return { error: `HTTP ${resp.status}` }
      const data = await resp.json()
      rawModels.push(...(data?.models || []))
      pageToken = data?.nextPageToken || ''
    } while (pageToken)

    const models = rawModels
      .filter(m => {
        const name = m.name.replace(/^models\//, '')
        if (!m.supportedGenerationMethods?.includes('generateContent')) return false
        if (GEMINI_NON_TEXT_MODEL_RE.test(name) || GEMINI_RETIRED_GENERATION_RE.test(name)) return false
        // Google tends to flag sunset/legacy models in the description text
        // itself (e.g. "deprecated", "will be removed") well before the
        // ListModels entry disappears — catching that keeps the list current
        // without us hand-maintaining a model name blocklist.
        if (/deprecat|retir|discontinu|sunset|shut ?down|no longer (supported|available)|will be removed/i.test(m.description || '')) return false
        return true
      })
      .sort((a, b) => {
        const aFlash = /flash/i.test(a.name), bFlash = /flash/i.test(b.name)
        if (aFlash !== bFlash) return aFlash ? -1 : 1
        return extractGeminiVersion(b) - extractGeminiVersion(a)
      })
      .map(m => m.name.replace(/^models\//, ''))

    return { models }
  } catch (e) { return { error: e.message } }
}

async function generateGemini({ model, prompt, apiKey, requestId, tabId }) {
  if (!apiKey) return { error: 'No API key' }
  return withAbortableRequest(requestId, tabId, async signal => {
    const resp = await fetch(`${GEMINI_API_BASE}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1 }
      }),
      signal
    })
    if (resp.status === 400 || resp.status === 403) return { error: 'Invalid API key' }
    if (resp.status === 429) return { error: 'Rate limit exceeded', rateLimited: true }
    if (!resp.ok) return { error: `HTTP ${resp.status}` }
    const data = await resp.json()
    const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || ''
    return { response: text }
  })
}
