# YouTube English Level Analyzer

> [🇬🇧 English](README.md)

Extensión para Chrome/Brave que analiza el nivel de inglés (A1-C2) de videos de YouTube usando IA local con Ollama.

Muestra un círculo de color con el nivel CEFR en cada video del feed de YouTube.

## Requisitos

- **Chrome 128+** o **Brave** (o cualquier navegador basado en Chromium)
- **Ollama** instalado y ejecutándose
- Modelo **gemma3:1b** descargado (`ollama pull gemma3:1b`)

## Instalación — paso a paso

### 1. Instalar Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Descargar el modelo

```bash
ollama pull gemma3:1b
```

### 3. Configurar CORS en Ollama

La extensión necesita poder comunicarse con Ollama desde el sitio de YouTube.

#### Opción A: Systemd (permanente, recomendada)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Opción B: Manual (temporal, hasta cerrar la terminal)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

### 4. Cargar la extensión

1. Ve a **`chrome://extensions`** (o **`brave://extensions`**)
2. Activa **"Modo desarrollador"** (esquina superior derecha)
3. Haz clic en **"Cargar descomprimida"**
4. Selecciona la carpeta del proyecto

### 5. Conceder permisos (IMPORTANTE)

Brave y algunos navegadores Chromium requieren permiso explícito para que la extensión se ejecute en los sitios web:

1. En `brave://extensions` (o `chrome://extensions`), haz clic en **"Detalles"** en **YT Level**
2. Activa **"Permitir que esta extensión lea y modifique todos tus datos en los sitios web que visitas"** (o **"Run on all sites"**)
3. También activa **"Permitir acceso a URL de archivos"** si está disponible
4. Si aparece un cuadro de permiso, haz clic en **"Permitir"**

> Sin este paso, la extensión se cargará pero no funcionará en las páginas de YouTube.

### 6. Usar

1. Ve a https://www.youtube.com
2. Los videos con transcripción mostrarán un spinner verde mientras se analizan
3. Aparece un círculo con el nivel: **A1**, **A2**, **B1**, **B2**, **C1** o **C2**
4. Mouse encima del badge muestra la fuente del análisis

## Cómo funciona

1. Extrae el ID de cada video del feed de YouTube
2. Obtiene la transcripción via `youtube-transcript.ai`
3. Envía la transcripción a Ollama (`gemma3:1b`) pidiendo clasificación CEFR
4. Muestra el resultado como badge circular sobre el video
5. Los resultados se guardan en caché local

## Estructura de archivos

```
├── manifest.json      Configuración de la extensión
├── content.js         Script principal (inyectado en YouTube)
├── background.js      Service worker
├── popup.html         Popup de la extensión
├── popup.js           Lógica del popup
├── styles.css         Estilos adicionales
├── analyzer.js        Analizador heurístico (respaldo)
├── icons/             Iconos
├── README.es.md       Instrucciones en español
└── README.md
```

## Notas

- Solo analiza videos que tengan **transcripción disponible** en YouTube
- El análisis puede tomar 20-60 segundos por video en CPU
- Si Ollama no está corriendo o el modelo no está instalado, no se muestran badges
- No se necesita API key ni conexión a internet (una vez descargado el modelo)
