# YT Level — YouTube Language Level Analyzer

**Analyze the CEFR level (A1–C2) of any YouTube video using local AI — no API keys, no internet required.**

Choose between two AI engines: **Gemini Nano** (built into Chrome) or **Ollama** (local server). Works for **any language** (English, Spanish, French, German, Chinese, etc.). The extension fetches the video transcript and classifies its CEFR level. A colored badge appears on each video thumbnail.

<p align="center">
  <img src="icons/icon128.png" alt="YT Level icon" width="64">
</p>

---

**🌐 Language**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Screenshots

<p align="center">
  <img src="screenshots/badges.svg" alt="CEFR badges on YouTube videos" width="600">
  <br>
  <em>CEFR level badges (A1–C2) overlaid on YouTube thumbnails</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Extension popup" width="300">
  <br>
  <em>Configuration popup — engine selector with Gemini Nano and Ollama tabs</em>
</p>

## Features

- 🏷️ **CEFR badges** — colored circles (A1–C2) on YouTube video thumbnails
- 🤖 **Two AI engines** — use **Gemini Nano** (built-in Chrome AI) or **Ollama** (local models)
- 🌍 **Multi-language** — analyzes videos in any language
- 🎨 **Custom Ollama server** — point to any Ollama instance on your network
- ⚡ **Fast cache** — results are cached locally to avoid re-analysis
- 🔒 **100% private** — everything runs locally, no data leaves your machine

## Requirements

- **Chrome 128+**, **Brave**, or any Chromium-based browser
- **Gemini Nano**: Chrome 128+ with Prompt API enabled (see below)
- **Ollama**: Ollama installed and running ([ollama.com](https://ollama.com)) with at least one model downloaded

---

## Installation — Gemini Nano

Gemini Nano is Chrome's built-in AI model. No downloads or servers needed.

### 1. Enable the Prompt API flag

1. Open **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Set the flag to **"Enabled"**
3. Click **"Relaunch"** to restart Chrome

### 2. Check the model status in the extension

1. Click the YT Level extension icon
2. Select the **Gemini Nano** tab
3. The status will show:
   - **Available** — ready to use
   - **Downloading** — model is being downloaded
   - **Downloadable** — needs to download first (click to trigger download)
   - **Unavailable** — not supported in your browser

### 3. Choose the analysis language

In the Gemini Nano tab, select the language of the video you want to analyze:

| Code | Language |
|------|----------|
| en   | English  |
| es   | Spanish  |
| ja   | Japanese |
| de   | German   |
| fr   | French   |

### 4. Choose effort mode

- **Quick** — fast classification with a simple prompt
- **Deep** — detailed CEFR evaluation with a comprehensive prompt

### 5. Load the extension

1. Go to **`chrome://extensions`** (or **`brave://extensions`**)
2. Enable **"Developer mode"** (top right corner)
3. Click **"Load unpacked"**
4. Select the project folder

### 6. Grant permissions (IMPORTANT)

1. In `chrome://extensions`, click **"Details"** on **YT Level**
2. Enable **"Allow this extension to read and change all your data on websites you visit"**
3. If prompted, click **"Allow"**

> Without this step, the extension loads but won't run on YouTube pages.

---

## Installation — Ollama

### 1. Install Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Download the installer from [ollama.com/download](https://ollama.com/download) and run it. Ollama will start automatically as a background service.

### 2. Download a model

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

#### Windows — Option B: Temporary (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> On Windows, run these commands **after** closing Ollama from the system tray.

### 4. Load the extension

Same as steps 5 and 6 in the Gemini Nano section above.

### 5. Use the extension with Ollama

1. Click the extension icon
2. Select the **Ollama** tab
3. Set your server URL (default: `http://localhost:11434`)
4. Click **OK** to test the connection
5. Select a model from the dropdown

---

## Using the Extension

1. Go to **https://www.youtube.com**
2. Videos with transcripts show a green spinner while analyzing
3. A colored circle appears with the level: **A1**, **A2**, **B1**, **B2**, **C1**, or **C2**
4. Hover over the badge to see which engine and model was used
5. Click the extension icon to open the popup and switch between engines

## How It Works

1. Extracts each video ID from the YouTube feed
2. Fetches the transcript via `youtube-transcript.ai`
3. Sends the transcript to the selected AI engine (Gemini Nano or Ollama) for CEFR classification
4. Displays the result as a circular badge on the video thumbnail
5. Results are cached locally to avoid re-analysis

## Custom Ollama Server

By default the extension connects to `http://localhost:11434`. You can change this:

1. Click the extension icon
2. Select the **Ollama** tab
3. Enter your server URL (e.g. `http://192.168.1.100:11434`)
4. Click **OK** — the extension will test the connection and load available models
5. Click **↺** to reset to the default

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
- Analysis time depends on your hardware (faster with Gemini Nano, 20–60 seconds per video on CPU with Ollama)
- If no engine is available, no badges are shown
- No API key or internet connection required
- All data stays local — nothing is sent to external servers
