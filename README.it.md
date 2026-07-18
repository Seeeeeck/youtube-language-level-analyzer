# YT Level — Analizzatore di Livello YouTube

**Analizza il livello CEFR (A1–C2) di qualsiasi video di YouTube usando AI locale — niente chiavi API, niente internet.**

Scegli tra due motori AI: **Gemini Nano** (integrato in Chrome) o **Ollama** (server locale). Funziona per **qualsiasi lingua** (inglese, spagnolo, francese, tedesco, cinese, ecc.). L'estensione recupera la trascrizione del video e ne classifica il livello CEFR. Un badge colorato appare su ogni miniatura del video.

<p align="center">
  <img src="icons/icon128.png" alt="Icona YT Level" width="64">
</p>

---

**🌐 Lingua**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Screenshot

<p align="center">
  <img src="screenshots/badges.svg" alt="Badge CEFR sui video YouTube" width="600">
  <br>
  <em>Badge di livello CEFR (A1–C2) sulle miniature di YouTube</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Popup dell'estensione" width="300">
  <br>
  <em>Popup di configurazione — selettore motore con schede Gemini Nano e Ollama</em>
</p>

## Caratteristiche

- 🏷️ **Badge CEFR** — cerchi colorati (A1–C2) sulle miniature dei video YouTube
- 🤖 **Due motori AI** — usa **Gemini Nano** (AI integrata di Chrome) o **Ollama** (modelli locali)
- 🌍 **Multilingua** — analizza video in qualsiasi lingua
- 🎨 **Server Ollama personalizzato** — punta a qualsiasi istanza Ollama sulla tua rete
- ⚡ **Cache veloce** — i risultati vengono salvati in locale per evitare rianalisi
- 🔒 **100% privato** — tutto funziona in locale, nessun dato lascia il tuo computer

## Requisiti

- **Chrome 128+**, **Brave**, o qualsiasi browser basato su Chromium
- **Gemini Nano**: Chrome 128+ con Prompt API abilitato (vedi sotto)
- **Ollama**: Ollama installato e in esecuzione ([ollama.com](https://ollama.com)) con almeno un modello scaricato

---

## Installazione — Gemini Nano

Gemini Nano è il modello AI integrato di Chrome. Nessun download o server necessario.

### 1. Abilita il flag Prompt API

1. Apri **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Imposta il flag su **"Enabled"**
3. Clicca **"Relaunch"** per riavviare Chrome

### 2. Controlla lo stato del modello nell'estensione

1. Clicca l'icona dell'estensione YT Level
2. Seleziona la scheda **Gemini Nano**
3. Lo stato mostrerà:
   - **Available** — pronto all'uso
   - **Downloading** — il modello è in fase di download
   - **Downloadable** — deve essere scaricato (clicca per avviare il download)
   - **Unavailable** — non supportato nel tuo browser

### 3. Scegli la lingua di analisi

Nella scheda Gemini Nano, seleziona la lingua del video che vuoi analizzare:

| Codice | Lingua  |
|--------|---------|
| en     | Inglese |
| es     | Spagnolo|
| ja     | Giapponese|
| de     | Tedesco |
| fr     | Francese|

### 4. Scegli la modalità di sforzo

- **Quick** — classificazione veloce con un prompt semplice
- **Deep** — valutazione CEFR dettagliata con un prompt completo

### 5. Carica l'estensione

1. Vai su **`chrome://extensions`** (o **`brave://extensions`**)
2. Attiva **"Modalità sviluppatore"** (angolo in alto a destra)
3. Clicca **"Carica estensione non pacchettizzata"**
4. Seleziona la cartella del progetto

### 6. Concedi i permessi (IMPORTANTE)

1. In `chrome://extensions`, clicca **"Dettagli"** su **YT Level**
2. Attiva **"Consenti a questa estensione di leggere e modificare tutti i tuoi dati sui siti web che visiti"**
3. Se richiesto, clicca **"Consenti"**

> Senza questo passaggio, l'estensione viene caricata ma non funziona sulle pagine di YouTube.

---

## Installazione — Ollama

### 1. Installa Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Scarica l'installer da [ollama.com/download](https://ollama.com/download) ed eseguilo. Ollama si avvierà automaticamente come servizio in background.

### 2. Scarica un modello

```bash
ollama pull gemma3:1b
```

> Puoi usare qualsiasi modello. L'estensione ti permette di selezionare quale usare dal popup.

### 3. Configura CORS in Ollama

L'estensione necessita dell'autorizzazione per comunicare con Ollama dal sito di YouTube.

#### Linux — Opzione A: Systemd (permanente, consigliata)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Opzione B: Manuale (temporanea)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Opzione A: Permanente (consigliata)

1. Apri **Proprietà del sistema** → **Variabili d'ambiente**
2. Aggiungi una nuova **Variabile di sistema**:
   - Nome: `OLLAMA_ORIGINS`
   - Valore: `*`
3. Clicca **OK** e riavvia Ollama dalla barra delle applicazioni (tasto destro → Esci, poi riavvialo)

#### Windows — Opzione B: Temporanea (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Su Windows, esegui questi comandi **dopo** aver chiuso Ollama dalla barra delle applicazioni.

### 4. Carica l'estensione

Come i passaggi 5 e 6 nella sezione Gemini Nano qui sopra.

### 5. Usa l'estensione con Ollama

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

## Come Funziona

1. Estrae ogni ID video dal feed di YouTube
2. Recupera la trascrizione tramite `youtube-transcript.ai`
3. Invia la trascrizione al motore AI selezionato (Gemini Nano o Ollama) per la classificazione CEFR
4. Mostra il risultato come badge circolare sulla miniatura del video
5. I risultati vengono memorizzati nella cache locale per evitare rianalisi

## Server Ollama Personalizzato

Per impostazione predefinita l'estensione si connette a `http://localhost:11434`. Puoi cambiarlo:

1. Clicca l'icona dell'estensione
2. Seleziona la scheda **Ollama**
3. Inserisci l'URL del tuo server (es. `http://192.168.1.100:11434`)
4. Clicca **OK** — l'estensione testerà la connessione e caricherà i modelli disponibili
5. Clicca **↺** per ripristinare il valore predefinito

## Struttura dei File

```
├── manifest.json      Configurazione dell'estensione
├── content.js         Script principale (iniettato in YouTube)
├── background.js      Service worker
├── popup.html         Popup dell'estensione
├── popup.js           Logica del popup
├── styles.css         Stili aggiuntivi
├── analyzer.js        Analizzatore euristico (fallback)
├── icons/             Icone dell'estensione
└── README.md          Questo file
```

## Note

- Analizza solo video che hanno **trascrizioni disponibili** su YouTube
- Il tempo di analisi dipende dall'hardware (più veloce con Gemini Nano, 20–60 secondi per video su CPU con Ollama)
- Se nessun motore è disponibile, non vengono mostrati badge
- Nessuna chiave API o connessione internet richiesta
- Tutti i dati rimangono in locale — nulla viene inviato a server esterni
