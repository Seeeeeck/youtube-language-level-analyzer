<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analizzatore del Livello Linguistico di YouTube</strong></p>
  <p>Analizza il livello CEFR (A1–C2) di qualsiasi video di YouTube usando AI locale — niente chiavi API, niente internet.</p>
  <p>Scegli tra tre motori AI: <strong>Gemini API</strong> (cloud, livello gratuito), <strong>Gemini Nano</strong> (integrato in Chrome) o <strong>Ollama</strong> (server locale). Funziona per <strong>qualsiasi lingua</strong>.</p>
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
  <img src="screenshots/levels_design.svg" alt="Badge di livello CEFR (A1-C2) sulle miniature di YouTube" width="700">
  <br>
  <em>Badge di livello CEFR (A1-C2) sulle miniature di YouTube</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="Popup dell'estensione — scheda Gemini Nano" width="500">
  <br>
  <em>Popup dell'estensione — scheda Gemini Nano</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="Popup dell'estensione — scheda Ollama" width="500">
  <br>
  <em>Popup dell'estensione — scheda Ollama</em>
</p>

---

## Caratteristiche

- 🏷️ **Badge CEFR** — Cerchi colorati (A1-C2) sulle miniature dei video YouTube
- 🤖 **Tre motori AI** — Usa Gemini API (cloud), Gemini Nano (AI integrata di Chrome) o Ollama (modelli locali)
- 🌍 **Multilingua** — Analizza video in qualsiasi lingua
- 🔒 **100% privato** — Tutto funziona in locale, nessun dato lascia il tuo computer
- 🎛️ **Server personalizzato** — Punta a qualsiasi istanza Ollama sulla tua rete
- ⚡ **Cache veloce** — I risultati vengono salvati in locale per evitare rianalisi
- 📏 **Dimensione campione regolabile** — Scegli quanti caratteri della trascrizione analizzare (3000/6000/12000) per bilanciare velocità e precisione

---

## Requisiti

- **Chrome 128+**, **Brave**, o qualsiasi browser basato su Chromium
- **Gemini API**: Chiave API gratuita da [Google AI Studio](https://aistudio.google.com/apikey)
- **Gemini Nano**: Chrome 128+ con Prompt API abilitato
- **Ollama**: Ollama installato e in esecuzione ([ollama.com](https://ollama.com)) con almeno un modello scaricato

---

## Gemini API

Gemini API utilizza i modelli AI cloud di Google con una chiave API gratuita da Google AI Studio. Funziona su qualsiasi browser basato su Chromium e non richiede il download di alcun modello.

> A differenza di Gemini Nano e Ollama, Gemini API invia la trascrizione ai server di Google per l'elaborazione.

### 1. Ottieni la tua chiave API

1. Vai su **Google AI Studio**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Accedi con il tuo account Google
3. Clicca su **"Create API key"**
4. Copia la chiave generata (inizia con `AIza...`)

> Gemini API ha un livello gratuito con limiti di utilizzo generosi — nessuna carta di credito richiesta per iniziare.

### 2. Configura nell'estensione

1. Clicca l'icona dell'estensione
2. Seleziona la scheda **API Gemini**
3. Incolla la tua chiave API nel campo
4. Clicca **OK** per salvare e testare la chiave
5. Seleziona un modello dal menu a discesa

---

## Gemini Nano

Gemini Nano è il modello AI integrato di Chrome. Devi scaricare il modello AI prima.

> Chrome è consigliato per Gemini Nano. Potrebbe non funzionare in altri browser.

> Non funziona nel tuo browser? Usa invece l'opzione Ollama qui sotto — funziona su qualsiasi browser basato su Chromium.

> Un modello Gemini Nano verrà scaricato. Non chiudere il browser finché non è pronto.

### 1. Attiva l'IA Nano

1. Inserisci questo nella barra degli indirizzi: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Imposta il flag su **"Enabled Multilanguage"**
3. Clicca **"Relaunch"** o riavvia il browser

> Se il modello non inizia a scaricarsi, attiva anche (consigliato): **`chrome://flags/#optimization-guide-on-device-model`** e seleziona **"Enabled BypassPerfRequirement"**

### 2. Controlla lo stato del modello

Apri il popup di YT Level e seleziona la scheda **Gemini Nano**:

| Stato | Significato |
|--------|---------|
| **Available** | Pronto all'uso |
| **Downloading** | Il modello è in fase di download |
| **Downloadable** | Deve essere scaricato prima |
| **Unavailable** | Non supportato nel tuo browser o modello non scaricato |

### 3. Scegli la lingua di analisi

Seleziona la lingua del video che vuoi analizzare:

| Codice | Lingua |
|------|----------|
| en | Inglese |
| es | Spagnolo |
| ja | Giapponese |
| de | Tedesco |
| fr | Francese |

> Gemini Nano supporta l'analisi multilingue. Seleziona la lingua che corrisponde al contenuto del video.

---

## Ollama

> Funziona su qualsiasi browser basato su Chromium: Chrome, Brave, Edge, Vivaldi, Opera e altri.

### 1. Installa Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

Scarica l'installer da [ollama.com/download](https://ollama.com/download) ed eseguilo.

### 2. Scarica un modello

Esegui questo in un terminale (Linux/macOS) o PowerShell/CMD (Windows):

```bash
ollama pull gemma3:1b
```

> Puoi usare qualsiasi modello dalla [libreria di modelli Ollama](https://ollama.com/library) — selezionalo dalla scheda Ollama nel popup dell'estensione. Si consiglia un modello leggero/piccolo (come `gemma3:1b`) per risposte più veloci.

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

1. Apri **Proprietà del sistema** -> **Variabili d'ambiente**
2. Aggiungi una nuova **Variabile di sistema**: `OLLAMA_ORIGINS` = `*`
3. Clicca **OK** e riavvia Ollama

#### Windows — Temporanea (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Se vuoi usare Ollama da un altro PC sulla tua rete, apri le Impostazioni di Ollama e abilita "Esponi Ollama alla rete". Ciò consente connessioni da altri dispositivi sulla tua rete locale.

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
2. Recupera la trascrizione del video
3. Invia la trascrizione al motore AI selezionato (Gemini API, Gemini Nano o Ollama) per la classificazione CEFR
4. Mostra il risultato come badge circolare sulla miniatura del video
5. I risultati vengono memorizzati nella cache locale per evitare rianalisi

---

## Server Ollama Personalizzato

Per impostazione predefinita l'estensione si connette a `http://localhost:11434`. Per cambiarlo:

1. Apri il popup dell'estensione
2. Seleziona la scheda **Ollama**
3. Inserisci l'URL del tuo server (es. `http://localhost:11434`)
4. Clicca **OK** — l'estensione testerà la connessione e caricherà i modelli disponibili

---

<div align="center">
  <sub>Gemini Nano e Ollama funzionano al 100% in locale — nessuna chiave API necessaria. Gemini API è opzionale e usa una chiave gratuita di Google AI Studio.</sub>
</div>

