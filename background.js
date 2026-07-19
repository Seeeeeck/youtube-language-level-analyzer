const OLLAMA_DEFAULT = 'http://localhost:11434'

async function getServerUrl() {
  const { ollamaServer } = await chrome.storage.local.get('ollamaServer')
  return ollamaServer || OLLAMA_DEFAULT
}

const generateControllers = new Map()

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'ollama_get_models') {
    getModels(msg.server).then(sendResponse)
    return true
  }
  if (msg.type === 'ollama_generate') {
    generate({ model: msg.model, prompt: msg.prompt, requestId: msg.requestId }).then(sendResponse)
    return true
  }
  if (msg.type === 'ollama_abort_all') {
    for (const controller of generateControllers.values()) controller.abort()
    generateControllers.clear()
    sendResponse(true)
    return true
  }
  if (msg.type === 'fetch_transcript') {
    fetchTranscript(msg.videoId).then(sendResponse)
    return true
  }
})

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

async function fetchTranscript(videoId) {
  try {
    const resp = await fetch(`https://youtube-transcript.ai/transcript/${videoId}.txt`)
    if (!resp.ok) return null
    let text = await resp.text()
    const match = text.match(/## Transcript\n([\s\S]+?)\n---/)
    if (match) text = match[1]
    return text.replace(/\[\d+:\d+\]\s*/g, '').replace(/[♪\-]/g, '').trim()
  } catch { return null }
}

async function generate({ model, prompt, requestId }) {
  const controller = new AbortController()
  if (requestId) generateControllers.set(requestId, controller)
  const timeoutId = setTimeout(() => controller.abort(), 60000)
  try {
    const base = await getServerUrl()
    const resp = await fetch(`${base}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: { temperature: 0.1 }
      }),
      signal: controller.signal
    })
    if (!resp.ok) return { error: `HTTP ${resp.status}` }
    const data = await resp.json()
    return { response: data?.response || '' }
  } catch (e) {
    return { error: e.message, aborted: e.name === 'AbortError' }
  } finally {
    clearTimeout(timeoutId)
    if (requestId) generateControllers.delete(requestId)
  }
}
