const OLLAMA_DEFAULT = 'http://localhost:11434'

const LANG = {
  es: { title: 'YT Level', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Idioma', instructions: 'Instrucciones', effortLabel: 'Tipo de esfuerzo', effortMin: 'Mínimo', effortMax: 'Máximo', noModels: '⚠ Sin modelos disponibles', noConn: '✗ Servidor sin conexión', ready: v => `✓ ${v} listo` },
  en: { title: 'YT Level', server: 'Server', ok: 'OK', model: 'Model', lang: 'Language', instructions: 'Instructions', effortLabel: 'Effort mode', effortMin: 'Quick', effortMax: 'Deep', noModels: '⚠ No models available', noConn: '✗ Server unreachable', ready: v => `✓ ${v} ready` },
  fr: { title: 'YT Level', server: 'Serveur', ok: 'OK', model: 'Modèle', lang: 'Langue', instructions: 'Instructions', effortLabel: 'Mode d\'effort', effortMin: 'Rapide', effortMax: 'Profond', noModels: '⚠ Aucun modèle', noConn: '✗ Serveur inaccessible', ready: v => `✓ ${v} prêt` },
  pt: { title: 'YT Level', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Idioma', instructions: 'Instruções', effortLabel: 'Modo de esforço', effortMin: 'Rápido', effortMax: 'Profundo', noModels: '⚠ Sem modelos', noConn: '✗ Servidor sem conexão', ready: v => `✓ ${v} pronto` },
  de: { title: 'YT Level', server: 'Server', ok: 'OK', model: 'Modell', lang: 'Sprache', instructions: 'Anleitung', effortLabel: 'Aufwandsmodus', effortMin: 'Schnell', effortMax: 'Tief', noModels: '⚠ Keine Modelle', noConn: '✗ Server nicht erreichbar', ready: v => `✓ ${v} bereit` },
  it: { title: 'YT Level', server: 'Server', ok: 'OK', model: 'Modello', lang: 'Lingua', instructions: 'Istruzioni', effortLabel: 'Modalità sforzo', effortMin: 'Veloce', effortMax: 'Profondo', noModels: '⚠ Nessun modello', noConn: '✗ Server non raggiungibile', ready: v => `✓ ${v} pronto` },
  zh: { title: 'YT Level', server: '服务器', ok: '确定', model: '模型', lang: '语言', instructions: '使用说明', effortLabel: '分析模式', effortMin: '快速', effortMax: '深度', noModels: '⚠ 无可用模型', noConn: '✗ 服务器无法连接', ready: v => `✓ ${v} 就绪` },
  ja: { title: 'YT Level', server: 'サーバー', ok: 'OK', model: 'モデル', lang: '言語', instructions: '説明書', effortLabel: '解析モード', effortMin: '簡易', effortMax: '詳細', noModels: '⚠ モデルがありません', noConn: '✗ サーバーに接続できません', ready: v => `✓ ${v} 準備完了` },
  ko: { title: 'YT Level', server: '서버', ok: '확인', model: '모델', lang: '언어', instructions: '설명서', effortLabel: '분석 모드', effortMin: '빠름', effortMax: '정밀', noModels: '⚠ 모델 없음', noConn: '✗ 서버 연결 불가', ready: v => `✓ ${v} 준비 완료` },
  ar: { title: 'YT Level', server: 'الخادم', ok: 'موافق', model: 'النموذج', lang: 'اللغة', instructions: 'التعليمات', effortLabel: 'وضع الجهد', effortMin: 'سريع', effortMax: 'عميق', noModels: '⚠ لا توجد نماذج', noConn: '✗ الخادم غير متاح', ready: v => `✓ ${v} جاهز` },
  hi: { title: 'YT Level', server: 'सर्वर', ok: 'ठीक', model: 'मॉडल', lang: 'भाषा', instructions: 'निर्देश', effortLabel: 'प्रयास मोड', effortMin: 'त्वरित', effortMax: 'गहन', noModels: '⚠ कोई मॉडल नहीं', noConn: '✗ सर्वर से कनेक्ट नहीं हो सका', ready: v => `✓ ${v} तैयार` },
  ru: { title: 'YT Level', server: 'Сервер', ok: 'ОК', model: 'Модель', lang: 'Язык', instructions: 'Инструкция', effortLabel: 'Режим анализа', effortMin: 'Быстрый', effortMax: 'Глубокий', noModels: '⚠ Нет моделей', noConn: '✗ Сервер недоступен', ready: v => `✓ ${v} готов` },
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

const README_BASE = 'https://github.com/Seeeeeck/youtube-language-level-analyzer/blob/master/README'

function readmeUrl(lang) {
  return lang === 'en' ? README_BASE + '.md' : README_BASE + '.' + lang + '.md'
}

function applyLang(lang, els) {
  const tr = LANG[lang] || LANG.es
  els.title.textContent = tr.title
  els.serverLabel.textContent = tr.server
  els.saveBtn.textContent = tr.ok
  els.modelLabel.textContent = tr.model
  els.langLabel.textContent = tr.lang
  els.instructionsBtn.textContent = tr.instructions
  if (els.effortLabel) els.effortLabel.textContent = tr.effortLabel
  els.effortMinBtn.textContent = tr.effortMin
  els.effortMaxBtn.textContent = tr.effortMax
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

  const effortMinBtn = document.getElementById('effortMinBtn')
  const effortMaxBtn = document.getElementById('effortMaxBtn')

  const els = {
    title: document.querySelector('h2'),
    serverLabel: document.querySelector('#serverRow label'),
    saveBtn: saveServerBtn,
    modelLabel: document.querySelector('#modelRow label'),
    langLabel: document.querySelector('#langRow label'),
    instructionsBtn: document.getElementById('instructionsBtn'),
    effortLabel: document.getElementById('effortLabel'),
    effortMinBtn,
    effortMaxBtn,
  }

  const { ollamaModel, ollamaServer, lang, effortMode } = await chrome.storage.local.get(['ollamaModel', 'ollamaServer', 'lang', 'effortMode'])
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

  els.instructionsBtn.addEventListener('click', e => {
    e.preventDefault()
    const l = langSelect.value || 'en'
    chrome.tabs.create({ url: readmeUrl(l) })
  })

  langSelect.addEventListener('change', async () => {
    const l = langSelect.value
    await chrome.storage.local.set({ lang: l })
    applyLang(l, els)
    await refreshAll()
  })

  function setEffortUI(mode) {
    effortMinBtn.classList.toggle('effort-active', mode === 'min')
    effortMaxBtn.classList.toggle('effort-active', mode === 'max')
  }

  let currentEffort = effortMode || 'min'
  setEffortUI(currentEffort)

  effortMinBtn.addEventListener('click', async () => {
    if (currentEffort === 'min') return
    currentEffort = 'min'
    await chrome.storage.local.set({ effortMode: 'min' })
    setEffortUI('min')
    await sendToContent({ type: 'set_effort', mode: 'min' })
  })

  effortMaxBtn.addEventListener('click', async () => {
    if (currentEffort === 'max') return
    currentEffort = 'max'
    await chrome.storage.local.set({ effortMode: 'max' })
    setEffortUI('max')
    await sendToContent({ type: 'set_effort', mode: 'max' })
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
