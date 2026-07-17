# YT Level — Analizzatore del Livello Linguistico di YouTube

**Analizza il livello CEFR (A1–C2) di qualsiasi video di YouTube usando AI locale — niente chiavi API, niente internet.**

Funziona per **qualsiasi lingua** (inglese, spagnolo, francese, tedesco, cinese, ecc.). L'estensione recupera la trascrizione del video e la invia a un modello Ollama locale per la classificazione CEFR. Un badge colorato appare su ogni miniatura del video.

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
  <em>Badge di livello CEFR (A1–C2) sulle miniature YouTube</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Popup dell'estensione" width="300">
  <br>
  <em>Popup di configurazione — server, modello e lingua</em>
</p>

## Caratteristiche

- 🏷️ **Badge CEFR** — cerchi colorati (A1–C2) sulle miniature dei video YouTube
- 🤖 **AI locale** — funziona con qualsiasi modello Ollama (gemma, llama, mistral, ecc.)
- 🌍 **Multilingua** — analizza video in qualsiasi lingua
- 🎨 **Server personalizzato** — punta a qualsiasi istanza Ollama sulla tua rete
- ⚡ **Cache veloce** — i risultati vengono salvati in locale per evitare rianalisi
- 🔒 **100% privato** — tutto funziona in locale, nessun dato lascia il tuo computer

## Requisiti

- **Chrome 128+**, **Brave**, o qualsiasi browser basato su Chromium
- **Ollama** installato e in esecuzione ([ollama.com](https://ollama.com))
- Almeno **un modello Ollama** scaricato (es. `ollama pull gemma3:1b`)

## Installazione — Passo dopo Passo

### 1. Installa Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Scarica l'installer da ollama.com/download ed eseguilo. Ollama si avvierà automaticamente come servizio in background.

### 2. Scarica un modello

Apri un terminale (Prompt dei comandi su Windows) ed esegui:

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

1. Apri Proprietà del sistema → Variabili d'ambiente
2. Aggiungi una nuova variabile di sistema:
   - Nome: `OLLAMA_ORIGINS`
   - Valore: `*`
3. Clicca OK e riavvia Ollama dalla barra delle applicazioni (tasto destro → Esci, poi riavvia)

#### Windows — Opzione B: Temporanea (Prompt dei comandi)

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

> Su Windows, esegui questi comandi dopo aver chiuso Ollama dalla barra delle applicazioni.

### 4. Carica l'estensione nel browser

1. Vai su **`chrome://extensions`** (o **`brave://extensions`**)
2. Attiva **"Modalità sviluppatore"** (angolo in alto a destra)
3. Clicca **"Carica estensione non pacchettizzata"**
4. Seleziona la cartella del progetto

### 5. Concedi i permessi (IMPORTANTE)

Alcuni browser richiedono un'autorizzazione esplicita per far funzionare le estensioni sui siti web:

1. In `chrome://extensions`, clicca **"Dettagli"** su **YT Level**
2. Attiva **"Consenti a questa estensione di leggere e modificare tutti i tuoi dati sui siti web che visiti"**
3. Se richiesto, clicca **"Consenti"**

> Senza questo passaggio, l'estensione viene caricata ma non funziona sulle pagine di YouTube.

### 6. Usa l'estensione

1. Vai su **https://www.youtube.com**
2. I video con trascrizione mostrano uno spinner verde durante l'analisi
3. Appare un cerchio colorato con il livello: **A1**, **A2**, **B1**, **B2**, **C1** o **C2**
4. Passa il mouse sul badge per vedere quale modello è stato usato
5. Clicca l'icona dell'estensione per aprire il popup:
   - **Server** — modifica l'URL del tuo server Ollama se necessario
   - **Modello** — seleziona quale modello installato utilizzare
   - **Lingua** — cambia la lingua dell'interfaccia dell'estensione

## Come Funziona

1. Estrae ogni ID video dal feed di YouTube
2. Recupera la trascrizione tramite `youtube-transcript.ai`
3. Invia la trascrizione al tuo modello Ollama locale richiedendo la classificazione CEFR
4. Mostra il risultato come badge circolare sulla miniatura del video
5. I risultati vengono memorizzati nella cache locale per evitare rianalisi

## Server Ollama Personalizzato

Per impostazione predefinita, l'estensione si connette a `http://localhost:11434`. Puoi cambiarlo:

1. Clicca l'icona dell'estensione
2. Inserisci l'URL del tuo server (es. `http://192.168.1.100:11434`)
3. Clicca **OK** — l'estensione testerà la connessione e caricherà i modelli disponibili
4. Clicca **↺** per ripristinare il valore predefinito

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
- Il tempo di analisi dipende dall'hardware e dalla dimensione del modello (20–60 secondi per video su CPU)
- Se Ollama non è in esecuzione o nessun modello è installato, non vengono mostrati badge
- Nessuna chiave API o connessione internet richiesta (una volta scaricato il modello)
- Tutti i dati rimangono in locale — nulla viene inviato a server esterni
