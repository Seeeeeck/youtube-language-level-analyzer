const OLLAMA_DEFAULT = 'http://localhost:11434'

const LANG = {
  es: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Lenguaje de la extensión', nanoInstructions: 'Instrucciones', ollamaInstructions: 'Instrucciones', noModels: '⚠ Sin modelos disponibles', noConn: '✗ Servidor sin conexión', loading: 'Cargando Ollama...', ready: v => `✓ ${v} listo`, nanoUnavail: 'No disponible', nanoReady: 'Disponible', nanoDownloading: 'Descargando...', nanoDownloadable: 'Descargable', analLang: 'Idioma de análisis', networkTip: 'Para servidores remotos, activa "Exponer Ollama a la red" en Configuración de Ollama.', supportsExt: 'Apoya la extensión 🙂', nanoFlagBtn: 'Activar Prompt API for Gemini Nano Multilingual y reinicia el navegador', chromeRecommend: 'Se recomienda usar el navegador Google Chrome', corsError: '✗ Error de CORS: el servidor rechaza la extensión', corsInstructions: 'Ver instrucciones' },
  en: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Model', lang: 'Language', nanoInstructions: 'Instructions', ollamaInstructions: 'Instructions', noModels: '⚠ No models available', noConn: '✗ Server unreachable', loading: 'Loading Ollama...', ready: v => `✓ ${v} ready`, nanoUnavail: 'Unavailable', nanoReady: 'Available', nanoDownloading: 'Downloading...', nanoDownloadable: 'Downloadable', analLang: 'Analysis language', networkTip: 'For remote servers, enable "Expose Ollama to network" in Ollama Settings.', supportsExt: 'Supports the extension 🙂', nanoFlagBtn: 'Activate Prompt API for Gemini Nano Multilingual and restart your browser', chromeRecommend: 'Google Chrome browser recommended', corsError: '✗ CORS error: the server is rejecting the extension', corsInstructions: 'View instructions' },
  fr: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Serveur', ok: 'OK', model: 'Modèle', lang: 'Langue', nanoInstructions: 'Instructions', ollamaInstructions: 'Instructions', noModels: '⚠ Aucun modèle', noConn: '✗ Serveur inaccessible', loading: 'Chargement d\'Ollama...', ready: v => `✓ ${v} prêt`, nanoUnavail: 'Indisponible', nanoReady: 'Disponible', nanoDownloading: 'Téléchargement...', nanoDownloadable: 'Téléchargeable', analLang: 'Langue d\'analyse', networkTip: 'Pour les serveurs distants, activez "Exposer Ollama au réseau" dans les paramètres Ollama.', supportsExt: 'Soutenez l\'extension 🙂', nanoFlagBtn: 'Activer Prompt API for Gemini Nano Multilingual et redémarrer le navigateur', chromeRecommend: 'Navigateur Google Chrome recommandé', corsError: "✗ Erreur CORS : le serveur rejette l'extension", corsInstructions: 'Voir les instructions' },
  pt: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Idioma', nanoInstructions: 'Instruções', ollamaInstructions: 'Instruções', noModels: '⚠ Sem modelos', noConn: '✗ Servidor sem conexão', loading: 'Carregando Ollama...', ready: v => `✓ ${v} pronto`, nanoUnavail: 'Indisponível', nanoReady: 'Disponível', nanoDownloading: 'Baixando...', nanoDownloadable: 'Baixável', analLang: 'Idioma de análise', networkTip: 'Para servidores remotos, ative "Expor Ollama à rede" nas Configurações do Ollama.', supportsExt: 'Apoie a extensão 🙂', nanoFlagBtn: 'Ativar Prompt API for Gemini Nano Multilingual e reiniciar o navegador', chromeRecommend: 'Navegador Google Chrome recomendado', corsError: '✗ Erro de CORS: o servidor está rejeitando a extensão', corsInstructions: 'Ver instruções' },
  de: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Modell', lang: 'Sprache', nanoInstructions: 'Anleitung', ollamaInstructions: 'Anleitung', noModels: '⚠ Keine Modelle', noConn: '✗ Server nicht erreichbar', loading: 'Ollama wird geladen...', ready: v => `✓ ${v} bereit`, nanoUnavail: 'Nicht verfügbar', nanoReady: 'Verfügbar', nanoDownloading: 'Wird heruntergeladen...', nanoDownloadable: 'Herunterladbar', analLang: 'Analysesprache', networkTip: 'Für entfernte Server aktivieren Sie "Ollama im Netzwerk verfügbar machen" in den Ollama-Einstellungen.', supportsExt: 'Unterstütze die Erweiterung 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual aktivieren und Browser neu starten', chromeRecommend: 'Google Chrome Browser empfohlen', corsError: '✗ CORS-Fehler: Der Server lehnt die Erweiterung ab', corsInstructions: 'Anleitung ansehen' },
  it: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Modello', lang: 'Lingua', nanoInstructions: 'Istruzioni', ollamaInstructions: 'Istruzioni', noModels: '⚠ Nessun modello', noConn: '✗ Server non raggiungibile', loading: 'Caricamento Ollama...', ready: v => `✓ ${v} pronto`, nanoUnavail: 'Non disponibile', nanoReady: 'Disponibile', nanoDownloading: 'Download...', nanoDownloadable: 'Scaricabile', analLang: 'Lingua di analisi', networkTip: 'Per server remoti, abilita "Esponi Ollama alla rete" nelle Impostazioni di Ollama.', supportsExt: 'Supporta l\'estensione 🙂', nanoFlagBtn: 'Attiva Prompt API for Gemini Nano Multilingual e riavvia il browser', chromeRecommend: 'Browser Google Chrome consigliato', corsError: "✗ Errore CORS: il server rifiuta l'estensione", corsInstructions: 'Vedi istruzioni' },
  zh: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: '服务器', ok: '确定', model: '模型', lang: '语言', nanoInstructions: '说明', ollamaInstructions: '说明', noModels: '⚠ 无可用模型', noConn: '✗ 服务器无法连接', loading: '正在加载 Ollama...', ready: v => `✓ ${v} 就绪`, nanoUnavail: '不可用', nanoReady: '可用', nanoDownloading: '下载中...', nanoDownloadable: '可下载', analLang: '分析语言', networkTip: '对于远程服务器，请在Ollama设置中启用"将Ollama暴露到网络"。', supportsExt: '支持扩展 🙂', nanoFlagBtn: '启用 Prompt API for Gemini Nano Multilingual 并重启浏览器', chromeRecommend: '推荐使用 Google Chrome 浏览器', corsError: '✗ CORS 错误：服务器拒绝了扩展程序', corsInstructions: '查看说明' },
  ja: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'サーバー', ok: 'OK', model: 'モデル', lang: '言語', nanoInstructions: '説明書', ollamaInstructions: '説明書', noModels: '⚠ モデルがありません', noConn: '✗ サーバーに接続できません', loading: 'Ollama を読み込み中...', ready: v => `✓ ${v} 準備完了`, nanoUnavail: '利用不可', nanoReady: '利用可能', nanoDownloading: 'ダウンロード中...', nanoDownloadable: 'ダウンロード可能', analLang: '分析言語', networkTip: 'リモートサーバーの場合は、Ollama設定で「Ollamaをネットワークに公開する」を有効にしてください。', supportsExt: '拡張機能をサポート 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual を有効化してブラウザを再起動', chromeRecommend: 'Google Chrome ブラウザを推奨', corsError: '✗ CORS エラー：サーバーが拡張機能を拒否しています', corsInstructions: '説明を見る' },
  ko: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: '서버', ok: '확인', model: '모델', lang: '언어', nanoInstructions: '설명서', ollamaInstructions: '설명서', noModels: '⚠ 모델 없음', noConn: '✗ 서버 연결 불가', loading: 'Ollama 로딩 중...', ready: v => `✓ ${v} 준비 완료`, nanoUnavail: '사용 불가', nanoReady: '사용 가능', nanoDownloading: '다운로드 중...', nanoDownloadable: '다운로드 가능', analLang: '분석 언어', networkTip: '원격 서버의 경우 Ollama 설정에서 "Ollama를 네트워크에 노출"을 활성화하세요.', supportsExt: '확장 지원하기 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual 활성화 후 브라우저 재시작', chromeRecommend: 'Google Chrome 브라우저 권장', corsError: '✗ CORS 오류: 서버가 확장 프로그램을 거부함', corsInstructions: '설명 보기' },
  ar: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'الخادم', ok: 'موافق', model: 'النموذج', lang: 'اللغة', nanoInstructions: 'تعليمات', ollamaInstructions: 'تعليمات', noModels: '⚠ لا توجد نماذج', noConn: '✗ الخادم غير متاح', loading: 'جارٍ تحميل Ollama...', ready: v => `✓ ${v} جاهز`, nanoUnavail: 'غير متاح', nanoReady: 'متاح', nanoDownloading: 'جارٍ التحميل...', nanoDownloadable: 'قابل للتحميل', analLang: 'لغة التحليل', networkTip: 'للخوادم البعيدة، قم بتمكين "كشف Ollama للشبكة" في إعدادات Ollama.', supportsExt: 'ادعم الإضافة 🙂', nanoFlagBtn: 'تفعيل Prompt API for Gemini Nano Multilingual وإعادة تشغيل المتصفح', chromeRecommend: 'يوصى باستخدام متصفح Google Chrome', corsError: '✗ خطأ CORS: الخادم يرفض الإضافة', corsInstructions: 'عرض التعليمات' },
  hi: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'सर्वर', ok: 'ठीक', model: 'मॉडल', lang: 'भाषा', nanoInstructions: 'निर्देश', ollamaInstructions: 'निर्देश', noModels: '⚠ कोई मॉडल नहीं', noConn: '✗ सर्वर से कनेक्ट नहीं हो सका', loading: 'Ollama लोड हो रहा है...', ready: v => `✓ ${v} तैयार`, nanoUnavail: 'अनुपलब्ध', nanoReady: 'उपलब्ध', nanoDownloading: 'डाउनलोड हो रहा है...', nanoDownloadable: 'डाउनलोड योग्य', analLang: 'विश्लेषण भाषा', networkTip: 'दूरस्थ सर्वर के लिए, Ollama सेटिंग्स में "Expose Ollama to network" सक्षम करें।', supportsExt: 'एक्सटेंशन का समर्थन करें 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual सक्षम करें और ब्राउज़र पुनः आरंभ करें', chromeRecommend: 'Google Chrome ब्राउज़र की अनुशंसा की जाती है', corsError: '✗ CORS त्रुटि: सर्वर एक्सटेंशन को अस्वीकार कर रहा है', corsInstructions: 'निर्देश देखें' },
  ru: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Сервер', ok: 'ОК', model: 'Модель', lang: 'Язык', nanoInstructions: 'Инструкция', ollamaInstructions: 'Инструкция', noModels: '⚠ Нет моделей', noConn: '✗ Сервер недоступен', loading: 'Загрузка Ollama...', ready: v => `✓ ${v} готов`, nanoUnavail: 'Недоступно', nanoReady: 'Доступно', nanoDownloading: 'Загрузка...', nanoDownloadable: 'Загружаемый', analLang: 'Язык анализа', networkTip: 'Для удаленных серверов включите "Expose Ollama to network" в настройках Ollama.', supportsExt: 'Поддержите расширение 🙂', nanoFlagBtn: 'Включить Prompt API for Gemini Nano Multilingual и перезапустить браузер', chromeRecommend: 'Рекомендуется браузер Google Chrome', corsError: '✗ Ошибка CORS: сервер отклоняет расширение', corsInstructions: 'Смотреть инструкцию' },
}

const LANG_NAMES = {
  es: 'Español', en: 'English', fr: 'Français', pt: 'Português', de: 'Deutsch',
  it: 'Italiano', zh: '中文', ja: '日本語', ko: '한국어', ar: 'العربية', hi: 'हिन्दी', ru: 'Русский',
}

const LANG_ORDER = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko', 'ar', 'hi', 'ru']

const NANO_LANG_NAMES = {
  en: { en: 'English', es: 'Inglés', ja: 'Japanese', de: 'German', fr: 'French' },
  es: { en: 'Inglés', es: 'Español', ja: 'Japonés', de: 'Alemán', fr: 'Francés' },
  fr: { en: 'Anglais', es: 'Espagnol', ja: 'Japonais', de: 'Allemand', fr: 'Français' },
  pt: { en: 'Inglês', es: 'Espanhol', ja: 'Japonês', de: 'Alemão', fr: 'Francês' },
  de: { en: 'Englisch', es: 'Spanisch', ja: 'Japanisch', de: 'Deutsch', fr: 'Französisch' },
  it: { en: 'Inglese', es: 'Spagnolo', ja: 'Giapponese', de: 'Tedesco', fr: 'Francese' },
  zh: { en: '英语', es: '西班牙语', ja: '日语', de: '德语', fr: '法语' },
  ja: { en: '英語', es: 'スペイン語', ja: '日本語', de: 'ドイツ語', fr: 'フランス語' },
  ko: { en: '영어', es: '스페인어', ja: '일본어', de: '독일어', fr: '프랑스어' },
  ar: { en: 'الإنجليزية', es: 'الإسبانية', ja: 'اليابانية', de: 'الألمانية', fr: 'الفرنسية' },
  hi: { en: 'अंग्रेज़ी', es: 'स्पेनिश', ja: 'जापानी', de: 'जर्मन', fr: 'फ़्रेंच' },
  ru: { en: 'Английский', es: 'Испанский', ja: 'Японский', de: 'Немецкий', fr: 'Французский' },
}

const NANO_LANG_CODES = ['en', 'es', 'ja', 'de', 'fr']

function setStatus(el, type, msg, spinner) {
  el.className = 'status ' + type
  if (spinner) {
    el.innerHTML = ''
    const spin = document.createElement('span')
    spin.className = 'spinner'
    const text = document.createElement('span')
    text.textContent = msg
    el.appendChild(spin)
    el.appendChild(text)
  } else {
    el.textContent = msg
  }
}

async function fetchModels(server) {
  const result = await chrome.runtime.sendMessage({ type: 'ollama_get_models', server })
  if (result?.error) {
    const err = new Error(result.error)
    if (result.cors) err.cors = true
    throw err
  }
  return result?.models || []
}

function populateNanoLangSelect(lang) {
  const select = document.getElementById('nanoLangSelect')
  if (!select) return
  const currentVal = select.value
  const names = NANO_LANG_NAMES[lang] || NANO_LANG_NAMES.en
  select.innerHTML = ''
  NANO_LANG_CODES.forEach(code => {
    const opt = document.createElement('option')
    opt.value = code
    opt.textContent = `${code} — ${names[code]}`
    select.appendChild(opt)
  })
  if (NANO_LANG_CODES.includes(currentVal)) select.value = currentVal
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
  if (els.nanoFlagBtn) els.nanoFlagBtn.textContent = tr.nanoFlagBtn
  if (els.analLangLabel) els.analLangLabel.textContent = tr.analLang
  if (els.networkTip) els.networkTip.textContent = tr.networkTip
  if (els.kofiBtn) els.kofiBtn.textContent = tr.supportsExt
  if (els.chromeRecommendText) els.chromeRecommendText.textContent = tr.chromeRecommend
  populateNanoLangSelect(lang)
}

let nanoPollTimer = null

function stopNanoPoll() {
  if (nanoPollTimer) clearTimeout(nanoPollTimer)
  nanoPollTimer = null
}

async function checkNanoStatus() {
  stopNanoPoll()
  const nanoStatusEl = document.getElementById('nanoStatus')
  const nanoFlagHelp = document.getElementById('nanoFlagHelp')
  const nanoFlagBtn = document.getElementById('nanoFlagBtn')
  const tr = LANG[document.getElementById('langSelect').value] || LANG.es

  function showUnavailable() {
    nanoStatusEl.className = 'nano-status unavailable'
    nanoStatusEl.dataset.state = 'unavailable'
    nanoStatusEl.textContent = tr.nanoUnavail
    if (nanoFlagHelp) nanoFlagHelp.style.display = 'block'
    if (nanoFlagBtn) nanoFlagBtn.textContent = tr.nanoFlagBtn
  }

  try {
    const state = typeof LanguageModel !== 'undefined' ? await LanguageModel.availability() : 'unavailable'
    if (state === 'available') {
      nanoStatusEl.className = 'nano-status'
      nanoStatusEl.dataset.state = 'available'
      nanoStatusEl.textContent = tr.nanoReady
      if (nanoFlagHelp) nanoFlagHelp.style.display = 'none'
    } else if (state === 'downloading') {
      nanoStatusEl.className = 'nano-status downloading'
      nanoStatusEl.dataset.state = 'downloading'
      nanoStatusEl.textContent = tr.nanoDownloading
      if (nanoFlagHelp) nanoFlagHelp.style.display = 'none'
      nanoPollTimer = setTimeout(checkNanoStatus, 1500)
    } else if (state === 'downloadable') {
      nanoStatusEl.className = 'nano-status downloading'
      nanoStatusEl.dataset.state = 'downloadable'
      nanoStatusEl.textContent = tr.nanoDownloadable
      if (nanoFlagHelp) nanoFlagHelp.style.display = 'none'
      nanoPollTimer = setTimeout(checkNanoStatus, 1500)
    } else {
      showUnavailable()
    }
  } catch {
    showUnavailable()
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
    networkTip: document.getElementById('networkTip'),
    nanoFlagBtn: document.getElementById('nanoFlagBtn'),
    chromeRecommendText: document.getElementById('chromeRecommendText'),
    kofiBtn: null,
  }

  async function switchTab(tab) {
    tabNano.classList.toggle('active', tab === 'nano')
    tabOllama.classList.toggle('active', tab === 'ollama')
    geminiSection.classList.toggle('active', tab === 'nano')
    ollamaSection.classList.toggle('active', tab === 'ollama')
    const engine = tab === 'nano' ? 'nano' : 'ollama'
    const { aiEngine: currentEngine } = await chrome.storage.local.get('aiEngine')
    await chrome.storage.local.set({ aiEngine: engine })
    if (currentEngine !== engine) await sendToContent({ type: 'set_engine', engine })
    if (tab === 'nano') checkNanoStatus()
    else stopNanoPoll()
  }

  tabNano.addEventListener('click', () => switchTab('nano'))
  tabOllama.addEventListener('click', () => switchTab('ollama'))

  const { ollamaServer, lang, nanoLang, aiEngine } = await chrome.storage.local.get(['ollamaServer', 'lang', 'nanoLang', 'aiEngine'])
  serverInput.value = ollamaServer || OLLAMA_DEFAULT

  if (langSelect) {
    LANG_ORDER.forEach(code => {
      const opt = document.createElement('option')
      opt.value = code
      opt.textContent = LANG_NAMES[code]
      langSelect.appendChild(opt)
    })
    langSelect.value = lang || 'en'
  }

  if (nanoLangSelect) {
    nanoLangSelect.addEventListener('change', async () => {
      const { nanoLang: currentNanoLang } = await chrome.storage.local.get('nanoLang')
      if (currentNanoLang === nanoLangSelect.value) return
      await sendToContent({ type: 'set_nano_lang', lang: nanoLangSelect.value })
    })
  }

  const nanoInstructionsBtn = document.getElementById('nanoInstructionsBtn')

  const kofiBtn = document.createElement('a')
  kofiBtn.href = 'https://ko-fi.com/T7S223FL1U'
  kofiBtn.target = '_blank'
  Object.assign(kofiBtn.style, {
    display: 'block', textAlign: 'center', marginTop: '12px', padding: '8px 16px',
    background: '#0ac700', color: '#fff', borderRadius: '6px', textDecoration: 'none',
    fontSize: '13px', fontWeight: 'bold'
  })
  document.body.appendChild(kofiBtn)
  els.kofiBtn = kofiBtn

  const versionEl = document.createElement('div')
  versionEl.textContent = 'v1.0.0'
  Object.assign(versionEl.style, {
    textAlign: 'center', padding: '10px 0 0', fontSize: '11px', color: '#666'
  })
  document.body.appendChild(versionEl)

  switchTab(aiEngine === 'ollama' ? 'ollama' : 'nano')

  applyLang(lang || 'en', els)
  if (nanoLangSelect && NANO_LANG_CODES.includes(nanoLang)) nanoLangSelect.value = nanoLang

  const PAGES_URL = 'https://seeeeeck.github.io/youtube-language-level-analyzer/'

  nanoInstructionsBtn.addEventListener('click', e => {
    e.preventDefault()
    chrome.tabs.create({ url: PAGES_URL })
  })

  const nanoFlagBtn = document.getElementById('nanoFlagBtn')
  if (nanoFlagBtn) {
    nanoFlagBtn.addEventListener('click', e => {
      e.preventDefault()
      chrome.tabs.create({ url: 'chrome://flags/#prompt-api-for-gemini-nano' })
    })
  }

  els.instructionsBtn.addEventListener('click', e => {
    e.preventDefault()
    chrome.tabs.create({ url: PAGES_URL })
  })

  langSelect.addEventListener('change', async () => {
    const l = langSelect.value
    await chrome.storage.local.set({ lang: l })
    applyLang(l, els)
    await sendToContent({ type: 'set_lang', lang: l })
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
    setStatus(statusEl, 'loading', tr.loading, true)
    saveServerBtn.disabled = true
    resetServerBtn.disabled = true
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
      const { ollamaModel: saved } = await chrome.storage.local.get('ollamaModel')
      const selected = saved && models.includes(saved) ? saved : models[0]
      modelSelect.value = selected
      if (selected !== saved) {
        await chrome.storage.local.set({ ollamaModel: selected })
        await sendToContent({ type: 'set_model', model: selected })
      }
      setStatus(statusEl, 'ok', tr.ready(selected.split(':')[0]))
    } catch (e) {
      console.error('[YT-Level] Ollama fetch failed:', e)
      modelRow.style.display = 'none'
      if (e.cors) {
        statusEl.className = 'status off'
        statusEl.innerHTML = ''
        const text = document.createElement('span')
        text.textContent = tr.corsError
        const link = document.createElement('a')
        link.href = '#'
        link.textContent = tr.corsInstructions
        Object.assign(link.style, { color: '#fff', textDecoration: 'underline', marginLeft: '6px', cursor: 'pointer' })
        link.addEventListener('click', ev => {
          ev.preventDefault()
          chrome.tabs.create({ url: PAGES_URL })
        })
        statusEl.appendChild(text)
        statusEl.appendChild(link)
      } else {
        setStatus(statusEl, 'off', tr.noConn)
      }
    } finally {
      saveServerBtn.disabled = false
      resetServerBtn.disabled = false
    }
  }

  async function applyServer(server) {
    serverInput.value = server
    const { ollamaServer: currentServer } = await chrome.storage.local.get('ollamaServer')
    await chrome.storage.local.set({ ollamaServer: server })
    if (currentServer !== server) await sendToContent({ type: 'set_server', server })
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


