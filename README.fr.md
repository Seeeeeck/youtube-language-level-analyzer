# YT Level — Analyseur de Niveau YouTube

**Analysez le niveau CECR (A1–C2) de n'importe quelle vidéo YouTube avec une IA locale — sans clé API, sans connexion Internet.**

Choisissez entre deux moteurs d'IA : **Gemini Nano** (IA intégrée dans Chrome) ou **Ollama** (serveur local). Fonctionne pour **toutes les langues** (anglais, espagnol, français, allemand, chinois, etc.). L'extension récupère la transcription de la vidéo et classifie son niveau CECR. Un badge coloré apparaît sur chaque vignette de vidéo.

<p align="center">
  <img src="icons/icon128.png" alt="Icône YT Level" width="64">
</p>

---

**🌐 Langue**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Captures d'écran

<p align="center">
  <img src="screenshots/badges.svg" alt="Badges CECR sur les vidéos YouTube" width="600">
  <br>
  <em>Badges de niveau CECR (A1–C2) superposés sur les vignettes YouTube</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Popup de l'extension" width="300">
  <br>
  <em>Popup de configuration — sélecteur de moteur avec onglets Gemini Nano et Ollama</em>
</p>

## Fonctionnalités

- 🏷️ **Badges CECR** — cercles colorés (A1–C2) sur les vignettes des vidéos YouTube
- 🤖 **Deux moteurs d'IA** — utilisez **Gemini Nano** (IA intégrée dans Chrome) ou **Ollama** (modèles locaux)
- 🌍 **Multilingue** — analyse les vidéos dans toutes les langues
- 🎨 **Serveur Ollama personnalisé** — pointer vers n'importe quelle instance Ollama sur votre réseau
- ⚡ **Cache rapide** — les résultats sont mis en cache localement pour éviter une réanalyse
- 🔒 **100 % privé** — tout s'exécute localement, aucune donnée ne quitte votre machine

## Prérequis

- **Chrome 128+**, **Brave** ou tout navigateur basé sur Chromium
- **Gemini Nano** : Chrome 128+ avec Prompt API activée (voir ci-dessous)
- **Ollama** : Ollama installé et en cours d'exécution ([ollama.com](https://ollama.com)) avec au moins un modèle téléchargé

---

## Installation — Gemini Nano

Gemini Nano est le modèle d'IA intégré de Chrome. Aucun téléchargement ni serveur nécessaire.

### 1. Activer le flag Prompt API

1. Ouvrez **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Définissez le flag sur **"Enabled"**
3. Cliquez sur **"Relaunch"** pour redémarrer Chrome

### 2. Vérifier l'état du modèle dans l'extension

1. Cliquez sur l'icône de l'extension YT Level
2. Sélectionnez l'onglet **Gemini Nano**
3. Le statut affichera :
   - **Available** — prêt à l'emploi
   - **Downloading** — le modèle est en cours de téléchargement
   - **Downloadable** — doit être téléchargé d'abord (cliquez pour lancer le téléchargement)
   - **Unavailable** — non pris en charge par votre navigateur

### 3. Choisir la langue d'analyse

Dans l'onglet Gemini Nano, sélectionnez la langue de la vidéo que vous souhaitez analyser :

| Code | Langue  |
|------|---------|
| en   | Anglais |
| es   | Espagnol|
| ja   | Japonais|
| de   | Allemand|
| fr   | Français|

### 4. Choisir le mode d'effort

- **Quick** — classification rapide avec une invite simple
- **Deep** — évaluation CECR détaillée avec une invite complète

### 5. Charger l'extension

1. Allez sur **`chrome://extensions`** (ou **`brave://extensions`**)
2. Activez le **"Mode développeur"** (coin supérieur droit)
3. Cliquez sur **"Charger l'extension non empaquetée"**
4. Sélectionnez le dossier du projet

### 6. Accorder les autorisations (IMPORTANT)

1. Dans `chrome://extensions`, cliquez sur **"Détails"** pour **YT Level**
2. Activez **"Autoriser cette extension à lire et modifier toutes vos données sur les sites que vous visitez"**
3. Si demandé, cliquez sur **"Autoriser"**

> Sans cette étape, l'extension se charge mais ne fonctionnera pas sur les pages YouTube.

---

## Installation — Ollama

### 1. Installer Ollama

**Linux / macOS :**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows :**
Téléchargez l'installateur depuis [ollama.com/download](https://ollama.com/download) et exécutez-le. Ollama démarrera automatiquement en tant que service d'arrière-plan.

### 2. Télécharger un modèle

```bash
ollama pull gemma3:1b
```

> Vous pouvez utiliser n'importe quel modèle. L'extension vous permet de sélectionner celui à utiliser depuis la popup.

### 3. Configurer CORS dans Ollama

L'extension a besoin d'autorisation pour communiquer avec Ollama depuis le site YouTube.

#### Linux — Option A : Systemd (permanent, recommandé)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Option B : Manuel (temporaire)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Option A : Permanent (recommandé)

1. Ouvrez **Propriétés système** → **Variables d'environnement**
2. Ajoutez une nouvelle **Variable système** :
   - Nom : `OLLAMA_ORIGINS`
   - Valeur : `*`
3. Cliquez sur **OK** et redémarrez Ollama depuis la barre d'état système (clic droit → Quitter, puis redémarrez-le)

#### Windows — Option B : Temporaire (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Sous Windows, exécutez ces commandes **après** avoir fermé Ollama depuis la barre d'état système.

### 4. Charger l'extension

Identique aux étapes 5 et 6 de la section Gemini Nano ci-dessus.

### 5. Utiliser l'extension avec Ollama

1. Cliquez sur l'icône de l'extension
2. Sélectionnez l'onglet **Ollama**
3. Définissez l'URL de votre serveur (par défaut : `http://localhost:11434`)
4. Cliquez sur **OK** pour tester la connexion
5. Sélectionnez un modèle dans la liste déroulante

---

## Utiliser l'Extension

1. Allez sur **https://www.youtube.com**
2. Les vidéos avec transcription affichent un spinner vert pendant l'analyse
3. Un cercle coloré apparaît avec le niveau : **A1**, **A2**, **B1**, **B2**, **C1** ou **C2**
4. Survolez le badge pour voir quel moteur et modèle ont été utilisés
5. Cliquez sur l'icône de l'extension pour ouvrir la popup et basculer entre les moteurs

## Comment ça Marche

1. Extrait chaque ID de vidéo du fil YouTube
2. Récupère la transcription via `youtube-transcript.ai`
3. Envoie la transcription au moteur d'IA sélectionné (Gemini Nano ou Ollama) pour une classification CECR
4. Affiche le résultat sous forme de badge circulaire sur la vignette de la vidéo
5. Les résultats sont mis en cache localement pour éviter une réanalyse

## Serveur Ollama Personnalisé

Par défaut, l'extension se connecte à `http://localhost:11434`. Vous pouvez modifier ceci :

1. Cliquez sur l'icône de l'extension
2. Sélectionnez l'onglet **Ollama**
3. Saisissez l'URL de votre serveur (ex. `http://192.168.1.100:11434`)
4. Cliquez sur **OK** — l'extension testera la connexion et chargera les modèles disponibles
5. Cliquez sur **↺** pour revenir à l'URL par défaut

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
- Le temps d'analyse dépend de votre matériel (plus rapide avec Gemini Nano, 20 à 60 secondes par vidéo sur CPU avec Ollama)
- Si aucun moteur n'est disponible, aucun badge n'est affiché
- Aucune clé API ni connexion Internet requise
- Toutes les données restent locales — rien n'est envoyé à des serveurs externes
