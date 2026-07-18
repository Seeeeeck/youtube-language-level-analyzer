<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>YouTube Language Level Analyzer</strong></p>
  <p>Analyze the CEFR level (A1–C2) of any YouTube video using local AI — no API keys, no internet required.</p>
  <p>Choose between two AI engines: <strong>Gemini Nano</strong> (built into Chrome) or <strong>Ollama</strong> (local server). Works for <strong>any language</strong>.</p>
</div>

---

**🌐 Language**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Install

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Available on Chrome Web Store</a>
</div>

> Once installed, the extension works automatically on YouTube. Click the extension icon to configure.

---

## Screenshots

<p align="center">
  <img src="yl.png" alt="CEFR badges on YouTube videos" width="700">
  <br>
  <em>CEFR level badges (A1–C2) overlaid on YouTube thumbnails</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Extension popup" width="280">
  <br>
  <em>Configuration popup — engine selector with Gemini Nano and Ollama tabs</em>
</p>

---

## Features

- 🏷️ **CEFR badges** — colored circles (A1–C2) on YouTube video thumbnails
- 🤖 **Two AI engines** — use **Gemini Nano** (built-in Chrome AI) or **Ollama** (local models)
- 🌍 **Multi-language** — analyzes videos in any language
- 🎨 **Custom Ollama server** — point to any Ollama instance on your network
- ⚡ **Fast cache** — results are cached locally to avoid re-analysis
- 🔒 **100% private** — everything runs locally, no data leaves your machine

---

## Requirements

- **Chrome 128+**, **Brave**, or any Chromium-based browser
- **Gemini Nano**: Chrome 128+ with Prompt API enabled
- **Ollama**: Ollama installed and running ([ollama.com](https://ollama.com)) with at least one model downloaded

---

## Gemini Nano

Gemini Nano is Chrome's built-in AI model. No downloads or servers needed.

### 1. Enable the Prompt API flag

1. Open **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Set the flag to **"Enabled"**
3. Click **"Relaunch"** to restart Chrome

### 2. Check the model status

Open the YT Level popup and select the **Gemini Nano** tab:

| Status | Meaning |
|--------|---------|
| **Available** | Ready to use |
| **Downloading** | Model is being downloaded |
| **Downloadable** | Needs to download first |
| **Unavailable** | Not supported in your browser |

### 3. Choose the analysis language

Select the language of the video you want to analyze:

| Code | Language |
|------|----------|
| en | English |
| es | Spanish |
| ja | Japanese |
| de | German |
| fr | French |

### 4. Choose effort mode

- **Quick** — fast classification with a simple prompt
- **Deep** — detailed CEFR evaluation with a comprehensive prompt

---

## Ollama

### 1. Install Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Download the installer from [ollama.com/download](https://ollama.com/download) and run it.

### 2. Download a model

```bash
ollama pull gemma3:1b
```

> You can use any model. Select it from the Ollama tab in the extension popup.

### 3. Configure CORS

The extension needs permission to talk to Ollama from YouTube.

#### Linux — Systemd (permanent)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Temporary

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Permanent

1. Open **System Properties** → **Environment Variables**
2. Add a new **System variable**: `OLLAMA_ORIGINS` = `*`
3. Click **OK** and restart Ollama

#### Windows — Temporary (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. Configure in the extension

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

---

## How It Works

1. Extracts each video ID from the YouTube feed
2. Fetches the transcript via `youtube-transcript.ai`
3. Sends the transcript to the selected AI engine (Gemini Nano or Ollama) for CEFR classification
4. Displays the result as a circular badge on the video thumbnail
5. Results are cached locally to avoid re-analysis

---

## Custom Ollama Server

By default the extension connects to `http://localhost:11434`. To change it:

1. Open the extension popup
2. Select the **Ollama** tab
3. Enter your server URL (e.g. `http://192.168.1.100:11434`)
4. Click **OK** — the extension will test the connection and load available models

---

<div align="center">
  <sub>No API key or internet connection required. All data stays local.</sub>
</div>
