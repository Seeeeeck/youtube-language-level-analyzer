function setStatus(el, type, msg) {
  el.className = 'status ' + type
  el.textContent = msg
}

document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('aiStatus')
  const useAICheckbox = document.getElementById('useAI')
  const modelSelect = document.getElementById('modelSelect')
  const modelRow = document.getElementById('modelRow')

  const { useAI, ollamaModel } = await chrome.storage.local.get(['useAI', 'ollamaModel'])
  useAICheckbox.checked = useAI !== false

  useAICheckbox.addEventListener('change', async () => {
    await chrome.storage.local.set({ useAI: useAICheckbox.checked })
  })

  async function getTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return tab
  }

  async function populateModels() {
    try {
      const tab = await getTab()
      if (!tab?.id) return
      const models = await chrome.tabs.sendMessage(tab.id, { type: 'get_models' })
      if (!models || models.length === 0) { modelRow.style.display = 'none'; return }
      modelRow.style.display = 'flex'
      modelSelect.innerHTML = ''
      models.forEach(m => {
        const opt = document.createElement('option')
        opt.value = m
        opt.textContent = m
        modelSelect.appendChild(opt)
      })
      modelSelect.value = ollamaModel || models[0] || ''
      if (!ollamaModel || !models.includes(ollamaModel)) {
        await chrome.storage.local.set({ ollamaModel: modelSelect.value })
      }
    } catch {
      modelRow.style.display = 'none'
    }
  }

  modelSelect.addEventListener('change', async () => {
    const model = modelSelect.value
    await chrome.storage.local.set({ ollamaModel: model })
    try {
      const tab = await getTab()
      if (tab?.id) await chrome.tabs.sendMessage(tab.id, { type: 'set_model', model })
    } catch {}
    const modelName = model.split(':')[0]
    setStatus(statusEl, 'ok', `✓ ${modelName} listo`)
  })

  async function updateStatus() {
    try {
      const tab = await getTab()
      if (!tab?.id) { setStatus(statusEl, 'warn', '⚠ No hay pestaña activa'); return }

      try {
        const result = await chrome.tabs.sendMessage(tab.id, { type: 'check_ollama' })
        const model = ollamaModel || 'gemma3:1b'
        setStatus(statusEl, result ? 'ok' : 'off', result ? `✓ ${model.split(':')[0]} listo` : '✗ Sin AI disponible')
      } catch {
        setStatus(statusEl, 'off', '✗ Sin AI disponible')
      }
    } catch {
      setStatus(statusEl, 'off', '✗ Error al verificar AI')
    }
  }

  await populateModels()
  updateStatus()
})
