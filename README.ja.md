<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>YouTube Language Level Analyzer</strong></p>
  <p>ローカル AI を使用して YouTube 動画の CEFR レベル（A1～C2）を分析 — API キーもインターネットも不要。</p>
  <p><strong>Gemini API</strong>（クラウド、無料枠）、<strong>Gemini Nano</strong>（Chrome に組み込み）、<strong>Ollama</strong>（ローカルサーバー）の 3 つの AI エンジンから選択可能。<strong>あらゆる言語</strong>に対応。</p>
</div>

---

**🌐 言語**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## インストール

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Chrome Web Store で入手</a>
</div>

> インストール後、拡張機能は YouTube で自動的に動作します。拡張機能のアイコンをクリックして設定してください。

---

## スクリーンショット

<p align="center">
  <img src="screenshots/levels_design.svg" alt="YouTube動画のサムネイルに表示されるCEFRレベルバッジ(A1-C2)" width="700">
  <br>
  <em>YouTube動画のサムネイルに表示されるCEFRレベルバッジ(A1-C2)</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="拡張機能のポップアップ — Gemini Nanoタブ" width="500">
  <br>
  <em>拡張機能のポップアップ — Gemini Nanoタブ</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="拡張機能のポップアップ — Ollamaタブ" width="500">
  <br>
  <em>拡張機能のポップアップ — Ollamaタブ</em>
</p>

---

## 機能

- 🏷️ **CEFRバッジ** — YouTube動画のサムネイルに表示される色付きの円(A1-C2)
- 🤖 **3つのAIエンジン** — Gemini API(クラウド)、Gemini Nano(Chrome内蔵AI)、またはOllama(ローカルモデル)を使用
- 🌍 **多言語対応** — 英語、スペイン語、フランス語、ドイツ語、日本語など、さまざまな言語の動画を分析
- 🔒 **100%プライベート** — すべてローカルで実行 — データが端末の外に出ることはありません
- 🎛️ **カスタムサーバー** — ネットワーク上の任意のOllamaインスタンスを指定可能
- ⚡ **高速キャッシュ** — 結果はローカルにキャッシュされ、再分析を回避します
- 📏 **分析文字数を調整可能** — 文字起こしのうち分析する文字数(3000/6000/12000)を選び、速度と精度のバランスを取れます

---

## 必要条件

- **Chrome 128以降**、**Brave**、またはChromiumベースの任意のブラウザ
- **Gemini API**:[Google AI Studio](https://aistudio.google.com/apikey)から取得できる無料のAPIキー
- **Gemini Nano**:Prompt APIを有効にしたChrome 128以降
- **Ollama**:Ollamaがインストールされ実行中であること([ollama.com](https://ollama.com))。少なくとも1つのモデルをダウンロード済みであること

---

## Gemini API

Gemini APIは、Google AI Studioの無料APIキーを使用してGoogleのクラウドAIモデルを利用します。Chromiumベースのどのブラウザでも動作し、モデルのダウンロードは不要です。

> Gemini NanoやOllamaとは異なり、Gemini APIは処理のために文字起こしをGoogleのサーバーに送信します。

### 1. APIキーを取得する

1. **Google AI Studio**にアクセスします:[aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Googleアカウントでログインします
3. **「Create API key」**をクリックします
4. 生成されたキー(`AIza...`で始まります)をコピーします

> Gemini APIには無料枠があり、利用上限も十分に大きく設定されています —— 開始にクレジットカードは不要です。

### 2. 拡張機能で設定する

1. 拡張機能のアイコンをクリックします
2. **API Gemini**タブを選択します
3. APIキーを入力欄に貼り付けます
4. **OK**をクリックしてキーを保存・テストします
5. ドロップダウンからモデルを選択します

---

## Gemini Nano

Gemini NanoはChromeに内蔵されたAIモデルです。まずAIモデルをダウンロードする必要があります。

> Gemini NanoにはChromeの使用をおすすめします。他のブラウザでは動作しない場合があります。

> お使いのブラウザで動作しませんか？代わりに下のOllamaオプションを使用してください — Chromiumベースのどのブラウザでも動作します。

> Gemini Nanoのモデルがダウンロードされます。準備が完了するまでブラウザを閉じないでください。

### 1. Nano AIを有効化する

1. ブラウザのアドレスバーに以下を入力してください: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. フラグを**「Enabled Multilanguage」**に設定します
3. **「Relaunch」**をクリックするか、ブラウザを再起動します

> モデルのダウンロードが始まらない場合は、こちらも有効にしてください（推奨）： **`chrome://flags/#optimization-guide-on-device-model`** を開き **"Enabled BypassPerfRequirement"** を選択

### 2. モデルの状態を確認する

YT Levelのポップアップを開き、**Gemini Nano**タブを選択します:

| 状態 | 意味 |
|--------|---------|
| **Available** | 使用可能 |
| **Downloading** | モデルをダウンロード中 |
| **Downloadable** | 先にダウンロードが必要 |
| **Unavailable** | お使いのブラウザでサポートされていないか、モデルが未ダウンロードです |

### 3. 分析する言語を選択する

分析したい動画の言語を選択してください:

| コード | 言語 |
|------|----------|
| en | 英語 |
| es | スペイン語 |
| ja | 日本語 |
| de | ドイツ語 |
| fr | フランス語 |

> Gemini Nanoは多言語分析に対応しています。動画の内容に合った言語を選んでください。

---

## Ollama

> Chromiumベースのあらゆるブラウザで動作します: Chrome、Brave、Edge、Vivaldi、Operaなど。

### 1. Ollamaをインストールする

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

[ollama.com/download](https://ollama.com/download) からインストーラーをダウンロードして実行してください。

### 2. モデルをダウンロードする

ターミナル（Linux/macOS）またはPowerShell/CMD（Windows）で以下を実行してください:

```bash
ollama pull gemma3:1b
```

> [Ollamaモデルライブラリ](https://ollama.com/library)の任意のモデルを使用できます — 拡張機能のポップアップのOllamaタブから選択してください。より速い応答のために軽量/小型モデル（`gemma3:1b`など）をおすすめします。

### 3. CORSを設定する

この拡張機能がYouTubeからOllamaと通信するには許可が必要です。

#### Linux — Systemd(恒久的)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — 一時的

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — 恒久的

1. **システムのプロパティ**を開き、**環境変数**を選択します
2. 新しい**システム環境変数**を追加します:`OLLAMA_ORIGINS` = `*`
3. **OK**をクリックしてOllamaを再起動します

#### Windows — 一時的(PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> ネットワーク上の別のPCからOllamaを使用したい場合は、Ollamaの設定を開き「Ollamaをネットワークに公開する」を有効にしてください。これによりローカルネットワーク上の他のデバイスからの接続が可能になります。

### 4. 拡張機能で設定する

1. 拡張機能のアイコンをクリックします
2. **Ollama**タブを選択します
3. サーバーのURLを設定します(デフォルト:`http://localhost:11434`)
4. **OK**をクリックして接続をテストします
5. ドロップダウンからモデルを選択します

---

## 拡張機能の使用方法

1. **https://www.youtube.com** にアクセスします
2. 文字起こしがある動画は、分析中に緑色のスピナーが表示されます
3. 分析が終わるとレベルを示す色付きの丸が表示されます:**A1**、**A2**、**B1**、**B2**、**C1**、**C2**
4. バッジにカーソルを合わせると、使用されたエンジンとモデルを確認できます
5. 拡張機能のアイコンをクリックするとポップアップが開き、エンジンを切り替えられます

---

## 仕組み

1. YouTubeのフィードから各動画のIDを抽出します
2. 動画の文字起こしを取得します
3. 選択したAIエンジン(Gemini API、Gemini Nano、またはOllama)に文字起こしを送信し、CEFRレベルを判定します
4. 結果を動画のサムネイルに丸いバッジとして表示します
5. 結果はローカルにキャッシュされ、再分析を回避します

---

## カスタム Ollama サーバー

拡張機能はデフォルトで `http://localhost:11434` に接続します。変更するには:

1. 拡張機能のポップアップを開きます
2. **Ollama**タブを選択します
3. サーバーのURLを入力します(例:`http://localhost:11434`)
4. **OK**をクリックすると — 拡張機能が接続をテストし、利用可能なモデルを読み込みます

---

<div align="center">
  <sub>Gemini NanoとOllamaは100%ローカルで動作し、APIキーは不要です。Gemini APIは任意で使用でき、Google AI Studioの無料キーを利用します。</sub>
</div>

