# Arquitectura general

## Los 4 archivos de la extensión

```
manifest.json
├── background.js  (service worker, Chrome) ──┐
│   └── importScripts('transcript-sources.js') │  ambos cargan
├── transcript-sources.js  (fuentes de transcripción, sin chrome.*)
├── content.js  (content script, inyectado en youtube.com)
└── popup.js  (popup.html, la ventana de configuración)
```

- **`background.js`** es el service worker (Chrome) / background script
  (Firefox). Es el único que puede hacer `fetch` a hosts externos sin las
  restricciones de CORS que tendría `content.js` corriendo dentro de la
  página de YouTube, y el único que tiene los `host_permissions`. Recibe
  mensajes de `content.js`/`popup.js` vía `chrome.runtime.onMessage` y hace
  el trabajo pesado: llamar a Ollama, Gemini, y (desde v1.4.5) las tres
  fuentes de transcripción.

- **`transcript-sources.js`** es un módulo aparte, sin ninguna llamada a
  `chrome.*`, a propósito: así puede probarse con Node directamente
  (`test-transcript.js`) sin tener que cargar la extensión entera. Se carga
  dentro del service worker vía `importScripts` en Chrome, o como script
  separado listado antes de `background.js` en `manifest.json` para Firefox
  (ver el comentario al inicio de `background.js`).

- **`content.js`** es el que se inyecta en cada pestaña de `youtube.com`. Hace
  tres cosas bien distintas mezcladas en un solo archivo (ver
  [content-js-map.md](./content-js-map.md)):
  1. Scrapea/pide transcripciones.
  2. Le manda la transcripción al `background.js` para que la analice con IA.
  3. Dibuja la UI (badges, spinners, botones) encima de los thumbnails de
     YouTube y del reproductor.

- **`popup.js`** es la configuración: elegir motor (Nano/Ollama/Gemini),
  guardar la API key, elegir servidor Ollama, idioma de la extensión, etc.
  Lee/escribe todo en `chrome.storage.local`.

## Flujo de un análisis (caso típico: video en la barra lateral)

```
content.js                          background.js              transcript-sources.js
─────────────────────────────────────────────────────────────────────────────────────
scanFeed() detecta un thumbnail
nuevo → processVideoElement()
   │
   ├─ intenta extractTranscriptFromDOM()
   │  (scrapea el panel de transcript
   │  de YouTube si está disponible)
   │
   └─ si falla, sendMessage
      { type: 'fetch_transcript' } ──────▶ fetchTranscript(videoId)
                                                  │
                                                  ├─ fetchFromYoutubeInnertubeApi()  (1º)
                                                  ├─ fetchFromPrimaryTranscriptApi()  (2º, youtube-transcript.ai)
                                                  └─ fetchFromFallbackTranscriptApi() (3º, kome.ai)
                                            ◀───── { transcript, rateLimited, source }
   │
   analyzeLevel(transcript)
   sendMessage
   { type: 'gemini_generate' | 'ollama_generate' } ──▶ generateGemini() / generate()
                                            ◀───── { response } o { error }
   │
   parseCefrJsonResponse(response) → nivel CEFR
   injectBadge() / injectPriorityButton() / showToast()
```

El mismo patrón se repite, con más UI, para el video que está abierto en el
reproductor (`startWatchAnalysis` en vez de `processVideoElement`).

## Por qué hay dos "colas" separadas

- **Barra lateral / feed**: `pendingElements` + `MAX_CONCURRENT_ANALYSIS = 2`
  (línea ~1412 de `content.js`). Analiza automáticamente los thumbnails
  visibles, de a 2 en paralelo como máximo.
- **Página de video abierto** (`startWatchAnalysis`): un solo video a la vez,
  disparado por `processWatchPage()`.

Ambas colas comparten el mismo `videoResultCache` (para no analizar dos veces
el mismo video) y el mismo `videoInFlight` (para no lanzar el mismo análisis
dos veces en paralelo).

## Los 3 motores de análisis

| Motor | Dónde corre | Notas |
|---|---|---|
| **Gemini Nano** | En el navegador, local (`LanguageModel` API) | No usa `background.js` para generar, solo para nada — corre directo en `content.js`. Requiere que el navegador lo tenga disponible/descargado. |
| **Ollama** | Servidor local/remoto del usuario | Vía `background.js` → `POST {server}/api/generate`. |
| **Gemini API** | Google, con API key del usuario | Vía `background.js` → InnerTube-style REST call a `generativelanguage.googleapis.com`. Si un modelo da rate limit, `switchToNextGeminiModel()` prueba el siguiente de la lista automáticamente. |

Los tres devuelven texto libre que después `parseCefrJsonResponse()` intenta
parsear buscando el bloque JSON `{ "level": "..." }` dentro de la respuesta
(los modelos a veces razonan en texto plano antes de dar el JSON final — eso
es intencional, no un error).
