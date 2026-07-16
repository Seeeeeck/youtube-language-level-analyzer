function setStatus(el, type, msg) {
  el.className = 'status ' + type
  el.textContent = msg
}

document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('aiStatus')
  const useAICheckbox = document.getElementById('useAI')
  const ollamaRow = document.getElementById('ollamaRow')
  const ollamaStatus = document.getElementById('ollamaStatus')

  const { useAI } = await chrome.storage.local.get('useAI')
  useAICheckbox.checked = useAI !== false

  useAICheckbox.addEventListener('change', async () => {
    await chrome.storage.local.set({ useAI: useAICheckbox.checked })
  })

  async function checkOllama() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) return
      const result = await chrome.tabs.sendMessage(tab.id, { type: 'check_ollama' })
      ollamaRow.style.display = 'flex'
      ollamaStatus.textContent = result ? '✓ gemma3:1b listo' : '✗ gemma3 no encontrado'
      ollamaStatus.style.color = result ? '#a5d6a7' : '#ef9a9a'
    } catch {
      ollamaRow.style.display = 'none'
    }
  }

  async function updateStatus() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab?.id) { setStatus(statusEl, 'warn', '⚠ No hay pestaña activa'); return }

      const raw = await chrome.scripting.executeScript({
        target: { tabId: tab.id }, world: 'MAIN',
        func: async () => {
          if (typeof LanguageModel === 'undefined') return 'no-api'
          try { return await LanguageModel.availability() }
          catch (e) { return 'error' }
        }
      }).then(r => r?.[0]?.result).catch(() => 'error')

      if (raw === 'readily') {
        setStatus(statusEl, 'ok', '✓ Gemini Nano listo')
      } else if (raw === 'after-download' || raw === 'downloading') {
        setStatus(statusEl, 'warn', '⬇ Descargando Gemini Nano...')
      } else {
        try {
          const result = await chrome.tabs.sendMessage(tab.id, { type: 'check_ollama' })
          setStatus(statusEl, result ? 'ok' : 'off', result ? '✓ Ollama + gemma3:1b listo' : '✗ Sin AI disponible')
        } catch {
          setStatus(statusEl, 'off', '✗ Sin AI disponible')
        }
      }
    } catch {
      setStatus(statusEl, 'off', '✗ Error al verificar AI')
    }
  }

  checkOllama()
  updateStatus()
})
