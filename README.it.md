<div align="center">
  <img src="icons/icon128.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analizzatore del Livello Linguistico di YouTube</strong></p>
  <p>Analizza il livello CEFR (A1–C2) di qualsiasi video di YouTube usando AI locale — niente chiavi API, niente internet.</p>
  <p>Scegli tra due motori AI: <strong>Gemini Nano</strong> (integrato in Chrome) o <strong>Ollama</strong> (server locale). Funziona per <strong>qualsiasi lingua</strong>.</p>
</div>

---

**🌐 Lingua**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Installazione

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Disponibile sul Chrome Web Store</a>
</div>

> Una volta installata, l'estensione funziona automaticamente su YouTube. Clicca l'icona dell'estensione per configurare.

---

## Screenshot

<p align="center">
  <img src="screenshots/badges.svg" alt="Badge CEFR sui video YouTube" width="700">
  <br>
  <em>Badge di livello CEFR (A1–C2) sulle miniature di YouTube</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Popup dell'estensione" width="280">
  <br>
  <em>Popup di configurazione — selettore motore con schede Gemini Nano e Ollama</em>
</p>

---

## Caratteristiche

- 🏷️ **Badge CEFR** — cerchi colorati (A1–C2) sulle miniature dei video YouTube
- 🤖 **Due motori AI** — usa **Gemini Nano** (AI integrata di Chrome) o **Ollama** (modelli locali)
- 🌍 **Multilingua** — analizza video in qualsiasi lingua
- 🎨 **Server Ollama personalizzato** — punta a qualsiasi istanza Ollama sulla tua rete
- ⚡ **Cache veloce** — i risultati vengono salvati in locale per evitare rianalisi
- 🔒 **100% privato** — tutto funziona in locale, nessun dato lascia il tuo computer

---

## Requisiti

- **Chrome 128+**, **Brave**, o qualsiasi browser basato su Chromium
- **Gemini Nano**: Chrome 128+ con Prompt API abilitato
- **Ollama**: Ollama installato e in esecuzione ([ollama.com](https://ollama.com)) con almeno un modello scaricato

---

## Gemini Nano

Gemini Nano è il modello AI integrato di Chrome. Nessun download o server necessario.

### 1. Abilita il flag Prompt API

1. Apri **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Imposta il flag su **"Enabled"**
3. Clicca **"Relaunch"** per riavviare Chrome

### 2. Controlla lo stato del modello

Apri il popup di YT Level e seleziona la scheda **Gemini Nano**:

| Stato | Significato |
|--------|-------------|
| **Available** | Pronto all'uso |
| **Downloading** | Il modello è in fase di download |
| **Downloadable** | Deve essere scaricato prima |
| **Unavailable** | Non supportato nel tuo browser |

### 3. Scegli la lingua di analisi

Seleziona la lingua del video che vuoi analizzare:

| Codice | Lingua |
|------|----------|
| en | Inglese |
| es | Spagnolo |
| ja | Giapponese |
| de | Tedesco |
| fr | Francese |

### 4. Scegli la modalità di sforzo

- **Quick** — classificazione veloce con un prompt semplice
- **Deep** — valutazione CEFR dettagliata con un prompt completo

---

## Ollama

### 1. Installa Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Scarica l'installer da [ollama.com/download](https://ollama.com/download) ed eseguilo.

### 2. Scarica un modello

```bash
ollama pull gemma3:1b
```

> Puoi usare qualsiasi modello. Selezionalo dalla scheda Ollama nel popup dell'estensione.

### 3. Configura CORS

L'estensione necessita dell'autorizzazione per comunicare con Ollama dal sito di YouTube.

#### Linux — Systemd (permanente)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Temporanea

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Permanente

1. Apri **Proprietà del sistema** → **Variabili d'ambiente**
2. Aggiungi una nuova **Variabile di sistema**: `OLLAMA_ORIGINS` = `*`
3. Clicca **OK** e riavvia Ollama

#### Windows — Temporanea (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. Configura nell'estensione

1. Clicca l'icona dell'estensione
2. Seleziona la scheda **Ollama**
3. Imposta l'URL del tuo server (predefinito: `http://localhost:11434`)
4. Clicca **OK** per testare la connessione
5. Seleziona un modello dal menu a discesa

---

## Usare l'Estensione

1. Vai su **https://www.youtube.com**
2. I video con trascrizione mostrano uno spinner verde durante l'analisi
3. Appare un cerchio colorato con il livello: **A1**, **A2**, **B1**, **B2**, **C1** o **C2**
4. Passa il mouse sul badge per vedere quale motore e modello è stato usato
5. Clicca l'icona dell'estensione per aprire il popup e cambiare motore

---

## Come Funziona

1. Estrae ogni ID video dal feed di YouTube
2. Recupera la trascrizione tramite `youtube-transcript.ai`
3. Invia la trascrizione al motore AI selezionato (Gemini Nano o Ollama) per la classificazione CEFR
4. Mostra il risultato come badge circolare sulla miniatura del video
5. I risultati vengono memorizzati nella cache locale per evitare rianalisi

---

## Server Ollama Personalizzato

Per impostazione predefinita l'estensione si connette a `http://localhost:11434`. Per cambiarlo:

1. Apri il popup dell'estensione
2. Seleziona la scheda **Ollama**
3. Inserisci l'URL del tuo server (es. `http://192.168.1.100:11434`)
4. Clicca **OK** — l'estensione testerà la connessione e caricherà i modelli disponibili

---

<div align="center">
  <sub>Nessuna chiave API o connessione internet richiesta. Tutti i dati rimangono in locale.</sub>
</div>
