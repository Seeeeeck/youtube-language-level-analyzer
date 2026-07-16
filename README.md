# YouTube English Level Analyzer

Browser extension for Chrome/Brave that analyzes the English CEFR level (A1-C2) of YouTube videos using local AI via Ollama.

Shows a colored circle with the CEFR level on each video in the YouTube feed.

## Requirements

- **Chrome 128+** or **Brave** (or any Chromium-based browser)
- **Ollama** installed and running
- **gemma3:1b** model downloaded (`ollama pull gemma3:1b`)

## Installation — step by step

### 1. Install Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Download the model

```bash
ollama pull gemma3:1b
```

### 3. Configure CORS in Ollama

The extension needs permission to talk to Ollama from YouTube's website.

#### Option A: Systemd (permanent, recommended)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Option B: Manual (temporary, until you close the terminal)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

### 4. Load the extension in your browser

1. Go to **`chrome://extensions`** (or **`brave://extensions`**)
2. Turn on **"Developer mode"** (top right corner)
3. Click **"Load unpacked"**
4. Select the project folder

### 5. Grant permissions (IMPORTANT)

Brave and some Chromium browsers require explicit permission for extensions to run on websites:

1. In `brave://extensions` (or `chrome://extensions`), click **"Details"** on **YT Level**
2. Enable **"Allow this extension to read and change all your data on websites you visit"** (or **"Run on all sites"**)
3. Also enable **"Allow access to file URLs"** if available
4. If prompted with a permission dialog, click **"Allow"**

> Without this step, the extension will load but won't run on YouTube pages.

### 6. Use

1. Go to https://www.youtube.com
2. Videos with transcripts will show a green spinner while analyzing
3. A colored circle appears with the level: **A1**, **A2**, **B1**, **B2**, **C1** or **C2**
4. Hover over the badge to see the analysis source

## How it works

1. Extracts each video ID from the YouTube feed
2. Fetches the transcript via `youtube-transcript.ai`
3. Sends the transcript to Ollama (`gemma3:1b`) requesting CEFR classification
4. Displays the result as a circular badge on the video thumbnail
5. Results are cached locally to avoid re-analysis

## File structure

```
├── manifest.json      Extension configuration
├── content.js         Main script (injected into YouTube)
├── background.js      Service worker
├── popup.html         Extension popup
├── popup.js           Popup logic
├── styles.css         Additional styles
├── analyzer.js        Heuristic analyzer (fallback)
├── icons/             Extension icons
└── README.md
```

## Notes

- Only analyzes videos that have **transcripts available** on YouTube
- Analysis can take 20-60 seconds per video on CPU
- If Ollama is not running or the model is not installed, no badges are shown
- No API key or internet connection required (once the model is downloaded)
