# YouTube English Level Analyzer

Extensión para Chrome/Brave que analiza el nivel de inglés (A1-C2) de videos de YouTube usando IA local con Ollama.

Muestra un círculo con el nivel CEFR en cada video del feed de YouTube.

## Requisitos

- **Chrome 128+** o **Brave** (u otro Chromium)
- **Ollama** instalado y corriendo
- Modelo **gemma3:1b** descargado (~1.6 GB)

## Instalación

### 1. Instalar Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Descargar el modelo

```bash
ollama pull gemma3:1b
```

### 3. Configurar CORS en Ollama

Para que la extensión pueda comunicarse con Ollama desde YouTube, necesitas permitir orígenes externos.

#### Opción A: Systemd (recomendado, permanente)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Opción B: Manual (temporal, hasta que cierres la terminal)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

### 4. Cargar la extensión

1. Abre `chrome://extensions` (o `brave://extensions`)
2. Activa **"Modo desarrollador"** (esquina superior derecha)
3. Click **"Cargar descomprimida"**
4. Selecciona la carpeta del proyecto

### 5. Usar

1. Ve a https://www.youtube.com
2. Los videos con transcripción disponible mostrarán un spinner verde mientras se analizan
3. Al terminar, aparece un círculo con el nivel: **A1**, **A2**, **B1**, **B2**, **C1** o **C2**
4. Pasando el mouse encima del badge muestra si fue analizado con Ollama

## Cómo funciona

1. La extensión extrae el ID de cada video en el feed de YouTube
2. Obtiene la transcripción del video via `youtube-transcript.ai`
3. Envía la transcripción a Ollama (`gemma3:1b`) pidiendo clasificación CEFR
4. Muestra el resultado como un badge circular sobre el video
5. Los resultados se cachean localmente para no re-analizar

## Estructura

```
├── manifest.json      # Configuración de la extensión
├── content.js         # Script principal (inyectado en YouTube)
├── background.js      # Service worker (mínimo)
├── popup.html         # Popup de la extensión
├── popup.js           # Lógica del popup
├── styles.css         # Estilos adicionales
├── analyzer.js        # Analizador heurístico (respaldo)
├── icons/             # Iconos de la extensión
└── README.md
```

## Notas

- Solo analiza videos que tienen **transcripción disponible** en YouTube
- El análisis puede tomar varios segundos en CPU (20-60s por video)
- Si Ollama no está corriendo o el modelo no está instalado, no se muestran badges
- No se requiere API key ni conexión a internet (una vez descargado el modelo)
