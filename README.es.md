# YT Level — Analizador de Nivel de YouTube

**Analiza el nivel MCER (A1–C2) de cualquier video de YouTube usando IA local — sin API keys, sin conexión a internet.**

Elige entre dos motores de IA: **Gemini Nano** (integrado en Chrome) u **Ollama** (servidor local). Funciona para **cualquier idioma** (inglés, español, francés, alemán, chino, etc.). La extensión obtiene la transcripción del video y clasifica su nivel MCER. Un badge de color aparece en cada miniatura de video.

<p align="center">
  <img src="icons/icon128.png" alt="Icono de YT Level" width="64">
</p>

---

**🌐 Idioma**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Capturas

<p align="center">
  <img src="screenshots/badges.svg" alt="Badges CEFR en videos de YouTube" width="600">
  <br>
  <em>Badges de nivel CEFR (A1–C2) sobre miniaturas de YouTube</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Popup de la extensión" width="300">
  <br>
  <em>Popup de configuración — selector de motor con pestañas Gemini Nano y Ollama</em>
</p>

## Características

- 🏷️ **Badges CEFR** — círculos de color (A1–C2) en las miniaturas de YouTube
- 🤖 **Dos motores de IA** — usa **Gemini Nano** (IA integrada en Chrome) u **Ollama** (modelos locales)
- 🌍 **Multi-idioma** — analiza videos en cualquier idioma
- 🎨 **Servidor Ollama personalizado** — apunta a cualquier instancia de Ollama en tu red
- ⚡ **Caché rápida** — los resultados se guardan localmente para evitar re-análisis
- 🔒 **100% privado** — todo corre localmente, ningún dato sale de tu máquina

## Requisitos

- **Chrome 128+**, **Brave** o cualquier navegador basado en Chromium
- **Gemini Nano**: Chrome 128+ con Prompt API habilitado (ver más abajo)
- **Ollama**: Ollama instalado y ejecutándose ([ollama.com](https://ollama.com)) con al menos un modelo descargado

---

## Instalación — Gemini Nano

Gemini Nano es el modelo de IA integrado en Chrome. No necesita descargas ni servidores.

### 1. Activar el flag de Prompt API

1. Abre **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Establece el flag en **"Enabled"**
3. Haz clic en **"Relaunch"** para reiniciar Chrome

### 2. Verificar el estado del modelo en la extensión

1. Haz clic en el ícono de la extensión YT Level
2. Selecciona la pestaña **Gemini Nano**
3. El estado mostrará:
   - **Available** — listo para usar
   - **Downloading** — el modelo se está descargando
   - **Downloadable** — necesita descargarse primero (haz clic para iniciar la descarga)
   - **Unavailable** — no compatible con tu navegador

### 3. Elegir el idioma de análisis

En la pestaña Gemini Nano, selecciona el idioma del video que quieres analizar:

| Código | Idioma   |
|--------|----------|
| en     | Inglés   |
| es     | Español  |
| ja     | Japonés  |
| de     | Alemán   |
| fr     | Francés  |

### 4. Elegir modo de esfuerzo

- **Quick** — clasificación rápida con un prompt simple
- **Deep** — evaluación CEFR detallada con un prompt completo

### 5. Cargar la extensión

1. Ve a **`chrome://extensions`** (o **`brave://extensions`**)
2. Activa **"Modo desarrollador"** (esquina superior derecha)
3. Haz clic en **"Cargar descomprimida"**
4. Selecciona la carpeta del proyecto

### 6. Conceder permisos (IMPORTANTE)

1. En `chrome://extensions`, haz clic en **"Detalles"** en **YT Level**
2. Activa **"Permitir que esta extensión lea y modifique todos tus datos en los sitios web que visitas"**
3. Si aparece un cuadro de permiso, haz clic en **"Permitir"**

> Sin este paso, la extensión se carga pero no funciona en las páginas de YouTube.

---

## Instalación — Ollama

### 1. Instalar Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Descarga el instalador desde [ollama.com/download](https://ollama.com/download) y ejecútalo. Ollama se iniciará automáticamente como servicio de fondo.

### 2. Descargar un modelo

Abre una terminal (Símbolo del sistema en Windows) y ejecuta:

```bash
ollama pull gemma3:1b
```

> Puedes usar cualquier modelo. La extensión te permite seleccionar cuál usar desde el popup.

### 3. Configurar CORS en Ollama

La extensión necesita comunicarse con Ollama desde el sitio de YouTube.

#### Linux — Opción A: Systemd (permanente, recomendada)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Opción B: Manual (temporal)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Opción A: Permanente (recomendada)

1. Abre **Propiedades del sistema** → **Variables de entorno**
2. Agrega una nueva **Variable del sistema**:
   - Nombre: `OLLAMA_ORIGINS`
   - Valor: `*`
3. Haz clic en **Aceptar** y reinicia Ollama desde la bandeja del sistema (clic derecho → Salir, luego inícialo de nuevo)

#### Windows — Opción B: Temporal (Símbolo del sistema)

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

> En Windows, ejecuta estos comandos **después** de cerrar Ollama desde la bandeja del sistema.

### 4. Cargar la extensión

Mismos pasos 5 y 6 de la sección de Gemini Nano.

### 5. Usar la extensión con Ollama

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

## Cómo Funciona

1. Extrae el ID de cada video del feed de YouTube
2. Obtiene la transcripción via `youtube-transcript.ai`
3. Envía la transcripción al motor de IA seleccionado (Gemini Nano u Ollama) para clasificación CEFR
4. Muestra el resultado como badge circular sobre la miniatura del video
5. Los resultados se guardan en caché local para evitar re-análisis

## Servidor Ollama Personalizado

Por defecto la extensión se conecta a `http://localhost:11434`. Puedes cambiarlo:

1. Haz clic en el ícono de la extensión
2. Selecciona la pestaña **Ollama**
3. Ingresa la URL del servidor (ej. `http://192.168.1.100:11434`)
4. Haz clic en **OK** — la extensión probará la conexión y cargará los modelos disponibles
5. Haz clic en **↺** para restaurar el valor por defecto

## Estructura de Archivos

```
├── manifest.json      Configuración de la extensión
├── content.js         Script principal (inyectado en YouTube)
├── background.js      Service worker
├── popup.html         Popup de la extensión
├── popup.js           Lógica del popup
├── styles.css         Estilos adicionales
├── analyzer.js        Analizador heurístico (respaldo)
├── icons/             Iconos de la extensión
└── README.md          Este archivo
```

## Notas

- Solo analiza videos que tengan **transcripción disponible** en YouTube
- El tiempo de análisis depende de tu hardware (más rápido con Gemini Nano, 20–60 segundos por video en CPU con Ollama)
- Si ningún motor está disponible, no se muestran badges
- No se necesita API key ni conexión a internet
- Todos los datos quedan locales — nada se envía a servidores externos
