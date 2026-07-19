const OLLAMA_DEFAULT = 'http://localhost:11434'

async function getServerUrl() {
  const { ollamaServer } = await chrome.storage.local.get('ollamaServer')
  return ollamaServer || OLLAMA_DEFAULT
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'ollama_get_models') {
    getModels().then(sendResponse)
    return true
  }
  if (msg.type === 'ollama_generate') {
    generate({ model: msg.model, prompt: msg.prompt, mode: msg.mode }).then(sendResponse)
    return true
  }
  if (msg.type === 'fetch_transcript') {
    fetchTranscript(msg.videoId).then(sendResponse)
    return true
  }
})

async function getModels() {
  try {
    const base = await getServerUrl()
    const resp = await fetch(`${base}/api/tags`, { signal: AbortSignal.timeout(8000) })
    if (!resp.ok) return []
    const data = await resp.json()
    return (data?.models || []).map(m => m.name)
  } catch { return [] }
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

async function generate({ model, prompt, mode }) {
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
      signal: AbortSignal.timeout(60000)
    })
    if (!resp.ok) return { error: `HTTP ${resp.status}` }
    const data = await resp.json()
    return { response: data?.response || '' }
  } catch (e) {
    return { error: e.message }
  }
}
