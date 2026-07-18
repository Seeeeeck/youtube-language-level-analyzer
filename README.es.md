<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analizador de Nivel de YouTube</strong></p>
  <p>Analiza el nivel MCER (A1–C2) de cualquier video de YouTube usando IA local — sin API keys, sin conexión a internet.</p>
  <p>Elige entre dos motores de IA: <strong>Gemini Nano</strong> (integrado en Chrome) u <strong>Ollama</strong> (servidor local). Funciona para <strong>cualquier idioma</strong>.</p>
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
  <img src="yl.png" alt="Badges CEFR en videos de YouTube" width="700">
  <br>
  <em>Badges de nivel CEFR (A1–C2) sobre miniaturas de YouTube</em>
</p>

<p align="center">
  <img src="screenshots/screenshot3.png" alt="Screenshot 3" width="500">
  <br>
  <em>Screenshot 3</em>
</p>

<p align="center">
  <img src="screenshots/screenshot4.png" alt="Screenshot 4" width="500">
  <br>
  <em>Screenshot 4</em>
</p>

---

## Características

- 🏷️ **Badges CEFR** — círculos de color (A1–C2) en las miniaturas de YouTube
- 🤖 **Dos motores de IA** — usa **Gemini Nano** (IA integrada en Chrome) u **Ollama** (modelos locales)
- 🌍 **Multi-idioma** — analiza videos en cualquier idioma
- 🎨 **Servidor Ollama personalizado** — apunta a cualquier instancia de Ollama en tu red
- ⚡ **Caché rápida** — los resultados se guardan localmente para evitar re-análisis
- 🔒 **100% privado** — todo corre localmente, ningún dato sale de tu máquina

---

## Requisitos

- **Chrome 128+**, **Brave** o cualquier navegador basado en Chromium
- **Gemini Nano**: Chrome 128+ con Prompt API habilitado
- **Ollama**: Ollama instalado y ejecutándose ([ollama.com](https://ollama.com)) con al menos un modelo descargado

---

## Gemini Nano

Gemini Nano es el modelo de IA integrado en Chrome. No necesita descargas ni servidores.

### 1. Activar el flag de Prompt API

1. Abre **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Establece el flag en **"Enabled"**
3. Haz clic en **"Relaunch"** para reiniciar Chrome

### 2. Verificar el estado del modelo

Abre el popup de YT Level y selecciona la pestaña **Gemini Nano**:

| Estado | Significado |
|--------|-------------|
| **Available** | Listo para usar |
| **Downloading** | El modelo se está descargando |
| **Downloadable** | Necesita descargarse primero |
| **Unavailable** | No compatible con tu navegador |

### 3. Elegir el idioma de análisis

Selecciona el idioma del video que quieres analizar:

| Código | Idioma |
|--------|--------|
| en | Inglés |
| es | Español |
| ja | Japonés |
| de | Alemán |
| fr | Francés |

### 4. Elegir modo de esfuerzo

- **Quick** — clasificación rápida con un prompt simple
- **Deep** — evaluación CEFR detallada con un prompt completo

---

## Ollama

### 1. Instalar Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Descarga el instalador desde [ollama.com/download](https://ollama.com/download) y ejecútalo.

### 2. Descargar un modelo

```bash
ollama pull gemma3:1b
```

> Puedes usar cualquier modelo. Selecciónalo desde la pestaña Ollama en el popup de la extensión.

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

1. Abre **Propiedades del sistema** → **Variables de entorno**
2. Agrega una nueva **Variable del sistema**: `OLLAMA_ORIGINS` = `*`
3. Haz clic en **Aceptar** y reinicia Ollama

#### Windows — Temporal (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. Configurar en la extensión

1. Haz clic en el ícono de la extensión
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
5. Haz clic en el ícono de la extensión para abrir el popup y cambiar entre motores

---

## Cómo Funciona

1. Extrae el ID de cada video del feed de YouTube
2. Obtiene la transcripción via `youtube-transcript.ai`
3. Envía la transcripción al motor de IA seleccionado (Gemini Nano u Ollama) para clasificación CEFR
4. Muestra el resultado como badge circular sobre la miniatura del video
5. Los resultados se guardan en caché local para evitar re-análisis

---

## Servidor Ollama Personalizado

Por defecto la extensión se conecta a `http://localhost:11434`. Para cambiarlo:

1. Abre el popup de la extensión
2. Selecciona la pestaña **Ollama**
3. Ingresa la URL del servidor (ej. `http://192.168.1.100:11434`)
4. Haz clic en **OK** — la extensión probará la conexión y cargará los modelos disponibles

---

<div align="center">
  <sub>No se necesita API key ni conexión a internet. Todos los datos quedan locales.</sub>
</div>
