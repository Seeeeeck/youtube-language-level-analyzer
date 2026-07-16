const OLLAMA_DEFAULT = 'http://localhost:11434'

function setStatus(el, type, msg) {
  el.className = 'status ' + type
  el.textContent = msg
}

async function fetchModels(server) {
  const url = server.replace(/\/+$/, '') + '/api/tags'
  const resp = await fetch(url, { signal: AbortSignal.timeout(3000) })
  if (!resp.ok) return []
  const data = await resp.json()
  return (data?.models || []).map(m => m.name)
}

document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('aiStatus')
  const modelSelect = document.getElementById('modelSelect')
  const modelRow = document.getElementById('modelRow')
  const serverInput = document.getElementById('serverInput')
  const saveServerBtn = document.getElementById('saveServerBtn')
  const resetServerBtn = document.getElementById('resetServerBtn')

  const { ollamaModel, ollamaServer } = await chrome.storage.local.get(['ollamaModel', 'ollamaServer'])
  serverInput.value = ollamaServer || OLLAMA_DEFAULT

  async function sendToContent(msg) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.id) return
    try { await chrome.tabs.sendMessage(tab.id, msg) } catch {}
  }

  async function refreshAll(server) {
    const base = server || serverInput.value || OLLAMA_DEFAULT
    try {
      const models = await fetchModels(base)
      if (!models || models.length === 0) {
        modelRow.style.display = 'none'
        setStatus(statusEl, 'warn', '⚠ Servidor sin modelos')
        return
      }
      modelRow.style.display = 'flex'
      modelSelect.innerHTML = ''
      models.forEach(m => {
        const opt = document.createElement('option')
        opt.value = m
        opt.textContent = m
        modelSelect.appendChild(opt)
      })
      const saved = ollamaModel
      const selected = saved && models.includes(saved) ? saved : models[0]
      modelSelect.value = selected
      await chrome.storage.local.set({ ollamaModel: selected })
      await sendToContent({ type: 'set_model', model: selected })
      setStatus(statusEl, 'ok', `✓ ${selected.split(':')[0]} listo`)
    } catch {
      modelRow.style.display = 'none'
      setStatus(statusEl, 'off', '✗ Servidor no encontrado')
    }
  }

  async function applyServer(server) {
    serverInput.value = server
    await chrome.storage.local.set({ ollamaServer: server })
    await sendToContent({ type: 'set_server', server })
    await refreshAll(server)
  }

  saveServerBtn.addEventListener('click', async () => {
    let val = serverInput.value.trim()
    if (!val) val = OLLAMA_DEFAULT
    if (!val.startsWith('http://') && !val.startsWith('https://')) val = 'http://' + val
    val = val.replace(/\/+$/, '')
    await applyServer(val)
  })

  resetServerBtn.addEventListener('click', async () => {
    await applyServer(OLLAMA_DEFAULT)
  })

  modelSelect.addEventListener('change', async () => {
    const model = modelSelect.value
    await chrome.storage.local.set({ ollamaModel: model })
    await sendToContent({ type: 'set_model', model })
  })

  refreshAll()
})
