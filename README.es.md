# YT Level — Analizador de Nivel de YouTube

**Analiza el nivel MCER (A1–C2) de cualquier video de YouTube usando IA local — sin API keys, sin internet.**

Funciona para **cualquier idioma**. La extensión obtiene la transcripción del video y la envía a un modelo local de Ollama para clasificación CEFR. Un badge de color aparece en cada miniatura de video.

---

**🌐 Idioma**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Características

- 🏷️ **Badges CEFR** — círculos de color (A1–C2) en las miniaturas de YouTube
- 🤖 **IA local** — funciona con cualquier modelo de Ollama (gemma, llama, mistral, etc.)
- 🌍 **Multi-idioma** — analiza videos en cualquier lengua
- 🎨 **Servidor personalizado** — apunta a cualquier instancia de Ollama en tu red
- ⚡ **Caché rápida** — los resultados se guardan localmente para evitar re-análisis
- 🔒 **100% privado** — todo corre localmente, ningún dato sale de tu máquina

## Requisitos

- **Chrome 128+**, **Brave** o cualquier navegador basado en Chromium
- **Ollama** instalado y ejecutándose ([ollama.com](https://ollama.com))
- Al menos **un modelo de Ollama** descargado (ej. `ollama pull gemma3:1b`)

## Instalación — Paso a Paso

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

1. Ve a **`chrome://extensions`** (o **`brave://extensions`**)
2. Activa **"Modo desarrollador"** (esquina superior derecha)
3. Haz clic en **"Cargar descomprimida"**
4. Selecciona la carpeta del proyecto

### 5. Conceder permisos (IMPORTANTE)

Algunos navegadores requieren permiso explícito para que la extensión funcione:

1. En `chrome://extensions`, haz clic en **"Detalles"** en **YT Level**
2. Activa **"Permitir que esta extensión lea y modifique todos tus datos en los sitios web que visitas"**
3. Si aparece un cuadro de permiso, haz clic en **"Permitir"**

> Sin este paso, la extensión se carga pero no funciona en las páginas de YouTube.

### 6. Usar la extensión

1. Ve a **https://www.youtube.com**
2. Los videos con transcripción mostrarán un spinner verde mientras se analizan
3. Aparece un círculo con el nivel: **A1**, **A2**, **B1**, **B2**, **C1** o **C2**
4. Mouse encima del badge muestra el modelo usado
5. Haz clic en el ícono de la extensión para abrir el popup:
   - **Servidor** — cambia la URL de tu servidor Ollama
   - **Modelo** — selecciona qué modelo usar
   - **Idioma** — cambia el idioma de la interfaz

## Cómo Funciona

1. Extrae el ID de cada video del feed de YouTube
2. Obtiene la transcripción via `youtube-transcript.ai`
3. Envía la transcripción a tu modelo local de Ollama pidiendo clasificación CEFR
4. Muestra el resultado como badge circular sobre el video
5. Los resultados se guardan en caché local

## Servidor Ollama Personalizado

Por defecto la extensión se conecta a `http://localhost:11434`. Puedes cambiarlo:

1. Haz clic en el ícono de la extensión
2. Ingresa la URL del servidor (ej. `http://192.168.1.100:11434`)
3. Haz clic en **OK** — la extensión probará la conexión y cargará los modelos
4. Haz clic en **↺** para restaurar el valor por defecto

## Estructura de Archivos

```
├── manifest.json      Configuración de la extensión
├── content.js         Script principal (inyectado en YouTube)
├── background.js      Service worker
├── popup.html         Popup de la extensión
├── popup.js           Lógica del popup
├── styles.css         Estilos adicionales
├── analyzer.js        Analizador heurístico (respaldo)
├── icons/             Iconos
└── README.es.md       Este archivo
```

## Notas

- Solo analiza videos que tengan **transcripción disponible** en YouTube
- El tiempo de análisis depende de tu hardware y tamaño del modelo (20–60 segundos por video en CPU)
- Si Ollama no está corriendo o no hay modelo instalado, no se muestran badges
- No se necesita API key ni conexión a internet (una vez descargado el modelo)
- Todos los datos quedan locales — nada se envía a servidores externos
