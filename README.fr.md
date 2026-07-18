<div align="center">
  <img src="icons/icon128.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analyseur de Niveau Linguistique YouTube</strong></p>
  <p>Analysez le niveau CECR (A1–C2) de n'importe quelle vidéo YouTube avec une IA locale — sans clé API, sans connexion Internet.</p>
  <p>Choisissez entre deux moteurs d'IA : <strong>Gemini Nano</strong> (intégré dans Chrome) ou <strong>Ollama</strong> (serveur local). Fonctionne pour <strong>toutes les langues</strong>.</p>
</div>

---

**🌐 Langue**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Installation

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Disponible sur le Chrome Web Store</a>
</div>

> Une fois installée, l'extension fonctionne automatiquement sur YouTube. Cliquez sur l'icône de l'extension pour la configurer.

---

## Captures d'écran

<p align="center">
  <img src="screenshots/badges.svg" alt="Badges CECR sur les vidéos YouTube" width="700">
  <br>
  <em>Badges de niveau CECR (A1–C2) superposés sur les vignettes YouTube</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Popup de l'extension" width="280">
  <br>
  <em>Popup de configuration — sélecteur de moteur avec onglets Gemini Nano et Ollama</em>
</p>

---

## Fonctionnalités

- 🏷️ **Badges CECR** — cercles colorés (A1–C2) sur les vignettes des vidéos YouTube
- 🤖 **Deux moteurs d'IA** — utilisez **Gemini Nano** (IA intégrée dans Chrome) ou **Ollama** (modèles locaux)
- 🌍 **Multilingue** — analyse les vidéos dans toutes les langues
- 🎨 **Serveur Ollama personnalisé** — pointer vers n'importe quelle instance Ollama sur votre réseau
- ⚡ **Cache rapide** — les résultats sont mis en cache localement pour éviter une réanalyse
- 🔒 **100 % privé** — tout s'exécute localement, aucune donnée ne quitte votre machine

---

## Prérequis

- **Chrome 128+**, **Brave** ou tout navigateur basé sur Chromium
- **Gemini Nano** : Chrome 128+ avec Prompt API activée
- **Ollama** : Ollama installé et en cours d'exécution ([ollama.com](https://ollama.com)) avec au moins un modèle téléchargé

---

## Gemini Nano

Gemini Nano est le modèle d'IA intégré de Chrome. Aucun téléchargement ni serveur nécessaire.

### 1. Activer le flag Prompt API

1. Ouvrez **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Définissez le flag sur **"Enabled"**
3. Cliquez sur **"Relaunch"** pour redémarrer Chrome

### 2. Vérifier l'état du modèle

Ouvrez la popup YT Level et sélectionnez l'onglet **Gemini Nano** :

| Statut | Signification |
|--------|---------------|
| **Available** | Prêt à l'emploi |
| **Downloading** | Le modèle est en cours de téléchargement |
| **Downloadable** | Doit être téléchargé d'abord |
| **Unavailable** | Non pris en charge par votre navigateur |

### 3. Choisir la langue d'analyse

Sélectionnez la langue de la vidéo que vous souhaitez analyser :

| Code | Langue |
|------|--------|
| en | Anglais |
| es | Espagnol |
| ja | Japonais |
| de | Allemand |
| fr | Français |

### 4. Choisir le mode d'effort

- **Quick** — classification rapide avec une invite simple
- **Deep** — évaluation CECR détaillée avec une invite complète

---

## Ollama

### 1. Installer Ollama

**Linux / macOS :**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows :**
Téléchargez l'installateur depuis [ollama.com/download](https://ollama.com/download) et exécutez-le.

### 2. Télécharger un modèle

```bash
ollama pull gemma3:1b
```

> Vous pouvez utiliser n'importe quel modèle. Sélectionnez-le depuis l'onglet Ollama dans la popup de l'extension.

### 3. Configurer CORS

L'extension a besoin d'autorisation pour communiquer avec Ollama depuis YouTube.

#### Linux — Systemd (permanent)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Temporaire

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Permanent

1. Ouvrez **Propriétés système** → **Variables d'environnement**
2. Ajoutez une nouvelle **Variable système** : `OLLAMA_ORIGINS` = `*`
3. Cliquez sur **OK** et redémarrez Ollama

#### Windows — Temporaire (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. Configurer dans l'extension

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

---

## Comment ça Marche

1. Extrait chaque ID de vidéo du fil YouTube
2. Récupère la transcription via `youtube-transcript.ai`
3. Envoie la transcription au moteur d'IA sélectionné (Gemini Nano ou Ollama) pour une classification CECR
4. Affiche le résultat sous forme de badge circulaire sur la vignette de la vidéo
5. Les résultats sont mis en cache localement pour éviter une réanalyse

---

## Serveur Ollama Personnalisé

Par défaut, l'extension se connecte à `http://localhost:11434`. Pour le modifier :

1. Ouvrez la popup de l'extension
2. Sélectionnez l'onglet **Ollama**
3. Saisissez l'URL de votre serveur (ex. `http://192.168.1.100:11434`)
4. Cliquez sur **OK** — l'extension testera la connexion et chargera les modèles disponibles

---

<div align="center">
  <sub>Aucune clé API ni connexion Internet requise. Toutes les données restent locales.</sub>
</div>
