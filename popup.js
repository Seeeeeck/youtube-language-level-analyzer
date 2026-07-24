const OLLAMA_DEFAULT = 'http://localhost:11434'

const LANG = {
  es: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Lenguaje de la extensión', nanoInstructions: 'Instrucciones', ollamaInstructions: 'Instrucciones', noModels: '⚠ Sin modelos disponibles', noConn: '✗ Servidor sin conexión', loading: 'Cargando Ollama...', ready: v => `✓ ${v} listo`, nanoUnavail: 'No disponible', nanoReady: 'Disponible', nanoDownloading: pct => `Descargando${pct != null ? ` ${pct}%` : '...'} no cierres el navegador`, nanoDownloadable: 'Descargable', analLang: 'Idioma de análisis', networkTip: 'Para servidores remotos, activa "Exponer Ollama a la red" en Configuración de Ollama.', supportsExt: 'Apoya la extensión 🙂', nanoFlagBtn: 'Activar Prompt API for Gemini Nano Multilingual y reinicia el navegador', chromeRecommend: 'Se recomienda usar Google Chrome o navegadores basados en Chromium', ollamaAllBrowsers: 'Funciona en cualquier navegador basado en Chromium: Chrome, Brave, Edge, Vivaldi, Opera, y más.', corsError: '✗ Error de CORS: el servidor rechaza la extensión', corsInstructions: 'Ver instrucciones', sampleSize: 'Caracteres a analizar', sampleFast: '3000 car. (rápido)', sampleBalanced: '6000 car. (equilibrado)', samplePrecise: '12000 car. (más preciso)', sampleMaxPrecise: '24000 car. (máxima precisión)', geminiApi: 'API Gemini', geminiNoKey: 'Ingresa tu API key de Gemini', geminiLoading: 'Verificando API key...', geminiInvalidKey: '✗ API key inválida o error de conexión' },
  en: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Model', lang: 'Language', nanoInstructions: 'Instructions', ollamaInstructions: 'Instructions', noModels: '⚠ No models available', noConn: '✗ Server unreachable', loading: 'Loading Ollama...', ready: v => `✓ ${v} ready`, nanoUnavail: 'Unavailable', nanoReady: 'Available', nanoDownloading: pct => `Downloading${pct != null ? ` ${pct}%` : '...'} do not close the browser`, nanoDownloadable: 'Downloadable', analLang: 'Analysis language', networkTip: 'For remote servers, enable "Expose Ollama to network" in Ollama Settings.', supportsExt: 'Supports the extension 🙂', nanoFlagBtn: 'Activate Prompt API for Gemini Nano Multilingual and restart your browser', chromeRecommend: 'Google Chrome or Chromium-based browsers recommended', ollamaAllBrowsers: 'Works on any Chromium-based browser: Chrome, Brave, Edge, Vivaldi, Opera, and more.', corsError: '✗ CORS error: the server is rejecting the extension', corsInstructions: 'View instructions', sampleSize: 'Characters to analyze', sampleFast: '3000 chars (fast)', sampleBalanced: '6000 chars (balanced)', samplePrecise: '12000 chars (most accurate)', sampleMaxPrecise: '24000 chars (maximum accuracy)', geminiApi: 'Gemini API', geminiNoKey: 'Enter your Gemini API key', geminiLoading: 'Checking API key...', geminiInvalidKey: '✗ Invalid API key or connection error' },
  fr: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Serveur', ok: 'OK', model: 'Modèle', lang: 'Langue', nanoInstructions: 'Instructions', ollamaInstructions: 'Instructions', noModels: '⚠ Aucun modèle', noConn: '✗ Serveur inaccessible', loading: 'Chargement d\'Ollama...', ready: v => `✓ ${v} prêt`, nanoUnavail: 'Indisponible', nanoReady: 'Disponible', nanoDownloading: pct => `Téléchargement${pct != null ? ` ${pct}%` : '...'} ne fermez pas le navigateur`, nanoDownloadable: 'Téléchargeable', analLang: 'Langue d\'analyse', networkTip: 'Pour les serveurs distants, activez "Exposer Ollama au réseau" dans les paramètres Ollama.', supportsExt: 'Soutenez l\'extension 🙂', nanoFlagBtn: 'Activer Prompt API for Gemini Nano Multilingual et redémarrer le navigateur', chromeRecommend: 'Navigateur Google Chrome ou basé sur Chromium recommandé', ollamaAllBrowsers: 'Fonctionne sur tout navigateur basé sur Chromium : Chrome, Brave, Edge, Vivaldi, Opera, et plus encore.', corsError: "✗ Erreur CORS : le serveur rejette l'extension", corsInstructions: 'Voir les instructions', sampleSize: 'Caractères à analyser', sampleFast: '3000 car. (rapide)', sampleBalanced: '6000 car. (équilibré)', samplePrecise: '12000 car. (plus précis)', sampleMaxPrecise: '24000 car. (précision maximale)', geminiApi: 'API Gemini', geminiNoKey: 'Entrez votre clé API Gemini', geminiLoading: 'Vérification de la clé API...', geminiInvalidKey: '✗ Clé API invalide ou erreur de connexion' },
  pt: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Servidor', ok: 'OK', model: 'Modelo', lang: 'Idioma', nanoInstructions: 'Instruções', ollamaInstructions: 'Instruções', noModels: '⚠ Sem modelos', noConn: '✗ Servidor sem conexão', loading: 'Carregando Ollama...', ready: v => `✓ ${v} pronto`, nanoUnavail: 'Indisponível', nanoReady: 'Disponível', nanoDownloading: pct => `Baixando${pct != null ? ` ${pct}%` : '...'} não feche o navegador`, nanoDownloadable: 'Baixável', analLang: 'Idioma de análise', networkTip: 'Para servidores remotos, ative "Expor Ollama à rede" nas Configurações do Ollama.', supportsExt: 'Apoie a extensão 🙂', nanoFlagBtn: 'Ativar Prompt API for Gemini Nano Multilingual e reiniciar o navegador', chromeRecommend: 'Recomenda-se o navegador Google Chrome ou baseado em Chromium', ollamaAllBrowsers: 'Funciona em qualquer navegador baseado em Chromium: Chrome, Brave, Edge, Vivaldi, Opera e mais.', corsError: '✗ Erro de CORS: o servidor está rejeitando a extensão', corsInstructions: 'Ver instruções', sampleSize: 'Caracteres a analisar', sampleFast: '3000 car. (rápido)', sampleBalanced: '6000 car. (equilibrado)', samplePrecise: '12000 car. (mais preciso)', sampleMaxPrecise: '24000 car. (máxima precisão)', geminiApi: 'API Gemini', geminiNoKey: 'Insira sua chave de API do Gemini', geminiLoading: 'Verificando chave de API...', geminiInvalidKey: '✗ Chave de API inválida ou erro de conexão' },
  de: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Modell', lang: 'Sprache', nanoInstructions: 'Anleitung', ollamaInstructions: 'Anleitung', noModels: '⚠ Keine Modelle', noConn: '✗ Server nicht erreichbar', loading: 'Ollama wird geladen...', ready: v => `✓ ${v} bereit`, nanoUnavail: 'Nicht verfügbar', nanoReady: 'Verfügbar', nanoDownloading: pct => `Wird heruntergeladen${pct != null ? ` ${pct}%` : '...'} Browser nicht schließen`, nanoDownloadable: 'Herunterladbar', analLang: 'Analysesprache', networkTip: 'Für entfernte Server aktivieren Sie "Ollama im Netzwerk verfügbar machen" in den Ollama-Einstellungen.', supportsExt: 'Unterstütze die Erweiterung 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual aktivieren und Browser neu starten', chromeRecommend: 'Google Chrome oder ein Chromium-basierter Browser wird empfohlen', ollamaAllBrowsers: 'Funktioniert in jedem Chromium-basierten Browser: Chrome, Brave, Edge, Vivaldi, Opera und mehr.', corsError: '✗ CORS-Fehler: Der Server lehnt die Erweiterung ab', corsInstructions: 'Anleitung ansehen', sampleSize: 'Zu analysierende Zeichen', sampleFast: '3000 Zeichen (schnell)', sampleBalanced: '6000 Zeichen (ausgewogen)', samplePrecise: '12000 Zeichen (genauer)', sampleMaxPrecise: '24000 Zeichen (maximale Genauigkeit)', geminiApi: 'Gemini API', geminiNoKey: 'Gib deinen Gemini-API-Schlüssel ein', geminiLoading: 'API-Schlüssel wird geprüft...', geminiInvalidKey: '✗ Ungültiger API-Schlüssel oder Verbindungsfehler' },
  it: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Server', ok: 'OK', model: 'Modello', lang: 'Lingua', nanoInstructions: 'Istruzioni', ollamaInstructions: 'Istruzioni', noModels: '⚠ Nessun modello', noConn: '✗ Server non raggiungibile', loading: 'Caricamento Ollama...', ready: v => `✓ ${v} pronto`, nanoUnavail: 'Non disponibile', nanoReady: 'Disponibile', nanoDownloading: pct => `Download${pct != null ? ` ${pct}%` : '...'} non chiudere il browser`, nanoDownloadable: 'Scaricabile', analLang: 'Lingua di analisi', networkTip: 'Per server remoti, abilita "Esponi Ollama alla rete" nelle Impostazioni di Ollama.', supportsExt: 'Supporta l\'estensione 🙂', nanoFlagBtn: 'Attiva Prompt API for Gemini Nano Multilingual e riavvia il browser', chromeRecommend: 'Si consiglia Google Chrome o un browser basato su Chromium', ollamaAllBrowsers: 'Funziona su qualsiasi browser basato su Chromium: Chrome, Brave, Edge, Vivaldi, Opera e altri.', corsError: "✗ Errore CORS: il server rifiuta l'estensione", corsInstructions: 'Vedi istruzioni', sampleSize: 'Caratteri da analizzare', sampleFast: '3000 car. (veloce)', sampleBalanced: '6000 car. (equilibrato)', samplePrecise: '12000 car. (più preciso)', sampleMaxPrecise: '24000 car. (massima precisione)', geminiApi: 'API Gemini', geminiNoKey: 'Inserisci la tua chiave API Gemini', geminiLoading: 'Verifica della chiave API...', geminiInvalidKey: '✗ Chiave API non valida o errore di connessione' },
  zh: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: '服务器', ok: '确定', model: '模型', lang: '语言', nanoInstructions: '说明', ollamaInstructions: '说明', noModels: '⚠ 无可用模型', noConn: '✗ 服务器无法连接', loading: '正在加载 Ollama...', ready: v => `✓ ${v} 就绪`, nanoUnavail: '不可用', nanoReady: '可用', nanoDownloading: pct => `下载中${pct != null ? ` ${pct}%` : '...'}请勿关闭浏览器`, nanoDownloadable: '可下载', analLang: '分析语言', networkTip: '对于远程服务器，请在Ollama设置中启用"将Ollama暴露到网络"。', supportsExt: '支持扩展 🙂', nanoFlagBtn: '启用 Prompt API for Gemini Nano Multilingual 并重启浏览器', chromeRecommend: '推荐使用 Google Chrome 或基于 Chromium 的浏览器', ollamaAllBrowsers: '适用于任何基于 Chromium 的浏览器：Chrome、Brave、Edge、Vivaldi、Opera 等。', corsError: '✗ CORS 错误：服务器拒绝了扩展程序', corsInstructions: '查看说明', sampleSize: '分析的字符数', sampleFast: '3000 字符（快速）', sampleBalanced: '6000 字符（均衡）', samplePrecise: '12000 字符（更准确）', sampleMaxPrecise: '24000 字符（最高精度）', geminiApi: 'Gemini API', geminiNoKey: '请输入你的 Gemini API 密钥', geminiLoading: '正在验证 API 密钥...', geminiInvalidKey: '✗ API 密钥无效或连接错误' },
  ja: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'サーバー', ok: 'OK', model: 'モデル', lang: '言語', nanoInstructions: '説明書', ollamaInstructions: '説明書', noModels: '⚠ モデルがありません', noConn: '✗ サーバーに接続できません', loading: 'Ollama を読み込み中...', ready: v => `✓ ${v} 準備完了`, nanoUnavail: '利用不可', nanoReady: '利用可能', nanoDownloading: pct => `ダウンロード中${pct != null ? ` ${pct}%` : '...'}ブラウザを閉じないでください`, nanoDownloadable: 'ダウンロード可能', analLang: '分析言語', networkTip: 'リモートサーバーの場合は、Ollama設定で「Ollamaをネットワークに公開する」を有効にしてください。', supportsExt: '拡張機能をサポート 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual を有効化してブラウザを再起動', chromeRecommend: 'Google Chrome または Chromium ベースのブラウザを推奨', ollamaAllBrowsers: 'Chromiumベースのあらゆるブラウザで動作します: Chrome、Brave、Edge、Vivaldi、Operaなど。', corsError: '✗ CORS エラー：サーバーが拡張機能を拒否しています', corsInstructions: '説明を見る', sampleSize: '分析する文字数', sampleFast: '3000文字（高速）', sampleBalanced: '6000文字（バランス）', samplePrecise: '12000文字（より正確）', sampleMaxPrecise: '24000文字（最高精度）', geminiApi: 'Gemini API', geminiNoKey: 'Gemini APIキーを入力してください', geminiLoading: 'APIキーを確認中...', geminiInvalidKey: '✗ APIキーが無効か接続エラーです' },
  ko: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: '서버', ok: '확인', model: '모델', lang: '언어', nanoInstructions: '설명서', ollamaInstructions: '설명서', noModels: '⚠ 모델 없음', noConn: '✗ 서버 연결 불가', loading: 'Ollama 로딩 중...', ready: v => `✓ ${v} 준비 완료`, nanoUnavail: '사용 불가', nanoReady: '사용 가능', nanoDownloading: pct => `다운로드 중${pct != null ? ` ${pct}%` : '...'} 브라우저를 닫지 마세요`, nanoDownloadable: '다운로드 가능', analLang: '분석 언어', networkTip: '원격 서버의 경우 Ollama 설정에서 "Ollama를 네트워크에 노출"을 활성화하세요.', supportsExt: '확장 지원하기 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual 활성화 후 브라우저 재시작', chromeRecommend: 'Google Chrome 또는 Chromium 기반 브라우저 권장', ollamaAllBrowsers: 'Chromium 기반 브라우저(Chrome, Brave, Edge, Vivaldi, Opera 등)에서 작동합니다.', corsError: '✗ CORS 오류: 서버가 확장 프로그램을 거부함', corsInstructions: '설명 보기', sampleSize: '분석할 글자 수', sampleFast: '3000자 (빠름)', sampleBalanced: '6000자 (균형)', samplePrecise: '12000자 (더 정확함)', sampleMaxPrecise: '24000자 (최고 정확도)', geminiApi: 'Gemini API', geminiNoKey: 'Gemini API 키를 입력하세요', geminiLoading: 'API 키 확인 중...', geminiInvalidKey: '✗ 잘못된 API 키 또는 연결 오류' },
  ar: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'الخادم', ok: 'موافق', model: 'النموذج', lang: 'اللغة', nanoInstructions: 'تعليمات', ollamaInstructions: 'تعليمات', noModels: '⚠ لا توجد نماذج', noConn: '✗ الخادم غير متاح', loading: 'جارٍ تحميل Ollama...', ready: v => `✓ ${v} جاهز`, nanoUnavail: 'غير متاح', nanoReady: 'متاح', nanoDownloading: pct => `جارٍ التحميل${pct != null ? ` ${pct}%` : '...'} لا تغلق المتصفح`, nanoDownloadable: 'قابل للتحميل', analLang: 'لغة التحليل', networkTip: 'للخوادم البعيدة، قم بتمكين "كشف Ollama للشبكة" في إعدادات Ollama.', supportsExt: 'ادعم الإضافة 🙂', nanoFlagBtn: 'تفعيل Prompt API for Gemini Nano Multilingual وإعادة تشغيل المتصفح', chromeRecommend: 'يوصى باستخدام متصفح Google Chrome أو أي متصفح قائم على Chromium', ollamaAllBrowsers: 'يعمل على أي متصفح قائم على Chromium: Chrome وBrave وEdge وVivaldi وOpera والمزيد.', corsError: '✗ خطأ CORS: الخادم يرفض الإضافة', corsInstructions: 'عرض التعليمات', sampleSize: 'عدد الأحرف المراد تحليلها', sampleFast: '3000 حرف (سريع)', sampleBalanced: '6000 حرف (متوازن)', samplePrecise: '12000 حرف (أكثر دقة)', sampleMaxPrecise: '24000 حرف (أقصى دقة)', geminiApi: 'واجهة Gemini API', geminiNoKey: 'أدخل مفتاح Gemini API الخاص بك', geminiLoading: 'جارٍ التحقق من مفتاح API...', geminiInvalidKey: '✗ مفتاح API غير صالح أو خطأ في الاتصال' },
  hi: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'सर्वर', ok: 'ठीक', model: 'मॉडल', lang: 'भाषा', nanoInstructions: 'निर्देश', ollamaInstructions: 'निर्देश', noModels: '⚠ कोई मॉडल नहीं', noConn: '✗ सर्वर से कनेक्ट नहीं हो सका', loading: 'Ollama लोड हो रहा है...', ready: v => `✓ ${v} तैयार`, nanoUnavail: 'अनुपलब्ध', nanoReady: 'उपलब्ध', nanoDownloading: pct => `डाउनलोड हो रहा है${pct != null ? ` ${pct}%` : '...'} ब्राउज़र बंद न करें`, nanoDownloadable: 'डाउनलोड योग्य', analLang: 'विश्लेषण भाषा', networkTip: 'दूरस्थ सर्वर के लिए, Ollama सेटिंग्स में "Expose Ollama to network" सक्षम करें।', supportsExt: 'एक्सटेंशन का समर्थन करें 🙂', nanoFlagBtn: 'Prompt API for Gemini Nano Multilingual सक्षम करें और ब्राउज़र पुनः आरंभ करें', chromeRecommend: 'Google Chrome या Chromium-आधारित ब्राउज़र की अनुशंसा की जाती है', ollamaAllBrowsers: 'किसी भी Chromium-आधारित ब्राउज़र पर काम करता है: Chrome, Brave, Edge, Vivaldi, Opera, और अधिक।', corsError: '✗ CORS त्रुटि: सर्वर एक्सटेंशन को अस्वीकार कर रहा है', corsInstructions: 'निर्देश देखें', sampleSize: 'विश्लेषण के लिए अक्षर संख्या', sampleFast: '3000 अक्षर (तेज़)', sampleBalanced: '6000 अक्षर (संतुलित)', samplePrecise: '12000 अक्षर (अधिक सटीक)', sampleMaxPrecise: '24000 अक्षर (अधिकतम सटीकता)', geminiApi: 'Gemini API', geminiNoKey: 'अपनी Gemini API कुंजी दर्ज करें', geminiLoading: 'API कुंजी जांची जा रही है...', geminiInvalidKey: '✗ अमान्य API कुंजी या कनेक्शन त्रुटि' },
  ru: { title: 'YT Level Language Analyzer', nano: 'Gemini Nano', ollama: 'Ollama', server: 'Сервер', ok: 'ОК', model: 'Модель', lang: 'Язык', nanoInstructions: 'Инструкция', ollamaInstructions: 'Инструкция', noModels: '⚠ Нет моделей', noConn: '✗ Сервер недоступен', loading: 'Загрузка Ollama...', ready: v => `✓ ${v} готов`, nanoUnavail: 'Недоступно', nanoReady: 'Доступно', nanoDownloading: pct => `Загрузка${pct != null ? ` ${pct}%` : '...'} не закрывайте браузер`, nanoDownloadable: 'Загружаемый', analLang: 'Язык анализа', networkTip: 'Для удаленных серверов включите "Expose Ollama to network" в настройках Ollama.', supportsExt: 'Поддержите расширение 🙂', nanoFlagBtn: 'Включить Prompt API for Gemini Nano Multilingual и перезапустить браузер', chromeRecommend: 'Рекомендуется браузер Google Chrome или браузер на основе Chromium', ollamaAllBrowsers: 'Работает в любом браузере на основе Chromium: Chrome, Brave, Edge, Vivaldi, Opera и другие.', corsError: '✗ Ошибка CORS: сервер отклоняет расширение', corsInstructions: 'Смотреть инструкцию', sampleSize: 'Количество анализируемых символов', sampleFast: '3000 симв. (быстро)', sampleBalanced: '6000 симв. (сбалансированно)', samplePrecise: '12000 симв. (точнее)', sampleMaxPrecise: '24000 симв. (максимальная точность)', geminiApi: 'Gemini API', geminiNoKey: 'Введите ваш API-ключ Gemini', geminiLoading: 'Проверка API-ключа...', geminiInvalidKey: '✗ Неверный API-ключ или ошибка соединения' },
}

const LANG_NAMES = {
  es: 'Español', en: 'English', fr: 'Français', pt: 'Português', de: 'Deutsch',
  it: 'Italiano', zh: '中文', ja: '日本語', ko: '한국어', ar: 'العربية', hi: 'हिन्दी', ru: 'Русский',
}

const LANG_ORDER = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko', 'ar', 'hi', 'ru']

const NANO_LANG_NAMES = {
  en: { en: 'English', es: 'Spanish', ja: 'Japanese', de: 'German', fr: 'French' },
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

async function fetchGeminiModels(apiKey) {
  const result = await chrome.runtime.sendMessage({ type: 'gemini_get_models', apiKey })
  if (result?.error) throw new Error(result.error)
  return result?.models || []
}

function populateLangCodeSelect(selectId, lang) {
  const select = document.getElementById(selectId)
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

function populateNanoLangSelect(lang) {
  populateLangCodeSelect('nanoLangSelect', lang)
}

function applyLang(lang, els) {
  const tr = LANG[lang] || LANG.es
  els.title.textContent = tr.title
  els.tabNano.textContent = tr.nano
  els.tabOllama.textContent = tr.ollama
  if (els.tabGeminiApi) els.tabGeminiApi.textContent = tr.geminiApi
  els.serverLabel.textContent = tr.server
  els.saveBtn.textContent = tr.ok
  els.modelLabel.textContent = tr.model
  els.langLabel.textContent = tr.lang
  if (els.nanoInstructionsBtn) els.nanoInstructionsBtn.textContent = tr.nanoInstructions
  els.instructionsBtn.textContent = tr.ollamaInstructions
  if (els.geminiApiInstructionsBtn) els.geminiApiInstructionsBtn.textContent = tr.ollamaInstructions
  if (els.saveGeminiKeyBtn) els.saveGeminiKeyBtn.textContent = tr.ok
  if (els.geminiModelLabel) els.geminiModelLabel.textContent = tr.model
  if (els.nanoStatus) {
    const state = els.nanoStatus.dataset.state || 'unavailable'
    if (state === 'available') els.nanoStatus.textContent = tr.nanoReady
    else if (state === 'downloading') els.nanoStatus.textContent = tr.nanoDownloading(nanoDownloadPct)
    else if (state === 'downloadable') els.nanoStatus.textContent = tr.nanoDownloadable
    else els.nanoStatus.textContent = tr.nanoUnavail
  }
  if (els.nanoFlagBtn) els.nanoFlagBtn.textContent = tr.nanoFlagBtn
  if (els.analLangLabel) els.analLangLabel.textContent = tr.analLang
  if (els.networkTip) els.networkTip.textContent = tr.networkTip
  if (els.kofiBtn) els.kofiBtn.textContent = tr.supportsExt
  if (els.chromeRecommendText) els.chromeRecommendText.textContent = tr.chromeRecommend
  if (els.ollamaAllBrowsersText) els.ollamaAllBrowsersText.textContent = tr.ollamaAllBrowsers
  if (els.sampleCharsLabel) els.sampleCharsLabel.textContent = tr.sampleSize
  if (els.sampleCharsSelect) {
    const opts = els.sampleCharsSelect.options
    if (opts[0]) opts[0].textContent = tr.sampleFast
    if (opts[1]) opts[1].textContent = tr.sampleBalanced
    if (opts[2]) opts[2].textContent = tr.samplePrecise
    if (opts[3]) opts[3].textContent = tr.sampleMaxPrecise
  }
  populateNanoLangSelect(lang)
}

let nanoPollTimer = null
let nanoDownloadPct = null
let nanoDownloadTriggered = false

function stopNanoPoll() {
  if (nanoPollTimer) clearTimeout(nanoPollTimer)
  nanoPollTimer = null
}

// availability() only reports state, it never starts the actual download.
// Without an explicit create() call, Chrome leaves the model stuck at
// 'downloadable' forever for a fresh user. We trigger it once here so the
// download actually begins, and use its monitor to show real progress
// instead of a static "downloading" message with no way to tell if it's stuck.
function triggerNanoDownload(nanoStatusEl, tr) {
  if (nanoDownloadTriggered) return
  nanoDownloadTriggered = true
  LanguageModel.create({
    expectedOutputs: [{ type: 'text', languages: ['en'] }],
    monitor(m) {
      m.addEventListener('downloadprogress', e => {
        nanoDownloadPct = Math.round(e.loaded * 100)
        if (nanoStatusEl.dataset.state !== 'available') {
          nanoStatusEl.textContent = tr.nanoDownloading(nanoDownloadPct)
        }
      })
    }
  }).then(session => {
    session.destroy()
  }).catch(() => {}).finally(() => {
    nanoDownloadTriggered = false
  })
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
    const state = typeof LanguageModel !== 'undefined' ? await LanguageModel.availability({
      expectedOutputs: [{ type: 'text', languages: ['en'] }]
    }) : 'unavailable'
    if (state === 'available') {
      nanoStatusEl.className = 'nano-status'
      nanoStatusEl.dataset.state = 'available'
      nanoStatusEl.textContent = tr.nanoReady
      if (nanoFlagHelp) nanoFlagHelp.style.display = 'none'
    } else if (state === 'downloading') {
      nanoStatusEl.className = 'nano-status downloading'
      nanoStatusEl.dataset.state = 'downloading'
      nanoStatusEl.textContent = tr.nanoDownloading(nanoDownloadPct)
      if (nanoFlagHelp) nanoFlagHelp.style.display = 'none'
      triggerNanoDownload(nanoStatusEl, tr)
      nanoPollTimer = setTimeout(checkNanoStatus, 1500)
    } else if (state === 'downloadable') {
      nanoStatusEl.className = 'nano-status downloading'
      nanoStatusEl.dataset.state = 'downloadable'
      nanoStatusEl.textContent = tr.nanoDownloadable
      if (nanoFlagHelp) nanoFlagHelp.style.display = 'none'
      triggerNanoDownload(nanoStatusEl, tr)
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
  const tabGeminiApi = document.getElementById('tabGeminiApi')
  const geminiSection = document.getElementById('geminiSection')
  const ollamaSection = document.getElementById('ollamaSection')
  const geminiApiSection = document.getElementById('geminiApiSection')

  const geminiApiStatus = document.getElementById('geminiApiStatus')
  const geminiKeyInput = document.getElementById('geminiKeyInput')
  const saveGeminiKeyBtn = document.getElementById('saveGeminiKeyBtn')
  const resetGeminiKeyBtn = document.getElementById('resetGeminiKeyBtn')
  const geminiModelRow = document.getElementById('geminiModelRow')
  const geminiModelSelect = document.getElementById('geminiModelSelect')
  const geminiApiInstructionsBtn = document.getElementById('geminiApiInstructionsBtn')

  const nanoLangSelect = document.getElementById('nanoLangSelect')

  const els = {
    title: document.querySelector('h2'),
    tabNano,
    tabOllama,
    tabGeminiApi,
    serverLabel: document.querySelector('#serverRow label'),
    saveBtn: saveServerBtn,
    modelLabel: document.querySelector('#modelRow label'),
    langLabel: document.querySelector('#langRow label'),
    instructionsBtn: document.getElementById('instructionsBtn'),
    geminiApiInstructionsBtn,
    saveGeminiKeyBtn,
    geminiModelLabel: document.querySelector('#geminiModelRow label'),
    nanoStatus: document.getElementById('nanoStatus'),
    analLangLabel: document.getElementById('analLangLabel'),
    nanoInstructionsBtn: document.getElementById('nanoInstructionsBtn'),
    networkTip: document.getElementById('networkTip'),
    nanoFlagBtn: document.getElementById('nanoFlagBtn'),
    chromeRecommendText: document.getElementById('chromeRecommendText'),
    ollamaAllBrowsersText: document.getElementById('ollamaAllBrowsersText'),
    sampleCharsLabel: document.getElementById('sampleCharsLabel'),
    sampleCharsSelect: document.getElementById('sampleCharsSelect'),
    kofiBtn: null,
  }

  async function switchTab(tab) {
    tabNano.classList.toggle('active', tab === 'nano')
    tabOllama.classList.toggle('active', tab === 'ollama')
    tabGeminiApi.classList.toggle('active', tab === 'gemini')
    geminiSection.classList.toggle('active', tab === 'nano')
    ollamaSection.classList.toggle('active', tab === 'ollama')
    geminiApiSection.classList.toggle('active', tab === 'gemini')
    const engine = tab
    const { aiEngine: currentEngine } = await chrome.storage.local.get('aiEngine')
    await chrome.storage.local.set({ aiEngine: engine })
    if (currentEngine !== engine) await sendToContent({ type: 'set_engine', engine })
    if (tab === 'nano') checkNanoStatus()
    else stopNanoPoll()
  }

  tabNano.addEventListener('click', () => switchTab('nano'))
  tabOllama.addEventListener('click', () => switchTab('ollama'))
  tabGeminiApi.addEventListener('click', () => switchTab('gemini'))

  const { ollamaServer, lang, nanoLang, aiEngine, sampleChars, geminiApiKey } = await chrome.storage.local.get(['ollamaServer', 'lang', 'nanoLang', 'aiEngine', 'sampleChars', 'geminiApiKey'])
  serverInput.value = ollamaServer || OLLAMA_DEFAULT
  geminiKeyInput.value = geminiApiKey || ''

  if (langSelect) {
    LANG_ORDER.forEach(code => {
      const opt = document.createElement('option')
      opt.value = code
      opt.textContent = LANG_NAMES[code]
      langSelect.appendChild(opt)
    })
    langSelect.value = lang || 'en'
  }

  const sampleCharsSelect = document.getElementById('sampleCharsSelect')
  if (sampleCharsSelect) {
    sampleCharsSelect.value = String([3000, 6000, 12000, 24000].includes(sampleChars) ? sampleChars : 6000)
    sampleCharsSelect.addEventListener('change', async () => {
      const chars = Number(sampleCharsSelect.value)
      const { sampleChars: current } = await chrome.storage.local.get('sampleChars')
      if (current === chars) return
      await sendToContent({ type: 'set_sample_chars', chars })
    })
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

  switchTab(aiEngine === 'ollama' ? 'ollama' : aiEngine === 'gemini' ? 'gemini' : 'nano')

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

  geminiApiInstructionsBtn.addEventListener('click', e => {
    e.preventDefault()
    chrome.tabs.create({ url: PAGES_URL })
  })

  langSelect.addEventListener('change', async () => {
    const l = langSelect.value
    await chrome.storage.local.set({ lang: l })
    applyLang(l, els)
    await sendToContent({ type: 'set_lang', lang: l })
    await refreshAll()
    await refreshGeminiAll()
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

  async function refreshGeminiAll(apiKey) {
    const key = apiKey ?? geminiKeyInput.value.trim()
    const tr = LANG[langSelect.value] || LANG.es
    if (!key) {
      geminiModelRow.style.display = 'none'
      setStatus(geminiApiStatus, 'warn', tr.geminiNoKey)
      return
    }
    setStatus(geminiApiStatus, 'loading', tr.geminiLoading, true)
    saveGeminiKeyBtn.disabled = true
    resetGeminiKeyBtn.disabled = true
    try {
      const models = await fetchGeminiModels(key)
      if (!models || models.length === 0) {
        geminiModelRow.style.display = 'none'
        setStatus(geminiApiStatus, 'warn', tr.noModels)
        return
      }
      geminiModelRow.style.display = 'flex'
      geminiModelSelect.innerHTML = ''
      models.forEach(m => {
        const opt = document.createElement('option')
        opt.value = m
        opt.textContent = m
        geminiModelSelect.appendChild(opt)
      })
      const { geminiModel: saved } = await chrome.storage.local.get('geminiModel')
      const selected = saved && models.includes(saved) ? saved : (models.find(m => m.includes('flash')) || models[0])
      geminiModelSelect.value = selected
      if (selected !== saved) {
        await chrome.storage.local.set({ geminiModel: selected })
        await sendToContent({ type: 'set_gemini_model', model: selected })
      }
      setStatus(geminiApiStatus, 'ok', tr.ready(selected))
    } catch (e) {
      console.error('[YT-Level] Gemini fetch failed:', e)
      geminiModelRow.style.display = 'none'
      setStatus(geminiApiStatus, 'off', tr.geminiInvalidKey)
    } finally {
      saveGeminiKeyBtn.disabled = false
      resetGeminiKeyBtn.disabled = false
    }
  }

  async function applyGeminiKey(key) {
    geminiKeyInput.value = key
    const { geminiApiKey: currentKey } = await chrome.storage.local.get('geminiApiKey')
    await chrome.storage.local.set({ geminiApiKey: key })
    if (currentKey !== key) await sendToContent({ type: 'set_gemini_key', key })
    await refreshGeminiAll(key)
  }

  saveGeminiKeyBtn.addEventListener('click', async () => {
    await applyGeminiKey(geminiKeyInput.value.trim())
  })

  resetGeminiKeyBtn.addEventListener('click', async () => {
    await applyGeminiKey('')
  })

  geminiModelSelect.addEventListener('change', async () => {
    const model = geminiModelSelect.value
    await chrome.storage.local.set({ geminiModel: model })
    await sendToContent({ type: 'set_gemini_model', model })
  })

  refreshAll()
  refreshGeminiAll()
})


