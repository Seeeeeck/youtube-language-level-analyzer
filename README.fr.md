<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analyseur de Niveau Linguistique YouTube</strong></p>
  <p>Analysez le niveau CECR (A1–C2) de n'importe quelle vidéo YouTube avec une IA locale — sans clé API, sans connexion Internet.</p>
  <p>Choisissez entre trois moteurs d'IA : <strong>Gemini API</strong> (cloud, offre gratuite), <strong>Gemini Nano</strong> (intégré dans Chrome) ou <strong>Ollama</strong> (serveur local). Fonctionne pour <strong>toutes les langues</strong>.</p>
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
  <img src="screenshots/levels_design.svg" alt="Badges de niveau CECR (A1-C2) superposées sur les vignettes YouTube" width="700">
  <br>
  <em>Badges de niveau CECR (A1-C2) superposées sur les vignettes YouTube</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="Popup de l'extension — onglet Gemini Nano" width="500">
  <br>
  <em>Popup de l'extension — onglet Gemini Nano</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="Popup de l'extension — onglet Ollama" width="500">
  <br>
  <em>Popup de l'extension — onglet Ollama</em>
</p>

---

## Fonctionnalités

- 🏷️ **Badges CECR** — Cercles colorés (A1-C2) sur les vignettes des vidéos YouTube
- 🤖 **Trois moteurs d'IA** — Utilisez Gemini API (cloud), Gemini Nano (IA intégrée dans Chrome) ou Ollama (modèles locaux)
- 🌍 **Multilingue** — Analyse les vidéos dans toutes les langues
- 🔒 **100 % prive** — Tout s'exécute localement, aucune donnée ne quitte votre machine
- 🎛️ **Serveur personnalise** — Pointer vers n'importe quelle instance Ollama sur votre réseau
- ⚡ **Cache rapide** — Les résultats sont mis en cache localement pour éviter une réanalyse
- 📏 **Taille d'échantillon ajustable** — Choisissez le nombre de caractères de la transcription à analyser (3000/6000/12000) pour équilibrer vitesse et précision

---

## Prérequis

- **Chrome 128+**, **Brave** ou tout navigateur basé sur Chromium
- **Gemini API** : Clé API gratuite depuis [Google AI Studio](https://aistudio.google.com/apikey)
- **Gemini Nano** : Chrome 128+ avec Prompt API activée
- **Ollama** : Ollama installé et en cours d'exécution ([ollama.com](https://ollama.com)) avec au moins un modèle téléchargé

---

## Gemini API

Gemini API utilise les modèles d'IA cloud de Google avec une clé API gratuite de Google AI Studio. Fonctionne sur tout navigateur basé sur Chromium et ne nécessite le téléchargement d'aucun modèle.

> Contrairement à Gemini Nano et Ollama, Gemini API envoie la transcription aux serveurs de Google pour traitement.

### 1. Obtenez votre clé API

1. Rendez-vous sur **Google AI Studio** : [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Create API key"**
4. Copiez la clé générée (commence par `AIza...`)

> Gemini API propose une offre gratuite avec des limites d'utilisation généreuses — aucune carte bancaire requise pour commencer.

### 2. Configurer dans l'extension

1. Cliquez sur l'icône de l'extension
2. Sélectionnez l'onglet **API Gemini**
3. Collez votre clé API dans le champ
4. Cliquez sur **OK** pour enregistrer et tester la clé
5. Sélectionnez un modèle dans la liste déroulante

---

## Gemini Nano

Gemini Nano est le modèle d'IA intégré de Chrome. Vous devez télécharger le modèle d'IA d'abord.

> Chrome est recommandé pour Gemini Nano. Il peut ne pas fonctionner dans d'autres navigateurs.

> Ca ne fonctionne pas dans votre navigateur ? Utilisez plutôt l'option Ollama ci-dessous — elle fonctionne sur tout navigateur basé sur Chromium.

> Un modèle Gemini Nano sera téléchargé. Ne fermez pas le navigateur jusqu'à ce qu'il soit prêt.

### 1. Activer l'IA Nano

1. Saisissez ceci dans la barre d'adresse : **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Définissez le flag sur **"Enabled Multilanguage"**
3. Cliquez sur **"Relaunch"** ou redémarrez le navigateur

> Si le modèle ne commence pas à se télécharger, activez aussi (recommandé) : **`chrome://flags/#optimization-guide-on-device-model`** et sélectionnez **"Enabled BypassPerfRequirement"**

### 2. Vérifier l'état du modèle

Ouvrez la popup YT Level et sélectionnez l'onglet **Gemini Nano** :

| Statut | Signification |
|--------|---------|
| **Available** | Prêt à l'emploi |
| **Downloading** | Le modèle est en cours de téléchargement |
| **Downloadable** | Doit être téléchargé d'abord |
| **Unavailable** | Non pris en charge par votre navigateur ou modèle non téléchargé |

### 3. Choisir la langue d'analyse

Sélectionnez la langue de la vidéo que vous souhaitez analyser :

| Code | Langue |
|------|----------|
| en | Anglais |
| es | Espagnol |
| ja | Japonais |
| de | Allemand |
| fr | Français |

> Gemini Nano prend en charge l'analyse multilingue. Sélectionnez la langue qui correspond au contenu de la vidéo.

---

## Ollama

> Fonctionne sur tout navigateur basé sur Chromium : Chrome, Brave, Edge, Vivaldi, Opera, et plus encore.

### 1. Installer Ollama

**Linux / macOS :**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows :**

Téléchargez l'installateur depuis [ollama.com/download](https://ollama.com/download) et exécutez-le.

### 2. Télécharger un modèle

Exécutez ceci dans un terminal (Linux/macOS) ou PowerShell/CMD (Windows) :

```bash
ollama pull gemma3:1b
```

> Vous pouvez utiliser n'importe quel modèle de la [bibliothèque de modèles Ollama](https://ollama.com/library) — sélectionnez-le depuis l'onglet Ollama dans la popup de l'extension. Un modèle léger/petit (comme `gemma3:1b`) est recommandé pour des réponses plus rapides.

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

1. Ouvrez **Propriétés système** -> **Variables d'environnement**
2. Ajoutez une nouvelle **Variable système** : `OLLAMA_ORIGINS` = `*`
3. Cliquez sur **OK** et redémarrez Ollama

#### Windows — Temporaire (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Si vous souhaitez utiliser Ollama depuis un autre PC sur votre réseau, ouvrez les paramètres Ollama et activez "Exposer Ollama au réseau". Cela autorise les connexions depuis d'autres appareils sur votre réseau local.

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
2. Récupère la transcription de la vidéo
3. Envoie la transcription au moteur d'IA sélectionné (Gemini API, Gemini Nano ou Ollama) pour une classification CECR
4. Affiche le résultat sous forme de badge circulaire sur la vignette de la vidéo
5. Les résultats sont mis en cache localement pour éviter une réanalyse

---

## Serveur Ollama Personnalisé

Par défaut, l'extension se connecte à `http://localhost:11434`. Pour le modifier :

1. Ouvrez la popup de l'extension
2. Sélectionnez l'onglet **Ollama**
3. Saisissez l'URL de votre serveur (ex. `http://localhost:11434`)
4. Cliquez sur **OK** — l'extension testera la connexion et chargera les modèles disponibles

---

<div align="center">
  <sub>Gemini Nano et Ollama fonctionnent à 100 % en local — aucune clé API requise. Gemini API est optionnel et utilise une clé gratuite de Google AI Studio.</sub>
</div>

