const OLLAMA_DEFAULT = 'http://localhost:11434'

const LANG = {
  es: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Lenguaje', nanoInstructions: 'Instrucciones', ollamaInstructions: 'Instrucciones', noModels: '⚠ Sin modelos disponibles', noConn: '✗ Servidor sin conexión', ready: v => `✓ ${v} listo`, nanoUnavail: 'No disponible', nanoReady: 'Disponible', nanoDownloading: 'Descargando...', nanoDownloadable: 'Descargable', analLang: 'Idioma de análisis' },
  en: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Model', lang: 'Language', nanoInstructions: 'Instructions', ollamaInstructions: 'Instructions', noModels: '⚠ No models available', noConn: '✗ Server unreachable', ready: v => `✓ ${v} ready`, nanoUnavail: 'Unavailable', nanoReady: 'Available', nanoDownloading: 'Downloading...', nanoDownloadable: 'Downloadable', analLang: 'Analysis language' },
  fr: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Serveur', ok: 'OK', model: 'Modèle', lang: 'Langue', nanoInstructions: 'Instructions', ollamaInstructions: 'Instructions', noModels: '⚠ Aucun modèle', noConn: '✗ Serveur inaccessible', ready: v => `✓ ${v} prêt`, nanoUnavail: 'Indisponible', nanoReady: 'Disponible', nanoDownloading: 'Téléchargement...', nanoDownloadable: 'Téléchargeable', analLang: 'Langue d\'analyse' },
  pt: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Idioma', nanoInstructions: 'Instruções', ollamaInstructions: 'Instruções', noModels: '⚠ Sem modelos', noConn: '✗ Servidor sem conexão', ready: v => `✓ ${v} pronto`, nanoUnavail: 'Indisponível', nanoReady: 'Disponível', nanoDownloading: 'Baixando...', nanoDownloadable: 'Baixável', analLang: 'Idioma de análise' },
  de: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Modell', lang: 'Sprache', nanoInstructions: 'Anleitung', ollamaInstructions: 'Anleitung', noModels: '⚠ Keine Modelle', noConn: '✗ Server nicht erreichbar', ready: v => `✓ ${v} bereit`, nanoUnavail: 'Nicht verfügbar', nanoReady: 'Verfügbar', nanoDownloading: 'Wird heruntergeladen...', nanoDownloadable: 'Herunterladbar', analLang: 'Analysesprache' },
  it: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Modello', lang: 'Lingua', nanoInstructions: 'Istruzioni', ollamaInstructions: 'Istruzioni', noModels: '⚠ Nessun modello', noConn: '✗ Server non raggiungibile', ready: v => `✓ ${v} pronto`, nanoUnavail: 'Non disponibile', nanoReady: 'Disponibile', nanoDownloading: 'Download...', nanoDownloadable: 'Scaricabile', analLang: 'Lingua di analisi' },
  zh: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: '服务器', ok: '确定', model: '模型', lang: '语言', nanoInstructions: '说明', ollamaInstructions: '说明', noModels: '⚠ 无可用模型', noConn: '✗ 服务器无法连接', ready: v => `✓ ${v} 就绪`, nanoUnavail: '不可用', nanoReady: '可用', nanoDownloading: '下载中...', nanoDownloadable: '可下载', analLang: '分析语言' },
  ja: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'サーバー', ok: 'OK', model: 'モデル', lang: '言語', nanoInstructions: '説明書', ollamaInstructions: '説明書', noModels: '⚠ モデルがありません', noConn: '✗ サーバーに接続できません', ready: v => `✓ ${v} 準備完了`, nanoUnavail: '利用不可', nanoReady: '利用可能', nanoDownloading: 'ダウンロード中...', nanoDownloadable: 'ダウンロード可能', analLang: '分析言語' },
  ko: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: '서버', ok: '확인', model: '모델', lang: '언어', nanoInstructions: '설명서', ollamaInstructions: '설명서', noModels: '⚠ 모델 없음', noConn: '✗ 서버 연결 불가', ready: v => `✓ ${v} 준비 완료`, nanoUnavail: '사용 불가', nanoReady: '사용 가능', nanoDownloading: '다운로드 중...', nanoDownloadable: '다운로드 가능', analLang: '분석 언어' },
  ar: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'الخادم', ok: 'موافق', model: 'النموذج', lang: 'اللغة', nanoInstructions: 'تعليمات', ollamaInstructions: 'تعليمات', noModels: '⚠ لا توجد نماذج', noConn: '✗ الخادم غير متاح', ready: v => `✓ ${v} جاهز`, nanoUnavail: 'غير متاح', nanoReady: 'متاح', nanoDownloading: 'جارٍ التحميل...', nanoDownloadable: 'قابل للتحميل', analLang: 'لغة التحليل' },
  hi: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'सर्वर', ok: 'ठीक', model: 'मॉडल', lang: 'भाषा', nanoInstructions: 'निर्देश', ollamaInstructions: 'निर्देश', noModels: '⚠ कोई मॉडल नहीं', noConn: '✗ सर्वर से कनेक्ट नहीं हो सका', ready: v => `✓ ${v} तैयार`, nanoUnavail: 'अनुपलब्ध', nanoReady: 'उपलब्ध', nanoDownloading: 'डाउनलोड हो रहा है...', nanoDownloadable: 'डाउनलोड योग्य', analLang: 'विश्लेषण भाषा' },
  ru: { title: 'YT Level', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Сервер', ok: 'ОК', model: 'Модель', lang: 'Язык', nanoInstructions: 'Инструкция', ollamaInstructions: 'Инструкция', noModels: '⚠ Нет моделей', noConn: '✗ Сервер недоступен', ready: v => `✓ ${v} готов`, nanoUnavail: 'Недоступно', nanoReady: 'Доступно', nanoDownloading: 'Загрузка...', nanoDownloadable: 'Загружаемый', analLang: 'Язык анализа' },
}

const LANG_NAMES = {
  es: 'Español', en: 'English', fr: 'Français', pt: 'Português', de: 'Deutsch',
  it: 'Italiano', zh: '中文', ja: '日本語', ko: '한국어', ar: 'العربية', hi: 'हिन्दी', ru: 'Русский',
}

const LANG_ORDER = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko', 'ar', 'hi', 'ru']

const NANO_LANGS = { en: 'Inglés', es: 'Español', ja: 'Japonés', de: 'Alemán', fr: 'Francés' }

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
  els.tabNano.textContent = tr.nano
  els.tabOllama.textContent = tr.ollama
  els.serverLabel.textContent = tr.server
  els.saveBtn.textContent = tr.ok
  els.modelLabel.textContent = tr.model
  els.langLabel.textContent = tr.lang
  if (els.nanoInstructionsBtn) els.nanoInstructionsBtn.textContent = tr.nanoInstructions
  els.instructionsBtn.textContent = tr.ollamaInstructions
  if (els.nanoStatus) {
    const state = els.nanoStatus.dataset.state || 'unavailable'
    if (state === 'available') els.nanoStatus.textContent = tr.nanoReady
    else if (state === 'downloading') els.nanoStatus.textContent = tr.nanoDownloading
    else if (state === 'downloadable') els.nanoStatus.textContent = tr.nanoDownloadable
    else els.nanoStatus.textContent = tr.nanoUnavail
  }
  if (els.analLangLabel) els.analLangLabel.textContent = tr.analLang
}

async function checkNanoStatus() {
  const nanoStatusEl = document.getElementById('nanoStatus')
  const tr = LANG[document.getElementById('langSelect').value] || LANG.es
  try {
    const state = await LanguageModel.availability()
    if (state === 'available') {
      nanoStatusEl.className = 'nano-status'
      nanoStatusEl.dataset.state = 'available'
      nanoStatusEl.textContent = tr.nanoReady
    } else if (state === 'downloading') {
      nanoStatusEl.className = 'nano-status downloading'
      nanoStatusEl.dataset.state = 'downloading'
      nanoStatusEl.textContent = tr.nanoDownloading
    } else if (state === 'downloadable') {
      nanoStatusEl.className = 'nano-status downloading'
      nanoStatusEl.dataset.state = 'downloadable'
      nanoStatusEl.textContent = tr.nanoDownloadable
    } else {
      nanoStatusEl.className = 'nano-status unavailable'
      nanoStatusEl.dataset.state = 'unavailable'
      nanoStatusEl.textContent = tr.nanoUnavail
    }
  } catch {
    nanoStatusEl.className = 'nano-status unavailable'
    nanoStatusEl.dataset.state = 'unavailable'
    nanoStatusEl.textContent = tr.nanoUnavail
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('aiStatus')
  const modelSelect = document.getElementById('modelSelect')
  const modelRow = document.getElementById('modelRow')
  const serverInput = document.getElementById('serverInput')
  const saveServerBtn = document.getElementById('saveServerBtn')
  const resetServerBtn = document.getElementById('resetServerBtn')
  const langSelect = document.getElementById('langSelect')
  const tabNano = document.getElementById('tabNano')
  const tabOllama = document.getElementById('tabOllama')
  const geminiSection = document.getElementById('geminiSection')
  const ollamaSection = document.getElementById('ollamaSection')

  const nanoLangSelect = document.getElementById('nanoLangSelect')

  const els = {
    title: document.querySelector('h2'),
    tabNano,
    tabOllama,
    serverLabel: document.querySelector('#serverRow label'),
    saveBtn: saveServerBtn,
    modelLabel: document.querySelector('#modelRow label'),
    langLabel: document.querySelector('#langRow label'),
    instructionsBtn: document.getElementById('instructionsBtn'),
    nanoStatus: document.getElementById('nanoStatus'),
    analLangLabel: document.getElementById('analLangLabel'),
    nanoInstructionsBtn: document.getElementById('nanoInstructionsBtn'),
  }

  async function switchTab(tab) {
    tabNano.classList.toggle('active', tab === 'nano')
    tabOllama.classList.toggle('active', tab === 'ollama')
    geminiSection.classList.toggle('active', tab === 'nano')
    ollamaSection.classList.toggle('active', tab === 'ollama')
    const engine = tab === 'nano' ? 'nano' : 'ollama'
    await chrome.storage.local.set({ aiEngine: engine })
    await sendToContent({ type: 'set_engine', engine })
    if (tab === 'nano') checkNanoStatus()
  }

  tabNano.addEventListener('click', () => switchTab('nano'))
  tabOllama.addEventListener('click', () => switchTab('ollama'))

  const { ollamaModel, ollamaServer, lang, nanoLang, aiEngine } = await chrome.storage.local.get(['ollamaModel', 'ollamaServer', 'lang', 'nanoLang', 'aiEngine'])
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

  if (nanoLangSelect) {
    nanoLangSelect.value = nanoLang || 'en'
    nanoLangSelect.addEventListener('change', async () => {
      await chrome.storage.local.set({ nanoLang: nanoLangSelect.value })
    })
  }

  const nanoInstructionsBtn = document.getElementById('nanoInstructionsBtn')

  if (aiEngine === 'nano') switchTab('nano')

  applyLang(lang || 'es', els)

  const PAGES_URL = 'https://seeeeeck.github.io/youtube-language-level-analyzer/'

  nanoInstructionsBtn.addEventListener('click', e => {
    e.preventDefault()
    chrome.tabs.create({ url: PAGES_URL })
  })

  els.instructionsBtn.addEventListener('click', e => {
    e.preventDefault()
    chrome.tabs.create({ url: PAGES_URL })
  })

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


