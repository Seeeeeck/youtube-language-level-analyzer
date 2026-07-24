<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>YouTube Language Level Analyzer</strong></p>
  <p>Analyze the CEFR level (A1–C2) of any YouTube video using local AI — no API keys, no internet required.</p>
  <p>Choose between three AI engines: <strong>Gemini API</strong> (cloud, free tier), <strong>Gemini Nano</strong> (built into Chrome), or <strong>Ollama</strong> (local server). Works for <strong>any language</strong>.</p>
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
  <img src="screenshots/levels_design.svg" alt="CEFR level badges (A1-C2) shown on YouTube video thumbnails" width="700">
  <br>
  <em>CEFR level badges (A1-C2) shown on YouTube video thumbnails</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="Extension popup — Gemini Nano tab" width="500">
  <br>
  <em>Extension popup — Gemini Nano tab</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="Extension popup — Ollama tab" width="500">
  <br>
  <em>Extension popup — Ollama tab</em>
</p>

---

## Features

- 🏷️ **CEFR Badges** — Colored circles (A1-C2) on YouTube video thumbnails
- 🤖 **Three AI Engines** — Use Gemini API (cloud), Gemini Nano (built-in Chrome AI), or Ollama (local models)
- 🌍 **Multi-language** — Analyzes videos in English, Spanish, French, German, Japanese, and more
- 🔒 **100% Private** — Everything runs locally — no data leaves your machine
- 🎛️ **Custom Server** — Point to any Ollama instance on your network
- ⚡ **Fast Cache** — Results are cached locally to avoid re-analysis
- 📏 **Adjustable Sample Size** — Choose how many characters of the transcript to analyze (3000/6000/12000) to balance speed and accuracy

---

## Requirements

- **Chrome 128+**, **Brave**, or any Chromium-based browser
- **Gemini API**: Free API key from [Google AI Studio](https://aistudio.google.com/apikey)
- **Gemini Nano**: Chrome 128+ with Prompt API enabled
- **Ollama**: Ollama installed and running ([ollama.com](https://ollama.com)) with at least one model downloaded

---

## Gemini API

Gemini API uses Google's cloud AI models with a free API key from Google AI Studio. Works on any Chromium-based browser and doesn't require downloading any model.

> Unlike Gemini Nano and Ollama, the Gemini API sends the transcript to Google's servers for processing.

### 1. Get your API key

1. Go to **Google AI Studio**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the generated key (starts with `AIza...`)

> The Gemini API has a free tier with generous usage limits — no credit card required to get started.

### 2. Configure in the extension

1. Click the extension icon
2. Select the **API Gemini** tab
3. Paste your API key into the field
4. Click **OK** to save and test the key
5. Select a model from the dropdown

---

## Gemini Nano

Gemini Nano is Chrome's built-in AI model. You need to download the AI model first.

> Chrome is recommended for Gemini Nano. It may not work in other browsers.

> Doesn't work in your browser? Use the Ollama option below instead — it works on any Chromium-based browser.

> A Gemini Nano model will be downloaded. Do not close the browser until it is ready.

### 1. Activate Nano AI

1. Enter this in the browser address bar: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Set the flag to **"Enabled Multilanguage"**
3. Click **"Relaunch"** or restart the browser

> If the model does not start downloading, also enable (recommended): **`chrome://flags/#optimization-guide-on-device-model`** and select **"Enabled BypassPerfRequirement"**

### 2. Check the model status

Open the YT Level popup and select the **Gemini Nano** tab:

| Status | Meaning |
|--------|---------|
| **Available** | Ready to use |
| **Downloading** | Model is being downloaded |
| **Downloadable** | Needs to download first |
| **Unavailable** | Not supported in your browser or model not downloaded |

### 3. Choose the analysis language

Select the language of the video you want to analyze:

| Code | Language |
|------|----------|
| en | English |
| es | Spanish |
| ja | Japanese |
| de | German |
| fr | French |

> Gemini Nano supports multilingual analysis. Select the language that matches the video content.

---

## Ollama

> Works on any Chromium-based browser: Chrome, Brave, Edge, Vivaldi, Opera, and more.

### 1. Install Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

Download the installer from [ollama.com/download](https://ollama.com/download) and run it.

### 2. Download a model

Run this in a terminal (Linux/macOS) or PowerShell/CMD (Windows):

```bash
ollama pull gemma3:1b
```

> You can use any model from the [Ollama model library](https://ollama.com/library) — select it from the Ollama tab in the extension popup. A lightweight/small model (like `gemma3:1b`) is recommended for faster responses.

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

1. Open **System Properties** -> **Environment Variables**
2. Add a new **System variable**: `OLLAMA_ORIGINS` = `*`
3. Click **OK** and restart Ollama

#### Windows — Temporary (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> If you want to use Ollama from another PC on your network, open Ollama Settings and enable "Expose Ollama to network". This allows connections from other devices on your local network.

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
2. Fetches the video transcript
3. Sends the transcript to the selected AI engine (Gemini API, Gemini Nano, or Ollama) for CEFR classification
4. Displays the result as a circular badge on the video thumbnail
5. Results are cached locally to avoid re-analysis

---

## Custom Ollama Server

By default the extension connects to `http://localhost:11434`. To change it:

1. Open the extension popup
2. Select the **Ollama** tab
3. Enter your server URL (e.g. `http://localhost:11434`)
4. Click **OK** — the extension will test the connection and load available models

---

<div align="center">
  <sub>Gemini Nano and Ollama run 100% locally — no API key needed. Gemini API is optional and uses a free key from Google AI Studio.</sub>
</div>

