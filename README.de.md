<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>YouTube-Sprachniveau-Analysator</strong></p>
  <p>Analysieren Sie das CEFR-Niveau (A1–C2) jedes YouTube-Videos mit lokaler KI — kein API-Schlüssel, keine Internetverbindung erforderlich.</p>
  <p>Wählen Sie zwischen drei KI-Engines: <strong>Gemini API</strong> (Cloud, kostenlose Stufe), <strong>Gemini Nano</strong> (in Chrome integriert) oder <strong>Ollama</strong> (lokaler Server). Funktioniert für <strong>jede Sprache</strong>.</p>
</div>

---

**🌐 Sprache**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Installieren

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Verfügbar im Chrome Web Store</a>
</div>

> Nach der Installation funktioniert die Erweiterung automatisch auf YouTube. Klicken Sie auf das Erweiterungssymbol, um die Einstellungen zu öffnen.

---

## Screenshots

<p align="center">
  <img src="screenshots/levels_design.svg" alt="CEFR-Level-Abzeichen (A1-C2) auf YouTube-Thumbnails" width="700">
  <br>
  <em>CEFR-Level-Abzeichen (A1-C2) auf YouTube-Thumbnails</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="Erweiterungs-Popup — Gemini-Nano-Tab" width="500">
  <br>
  <em>Erweiterungs-Popup — Gemini-Nano-Tab</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="Erweiterungs-Popup — Ollama-Tab" width="500">
  <br>
  <em>Erweiterungs-Popup — Ollama-Tab</em>
</p>

---

## Funktionen

- 🏷️ **CEFR-Abzeichen** — Farbige Kreise (A1-C2) auf YouTube-Video-Thumbnails
- 🤖 **Drei KI-Engines** — Verwenden Sie Gemini API (Cloud), Gemini Nano (in Chrome integrierte KI) oder Ollama (lokale Modelle)
- 🌍 **Mehrsprachig** — Analysiert Videos in jeder Sprache
- 🔒 **100 % privat** — Alles läuft lokal, keine Daten verlassen Ihren Rechner
- 🎛️ **Benutzerdefinierter Server** — Auf jede Ollama-Instanz in Ihrem Netzwerk verweisen
- ⚡ **Schneller Cache** — Ergebnisse werden lokal zwischengespeichert, um eine erneute Analyse zu vermeiden
- 📏 **Anpassbare Stichprobengröße** — Wählen Sie, wie viele Zeichen des Transkripts analysiert werden (3000/6000/12000), um Geschwindigkeit und Genauigkeit abzuwägen

---

## Voraussetzungen

- **Chrome 128+**, **Brave** oder ein beliebiger Chromium-basierter Browser
- **Gemini API**: Kostenloser API-Schlüssel von [Google AI Studio](https://aistudio.google.com/apikey)
- **Gemini Nano**: Chrome 128+ mit aktivierter Prompt-API
- **Ollama**: Ollama installiert und ausgeführt ([ollama.com](https://ollama.com)) mit mindestens einem heruntergeladenen Modell

---

## Gemini API

Gemini API nutzt die Cloud-KI-Modelle von Google mit einem kostenlosen API-Schlüssel von Google AI Studio. Funktioniert in jedem Chromium-basierten Browser und erfordert keinen Modell-Download.

> Im Gegensatz zu Gemini Nano und Ollama sendet die Gemini API das Transkript zur Verarbeitung an die Server von Google.

### 1. Ihren API-Schlüssel erhalten

1. Gehen Sie zu **Google AI Studio**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Melden Sie sich mit Ihrem Google-Konto an
3. Klicken Sie auf **"Create API key"**
4. Kopieren Sie den generierten Schlüssel (beginnt mit `AIza...`)

> Die Gemini API bietet eine kostenlose Stufe mit großzügigen Nutzungslimits — keine Kreditkarte für den Einstieg erforderlich.

### 2. In der Erweiterung konfigurieren

1. Klicken Sie auf das Erweiterungssymbol
2. Wählen Sie den **API Gemini**-Tab
3. Fügen Sie Ihren API-Schlüssel in das Feld ein
4. Klicken Sie auf **OK**, um den Schlüssel zu speichern und zu testen
5. Wählen Sie ein Modell aus dem Dropdown-Menü

---

## Gemini Nano

Gemini Nano ist das integrierte KI-Modell von Chrome. Sie müssen das KI-Modell herunterladen.

> Chrome wird für Gemini Nano empfohlen. Es kann in anderen Browsern nicht funktionieren.

> Funktioniert nicht in Ihrem Browser? Nutzen Sie stattdessen die Ollama-Option unten — sie funktioniert in jedem Chromium-basierten Browser.

> Ein Gemini Nano-Modell wird heruntergeladen. Schließen Sie den Browser nicht, bis es bereit ist.

### 1. Nano AI aktivieren

1. Geben Sie dies in die Adressleiste ein: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Setzen Sie das Flag auf **"Enabled Multilanguage"**
3. Klicken Sie auf **"Relaunch"** oder starten Sie den Browser neu

> Falls das Modell nicht mit dem Download beginnt, aktivieren Sie zusätzlich (empfohlen): **`chrome://flags/#optimization-guide-on-device-model`** und wählen Sie **"Enabled BypassPerfRequirement"**

### 2. Den Modellstatus überprüfen

Öffnen Sie das YT Level-Popup und wählen Sie den **Gemini Nano**-Tab:

| Status | Bedeutung |
|--------|---------|
| **Available** | Bereit zur Verwendung |
| **Downloading** | Das Modell wird heruntergeladen |
| **Downloadable** | Muss zuerst heruntergeladen werden |
| **Unavailable** | Wird in Ihrem Browser nicht unterstützt oder Modell nicht heruntergeladen |

### 3. Die Analysesprache auswählen

Wählen Sie die Sprache des zu analysierenden Videos:

| Code | Sprache |
|------|----------|
| en | Englisch |
| es | Spanisch |
| ja | Japanisch |
| de | Deutsch |
| fr | Französisch |

> Gemini Nano unterstützt mehrsprachige Analysen. Wählen Sie die Sprache, die zum Videoinhalt passt.

---

## Ollama

> Funktioniert in jedem Chromium-basierten Browser: Chrome, Brave, Edge, Vivaldi, Opera und mehr.

### 1. Ollama installieren

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

Laden Sie das Installationsprogramm von [ollama.com/download](https://ollama.com/download) herunter und führen Sie es aus.

### 2. Ein Modell herunterladen

Führen Sie dies in einem Terminal (Linux/macOS) oder PowerShell/CMD (Windows) aus:

```bash
ollama pull gemma3:1b
```

> Sie können jedes Modell aus der [Ollama-Modellbibliothek](https://ollama.com/library) verwenden — wählen Sie es im Ollama-Tab des Erweiterungs-Popups aus. Ein leichtes/kleines Modell (wie `gemma3:1b`) wird für schnellere Antworten empfohlen.

### 3. CORS konfigurieren

Die Erweiterung benötigt die Berechtigung, von YouTube aus mit Ollama zu kommunizieren.

#### Linux — Systemd (dauerhaft)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Temporär

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Dauerhaft

1. Öffnen Sie **Systemeigenschaften** -> **Umgebungsvariablen**
2. Fügen Sie eine neue **Systemvariable** hinzu: `OLLAMA_ORIGINS` = `*`
3. Klicken Sie auf **OK** und starten Sie Ollama neu

#### Windows — Temporär (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Wenn Sie Ollama von einem anderen PC in Ihrem Netzwerk aus verwenden möchten, öffnen Sie die Ollama-Einstellungen und aktivieren Sie "Ollama im Netzwerk verfügbar machen". Dies ermöglicht Verbindungen von anderen Geräten in Ihrem lokalen Netzwerk.

### 4. In der Erweiterung konfigurieren

1. Klicken Sie auf das Erweiterungssymbol
2. Wählen Sie den **Ollama**-Tab
3. Geben Sie Ihre Server-URL ein (Standard: `http://localhost:11434`)
4. Klicken Sie auf **OK**, um die Verbindung zu testen
5. Wählen Sie ein Modell aus dem Dropdown-Menü

---

## Verwendung der Erweiterung

1. Gehen Sie zu **https://www.youtube.com**
2. Videos mit Transkripten zeigen während der Analyse einen grünen Spinner
3. Ein farbiger Kreis erscheint mit dem Niveau: **A1**, **A2**, **B1**, **B2**, **C1** oder **C2**
4. Fahren Sie mit der Maus über das Abzeichen, um zu sehen, welche Engine und welches Modell verwendet wurde
5. Klicken Sie auf das Erweiterungssymbol, um das Popup zu öffnen und zwischen den Engines zu wechseln

---

## So funktioniert es

1. Extrahiert jede Video-ID aus dem YouTube-Feed
2. Ruft das Transkript des Videos ab
3. Sendet das Transkript an die ausgewählte KI-Engine (Gemini API, Gemini Nano oder Ollama) zur CEFR-Klassifizierung
4. Zeigt das Ergebnis als kreisförmiges Abzeichen auf dem Video-Thumbnail an
5. Ergebnisse werden lokal zwischengespeichert, um eine erneute Analyse zu vermeiden

---

## Benutzerdefinierter Ollama-Server

Standardmäßig verbindet sich die Erweiterung mit `http://localhost:11434`. So ändern Sie dies:

1. Öffnen Sie das Erweiterungs-Popup
2. Wählen Sie den **Ollama**-Tab
3. Geben Sie Ihre Server-URL ein (z. B. `http://localhost:11434`)
4. Klicken Sie auf **OK** — die Erweiterung testet die Verbindung und lädt verfügbare Modelle

---

<div align="center">
  <sub>Gemini Nano und Ollama laufen zu 100 % lokal — kein API-Schlüssel nötig. Gemini API ist optional und nutzt einen kostenlosen Schlüssel von Google AI Studio.</sub>
</div>

