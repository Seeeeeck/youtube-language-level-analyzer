# YT Level — YouTube 言語レベル分析ツール

**ローカル AI を使用して YouTube 動画の CEFR レベル（A1～C2）を分析 — API キーもインターネットも不要。**

**あらゆる言語**（英語、スペイン語、フランス語、ドイツ語、中国語など）に対応。拡張機能が動画の文字起こしを取得し、ローカルの Ollama モデルに送信して CEFR 分類を実行します。各動画サムネイルに色付きバッジが表示されます。

<p align="center">
  <img src="icons/icon128.png" alt="YT Level アイコン" width="64">
</p>

---

**🌐 言語**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## 機能

- 🏷️ **CEFR バッジ** — YouTube 動画サムネイルに色付きの円（A1～C2）を表示
- 🤖 **ローカル AI** — 任意の Ollama モデル（gemma、llama、mistral など）に対応
- 🌍 **多言語対応** — あらゆる言語の動画を分析
- 🎨 **カスタムサーバー** — ネットワーク上の任意の Ollama インスタンスを指定可能
- ⚡ **高速キャッシュ** — 結果をローカルにキャッシュして再分析を防止
- 🔒 **100% プライベート** — すべてローカルで実行、データは外部に送信されません

## 必要条件

- **Chrome 128+**、**Brave**、または Chromium ベースのブラウザ
- **Ollama** がインストールされ実行中であること（[ollama.com](https://ollama.com)）
- 少なくとも**1つの Ollama モデル**がダウンロード済みであること（例：`ollama pull gemma3:1b`）

## インストール手順

### 1. Ollama をインストール

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. モデルをダウンロード

```bash
ollama pull gemma3:1b
```

> 任意のモデルを使用できます。拡張機能のポップアップから使用するモデルを選択できます。

### 3. Ollama で CORS を設定

拡張機能が YouTube サイトから Ollama と通信するための権限が必要です。

#### オプション A：Systemd（永続的、推奨）

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### オプション B：手動（一時的）

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

### 4. ブラウザに拡張機能を読み込む

1. **`chrome://extensions`**（または **`brave://extensions`**）にアクセス
2. **「デベロッパーモード」** を有効にする（右上隅）
3. **「パッケージ化されていない拡張機能を読み込む」** をクリック
4. プロジェクトフォルダを選択

### 5. 権限を付与（重要）

一部のブラウザでは、拡張機能がウェブサイトで動作するために明示的な許可が必要です：

1. `chrome://extensions` で **YT Level** の **「詳細」** をクリック
2. **「この拡張機能に、アクセスするウェブサイト上のすべてのデータの読み取りと変更を許可する」** を有効にする
3. 促されたら **「許可」** をクリック

> この手順を実行しないと、拡張機能は読み込まれても YouTube ページでは動作しません。

### 6. 拡張機能を使用する

1. **https://www.youtube.com** にアクセス
2. 文字起こしがある動画は、分析中に緑色のスピナーが表示されます
3. 色付きの円とともにレベルが表示されます：**A1**、**A2**、**B1**、**B2**、**C1**、**C2**
4. バッジにカーソルを合わせると使用されたモデルが表示されます
5. 拡張機能アイコンをクリックしてポップアップを開く：
   - **サーバー** — 必要に応じて Ollama サーバーの URL を変更
   - **モデル** — 使用するインストール済みモデルを選択
   - **言語** — 拡張機能の UI 言語を変更

## 仕組み

1. YouTube フィードから各動画 ID を抽出
2. `youtube-transcript.ai` を介して文字起こしを取得
3. 文字起こしをローカルの Ollama モデルに送信し、CEFR 分類をリクエスト
4. 結果を動画サムネイルに円形バッジとして表示
5. 結果をローカルにキャッシュして再分析を防止

## カスタム Ollama サーバー

デフォルトでは拡張機能は `http://localhost:11434` に接続します。これは変更可能です：

1. 拡張機能アイコンをクリック
2. サーバーの URL を入力（例：`http://192.168.1.100:11434`）
3. **OK** をクリック — 拡張機能が接続をテストし、利用可能なモデルを読み込みます
4. **↺** をクリックしてデフォルトにリセット

## ファイル構成

```
├── manifest.json      拡張機能の設定
├── content.js         メインスクリプト（YouTube に注入）
├── background.js      サービスワーカー
├── popup.html         拡張機能ポップアップ
├── popup.js           ポップアップロジック
├── styles.css         追加スタイル
├── analyzer.js        ヒューリスティック分析（フォールバック）
├── icons/             拡張機能アイコン
└── README.md          このファイル
```

## 注意事項

- YouTube で**文字起こしが利用可能な**動画のみ分析します
- 分析時間はハードウェアとモデルサイズに依存します（CPU で動画あたり 20～60 秒）
- Ollama が実行されていないか、モデルがインストールされていない場合、バッジは表示されません
- API キーやインターネット接続は不要です（モデルダウンロード後）
- すべてのデータはローカルに保持 — 外部サーバーには送信されません
