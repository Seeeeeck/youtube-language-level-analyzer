# YT Level — YouTube-Sprachniveau-Analysator

**Analysieren Sie das CEFR-Niveau (A1–C2) jedes YouTube-Videos mit lokaler KI — ohne API-Schlüssel, ohne Internetverbindung.**

Funktioniert für **alle Sprachen** (Englisch, Spanisch, Französisch, Deutsch, Chinesisch, usw.). Die Erweiterung ruft das Videotranskript ab und sendet es zur CEFR-Klassifizierung an ein lokales Ollama-Modell. Auf jedem Video-Thumbnail erscheint ein farbiges Abzeichen.

<p align="center">
  <img src="icons/icon128.png" alt="YT Level-Symbol" width="64">
</p>

---

**🌐 Sprache**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Funktionen

- 🏷️ **CEFR-Abzeichen** — farbige Kreise (A1–C2) auf YouTube-Video-Thumbnails
- 🤖 **Lokale KI** — funktioniert mit jedem Ollama-Modell (gemma, llama, mistral, usw.)
- 🌍 **Mehrsprachig** — analysiert Videos in jeder Sprache
- 🎨 **Benutzerdefinierter Server** — auf jede Ollama-Instanz in Ihrem Netzwerk verweisen
- ⚡ **Schneller Cache** — Ergebnisse werden lokal zwischengespeichert, um eine erneute Analyse zu vermeiden
- 🔒 **100 % privat** — alles läuft lokal, keine Daten verlassen Ihren Rechner

## Voraussetzungen

- **Chrome 128+**, **Brave** oder ein beliebiger Chromium-basierter Browser
- **Ollama** installiert und ausgeführt ([ollama.com](https://ollama.com))
- Mindestens **ein Ollama-Modell** heruntergeladen (z. B. `ollama pull gemma3:1b`)

## Installation — Schritt für Schritt

### 1. Ollama installieren

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Laden Sie das Installationsprogramm von [ollama.com/download](https://ollama.com/download) herunter und führen Sie es aus. Ollama wird automatisch als Hintergrunddienst gestartet.

### 2. Ein Modell herunterladen

Öffnen Sie ein Terminal (Eingabeaufforderung unter Windows) und führen Sie Folgendes aus:

```bash
ollama pull gemma3:1b
```

> Sie können jedes Modell verwenden. Die Erweiterung ermöglicht Ihnen die Auswahl des zu verwendenden Modells über das Popup.

### 3. CORS in Ollama konfigurieren

Die Erweiterung benötigt die Berechtigung, von der YouTube-Website aus mit Ollama zu kommunizieren.

#### Linux — Option A: Systemd (dauerhaft, empfohlen)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Option B: Manuell (temporär)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Option A: Dauerhaft (empfohlen)

1. Öffnen Sie **Systemeigenschaften** → **Umgebungsvariablen**
2. Fügen Sie eine neue **Systemvariable** hinzu:
   - Name: `OLLAMA_ORIGINS`
   - Wert: `*`
3. Klicken Sie auf **OK** und starten Sie Ollama über das System-Tray neu (rechtsklick → Beenden, dann erneut starten)

#### Windows — Option B: Temporär (Eingabeaufforderung)

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

> Führen Sie diese Befehle unter Windows **nach** dem Schließen von Ollama über das System-Tray aus.

### 4. Die Erweiterung im Browser laden

1. Gehen Sie zu **`chrome://extensions`** (oder **`brave://extensions`**)
2. Aktivieren Sie den **"Entwicklermodus"** (obere rechte Ecke)
3. Klicken Sie auf **"Entpackte Erweiterung laden"**
4. Wählen Sie den Projektordner aus

### 5. Berechtigungen erteilen (WICHTIG)

Einige Browser benötigen eine explizite Genehmigung, damit Erweiterungen auf Websites ausgeführt werden können:

1. Klicken Sie in `chrome://extensions` auf **"Details"** bei **YT Level**
2. Aktivieren Sie **"Erweiterung darf auf allen Websites auf Ihre Daten zugreifen"**
3. Klicken Sie auf **"Zulassen"**, wenn Sie dazu aufgefordert werden

> Ohne diesen Schritt wird die Erweiterung geladen, funktioniert aber nicht auf YouTube-Seiten.

### 6. Die Erweiterung verwenden

1. Gehen Sie zu **https://www.youtube.com**
2. Videos mit Transkripten zeigen während der Analyse einen grünen Spinner an
3. Ein farbiger Kreis erscheint mit dem Niveau: **A1**, **A2**, **B1**, **B2**, **C1** oder **C2**
4. Fahren Sie mit der Maus über das Abzeichen, um zu sehen, welches Modell verwendet wurde
5. Klicken Sie auf das Erweiterungssymbol, um das Popup zu öffnen:
   - **Server** — ändern Sie bei Bedarf Ihre Ollama-Server-URL
   - **Modell** — wählen Sie aus, welches installierte Modell verwendet werden soll
   - **Sprache** — ändern Sie die UI-Sprache der Erweiterung

## So Funktioniert es

1. Extrahiert jede Video-ID aus dem YouTube-Feed
2. Ruft das Transkript über `youtube-transcript.ai` ab
3. Sendet das Transkript an Ihr lokales Ollama-Modell mit der Anforderung einer CEFR-Klassifizierung
4. Zeigt das Ergebnis als kreisförmiges Abzeichen auf dem Video-Thumbnail an
5. Ergebnisse werden lokal zwischengespeichert, um eine erneute Analyse zu vermeiden

## Benutzerdefinierter Ollama-Server

Standardmäßig verbindet sich die Erweiterung mit `http://localhost:11434`. Sie können dies ändern:

1. Klicken Sie auf das Erweiterungssymbol
2. Geben Sie Ihre Server-URL ein (z. B. `http://192.168.1.100:11434`)
3. Klicken Sie auf **OK** — die Erweiterung testet die Verbindung und lädt verfügbare Modelle
4. Klicken Sie auf **↺**, um die Standardeinstellung wiederherzustellen

## Dateistruktur

```
├── manifest.json      Erweiterungskonfiguration
├── content.js         Hauptskript (wird in YouTube injiziert)
├── background.js      Service Worker
├── popup.html         Erweiterungs-Popup
├── popup.js           Popup-Logik
├── styles.css         Zusätzliche Stile
├── analyzer.js        Heuristischer Analysator (Fallback)
├── icons/             Erweiterungssymbole
└── README.md          Diese Datei
```

## Hinweise

- Analysiert nur Videos, die **Transkripte verfügbar** auf YouTube haben
- Die Analysezeit hängt von Ihrer Hardware und der Modellgröße ab (20–60 Sekunden pro Video auf CPU)
- Wenn Ollama nicht ausgeführt wird oder kein Modell installiert ist, werden keine Abzeichen angezeigt
- Kein API-Schlüssel oder Internetverbindung erforderlich (sobald das Modell heruntergeladen ist)
- Alle Daten bleiben lokal — nichts wird an externe Server gesendet
