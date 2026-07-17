# YT Level — YouTube Language Level Analyzer

**Analyze the CEFR level (A1–C2) of any YouTube video using local AI — no API keys, no internet required.**

Works for **any language** (English, Spanish, French, German, Chinese, etc.). The extension fetches the video transcript and sends it to a local Ollama model for CEFR classification. A colored badge appears on each video thumbnail.

<p align="center">
  <img src="icons/icon128.png" alt="YT Level icon" width="64">
</p>

---

**🌐 Language**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Features

- 🏷️ **CEFR badges** — colored circles (A1–C2) on YouTube video thumbnails
- 🤖 **Local AI** — works with any Ollama model (gemma, llama, mistral, etc.)
- 🌍 **Multi-language** — analyzes videos in any language
- 🎨 **Custom server** — point to any Ollama instance on your network
- ⚡ **Fast cache** — results are cached locally to avoid re-analysis
- 🔒 **100% private** — everything runs locally, no data leaves your machine

## Requirements

- **Chrome 128+**, **Brave**, or any Chromium-based browser
- **Ollama** installed and running ([ollama.com](https://ollama.com))
- At least **one Ollama model** downloaded (e.g. `ollama pull gemma3:1b`)

## Installation — Step by Step

### 1. Install Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Download the installer from [ollama.com/download](https://ollama.com/download) and run it. Ollama will start automatically as a background service.

### 2. Download a model

Open a terminal (Command Prompt on Windows) and run:

```bash
ollama pull gemma3:1b
```

> You can use any model. The extension lets you select which one to use from the popup.

### 3. Configure CORS in Ollama

The extension needs permission to talk to Ollama from YouTube's website.

#### Linux — Option A: Systemd (permanent, recommended)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Option B: Manual (temporary)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Option A: Permanent (recommended)

1. Open **System Properties** → **Environment Variables**
2. Add a new **System variable**:
   - Name: `OLLAMA_ORIGINS`
   - Value: `*`
3. Click **OK** and restart Ollama from the system tray (right-click → Quit, then start it again)

#### Windows — Option B: Temporary (Command Prompt)

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

> On Windows, run these commands **after** closing Ollama from the system tray.

### 4. Load the extension in your browser

1. Go to **`chrome://extensions`** (or **`brave://extensions`**)
2. Enable **"Developer mode"** (top right corner)
3. Click **"Load unpacked"**
4. Select the project folder

### 5. Grant permissions (IMPORTANT)

Some browsers require explicit permission for extensions to run on websites:

1. In `chrome://extensions`, click **"Details"** on **YT Level**
2. Enable **"Allow this extension to read and change all your data on websites you visit"**
3. If prompted, click **"Allow"**

> Without this step, the extension loads but won't run on YouTube pages.

### 6. Use the extension

1. Go to **https://www.youtube.com**
2. Videos with transcripts show a green spinner while analyzing
3. A colored circle appears with the level: **A1**, **A2**, **B1**, **B2**, **C1**, or **C2**
4. Hover over the badge to see which model was used
5. Click the extension icon to open the popup:
   - **Server** — change your Ollama server URL if needed
   - **Model** — select which installed model to use
   - **Language** — change the extension UI language

## How It Works

1. Extracts each video ID from the YouTube feed
2. Fetches the transcript via `youtube-transcript.ai`
3. Sends the transcript to your local Ollama model requesting CEFR classification
4. Displays the result as a circular badge on the video thumbnail
5. Results are cached locally to avoid re-analysis

## Custom Ollama Server

By default the extension connects to `http://localhost:11434`. You can change this:

1. Click the extension icon
2. Enter your server URL (e.g. `http://192.168.1.100:11434`)
3. Click **OK** — the extension will test the connection and load available models
4. Click **↺** to reset to the default

## File Structure

```
├── manifest.json      Extension configuration
├── content.js         Main script (injected into YouTube)
├── background.js      Service worker
├── popup.html         Extension popup
├── popup.js           Popup logic
├── styles.css         Additional styles
├── analyzer.js        Heuristic analyzer (fallback)
├── icons/             Extension icons
└── README.md          This file
```

## Notes

- Only analyzes videos that have **transcripts available** on YouTube
- Analysis time depends on your hardware and model size (20–60 seconds per video on CPU)
- If Ollama is not running or no model is installed, no badges are shown
- No API key or internet connection required (once the model is downloaded)
- All data stays local — nothing is sent to external servers
