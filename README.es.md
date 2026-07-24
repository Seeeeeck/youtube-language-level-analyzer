<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analizador de Nivel de YouTube</strong></p>
  <p>Analiza el nivel MCER (A1–C2) de cualquier video de YouTube usando IA local — sin API keys, sin conexión a internet.</p>
  <p>Elige entre tres motores de IA: <strong>Gemini API</strong> (nube, nivel gratuito), <strong>Gemini Nano</strong> (integrado en Chrome) u <strong>Ollama</strong> (servidor local). Funciona para <strong>cualquier idioma</strong>.</p>
</div>

---

**🌐 Idioma**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Instalación

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Disponible en Chrome Web Store</a>
</div>

> Una vez instalada, la extensión funciona automáticamente en YouTube. Haz clic en el ícono de la extensión para configurarla.

---

## Capturas

<p align="center">
  <img src="screenshots/levels_design.svg" alt="Badges de nivel CEFR (A1-C2) sobre miniaturas de YouTube" width="700">
  <br>
  <em>Badges de nivel CEFR (A1-C2) sobre miniaturas de YouTube</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="Popup de la extensión — pestaña Gemini Nano" width="500">
  <br>
  <em>Popup de la extensión — pestaña Gemini Nano</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="Popup de la extensión — pestaña Ollama" width="500">
  <br>
  <em>Popup de la extensión — pestaña Ollama</em>
</p>

---

## Características

- 🏷️ **Badges CEFR** — Círculos de color (A1-C2) en las miniaturas de YouTube
- 🤖 **Tres motores de IA** — Usa Gemini API (nube), Gemini Nano (IA integrada en Chrome) u Ollama (modelos locales)
- 🌍 **Multi-idioma** — Analiza videos en cualquier idioma
- 🔒 **100% privado** — Todo corre localmente, ningún dato sale de tu máquina
- 🎛️ **Servidor personalizado** — Apunta a cualquier instancia de Ollama en tu red
- ⚡ **Caché rápida** — Los resultados se guardan localmente para evitar re-análisis
- 📏 **Tamaño de muestra ajustable** — Elige cuántos caracteres de la transcripción analizar (3000/6000/12000) para balancear velocidad y precisión

---

## Requisitos

- **Chrome 128+**, **Brave** o cualquier navegador basado en Chromium
- **Gemini API**: Clave de API gratuita desde [Google AI Studio](https://aistudio.google.com/apikey)
- **Gemini Nano**: Chrome 128+ con Prompt API habilitado
- **Ollama**: Ollama instalado y ejecutándose ([ollama.com](https://ollama.com)) con al menos un modelo descargado

---

## Gemini API

Gemini API usa los modelos de IA en la nube de Google con una clave de API gratuita de Google AI Studio. Funciona en cualquier navegador basado en Chromium y no requiere descargar ningún modelo.

> A diferencia de Gemini Nano y Ollama, Gemini API envía la transcripción a los servidores de Google para su procesamiento.

### 1. Obtén tu clave de API

1. Ve a **Google AI Studio**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Create API key"**
4. Copia la clave generada (empieza con `AIza...`)

> Gemini API tiene un nivel gratuito con límites de uso generosos — no necesitas tarjeta de crédito para empezar.

### 2. Configurar en la extensión

1. Haz clic en el icono de la extensión
2. Selecciona la pestaña **API Gemini**
3. Pega tu clave de API en el campo
4. Haz clic en **OK** para guardar y probar la clave
5. Selecciona un modelo del menú desplegable

---

## Gemini Nano

Gemini Nano es el modelo de IA integrado en Chrome. Necesitas descargar el modelo de IA primero.

> Se recomienda Chrome para Gemini Nano. Puede no funcionar en otros navegadores.

> ¿No te funciona en tu navegador? Usa la opción de Ollama de abajo — funciona en cualquier navegador basado en Chromium.

> Se descargará un modelo de Gemini Nano. No cierres el navegador hasta que esté listo.

### 1. Activar la IA de Nano

1. Ingresa esto en la barra de direcciones: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Establece el flag en **"Enabled Multilanguage"**
3. Aprieta **"Relaunch"** o reinicia el navegador

> Si el modelo no comienza a descargar, activa también (recomendado): **`chrome://flags/#optimization-guide-on-device-model`** y selecciona **"Enabled BypassPerfRequirement"**

### 2. Verificar el estado del modelo

Abre el popup de YT Level y selecciona la pestaña **Gemini Nano**:

| Estado | Significado |
|--------|---------|
| **Available** | Listo para usar |
| **Downloading** | El modelo se está descargando |
| **Downloadable** | Necesita descargarse primero |
| **Unavailable** | No compatible con tu navegador o modelo no descargado |

### 3. Elegir el idioma de análisis

Selecciona el idioma del video que quieres analizar:

| Código | Idioma |
|------|----------|
| en | Inglés |
| es | Español |
| ja | Japonés |
| de | Alemán |
| fr | Francés |

> Gemini Nano soporta análisis multilingüe. Selecciona el idioma que coincida con el contenido del video.

---

## Ollama

> Funciona en cualquier navegador basado en Chromium: Chrome, Brave, Edge, Vivaldi, Opera, y más.

### 1. Instalar Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

Descarga el instalador desde [ollama.com/download](https://ollama.com/download) y ejecútalo.

### 2. Descargar un modelo

Ejecuta esto en una terminal (Linux/macOS) o PowerShell/CMD (Windows):

```bash
ollama pull gemma3:1b
```

> Puedes usar cualquier modelo de la [biblioteca de modelos de Ollama](https://ollama.com/library) — selecciónalo desde la pestaña Ollama en el popup de la extensión. Se recomienda un modelo liviano/pequeño (como `gemma3:1b`) para respuestas más rápidas.

### 3. Configurar CORS

La extensión necesita comunicarse con Ollama desde YouTube.

#### Linux — Systemd (permanente)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Temporal

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Permanente

1. Abre **Propiedades del sistema** -> **Variables de entorno**
2. Agrega una nueva **Variable del sistema**: `OLLAMA_ORIGINS` = `*`
3. Haz clic en **Aceptar** y reinicia Ollama

#### Windows — Temporal (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Si quieres usar Ollama desde otra PC en tu red, abre la Configuracion de Ollama y activa "Exponer Ollama a la red". Esto permite conexiones desde otros dispositivos en tu red local.

### 4. Configurar en la extensión

1. Haz clic en el icono de la extensión
2. Selecciona la pestaña **Ollama**
3. Establece la URL de tu servidor (predeterminado: `http://localhost:11434`)
4. Haz clic en **OK** para probar la conexión
5. Selecciona un modelo del menú desplegable

---

## Usar la Extensión

1. Ve a **https://www.youtube.com**
2. Los videos con transcripción mostrarán un spinner verde mientras se analizan
3. Aparece un círculo de color con el nivel: **A1**, **A2**, **B1**, **B2**, **C1** o **C2**
4. Pasa el mouse sobre el badge para ver qué motor y modelo se usó
5. Haz clic en el icono de la extensión para abrir el popup y cambiar entre motores

---

## Cómo Funciona

1. Extrae el ID de cada video del feed de YouTube
2. Obtiene la transcripción del video
3. Envía la transcripción al motor de IA seleccionado (Gemini API, Gemini Nano u Ollama) para clasificación CEFR
4. Muestra el resultado como badge circular sobre la miniatura del video
5. Los resultados se guardan en cache local para evitar re-análisis

---

## Servidor Ollama Personalizado

Por defecto la extensión se conecta a `http://localhost:11434`. Para cambiarlo:

1. Abre el popup de la extensión
2. Selecciona la pestaña **Ollama**
3. Ingresa la URL del servidor (ej. `http://localhost:11434`)
4. Haz clic en **OK** — la extensión probará la conexión y cargará los modelos disponibles

---

<div align="center">
  <sub>Gemini Nano y Ollama corren 100% en local — no se necesita API key. Gemini API es opcional y usa una clave gratuita de Google AI Studio.</sub>
</div>

