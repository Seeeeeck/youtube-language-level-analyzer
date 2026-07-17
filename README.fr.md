# YT Level — Analyseur de Niveau Linguistique YouTube

**Analysez le niveau CECR (A1–C2) de n'importe quelle vidéo YouTube avec une IA locale — sans clé API, sans connexion Internet.**

Fonctionne pour **toutes les langues** (anglais, espagnol, français, allemand, chinois, etc.). L'extension récupère la transcription de la vidéo et l'envoie à un modèle Ollama local pour une classification CECR. Un badge coloré apparaît sur chaque vignette de vidéo.

<p align="center">
  <img src="icons/icon128.png" alt="Icône YT Level" width="64">
</p>

---

**🌐 Langue**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Fonctionnalités

- 🏷️ **Badges CECR** — cercles colorés (A1–C2) sur les vignettes des vidéos YouTube
- 🤖 **IA locale** — fonctionne avec tous les modèles Ollama (gemma, llama, mistral, etc.)
- 🌍 **Multilingue** — analyse des vidéos dans n'importe quelle langue
- 🎨 **Serveur personnalisé** — pointer vers n'importe quelle instance Ollama sur votre réseau
- ⚡ **Cache rapide** — les résultats sont mis en cache localement pour éviter une réanalyse
- 🔒 **100 % privé** — tout s'exécute localement, aucune donnée ne quitte votre machine

## Prérequis

- **Chrome 128+**, **Brave** ou tout navigateur basé sur Chromium
- **Ollama** installé et en cours d'exécution ([ollama.com](https://ollama.com))
- Au moins **un modèle Ollama** téléchargé (ex. `ollama pull gemma3:1b`)

## Installation — Pas à Pas

### 1. Installer Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Télécharger un modèle

```bash
ollama pull gemma3:1b
```

> Vous pouvez utiliser n'importe quel modèle. L'extension vous permet de sélectionner celui à utiliser depuis la popup.

### 3. Configurer CORS dans Ollama

L'extension a besoin d'autorisation pour communiquer avec Ollama depuis le site YouTube.

#### Option A : Systemd (permanent, recommandé)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Option B : Manuel (temporaire)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

### 4. Charger l'extension dans votre navigateur

1. Allez sur **`chrome://extensions`** (ou **`brave://extensions`**)
2. Activez le **"Mode développeur"** (coin supérieur droit)
3. Cliquez sur **"Charger l'extension non empaquetée"**
4. Sélectionnez le dossier du projet

### 5. Accorder les autorisations (IMPORTANT)

Certains navigateurs exigent une autorisation explicite pour que les extensions fonctionnent sur les sites Web :

1. Dans `chrome://extensions`, cliquez sur **"Détails"** pour **YT Level**
2. Activez **"Autoriser cette extension à lire et modifier toutes vos données sur les sites que vous visitez"**
3. Si demandé, cliquez sur **"Autoriser"**

> Sans cette étape, l'extension se charge mais ne fonctionnera pas sur les pages YouTube.

### 6. Utiliser l'extension

1. Allez sur **https://www.youtube.com**
2. Les vidéos avec transcription affichent un spinner vert pendant l'analyse
3. Un cercle coloré apparaît avec le niveau : **A1**, **A2**, **B1**, **B2**, **C1** ou **C2**
4. Survolez le badge pour voir quel modèle a été utilisé
5. Cliquez sur l'icône de l'extension pour ouvrir la popup :
   - **Serveur** — modifiez l'URL de votre serveur Ollama si nécessaire
   - **Modèle** — sélectionnez le modèle installé à utiliser
   - **Langue** — changez la langue de l'interface de l'extension

## Comment ça Marche

1. Extrait chaque ID de vidéo du fil YouTube
2. Récupère la transcription via `youtube-transcript.ai`
3. Envoie la transcription à votre modèle Ollama local en demandant une classification CECR
4. Affiche le résultat sous forme de badge circulaire sur la vignette de la vidéo
5. Les résultats sont mis en cache localement pour éviter une réanalyse

## Serveur Ollama Personnalisé

Par défaut, l'extension se connecte à `http://localhost:11434`. Vous pouvez modifier ceci :

1. Cliquez sur l'icône de l'extension
2. Saisissez l'URL de votre serveur (ex. `http://192.168.1.100:11434`)
3. Cliquez sur **OK** — l'extension testera la connexion et chargera les modèles disponibles
4. Cliquez sur **↺** pour revenir au serveur par défaut

## Structure du Projet

```
├── manifest.json      Configuration de l'extension
├── content.js         Script principal (injecté dans YouTube)
├── background.js      Service worker
├── popup.html         Popup de l'extension
├── popup.js           Logique de la popup
├── styles.css         Styles supplémentaires
├── analyzer.js        Analyseur heuristique (solution de repli)
├── icons/             Icônes de l'extension
└── README.md          Ce fichier
```

## Remarques

- Analyse uniquement les vidéos qui ont **des transcriptions disponibles** sur YouTube
- Le temps d'analyse dépend de votre matériel et de la taille du modèle (20 à 60 secondes par vidéo sur CPU)
- Si Ollama ne fonctionne pas ou qu'aucun modèle n'est installé, aucun badge n'est affiché
- Aucune clé API ni connexion Internet requise (une fois le modèle téléchargé)
- Toutes les données restent locales — rien n'est envoyé à des serveurs externes
