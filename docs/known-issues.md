# Bugs encontrados y corregidos (referencia rápida)

Registro de los bugs reales encontrados durante las pruebas de la v1.4.5, con
la causa raíz. Sirve para no volver a introducir el mismo patrón al tocar
código cercano, y como ejemplo de qué tipo de bug se esconde en este archivo.

## 1. Ciclo de 15 modelos de Gemini

**Síntoma:** al abrir un video con transcripción corta o sin habla real
(música, silencios), la consola mostraba `Gemini model X rate limited,
switched to Y` repetido para los ~15 modelos disponibles, uno atrás del
otro, en segundos. Consumía cuota de la API key del usuario sin necesidad.

**Causa raíz:** el prompt (`DEEP_PROMPT`, sección 3 del
[mapa de content.js](./content-js-map.md)) le pide al modelo devolver
`"level": "UNDETERMINED"` cuando no hay ~40 palabras usables de habla — una
respuesta válida y final. Pero `parseCefrJsonResponse()` solo reconocía los
6 niveles CEFR reales; `'UNDETERMINED'` caía al mismo `null` que una
respuesta rota. `analyzeWithGemini()` trataba cualquier `null` como fallo
del modelo y probaba el siguiente — agotando la lista entera en cada video
corto.

**Fix:** `parseCefrJsonResponse` ahora devuelve el string `'UNDETERMINED'`
en vez de `null` cuando el modelo lo dice explícitamente, y cada motor
decide qué hacer con eso:
- `analyzeWithGemini`: lo trata como resultado final (no reintenta con otro
  modelo — el problema es el video, no el modelo).
- `analyzeWithNano` / `analyzeWithOllama`: lo normalizan a `null` para no
  cambiar el comportamiento que ya tenían (nunca reintentaban con "otro
  modelo" para empezar, así que no hacía falta la distinción ahí).

Commit: `2a7874a`.

## 2. Spinner trabado en "processing"

**Síntoma:** en la página del video (no en la barra lateral), a veces el
badge de "Analizando ahora" se quedaba pegado en pantalla para siempre, sin
pasar nunca a mostrar el nivel ni el botón de reintentar.

**Causa raíz:** en `startWatchAnalysis()` (sección 10 del mapa), el
`catch` tiene una rama para cada tipo de error, y todas limpian el overlay
(`clearWatchOverlay(player)`) excepto la de `AbortedAnalysisError`, que solo
hacía `console.log`. Si el abort pasaba mientras seguía siendo el mismo
video en pantalla (por ejemplo, el service worker reinicia una petición en
vuelo), el spinner agregado al principio de la función nunca se sacaba.

**Fix:** la rama de `AbortedAnalysisError` ahora también hace
`clearWatchOverlay(player)` + `player.appendChild(buildWatchIdleButton(...))`,
igual que las demás. Commit: `9c2bb3c`.

## 3. `youtubei/v1/player` devuelve 403 en la extensión (no es un bug del código, es una restricción de YouTube)

**Síntoma:** la nueva fuente de transcripción InnerTube (`transcript-sources.js`)
funcionaba perfecto probada con Node (`test-transcript.js`), pero en la
extensión real caía siempre al fallback (`youtube-transcript.ai`).

**Causa raíz:** YouTube rechaza con 403 las peticiones a ese endpoint cuyo
header `Origin` no sea `https://www.youtube.com`. Node no manda `Origin` en
absoluto, por eso ahí pasaba. Un `fetch()` desde la extensión sí manda
`Origin: chrome-extension://<id>`, y ese header es "forbidden" — JS no puede
sobreescribirlo directamente con `fetch()`.

**Fix:** no es un fix de lógica, es una regla de red. `background.js`
registra una regla de `chrome.declarativeNetRequest` (permiso
`declarativeNetRequestWithHostAccess`) que reescribe `Origin` y `Referer` a
`https://www.youtube.com` / `https://www.youtube.com/` solo para peticiones
a `youtubei/v1/player`, antes de que salgan a la red.

**Por qué importa para el resto del código:** si en algún momento se agrega
otra llamada a un endpoint de YouTube que no sea el `watch` page normal o
`api/timedtext`, probablemente haga falta la misma regla. Buscá
`INNERTUBE_HEADER_RULE_ID` en `background.js` como referencia.
