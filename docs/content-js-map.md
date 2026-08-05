# Mapa de content.js

`content.js` tiene ~1800 líneas pero mezcla responsabilidades bastante
separables. Cada sección de abajo es candidata a ser su propio archivo
(ver la nota sobre `content_scripts` con múltiples archivos en
[architecture.md](./architecture.md)). Las líneas son aproximadas a la
versión de esta revisión — si el archivo cambió, buscá por el nombre de
función, no confíes ciegamente en el número.

---

## 1. Configuración / storage (líneas 33–410 aprox., intercaladas)

Wrappers finitos sobre `chrome.storage.local`. No tienen lógica compleja,
son en su mayoría get/set de un valor.

- `setLang`, `clearCachedVideoStorage`
- `getModels`, `setModel`, `getModel`, `setServer` (Ollama)
- `getEngine`, `setEngine` (qué motor está activo: nano/ollama/gemini)
- `setNanoLang`
- `getGeminiKey`, `setGeminiKey`, `getGeminiModels`, `getGeminiModel`,
  `setGeminiModel`
- `switchToNextGeminiModel(currentModel)` — lógica de "probá el siguiente
  modelo de la lista si este dio rate limit". Guarda en memoria (no en
  storage) qué modelos ya se probaron, vía `rateLimitedGeminiModels`.
- `getSampleChars`, `setSampleChars` — cuántos caracteres de la
  transcripción se mandan al modelo (3000/6000/12000/24000).

**Candidato a archivo:** `settings.js` o `storage.js`

---

## 2. Traducciones de la UI (líneas 11–33)

- `CONTENT_LANG` — objeto gigante con los strings de la extensión en 12
  idiomas (es, en, fr, pt, de, it, zh, ja, ko, ar, hi, ru).
- `T()` — devuelve el diccionario del idioma activo.

Esto es la mayor parte del "peso visual" de las primeras 30 líneas del
archivo, pero es solo texto, no lógica.

**Candidato a archivo:** `translations.js` (podría compartirse con la parte
de `popup.js` que tiene su propio `LANG`, hoy duplicado)

---

## 3. Prompts y parseo de CEFR (líneas 88–221)

- `CEFR_LEVELS` — `['A1'..'C2']`
- `parseCefrJsonResponse(response)` — busca `{...}` en la respuesta del
  modelo y valida que `level` sea uno de los 6 niveles o `'UNDETERMINED'`.
  **Punto de atención:** `'UNDETERMINED'` es una respuesta válida y final
  (no hay suficiente texto para evaluar), no un error — ver
  [known-issues.md](./known-issues.md#1-ciclo-de-15-modelos-de-gemini).
- `DEEP_PROMPT(text)` — el prompt completo para Gemini Nano/API.
- `OLLAMA_DEEP_PROMPT(text)` — variante para Ollama (multi-idioma en vez de
  solo inglés).

**Candidato a archivo:** `cefr-prompts.js`

---

## 4. Heurística de respaldo sin IA (líneas 222–309)

- `GRAMMAR_PATTERNS`, `scoreGrammar`, `scoreSentenceLength`, `scoreTTR`,
  `scoreLongWords`, `analyzeHeuristic(text)`

Un scorer de CEFR basado en reglas (densidad de errores de gramática,
longitud de oración, type-token ratio, palabras largas), sin usar ningún
modelo de IA. **Vale la pena confirmar si esto se sigue usando en algún
flujo real** o si quedó de una versión anterior — no encontré un caller
directo en el resto del archivo al armar este mapa. Si es código muerto, es
la limpieza más fácil de todo el archivo.

---

## 5. Los 3 motores de análisis (líneas 412–627)

- `primeNanoDownload()`, `analyzeWithNano(text, token)`
- Clases de error: `AbortedAnalysisError`, `TranscriptRateLimitedError`,
  `AIRateLimitedError`, `OllamaModelTooSmallError`
- `looksLikeSchemaEcho(raw)` — detecta cuando un modelo Ollama muy chico
  devuelve el placeholder del formato en vez de una respuesta real
- `analyzeWithOllama(text, model, token)`
- `analyzeWithGemini(text, model, token)`
- `sampleTranscript(text, maxChars)` — recorta la transcripción (inicio +
  medio + final) si excede el tamaño configurado
- `analyzeLevel(text, token)` — el dispatcher: mira `getEngine()` y llama al
  motor correspondiente, normaliza sus distintos formatos de retorno.

**Candidato a archivo:** `ai-engines.js`

---

## 6. Obtención de la transcripción (líneas 628–823)

- `readTranscriptSegmentsFromDOM()`, `simulateClick`,
  `findShowTranscriptButton`, `findVisibleChipByLabel`,
  `retryViaTranscriptChip`, `extractTranscriptFromDOM()` — todo esto es
  scraping del panel de "Show transcript" que YouTube muestra en la propia
  página, cuando el video está abierto y ese panel está disponible. Es la
  fuente más rápida y confiable pero solo funciona si el video ya está
  cargado en el reproductor.
- `waitForPlayerReady(videoId, maxMs)` — espera a que el reproductor termine
  de cargar el video correcto antes de intentar el scraping.
- `fetchTranscript(videoId)` — el fallback: le pide a `background.js` que
  use las 3 fuentes externas (InnerTube → youtube-transcript.ai → kome.ai).

**Candidato a archivo:** `transcript-fetch.js` (ojo: no confundir con
`transcript-sources.js`, que vive en el background — este archivo sería
la parte de scraping DOM + el mensaje al background)

---

## 7. Posicionamiento de overlays sobre el DOM de YouTube (líneas 824–945)

YouTube no da ganchos estables para "poné esto encima de este video": hay
que calcular posiciones a mano y volver a calcularlas cuando la página
scrollea o se re-renderiza (YouTube reemplaza nodos del DOM todo el tiempo).

- `getVideoId(element)`, `getBadgeAnchor(element)`, `getOverlayHost(element)`
- `getStickyOverlayBottom()`, `getSearchSuggestionsRect()`,
  `rectsIntersect(a, b)` — evitan que el badge quede tapado por elementos
  sticky de YouTube (como la barra de sugerencias de búsqueda)
- `syncOverlayHost(element)`, `removeOverlayHost(element)`,
  `scheduleOverlayReposition()`, `watchAnchorResize(element)`

**Candidato a archivo:** `overlay-positioning.js`. Es la parte más "frágil"
del código — la más probable de romperse cuando YouTube cambie su HTML.

---

## 8. Piezas de UI reutilizables: badges, toasts, spinners (líneas 946–1247)

- `injectBadge`, `injectNoDataBadge`, `injectSwitchBadge` — el círculo de
  color con el nivel CEFR
- `getToastContainer`, `showToast` — notificaciones flotantes
- `renderSpinner`, `injectSpinner`, `removeSpinner` — el ícono de "en cola" /
  "procesando"
- `injectPriorityButton`, `removePriorityButton` — el botón "Obtener nivel
  del lenguaje" que aparece cuando no hay motor configurado o hubo rate
  limit

**Candidato a archivo:** `ui-widgets.js`

---

## 9. Cola de análisis de la barra lateral / feed (líneas 1252–1524)

El corazón de "analizar automáticamente los videos que aparecen en
pantalla":

- `stopWatchingAnchor`, `reconcileOverlay(element)`, `watchAnchor(element)`
- `processVideoElement(element)` — la función más larga del archivo
  (~100 líneas): orquesta scraping → análisis → UI para UN elemento
- `MAX_CONCURRENT_ANALYSIS = 2`, `requeueElement`, `presentVideoElement`,
  `pumpAnalysisQueue()` — el scheduler con límite de concurrencia
- `cancelActiveElement`, `stopVideoElement`, `prioritizeVideoElement` — el
  botón manual "analizar ya" salta la cola
- `scanFeed()` — encuentra thumbnails nuevos en el DOM usando
  `CARD_SELECTORS`
- `sweepDisconnectedActive()` — limpieza de elementos que salieron del DOM
  mientras se analizaban

**Candidato a archivo:** `sidebar-queue.js`

---

## 10. Análisis del video abierto (watch page) (líneas 1525–1752)

Es el mismo patrón que la sección 9, pero para el reproductor principal en
vez de un thumbnail. Duplica bastante lógica de UI (badges, spinners,
botones) con formas ligeramente distintas — otro candidato a unificar si se
hace la refactorización.

- `getWatchVideoId()`, `clearWatchOverlay(player)`
- `buildWatchRow`, `buildWatchIdleButton`, `buildWatchSpinner`,
  `buildWatchSwitchAlert`, `buildWatchBadge`
- `startWatchAnalysis(videoId, player)` — el flujo completo para el video
  actual. **Acá vivía el bug del spinner trabado** (ver
  [known-issues.md](./known-issues.md#2-spinner-trabado-en-processing)).
- `processWatchPage()` — decide si hay que arrancar `startWatchAnalysis`

**Candidato a archivo:** `watch-page.js`

---

## 11. Bootstrap / observadores globales (líneas 1753 en adelante)

El punto de entrada real del content script:

- `runScans()` — llama a `scanFeed()` y `processWatchPage()`
- `scheduleScan()` — debounce de 400ms
- `MutationObserver` sobre `document.body` — YouTube es una SPA, el DOM
  cambia constantemente sin recargar la página
- Listeners de `scroll`, `scrollend`, `yt-navigate-finish` (evento propio de
  YouTube al navegar entre videos sin recarga completa), `pagehide`

En `yt-navigate-finish` y `pagehide` se manda `abort_all_requests` al
background para cortar análisis en curso que ya no tienen sentido (el video
cambió).

**Candidato a archivo:** queda en `content.js` como punto de entrada — es el
único que tiene sentido que siga siendo "el archivo principal" después de
partir el resto.

---

## Orden sugerido si decidís partirlo

1. Empezá por lo que es puro dato sin lógica: **traducciones (2)** y
   **prompts (3)**. Cero riesgo de romper algo, achican el archivo de
   entrada rápido.
2. Confirmá si la **heurística sin IA (4)** se usa. Si no, se borra.
3. **Overlay positioning (7)** y **UI widgets (8)** son las más
   autocontenidas — no dependen de la lógica de negocio, solo de refs al DOM.
4. **Motores de análisis (5)** y **transcripción (6)** son el núcleo de
   negocio — más delicadas, andá con tests manuales a mano después de cada
   corte.
5. **Sidebar queue (9)** y **watch page (10)** al final: son las que más se
   tocaron hoy (los dos bugs corregidos estaban acá) y las que más se
   beneficiarían de compartir código entre sí antes de separarlas del todo.
