const OLLAMA_DEFAULT = 'http://localhost:11434'

const LANG = {
  es: { title: 'YT Level', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Idioma', noModels: '⚠ Sin modelos disponibles', noConn: '✗ Servidor sin conexión', ready: v => `✓ ${v} listo` },
  en: { title: 'YT Level', server: 'Server', ok: 'OK', model: 'Model', lang: 'Language', noModels: '⚠ No models available', noConn: '✗ Server unreachable', ready: v => `✓ ${v} ready` },
  fr: { title: 'YT Level', server: 'Serveur', ok: 'OK', model: 'Modèle', lang: 'Langue', noModels: '⚠ Aucun modèle', noConn: '✗ Serveur inaccessible', ready: v => `✓ ${v} prêt` },
  pt: { title: 'YT Level', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Idioma', noModels: '⚠ Sem modelos', noConn: '✗ Servidor sem conexão', ready: v => `✓ ${v} pronto` },
  de: { title: 'YT Level', server: 'Server', ok: 'OK', model: 'Modell', lang: 'Sprache', noModels: '⚠ Keine Modelle', noConn: '✗ Server nicht erreichbar', ready: v => `✓ ${v} bereit` },
  it: { title: 'YT Level', server: 'Server', ok: 'OK', model: 'Modello', lang: 'Lingua', noModels: '⚠ Nessun modello', noConn: '✗ Server non raggiungibile', ready: v => `✓ ${v} pronto` },
  zh: { title: 'YT Level', server: '服务器', ok: '确定', model: '模型', lang: '语言', noModels: '⚠ 无可用模型', noConn: '✗ 服务器无法连接', ready: v => `✓ ${v} 就绪` },
  ja: { title: 'YT Level', server: 'サーバー', ok: 'OK', model: 'モデル', lang: '言語', noModels: '⚠ モデルがありません', noConn: '✗ サーバーに接続できません', ready: v => `✓ ${v} 準備完了` },
  ko: { title: 'YT Level', server: '서버', ok: '확인', model: '모델', lang: '언어', noModels: '⚠ 모델 없음', noConn: '✗ 서버 연결 불가', ready: v => `✓ ${v} 준비 완료` },
  ar: { title: 'YT Level', server: 'الخادم', ok: 'موافق', model: 'النموذج', lang: 'اللغة', noModels: '⚠ لا توجد نماذج', noConn: '✗ الخادم غير متاح', ready: v => `✓ ${v} جاهز` },
  hi: { title: 'YT Level', server: 'सर्वर', ok: 'ठीक', model: 'मॉडल', lang: 'भाषा', noModels: '⚠ कोई मॉडल नहीं', noConn: '✗ सर्वर से कनेक्ट नहीं हो सका', ready: v => `✓ ${v} तैयार` },
  ru: { title: 'YT Level', server: 'Сервер', ok: 'ОК', model: 'Модель', lang: 'Язык', noModels: '⚠ Нет моделей', noConn: '✗ Сервер недоступен', ready: v => `✓ ${v} готов` },
}

const LANG_NAMES = {
  es: 'Español', en: 'English', fr: 'Français', pt: 'Português', de: 'Deutsch',
  it: 'Italiano', zh: '中文', ja: '日本語', ko: '한국어', ar: 'العربية', hi: 'हिन्दी', ru: 'Русский',
}

const LANG_ORDER = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko', 'ar', 'hi', 'ru']

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

function applyLang(lang, els) {
  const tr = LANG[lang] || LANG.es
  els.title.textContent = tr.title
  els.serverLabel.textContent = tr.server
  els.saveBtn.textContent = tr.ok
  els.modelLabel.textContent = tr.model
  els.langLabel.textContent = tr.lang
}

document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('aiStatus')
  const modelSelect = document.getElementById('modelSelect')
  const modelRow = document.getElementById('modelRow')
  const serverInput = document.getElementById('serverInput')
  const saveServerBtn = document.getElementById('saveServerBtn')
  const resetServerBtn = document.getElementById('resetServerBtn')
  const langSelect = document.getElementById('langSelect')
  const langRow = document.getElementById('langRow')

  const els = {
    title: document.querySelector('h2'),
    serverLabel: document.querySelector('#serverRow label'),
    saveBtn: saveServerBtn,
    modelLabel: document.querySelector('#modelRow label'),
    langLabel: document.querySelector('#langRow label'),
  }

  const { ollamaModel, ollamaServer, lang } = await chrome.storage.local.get(['ollamaModel', 'ollamaServer', 'lang'])
  serverInput.value = ollamaServer || OLLAMA_DEFAULT

  if (langSelect) {
    LANG_ORDER.forEach(code => {
      const opt = document.createElement('option')
      opt.value = code
      opt.textContent = LANG_NAMES[code]
      langSelect.appendChild(opt)
    })
    langSelect.value = lang || 'es'
  }

  applyLang(lang || 'es', els)

  langSelect.addEventListener('change', async () => {
    const l = langSelect.value
    await chrome.storage.local.set({ lang: l })
    applyLang(l, els)
    await refreshAll()
  })

  async function sendToContent(msg) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.id) return
    try { await chrome.tabs.sendMessage(tab.id, msg) } catch {}
  }

  async function refreshAll(server) {
    const base = server || serverInput.value || OLLAMA_DEFAULT
    const tr = LANG[langSelect.value] || LANG.es
    try {
      const models = await fetchModels(base)
      if (!models || models.length === 0) {
        modelRow.style.display = 'none'
        setStatus(statusEl, 'warn', tr.noModels)
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
      setStatus(statusEl, 'ok', tr.ready(selected.split(':')[0]))
    } catch {
      modelRow.style.display = 'none'
      setStatus(statusEl, 'off', tr.noConn)
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
