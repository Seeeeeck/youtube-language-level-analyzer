console.log('[YT-Level] Content script loaded')

const BADGE_CLASS = 'yt-level-badge'
const ENGINE_BADGE_CLASS = 'yt-level-engine-badge'
const NO_DATA_BADGE_CLASS = 'yt-level-nodata-badge'
const PRIORITY_BTN_CLASS = 'yt-level-priority-btn'
const PROCESSED_ATTR = 'data-level-video'

const SETTINGS_KEYS = new Set(['ollamaModel', 'ollamaServer', 'aiEngine', 'nanoLang', 'lang', 'sampleChars'])

const CONTENT_LANG = {
  es: { queuedLabel: 'En cola', activeLabel: 'En procesamiento', queuedTitle: 'En cola de análisis', activeTitle: 'Analizando ahora', priorityBtnLabel: 'Obtener nivel del lenguaje', priorityBtnActive: 'Obteniendo…', priorityBtnTitle: 'Analizar el nivel de este video', noTranscriptLabel: 'Sin transcripción', noTranscriptTitle: 'Sin transcripción o subtítulos disponibles para este video', rateLimitedLabel: 'Límite excedido', rateLimitedTitle: 'Los servicios de transcripción están saturados. Click para reintentar', noModelLabel: 'No se seleccionó el servicio de Nano u Ollama', noModelTitle: 'Revisa la configuración de la extensión y elige Gemini Nano u Ollama' },
  en: { queuedLabel: 'Queued', activeLabel: 'Processing', queuedTitle: 'Queued for analysis', activeTitle: 'Analyzing now', priorityBtnLabel: 'Get language level', priorityBtnActive: 'Getting…', priorityBtnTitle: "Analyze this video's level", noTranscriptLabel: 'No transcript', noTranscriptTitle: 'No transcript or captions available for this video', rateLimitedLabel: 'Rate limit exceeded', rateLimitedTitle: 'Transcript services are busy right now. Click to retry', noModelLabel: 'No Nano or Ollama service selected', noModelTitle: 'Check the extension settings and choose Gemini Nano or Ollama' },
  fr: { queuedLabel: 'En attente', activeLabel: 'En cours', queuedTitle: "En file d'attente", activeTitle: 'Analyse en cours', priorityBtnLabel: 'Obtenir le niveau de langue', priorityBtnActive: 'Obtention…', priorityBtnTitle: 'Analyser le niveau de cette vidéo', noTranscriptLabel: 'Pas de transcription', noTranscriptTitle: "Aucune transcription ni sous-titres disponibles pour cette vidéo", rateLimitedLabel: 'Limite dépassée', rateLimitedTitle: 'Les services de transcription sont surchargés. Cliquez pour réessayer', noModelLabel: "Aucun service Nano ou Ollama sélectionné", noModelTitle: "Vérifiez les paramètres de l'extension et choisissez Gemini Nano ou Ollama" },
  pt: { queuedLabel: 'Na fila', activeLabel: 'Processando', queuedTitle: 'Na fila de análise', activeTitle: 'Analisando agora', priorityBtnLabel: 'Obter nível do idioma', priorityBtnActive: 'Obtendo…', priorityBtnTitle: 'Analisar o nível deste vídeo', noTranscriptLabel: 'Sem transcrição', noTranscriptTitle: 'Sem transcrição ou legendas disponíveis para este vídeo', rateLimitedLabel: 'Limite excedido', rateLimitedTitle: 'Os serviços de transcrição estão sobrecarregados. Clique para tentar novamente', noModelLabel: 'Nenhum serviço Nano ou Ollama selecionado', noModelTitle: 'Verifique as configurações da extensão e escolha Gemini Nano ou Ollama' },
  de: { queuedLabel: 'Warteschlange', activeLabel: 'Wird verarbeitet', queuedTitle: 'Wartet auf Analyse', activeTitle: 'Wird jetzt analysiert', priorityBtnLabel: 'Sprachniveau abrufen', priorityBtnActive: 'Wird abgerufen…', priorityBtnTitle: 'Niveau dieses Videos analysieren', noTranscriptLabel: 'Kein Transkript', noTranscriptTitle: 'Kein Transkript oder Untertitel für dieses Video verfügbar', rateLimitedLabel: 'Limit überschritten', rateLimitedTitle: 'Die Transkriptionsdienste sind überlastet. Klicken zum Wiederholen', noModelLabel: 'Kein Nano- oder Ollama-Dienst ausgewählt', noModelTitle: 'Überprüfe die Erweiterungseinstellungen und wähle Gemini Nano oder Ollama' },
  it: { queuedLabel: 'In coda', activeLabel: 'In elaborazione', queuedTitle: "In coda per l'analisi", activeTitle: 'Analisi in corso', priorityBtnLabel: 'Ottieni livello di lingua', priorityBtnActive: 'Recupero…', priorityBtnTitle: 'Analizza il livello di questo video', noTranscriptLabel: 'Nessuna trascrizione', noTranscriptTitle: 'Nessuna trascrizione o sottotitoli disponibili per questo video', rateLimitedLabel: 'Limite superato', rateLimitedTitle: 'I servizi di trascrizione sono sovraccarichi. Clicca per riprovare', noModelLabel: 'Nessun servizio Nano o Ollama selezionato', noModelTitle: "Controlla le impostazioni dell'estensione e scegli Gemini Nano oppure Ollama" },
  zh: { queuedLabel: '排队中', activeLabel: '处理中', queuedTitle: '排队分析中', activeTitle: '正在分析', priorityBtnLabel: '获取语言级别', priorityBtnActive: '获取中…', priorityBtnTitle: '分析此视频的级别', noTranscriptLabel: '无文字记录', noTranscriptTitle: '此视频没有可用的文字记录或字幕', rateLimitedLabel: '超出限制', rateLimitedTitle: '转录服务繁忙，点击重试', noModelLabel: '未选择 Nano 或 Ollama 服务', noModelTitle: '请检查扩展程序设置，并选择 Gemini Nano 或 Ollama' },
  ja: { queuedLabel: '待機中', activeLabel: '処理中', queuedTitle: '分析待機中', activeTitle: '分析中', priorityBtnLabel: '言語レベルを取得', priorityBtnActive: '取得中…', priorityBtnTitle: 'この動画のレベルを分析する', noTranscriptLabel: '文字起こしなし', noTranscriptTitle: 'この動画には文字起こしや字幕がありません', rateLimitedLabel: '制限超過', rateLimitedTitle: '文字起こしサービスが混雑しています。クリックして再試行', noModelLabel: 'NanoまたはOllamaのサービスが選択されていません', noModelTitle: '拡張機能の設定を確認し、Gemini NanoまたはOllamaを選択してください' },
  ko: { queuedLabel: '대기 중', activeLabel: '처리 중', queuedTitle: '분석 대기 중', activeTitle: '분석 중', priorityBtnLabel: '언어 레벨 가져오기', priorityBtnActive: '가져오는 중…', priorityBtnTitle: '이 동영상의 레벨 분석하기', noTranscriptLabel: '스크립트 없음', noTranscriptTitle: '이 동영상에는 사용 가능한 스크립트나 자막이 없습니다', rateLimitedLabel: '한도 초과', rateLimitedTitle: '스크립트 서비스가 혼잡합니다. 클릭하여 재시도', noModelLabel: 'Nano 또는 Ollama 서비스가 선택되지 않음', noModelTitle: '확장 프로그램 설정을 확인하고 Gemini Nano 또는 Ollama를 선택하세요' },
  ar: { queuedLabel: 'قيد الانتظار', activeLabel: 'قيد المعالجة', queuedTitle: 'في انتظار التحليل', activeTitle: 'جارٍ التحليل الآن', priorityBtnLabel: 'الحصول على مستوى اللغة', priorityBtnActive: 'جارٍ الحصول…', priorityBtnTitle: 'تحليل مستوى هذا الفيديو', noTranscriptLabel: 'لا يوجد نص', noTranscriptTitle: 'لا يوجد نص مكتوب أو ترجمة متاحة لهذا الفيديو', rateLimitedLabel: 'تم تجاوز الحد', rateLimitedTitle: 'خدمات النص مزدحمة حالياً. انقر لإعادة المحاولة', noModelLabel: 'لم يتم اختيار خدمة Nano أو Ollama', noModelTitle: 'تحقق من إعدادات الإضافة واختر Gemini Nano أو Ollama' },
  hi: { queuedLabel: 'कतार में', activeLabel: 'प्रसंस्करण में', queuedTitle: 'विश्लेषण की प्रतीक्षा में', activeTitle: 'अभी विश्लेषण हो रहा है', priorityBtnLabel: 'भाषा स्तर प्राप्त करें', priorityBtnActive: 'प्राप्त हो रहा है…', priorityBtnTitle: 'इस वीडियो के स्तर का विश्लेषण करें', noTranscriptLabel: 'ट्रांसक्रिप्ट नहीं', noTranscriptTitle: 'इस वीडियो के लिए कोई ट्रांसक्रिप्ट या सबटाइटल उपलब्ध नहीं है', rateLimitedLabel: 'सीमा पार हो गई', rateLimitedTitle: 'ट्रांसक्रिप्ट सेवाएं व्यस्त हैं। पुनः प्रयास के लिए क्लिक करें', noModelLabel: 'Nano या Ollama सेवा चयनित नहीं है', noModelTitle: 'एक्सटेंशन सेटिंग्स जांचें और Gemini Nano या Ollama चुनें' },
  ru: { queuedLabel: 'В очереди', activeLabel: 'В обработке', queuedTitle: 'В очереди на анализ', activeTitle: 'Анализируется сейчас', priorityBtnLabel: 'Получить уровень языка', priorityBtnActive: 'Получение…', priorityBtnTitle: 'Проанализировать уровень этого видео', noTranscriptLabel: 'Нет расшифровки', noTranscriptTitle: 'Для этого видео нет расшифровки или субтитров', rateLimitedLabel: 'Лимит превышен', rateLimitedTitle: 'Сервисы расшифровки перегружены. Нажмите, чтобы повторить', noModelLabel: 'Не выбрана служба Nano или Ollama', noModelTitle: 'Проверьте настройки расширения и выберите Gemini Nano или Ollama' },
}

let currentLang = 'en'
chrome.storage.local.get('lang').then(({ lang }) => { if (lang) currentLang = lang })

function T() {
  return CONTENT_LANG[currentLang] || CONTENT_LANG.en
}

async function setLang(lang) {
  currentLang = lang
  const t = T()
  document.querySelectorAll(`.${SPINNER_CLASS}`).forEach(el => renderSpinner(el, el.dataset.state))
  document.querySelectorAll(`.${PRIORITY_BTN_CLASS}`).forEach(el => {
    if (el.disabled) {
      el.textContent = t.priorityBtnActive
      el.title = t.priorityBtnTitle
    } else if (el.dataset.variant === 'rateLimited') {
      el.textContent = t.rateLimitedLabel
      el.title = t.rateLimitedTitle
    } else {
      el.textContent = t.priorityBtnLabel
      el.title = t.priorityBtnTitle
    }
  })
  document.querySelectorAll(`.${NO_DATA_BADGE_CLASS}`).forEach(el => {
    el.textContent = t.noTranscriptLabel
    el.title = t.noTranscriptTitle
  })
  return true
}

async function clearCachedVideoStorage() {
  const all = await chrome.storage.local.get(null)
  for (const key of Object.keys(all)) {
    if (!SETTINGS_KEYS.has(key) && key.match(/^[a-zA-Z0-9_-]{11}$/)) await chrome.storage.local.remove(key)
  }
}

const LEVEL_COLORS = {
  A1: '#4CAF50', A2: '#8BC34A',
  B1: '#FFC107', B2: '#FF9800',
  C1: '#F44336', C2: '#B71C1C'
}

const CARD_SELECTORS = [
  'ytd-rich-item-renderer', 'ytd-video-renderer',
  'ytd-grid-video-renderer', 'ytd-compact-video-renderer',
  'yt-lockup-view-model'
]

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const DEEP_PROMPT = text => `Act as a certified CEFR (MCER) examiner with years of experience assessing spoken and written English production.

Your task is to analyze the following transcript and classify the speaker's level according to the Common European Framework of Reference. It may be the full transcript, or — for very long videos — separate excerpts taken from the beginning, middle, and end (marked with "[...]" between them); evaluate the language across everything given, not just the first part.

Evaluate based on these criteria, in order of importance:
1. Grammatical range and accuracy (verb tenses, subordinate structures, agreement)
2. Lexical range and precision (general vs. specialized vocabulary, collocations, nuance)
3. Discourse coherence and cohesion (connectors, idea organization)
4. Apparent fluency (self-corrections, filler words, pauses reflected in the text)
5. Complexity of ideas expressed (ability to argue, qualify, hypothesize)

Rules:
- Base your decision on the most consistent evidence throughout the text, not on a single isolated fragment.
- If there are mixed signals between two levels, choose the level where most criteria are sustained consistently.
- Do not explain your reasoning.
- Do not add comments, justifications, or additional text.

Your response must be EXCLUSIVELY one of these six codes, with no other character, word, period, or extra space:
A1
A2
B1
B2
C1
C2

Any other response format is considered invalid.

Transcript:
"""
${text}
"""`

const GRAMMAR_PATTERNS = [
  { level: 0, regex: /\b(is|am|are|have|has|do|does|like|want|need|can)\b/gi },
  { level: 1, regex: /\b(did|was|were|went|ate|saw|took|made|said|told|gave|going to|had to|used to)\b/gi },
  { level: 2, regex: /\b(have been|has been|had been|will have|would like|because|although|however|therefore|if (you|he|she|it|they|we|i))\b/gi },
  { level: 3, regex: /\b(would have|could have|should have|might have|must have|is being|was being|are being|having been|nevertheless|furthermore|consequently|meanwhile)\b/gi },
  { level: 4, regex: /\b(not only|no sooner|hardly when|scarcely|on the contrary|notwithstanding|consequently|subsequently)\b/gi },
  { level: 5, regex: /\b(heretofore|thereupon|hitherto|aforementioned|thereby|wherein|whereby)\b/gi }
]

function scoreGrammar(text) {
  const lower = text.toLowerCase()
  let maxLevel = 0
  for (let i = 0; i < GRAMMAR_PATTERNS.length; i++) {
    const matches = lower.match(GRAMMAR_PATTERNS[i].regex)
    if (matches && matches.length >= 2) maxLevel = Math.max(maxLevel, i + 1)
  }
  return maxLevel
}

function scoreSentenceLength(avg) {
  if (avg < 7) return 0; if (avg < 10) return 1; if (avg < 13) return 2
  if (avg < 17) return 3; if (avg < 22) return 4; return 5
}

function scoreTTR(ttr) {
  if (ttr < 0.25) return 0; if (ttr < 0.35) return 1; if (ttr < 0.45) return 2
  if (ttr < 0.55) return 3; if (ttr < 0.65) return 4; return 5
}

function scoreLongWords(pct) {
  if (pct < 0.08) return 0; if (pct < 0.15) return 1; if (pct < 0.22) return 2
  if (pct < 0.30) return 3; if (pct < 0.38) return 4; return 5
}

function analyzeHeuristic(text) {
  if (!text || text.trim().length < 20) return null
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []
  const totalWords = words.length
  if (totalWords < 5) return null
  const uniqueWords = new Set(words)
  const typeTokenRatio = uniqueWords.size / totalWords
  const avgWordsPerSentence = totalWords / sentences.length
  const longWords = words.filter(w => w.length > 6).length
  const longWordPct = longWords / totalWords
  const rawScore = (scoreSentenceLength(avgWordsPerSentence) + scoreTTR(typeTokenRatio) + scoreLongWords(longWordPct) + scoreGrammar(text)) / 4
  return CEFR_LEVELS[Math.max(0, Math.min(5, Math.round(rawScore)))]
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'get_models') {
    getModels().then(sendResponse)
    return true
  }
  if (msg.type === 'set_model') {
    setModel(msg.model).then(sendResponse)
    return true
  }
  if (msg.type === 'set_server') {
    setServer(msg.server).then(sendResponse)
    return true
  }
  if (msg.type === 'set_engine') {
    setEngine(msg.engine).then(sendResponse)
    return true
  }
  if (msg.type === 'set_lang') {
    setLang(msg.lang).then(sendResponse)
    return true
  }
  if (msg.type === 'set_nano_lang') {
    setNanoLang(msg.lang).then(sendResponse)
    return true
  }
  if (msg.type === 'set_sample_chars') {
    setSampleChars(msg.chars).then(sendResponse)
    return true
  }
})

async function getModels() {
  try {
    const result = await chrome.runtime.sendMessage({ type: 'ollama_get_models' })
    return result?.models || []
  } catch { return [] }
}

async function setModel(model) {
  await chrome.storage.local.set({ ollamaModel: model })
  await clearCachedVideoStorage()
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${NO_DATA_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(runScans, 100)
  return true
}

async function getModel() {
  const { ollamaModel } = await chrome.storage.local.get('ollamaModel')
  if (ollamaModel) return ollamaModel
  const models = await getModels()
  if (models.length > 0) {
    await chrome.storage.local.set({ ollamaModel: models[0] })
    return models[0]
  }
  return 'gemma3:1b'
}

async function setServer(server) {
  await chrome.storage.local.set({ ollamaServer: server })
  await clearCachedVideoStorage()
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${NO_DATA_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(runScans, 100)
  return true
}

async function getEngine() {
  const { aiEngine } = await chrome.storage.local.get('aiEngine')
  return aiEngine || 'nano'
}

async function setEngine(engine) {
  await chrome.storage.local.set({ aiEngine: engine })
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${NO_DATA_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(runScans, 100)
  return true
}

async function setNanoLang(lang) {
  await chrome.storage.local.set({ nanoLang: lang })
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${NO_DATA_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  setTimeout(runScans, 100)
  return true
}

async function analyzeWithNano(text, token) {
  console.log('[YT-Level] analyzeWithNano called, text length:', text.length)
  if (typeof LanguageModel === 'undefined') {
    console.log('[YT-Level] Gemini Nano API not available in this browser')
    return 'no_model'
  }
  try {
    const { nanoLang } = await chrome.storage.local.get('nanoLang')
    const lang = nanoLang || 'en'

    const nanoInputLang = ['en','es','ja'].includes(lang) ? lang : 'en'

    const availability = await LanguageModel.availability({
      expectedInputs: [{ type: 'text', languages: [nanoInputLang] }],
      expectedOutputs: [{ type: 'text', languages: ['en'] }]
    })
    if (availability !== 'available') {
      console.log('[YT-Level] Gemini Nano not available:', availability)
      return 'no_model'
    }
    if (token?.cancelled) throw new AbortedAnalysisError('cancelled before nano session')

    const session = await LanguageModel.create({
      expectedInputs: [{ type: 'text', languages: [nanoInputLang] }],
      expectedOutputs: [{ type: 'text', languages: ['en'] }]
    })

    const response = await session.prompt(DEEP_PROMPT(text), { signal: token?.abortController?.signal })
    session.destroy()

    const trimmed = response.trim().toUpperCase()
    console.log('[YT-Level] Nano raw response:', response)
    const level = CEFR_LEVELS.find(l => trimmed.includes(l))
    console.log('[YT-Level] Nano parsed level:', level)
    return level || null
  } catch (e) {
    if (e instanceof AbortedAnalysisError) throw e
    if (e?.name === 'AbortError') throw new AbortedAnalysisError('nano aborted')
    console.log('[YT-Level] Nano error:', e)
    return null
  }
}

let requestSeq = 0

class AbortedAnalysisError extends Error {}
class TranscriptRateLimitedError extends Error {}

async function analyzeWithOllama(text, model, token) {
  console.log('[YT-Level] analyzeWithOllama called, text length:', text.length, 'model:', model)
  const requestId = `req-${++requestSeq}`
  if (token) token.requestId = requestId
  const result = await chrome.runtime.sendMessage({
    type: 'ollama_generate',
    model,
    prompt: DEEP_PROMPT(text),
    requestId
  })
  if (token) token.requestId = null
  if (!result || result.error) {
    if (result?.aborted) throw new AbortedAnalysisError('ollama request aborted')
    console.log('[YT-Level] Ollama error:', result?.error)
    return null
  }
  const raw = result.response || ''
  const trimmed = raw.trim().toUpperCase()
  console.log('[YT-Level] Ollama raw response:', raw)
  const level = CEFR_LEVELS.find(l => trimmed.includes(l))
  console.log('[YT-Level] Ollama parsed level:', level)
  return level || null
}

const DEFAULT_SAMPLE_CHARS = 6000
const SAMPLE_CHARS_OPTIONS = [3000, 6000, 12000]

async function getSampleChars() {
  const { sampleChars } = await chrome.storage.local.get('sampleChars')
  return SAMPLE_CHARS_OPTIONS.includes(sampleChars) ? sampleChars : DEFAULT_SAMPLE_CHARS
}

async function setSampleChars(chars) {
  await chrome.storage.local.set({ sampleChars: chars })
  await clearCachedVideoStorage()
  videoResultCache.clear()
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => el.removeAttribute(PROCESSED_ATTR))
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${ENGINE_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${NO_DATA_BADGE_CLASS}`).forEach(el => el.remove())
  document.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
  currentWatchVideoId = null
  setTimeout(runScans, 100)
  return true
}

function sampleTranscript(text, maxChars) {
  if (text.length <= maxChars) return text
  const segmentSize = Math.floor(maxChars / 3)
  const start = text.slice(0, segmentSize)
  const midStart = Math.max(segmentSize, Math.floor(text.length / 2 - segmentSize / 2))
  const middle = text.slice(midStart, midStart + segmentSize)
  const end = text.slice(text.length - segmentSize)
  return `${start}\n[...]\n${middle}\n[...]\n${end}`
}

async function analyzeLevel(text, token) {
  const engine = await getEngine()
  const cap = await getSampleChars()
  const sampled = sampleTranscript(text, cap)

  if (engine === 'nano') {
    const level = await analyzeWithNano(sampled, token)
    if (level === 'no_model') return 'no_model'
    if (level) return { level, method: 'nano', model: 'Gemini Nano' }
    return null
  }

  const models = await getModels()
  if (models.length === 0) return 'no_model'

  const model = await getModel()
  const ollamaLevel = await analyzeWithOllama(sampled, model, token)
  if (ollamaLevel) return { level: ollamaLevel, method: 'ollama', model }

  return null
}

async function fetchTranscript(videoId) {
  try {
    return await chrome.runtime.sendMessage({ type: 'fetch_transcript', videoId })
  } catch { return { transcript: null, rateLimited: false } }
}

function getVideoId(element) {
  let link = element.querySelector('a[href*="/watch?v="]')
  if (!link) link = element.closest('a[href*="/watch?v="]')
  if (!link) return null
  const match = link.href.match(/v=([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

const THUMBNAIL_SELECTOR = 'ytd-thumbnail, yt-thumbnail-view-model, #thumbnail'

function getBadgeAnchor(element) {
  return element.querySelector(THUMBNAIL_SELECTOR) || element
}

// All extension overlays (badges/spinner/button) live in this detached layer,
// never as children of the YouTube video card, so we never write to or
// mutate the card's own DOM — only read its position via getBoundingClientRect.
// This guarantees we can't interfere with YouTube's own hover-preview behavior.
const overlayLayer = document.createElement('div')
Object.assign(overlayLayer.style, { position: 'absolute', top: '0', left: '0', width: '0', height: '0', overflow: 'visible' })
document.documentElement.appendChild(overlayLayer)

const overlayHosts = new WeakMap()
const overlayElements = new Set()

function getOverlayHost(element) {
  let host = overlayHosts.get(element)
  if (!host) {
    host = document.createElement('div')
    Object.assign(host.style, { position: 'absolute', top: '0', left: '0', width: '0', height: '0', pointerEvents: 'none' })
    overlayLayer.appendChild(host)
    overlayHosts.set(element, host)
  }
  overlayElements.add(element)
  return host
}

// YouTube's masthead and category chip bar are position:sticky/fixed near the
// top of the viewport. Our overlays live outside the page's own stacking
// context (appended to <html>), so without this check their high z-index
// would render on top of those sticky bars whenever a thumbnail scrolls
// underneath them, instead of being covered like the real thumbnail is.
function getStickyOverlayBottom() {
  let bottom = 0
  for (const selector of ['#masthead-container', 'ytd-feed-filter-chip-bar-renderer', 'ytd-search-header-renderer']) {
    const el = document.querySelector(selector)
    if (!el) continue
    const style = getComputedStyle(el)
    if (style.position !== 'sticky' && style.position !== 'fixed') continue
    const r = el.getBoundingClientRect()
    if (r.bottom > bottom) bottom = r.bottom
  }
  return bottom
}

function syncOverlayHost(element) {
  const host = overlayHosts.get(element)
  if (!host) return
  if (!element.isConnected) { removeOverlayHost(element); return }
  const anchor = getBadgeAnchor(element)
  if (!anchor.isConnected) { removeOverlayHost(element); return }
  const rect = anchor.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) { host.style.display = 'none'; return }
  if (rect.top < getStickyOverlayBottom()) { host.style.display = 'none'; return }
  host.style.display = ''
  host.style.top = `${rect.top + window.scrollY}px`
  host.style.left = `${rect.left + window.scrollX}px`
  host.style.width = `${rect.width}px`
  host.style.height = `${rect.height}px`
}

function removeOverlayHost(element) {
  overlayHosts.get(element)?.remove()
  overlayHosts.delete(element)
  overlayElements.delete(element)
}

let overlayRafScheduled = false
function scheduleOverlayReposition() {
  if (overlayRafScheduled) return
  overlayRafScheduled = true
  requestAnimationFrame(() => {
    overlayRafScheduled = false
    for (const element of overlayElements) {
      if (element.isConnected) syncOverlayHost(element)
      else removeOverlayHost(element)
    }
  })
}
window.addEventListener('scroll', scheduleOverlayReposition, { passive: true })
window.addEventListener('resize', scheduleOverlayReposition, { passive: true })

const anchorResizeObservers = new WeakMap()
function watchAnchorResize(element) {
  const anchor = getBadgeAnchor(element)
  if (anchorResizeObservers.has(anchor)) return
  const ro = new ResizeObserver(() => syncOverlayHost(element))
  ro.observe(anchor)
  anchorResizeObservers.set(anchor, ro)
}

function injectBadge(element, level, method, model) {
  removePriorityButton(element)
  removeSpinner(element)
  const host = getOverlayHost(element)
  host.querySelector(`:scope > .${NO_DATA_BADGE_CLASS}`)?.remove()
  if (host.querySelector(`:scope > .${BADGE_CLASS}`)) return
  syncOverlayHost(element)
  watchAnchorResize(element)
  const badge = document.createElement('div')
  badge.className = BADGE_CLASS
  badge.textContent = level
  badge.title = `Nivel ${level} (${model || 'Ollama'})`
  Object.assign(badge.style, {
    position: 'absolute', top: '8px', left: '8px', zIndex: 99999,
    width: '44px', height: '44px', borderRadius: '6px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: LEVEL_COLORS[level] || '#666', color: 'white',
    fontSize: '18px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'none'
  })
  host.appendChild(badge)

  const engineBadge = document.createElement('div')
  engineBadge.className = ENGINE_BADGE_CLASS
  engineBadge.textContent = method === 'nano' ? 'Nano' : 'Ollama'
  engineBadge.title = model || (method === 'nano' ? 'Gemini Nano' : 'Ollama')
  Object.assign(engineBadge.style, {
    position: 'absolute', top: '14px', left: '58px', zIndex: 99999,
    padding: '4px 10px', borderRadius: '999px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: method === 'nano' ? '#1a73e8' : '#0ac700', color: 'white',
    fontSize: '11px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'none', whiteSpace: 'nowrap'
  })
  host.appendChild(engineBadge)
}

function injectNoDataBadge(element) {
  removePriorityButton(element)
  removeSpinner(element)
  const host = getOverlayHost(element)
  if (host.querySelector(`:scope > .${BADGE_CLASS}`) || host.querySelector(`:scope > .${NO_DATA_BADGE_CLASS}`)) return
  syncOverlayHost(element)
  watchAnchorResize(element)
  const badge = document.createElement('div')
  badge.className = NO_DATA_BADGE_CLASS
  badge.textContent = T().noTranscriptLabel
  badge.title = T().noTranscriptTitle
  Object.assign(badge.style, {
    position: 'absolute', top: '8px', left: '8px', zIndex: 99999,
    height: '26px', padding: '0 10px', borderRadius: '999px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#e67e22', color: 'white',
    fontSize: '11px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
    whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'none'
  })
  host.appendChild(badge)
}

let toastContainer = null
function getToastContainer() {
  if (toastContainer && toastContainer.isConnected) return toastContainer
  toastContainer = document.createElement('div')
  toastContainer.id = 'yt-level-toast-container'
  Object.assign(toastContainer.style, {
    position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
    zIndex: 2147483647, display: 'flex', flexDirection: 'column', gap: '8px',
    alignItems: 'center', pointerEvents: 'none'
  })
  document.documentElement.appendChild(toastContainer)
  return toastContainer
}

let lastToastMessage = ''
let lastToastTime = 0
function showToast(message, title) {
  const now = Date.now()
  if (message === lastToastMessage && now - lastToastTime < 3000) return
  lastToastMessage = message
  lastToastTime = now
  const container = getToastContainer()
  const toast = document.createElement('div')
  toast.title = title || message
  Object.assign(toast.style, {
    display: 'flex', alignItems: 'center', gap: '14px',
    background: '#c0392b', color: '#fff', padding: '16px 22px',
    borderRadius: '12px', fontFamily: 'Arial, sans-serif',
    boxShadow: '0 8px 24px rgba(0,0,0,0.55)',
    border: '1px solid rgba(255,255,255,0.25)', maxWidth: '440px',
    pointerEvents: 'auto', cursor: 'pointer', opacity: '0',
    transition: 'opacity .2s ease, transform .2s ease', transform: 'translateY(10px)'
  })

  const icon = document.createElement('span')
  icon.textContent = '⚠️'
  Object.assign(icon.style, { fontSize: '28px', lineHeight: '1', flexShrink: '0' })
  toast.appendChild(icon)

  const textWrap = document.createElement('div')
  Object.assign(textWrap.style, { display: 'flex', flexDirection: 'column', gap: '2px' })

  const titleEl = document.createElement('div')
  titleEl.textContent = message
  Object.assign(titleEl.style, { fontSize: '16px', fontWeight: 'bold' })
  textWrap.appendChild(titleEl)

  if (title) {
    const subEl = document.createElement('div')
    subEl.textContent = title
    Object.assign(subEl.style, { fontSize: '13px', fontWeight: 'normal', opacity: '0.9' })
    textWrap.appendChild(subEl)
  }

  toast.appendChild(textWrap)
  container.appendChild(toast)
  requestAnimationFrame(() => {
    toast.style.opacity = '1'
    toast.style.transform = 'translateY(0)'
  })
  const dismiss = () => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(10px)'
    setTimeout(() => toast.remove(), 200)
  }
  toast.addEventListener('click', dismiss)
  setTimeout(dismiss, 5000)
}

const SPINNER_CLASS = 'yt-level-spinner'

const SPINNER_ICON = {
  queued: `<svg viewBox="0 0 24 24" style="width:14px;height:14px;flex-shrink:0;animation:ytLevelPulse 1.4s ease-in-out infinite"><circle cx="12" cy="12" r="9" fill="none" stroke="#ccc" stroke-width="3" stroke-dasharray="3 4" stroke-linecap="round"/></svg>`,
  active: `<svg viewBox="0 0 24 24" style="width:14px;height:14px;flex-shrink:0;animation:ytLevelSpin 1s linear infinite"><circle cx="12" cy="12" r="10" fill="none" stroke="#4CAF50" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>`
}

function renderSpinner(spinner, state) {
  const t = T()
  spinner.dataset.state = state
  spinner.title = state === 'queued' ? t.queuedTitle : t.activeTitle
  spinner.style.background = state === 'queued' ? 'rgba(60,60,60,0.85)' : 'rgba(0,0,0,0.8)'
  spinner.innerHTML = `${SPINNER_ICON[state]}<span>${state === 'queued' ? t.queuedLabel : t.activeLabel}</span>`
}

function injectSpinner(element, state = 'active') {
  const host = getOverlayHost(element)
  let spinner = host.querySelector(`:scope > .${SPINNER_CLASS}`)
  if (!spinner) {
    spinner = document.createElement('div')
    spinner.className = SPINNER_CLASS
    Object.assign(spinner.style, {
      position: 'absolute', top: '8px', left: '8px', zIndex: 99999,
      height: '26px', padding: '0 10px', borderRadius: '999px',
      display: 'flex', alignItems: 'center', gap: '6px', pointerEvents: 'none',
      color: '#fff', fontSize: '11px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
      whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    })
    host.querySelector(`:scope > .${BADGE_CLASS}`)?.remove()
    host.querySelector(`:scope > .${ENGINE_BADGE_CLASS}`)?.remove()
    host.querySelector(`:scope > .${NO_DATA_BADGE_CLASS}`)?.remove()
    host.appendChild(spinner)
    syncOverlayHost(element)
    watchAnchorResize(element)
  }
  if (spinner.dataset.state === state) return
  renderSpinner(spinner, state)
}

function removeSpinner(element) {
  overlayHosts.get(element)?.querySelector(`:scope > .${SPINNER_CLASS}`)?.remove()
}

const priorityButtons = new Set()

document.addEventListener('click', e => {
  for (const btn of priorityButtons) {
    if (!btn.isConnected || btn.disabled) continue
    const r = btn.getBoundingClientRect()
    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
      e.preventDefault()
      e.stopPropagation()
      btn._ytLevelActivate()
      return
    }
  }
}, true)

function injectPriorityButton(element, variant = 'idle') {
  const host = getOverlayHost(element)
  if (host.querySelector(`:scope > .${BADGE_CLASS}`)) return
  if (host.querySelector(`:scope > .${NO_DATA_BADGE_CLASS}`)) return
  const t = T()
  let btn = host.querySelector(`:scope > .${PRIORITY_BTN_CLASS}`)
  if (!btn) {
    btn = document.createElement('button')
    btn.className = PRIORITY_BTN_CLASS
    btn.type = 'button'
    Object.assign(btn.style, {
      position: 'absolute', bottom: '8px', left: '8px', zIndex: 99999,
      height: '32px', padding: '0 14px', borderRadius: '999px', border: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
      color: '#ffffff', fontSize: '13px', fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
      cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'none'
    })
    btn._ytLevelActivate = () => prioritizeVideoElement(element, btn)
    host.appendChild(btn)
    priorityButtons.add(btn)
    syncOverlayHost(element)
    watchAnchorResize(element)
  }
  btn.dataset.variant = variant
  btn.disabled = false
  if (variant === 'rateLimited') {
    btn.textContent = t.rateLimitedLabel
    btn.title = t.rateLimitedTitle
    btn.style.background = '#c0392b'
  } else {
    btn.textContent = t.priorityBtnLabel
    btn.title = t.priorityBtnTitle
    btn.style.background = '#2e7d32'
  }
}

function removePriorityButton(element) {
  const btn = overlayHosts.get(element)?.querySelector(`:scope > .${PRIORITY_BTN_CLASS}`)
  if (btn) { priorityButtons.delete(btn); btn.remove() }
}

const anchorObservers = new WeakMap()

function stopWatchingAnchor(anchor) {
  anchorObservers.get(anchor)?.disconnect()
  anchorObservers.delete(anchor)
}

function reconcileOverlay(element) {
  if (!element.isConnected) { stopWatchingAnchor(getBadgeAnchor(element)); removeOverlayHost(element); return }
  const videoId = getVideoId(element)
  if (!videoId) return
  const anchor = getBadgeAnchor(element)
  const host = overlayHosts.get(element)

  if (videoResultCache.has(videoId)) {
    const cached = videoResultCache.get(videoId)
    if (cached === 'no_transcript') {
      if (!host?.querySelector(`:scope > .${NO_DATA_BADGE_CLASS}`)) injectNoDataBadge(element)
    } else if (cached && !host?.querySelector(`:scope > .${BADGE_CLASS}`)) {
      injectBadge(element, cached.level, cached.method, cached.model)
    }
    stopWatchingAnchor(anchor)
    return
  }

  if (videoInFlight.has(videoId)) {
    injectSpinner(element, 'active')
    return
  }

  if (pendingElements.includes(element)) {
    injectSpinner(element, 'queued')
    injectPriorityButton(element)
    return
  }

  if (!host?.querySelector(`:scope > .${SPINNER_CLASS}`)) {
    injectPriorityButton(element)
  }
}

function watchAnchor(element) {
  const anchor = getBadgeAnchor(element)
  if (anchorObservers.has(anchor)) return
  const obs = new MutationObserver(() => reconcileOverlay(element))
  obs.observe(anchor, { childList: true })
  anchorObservers.set(anchor, obs)
}

const styleEl = document.createElement('style')
styleEl.textContent = `@keyframes ytLevelSpin{to{transform:rotate(360deg)}}
@keyframes ytLevelPulse{0%,100%{opacity:0.3}50%{opacity:0.9}}
.${PRIORITY_BTN_CLASS}{opacity:1}
.${PRIORITY_BTN_CLASS}:disabled{opacity:0.6}`
document.documentElement.appendChild(styleEl)

const videoResultCache = new Map()
const videoInFlight = new Set()
const elementTokens = new Map()
const activeElements = []

async function processVideoElement(element) {
  const videoId = getVideoId(element)
  if (!videoId) return
  const processedId = element.getAttribute(PROCESSED_ATTR)
  if (processedId === videoId) return
  if (processedId) removeOverlayHost(element)

  if (videoResultCache.has(videoId)) {
    const cached = videoResultCache.get(videoId)
    element.setAttribute(PROCESSED_ATTR, videoId)
    if (cached === 'no_transcript') injectNoDataBadge(element)
    else if (cached) injectBadge(element, cached.level, cached.method, cached.model)
    removePriorityButton(element)
    return
  }

  if (videoInFlight.has(videoId)) {
    removePriorityButton(element)
    return
  }

  const host = overlayHosts.get(element)
  host?.querySelector(`:scope > .${BADGE_CLASS}`)?.remove()
  host?.querySelector(`:scope > .${ENGINE_BADGE_CLASS}`)?.remove()
  element.setAttribute(PROCESSED_ATTR, videoId)
  videoInFlight.add(videoId)
  removePriorityButton(element)

  const token = { cancelled: false, requestId: null, abortController: new AbortController() }
  elementTokens.set(element, token)
  activeElements.push(element)

  try {
    injectSpinner(element, 'active')

    const { transcript, rateLimited } = await fetchTranscript(videoId)
    if (token.cancelled) throw new AbortedAnalysisError('cancelled before analysis')
    if (rateLimited) throw new TranscriptRateLimitedError('transcript API rate limited')
    if (!transcript) { removeSpinner(element); videoResultCache.set(videoId, 'no_transcript'); injectNoDataBadge(element); return }

    const result = await analyzeLevel(transcript, token)
    removeSpinner(element)
    if (result === 'no_model') {
      element.removeAttribute(PROCESSED_ATTR)
      if (element.isConnected) injectPriorityButton(element)
      showToast(T().noModelLabel, T().noModelTitle)
      return
    }
    videoResultCache.set(videoId, result)
    if (result) {
      injectBadge(element, result.level, result.method, result.model)
    }
  } catch (e) {
    removeSpinner(element)
    if (e instanceof AbortedAnalysisError) {
      console.log('[YT-Level] Analysis aborted for', videoId)
      element.removeAttribute(PROCESSED_ATTR)
      requeueElement(element)
    } else if (e instanceof TranscriptRateLimitedError) {
      console.log('[YT-Level] Transcript API rate limited for', videoId)
      element.removeAttribute(PROCESSED_ATTR)
      if (element.isConnected) injectPriorityButton(element, 'rateLimited')
    } else {
      console.log('[YT-Level] Error processing', videoId, ':', e.message)
    }
  } finally {
    videoInFlight.delete(videoId)
    elementTokens.delete(element)
    const activeIdx = activeElements.indexOf(element)
    if (activeIdx !== -1) activeElements.splice(activeIdx, 1)
  }
}

const MAX_CONCURRENT_ANALYSIS = 2
let activeAnalysisCount = 0
const pendingElements = []

function requeueElement(element) {
  if (element.isConnected && !pendingElements.includes(element)) {
    injectSpinner(element, 'queued')
    injectPriorityButton(element)
    pendingElements.push(element)
  }
}

function presentVideoElement(element) {
  const videoId = getVideoId(element)
  if (!videoId) return
  const processedId = element.getAttribute(PROCESSED_ATTR)
  if (processedId === videoId) return
  if (processedId) removeOverlayHost(element)

  if (videoResultCache.has(videoId)) {
    processVideoElement(element)
    return
  }

  if (videoInFlight.has(videoId) || pendingElements.includes(element)) return
  injectPriorityButton(element)
  watchAnchor(element)
}

function pumpAnalysisQueue() {
  while (activeAnalysisCount < MAX_CONCURRENT_ANALYSIS && pendingElements.length) {
    const element = pendingElements.shift()
    if (!element.isConnected) continue
    activeAnalysisCount++
    processVideoElement(element).finally(() => {
      activeAnalysisCount--
      pumpAnalysisQueue()
    })
  }
}

function cancelActiveElement(element) {
  const token = elementTokens.get(element)
  if (!token) return
  token.cancelled = true
  token.abortController.abort()
  if (token.requestId) {
    chrome.runtime.sendMessage({ type: 'ollama_abort', requestId: token.requestId }).catch(() => {})
  }
}

function prioritizeVideoElement(element, btn) {
  const videoId = getVideoId(element)
  if (!videoId) return
  if (videoResultCache.has(videoId) || videoInFlight.has(videoId)) return
  const idx = pendingElements.indexOf(element)
  if (idx !== -1) pendingElements.splice(idx, 1)
  watchAnchor(element)

  if (activeAnalysisCount >= MAX_CONCURRENT_ANALYSIS && activeElements.length) {
    cancelActiveElement(activeElements[activeElements.length - 1])
  }

  pendingElements.unshift(element)
  if (btn) {
    btn.textContent = T().priorityBtnActive
    btn.disabled = true
  }
  pumpAnalysisQueue()
}

function scanFeed() {
  for (const sel of CARD_SELECTORS) {
    for (const el of document.querySelectorAll(sel)) {
      if (CARD_SELECTORS.some(s => el.parentElement && el.parentElement.closest(s))) continue
      presentVideoElement(el)
    }
  }
  sweepDisconnectedActive()
}

function sweepDisconnectedActive() {
  for (const el of [...activeElements]) {
    if (!el.isConnected) cancelActiveElement(el)
  }
  for (const el of [...overlayElements]) {
    if (!el.isConnected) removeOverlayHost(el)
  }
}

const WATCH_BADGE_CLASS = 'yt-level-watch-badge'
const WATCH_PLAYER_SELECTOR = '#movie_player, .html5-video-player'

function getWatchVideoId() {
  const match = location.href.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function clearWatchOverlay(player) {
  player.querySelectorAll(`.${WATCH_BADGE_CLASS}`).forEach(el => el.remove())
}

function buildWatchRow(videoId) {
  const row = document.createElement('div')
  row.className = WATCH_BADGE_CLASS
  row.dataset.videoId = videoId
  Object.assign(row.style, {
    position: 'absolute', top: '12px', left: '12px', zIndex: 60,
    display: 'flex', alignItems: 'center', gap: '8px'
  })
  return row
}

function buildWatchIdleButton(videoId, player) {
  const row = buildWatchRow(videoId)
  const t = T()
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = t.priorityBtnLabel
  btn.title = t.priorityBtnTitle
  Object.assign(btn.style, {
    display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: '999px',
    background: '#2e7d32', color: 'white', border: 'none',
    fontSize: '14px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
    cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'auto'
  })
  btn.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    startWatchAnalysis(videoId, player)
  })
  row.appendChild(btn)
  return row
}

function buildWatchSpinner(videoId) {
  const row = buildWatchRow(videoId)
  const t = T()
  const spinner = document.createElement('span')
  Object.assign(spinner.style, {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '999px',
    background: 'rgba(0,0,0,0.8)', color: '#fff',
    fontSize: '14px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
  })
  spinner.innerHTML = `${SPINNER_ICON.active}<span>${t.activeLabel}</span>`
  spinner.title = t.activeTitle
  row.appendChild(spinner)
  return row
}

function buildWatchBadge(videoId, result) {
  const row = buildWatchRow(videoId)
  row.style.pointerEvents = 'none'

  if (result === 'no_transcript') {
    const noData = document.createElement('span')
    noData.textContent = T().noTranscriptLabel
    noData.title = T().noTranscriptTitle
    Object.assign(noData.style, {
      display: 'inline-flex', alignItems: 'center', padding: '5px 13px', borderRadius: '999px',
      background: '#e67e22', color: 'white',
      fontSize: '14px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    })
    row.appendChild(noData)
    return row
  }

  if (result === 'rate_limited') {
    row.style.pointerEvents = ''
    const retry = document.createElement('button')
    retry.type = 'button'
    retry.textContent = T().rateLimitedLabel
    retry.title = T().rateLimitedTitle
    Object.assign(retry.style, {
      display: 'inline-flex', alignItems: 'center', padding: '5px 13px', borderRadius: '999px',
      background: '#c0392b', color: 'white', border: 'none',
      fontSize: '14px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
      cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.4)', pointerEvents: 'auto'
    })
    retry.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      row.remove()
      const player = document.querySelector(WATCH_PLAYER_SELECTOR)
      if (player) startWatchAnalysis(videoId, player)
    })
    row.appendChild(retry)
    return row
  }

  const badge = document.createElement('span')
  badge.textContent = result.level
  badge.title = `Nivel ${result.level} (${result.model || 'Ollama'})`
  Object.assign(badge.style, {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: '47px', height: '47px', borderRadius: '8px',
    background: LEVEL_COLORS[result.level] || '#666', color: 'white',
    fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
  })

  const engineBadge = document.createElement('span')
  engineBadge.textContent = result.method === 'nano' ? 'Nano' : 'Ollama'
  engineBadge.title = result.model || (result.method === 'nano' ? 'Gemini Nano' : 'Ollama')
  Object.assign(engineBadge.style, {
    display: 'inline-flex', alignItems: 'center', padding: '5px 13px', borderRadius: '999px',
    background: result.method === 'nano' ? '#1a73e8' : '#0ac700', color: 'white',
    fontSize: '14px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
  })

  row.appendChild(badge)
  row.appendChild(engineBadge)
  return row
}

async function startWatchAnalysis(videoId, player) {
  if (videoInFlight.has(videoId)) return
  videoInFlight.add(videoId)
  clearWatchOverlay(player)
  player.appendChild(buildWatchSpinner(videoId))
  try {
    const { transcript, rateLimited } = await fetchTranscript(videoId)
    if (getWatchVideoId() !== videoId) return
    if (rateLimited) throw new TranscriptRateLimitedError('transcript API rate limited')
    if (!transcript) {
      videoResultCache.set(videoId, 'no_transcript')
      clearWatchOverlay(player)
      player.appendChild(buildWatchBadge(videoId, 'no_transcript'))
      return
    }
    const result = await analyzeLevel(transcript)
    if (getWatchVideoId() !== videoId) return
    if (result === 'no_model') {
      videoResultCache.set(videoId, 'no_model')
      clearWatchOverlay(player)
      player.appendChild(buildWatchIdleButton(videoId, player))
      showToast(T().noModelLabel, T().noModelTitle)
      return
    }
    videoResultCache.set(videoId, result)
    clearWatchOverlay(player)
    if (result) player.appendChild(buildWatchBadge(videoId, result))
    else player.appendChild(buildWatchIdleButton(videoId, player))
  } catch (e) {
    if (getWatchVideoId() !== videoId) return
    if (e instanceof AbortedAnalysisError) {
      console.log('[YT-Level] Watch page analysis aborted for', videoId)
    } else if (e instanceof TranscriptRateLimitedError) {
      console.log('[YT-Level] Transcript API rate limited on watch page for', videoId)
      clearWatchOverlay(player)
      player.appendChild(buildWatchBadge(videoId, 'rate_limited'))
    } else {
      console.log('[YT-Level] Error processing watch page video', videoId, ':', e.message)
      clearWatchOverlay(player)
      player.appendChild(buildWatchIdleButton(videoId, player))
    }
  } finally {
    videoInFlight.delete(videoId)
  }
}

let currentWatchVideoId = null

function processWatchPage() {
  const videoId = getWatchVideoId()
  if (!videoId) { currentWatchVideoId = null; return }

  const player = document.querySelector(WATCH_PLAYER_SELECTOR)
  if (!player) return

  if (videoId !== currentWatchVideoId) {
    currentWatchVideoId = videoId
    clearWatchOverlay(player)
  }

  if (player.querySelector(`.${WATCH_BADGE_CLASS}[data-video-id="${videoId}"]`)) return
  if (videoInFlight.has(videoId)) return

  if (videoResultCache.has(videoId)) {
    const cached = videoResultCache.get(videoId)
    if (cached && cached !== 'no_model') player.appendChild(buildWatchBadge(videoId, cached))
    else player.appendChild(buildWatchIdleButton(videoId, player))
    return
  }

  player.appendChild(buildWatchIdleButton(videoId, player))
}

function runScans() {
  scanFeed()
  processWatchPage()
}

let scanScheduled = false
function scheduleScan() {
  if (scanScheduled) return
  scanScheduled = true
  setTimeout(() => { scanScheduled = false; runScans() }, 400)
}

const observer = new MutationObserver(scheduleScan)
observer.observe(document.body, { childList: true, subtree: true })
window.addEventListener('scroll', scheduleScan, { passive: true })
window.addEventListener('scrollend', runScans, { passive: true })
document.addEventListener('yt-navigate-finish', () => {
  pendingElements.forEach(el => { removeSpinner(el); removePriorityButton(el) })
  pendingElements.length = 0
  chrome.runtime.sendMessage({ type: 'ollama_abort_all' }).catch(() => {})
  setTimeout(runScans, 300)
  setTimeout(runScans, 1000)
  setTimeout(runScans, 2500)
})
setTimeout(runScans, 500)
setTimeout(runScans, 2000)
runScans()
