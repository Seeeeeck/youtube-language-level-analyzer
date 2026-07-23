<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>YouTube 语言级别分析器</strong></p>
  <p>使用本地 AI 分析任何 YouTube 视频的 CEFR 级别（A1–C2）——无需 API 密钥，无需互联网。</p>
  <p>可在两种 AI 引擎之间选择：<strong>Gemini Nano</strong>（Chrome 内置）或 <strong>Ollama</strong>（本地服务器）。适用于<strong>任何语言</strong>。</p>
</div>

---

**🌐 语言**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## 安装

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">在 Chrome 网上应用店中获取</a>
</div>

> 安装后，扩展程序会自动在 YouTube 上运行。点击扩展程序图标进行配置。

---

## 屏幕截图

<p align="center">
  <img src="screenshots/levels_design.svg" alt="YouTube 视频缩略图上显示的 CEFR 等级徽章(A1-C2)" width="700">
  <br>
  <em>YouTube 视频缩略图上显示的 CEFR 等级徽章(A1-C2)</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="扩展弹窗 — Gemini Nano 标签页" width="500">
  <br>
  <em>扩展弹窗 — Gemini Nano 标签页</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="扩展弹窗 — Ollama 标签页" width="500">
  <br>
  <em>扩展弹窗 — Ollama 标签页</em>
</p>

---

## 功能特点

- 🏷️ **CEFR 徽章** — YouTube 视频缩略图上的彩色徽章(A1-C2)
- 🤖 **两种 AI 引擎** — 使用 Gemini Nano(Chrome 内置 AI)或 Ollama(本地模型)
- 🌍 **多语言支持** — 可分析英语、西班牙语、法语、德语、日语等多种语言的视频
- 🔒 **100% 隐私保护** — 一切均在本地运行 — 数据不会离开你的设备
- 🎛️ **自定义服务器** — 可指向你网络中的任意 Ollama 实例
- ⚡ **快速缓存** — 结果会在本地缓存,避免重复分析
- 📏 **可调分析长度** — 选择分析文字记录的字符数(3000/6000/12000),在速度与准确度之间取舍

---

## 系统要求

- **Chrome 128+**、**Brave** 或任意基于 Chromium 的浏览器
- **Gemini Nano**:Chrome 128+ 并启用 Prompt API
- **Ollama**:已安装并运行 Ollama([ollama.com](https://ollama.com)),且至少下载了一个模型

---

## Gemini Nano

Gemini Nano 是 Chrome 内置的 AI 模型。你需要先下载该 AI 模型。

> 推荐在 Chrome 中使用 Gemini Nano,在其他浏览器中可能无法正常工作。

> 你的浏览器无法使用？请改用下面的 Ollama 选项 —— 它适用于任何基于 Chromium 的浏览器。

> 系统将下载 Gemini Nano 模型。在下载完成前请勿关闭浏览器。

### 1. 启用 Nano AI

1. 在浏览器地址栏中输入: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. 将该标志设置为 **"Enabled Multilanguage"**
3. 点击 **"Relaunch"** 或重启浏览器

> 如果模型没有开始下载，也请启用（推荐）： **`chrome://flags/#optimization-guide-on-device-model`** 并选择 **"Enabled BypassPerfRequirement"**

### 2. 检查模型状态

打开 YT Level 弹窗并选择 **Gemini Nano** 标签页:

| 状态 | 含义 |
|--------|---------|
| **Available** | 可以使用 |
| **Downloading** | 模型正在下载中 |
| **Downloadable** | 需要先下载 |
| **Unavailable** | 你的浏览器不支持,或模型尚未下载 |

### 3. 选择分析语言

选择你要分析的视频所使用的语言:

| 代码 | 语言 |
|------|----------|
| en | 英语 |
| es | 西班牙语 |
| ja | 日语 |
| de | 德语 |
| fr | 法语 |

> Gemini Nano 支持多语言分析。请选择与视频内容匹配的语言。

---

## Ollama

> 适用于任何基于 Chromium 的浏览器：Chrome、Brave、Edge、Vivaldi、Opera 等。

### 1. 安装 Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

从 [ollama.com/download](https://ollama.com/download) 下载安装程序并运行。

### 2. 下载模型

在终端（Linux/macOS）或 PowerShell/CMD（Windows）中运行：

```bash
ollama pull gemma3:1b
```

> 你可以使用 [Ollama 模型库](https://ollama.com/library) 中的任意模型，在扩展弹窗的 Ollama 标签页中选择即可。推荐使用轻量/小型模型（如 `gemma3:1b`）以获得更快的响应速度。

### 3. 配置 CORS

该扩展需要权限才能从 YouTube 与 Ollama 通信。

#### Linux — Systemd(永久)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — 临时

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — 永久

1. 打开**系统属性** -> **环境变量**
2. 新增一个**系统变量**:`OLLAMA_ORIGINS` = `*`
3. 点击**确定**并重启 Ollama

#### Windows — 临时(PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> 如果你想在网络中的其他电脑上使用 Ollama,请打开 Ollama 设置并启用"将 Ollama 暴露到网络"。这样可以允许本地网络中的其他设备连接。

### 4. 在扩展中配置

1. 点击扩展图标
2. 选择 **Ollama** 标签页
3. 设置服务器地址(默认为:`http://localhost:11434`)
4. 点击 **确定** 测试连接
5. 从下拉菜单中选择一个模型

---

## 使用扩展程序

1. 打开 **https://www.youtube.com**
2. 有字幕的视频在分析时会显示绿色加载动画
3. 分析完成后会显示彩色徽章,标明等级:**A1**、**A2**、**B1**、**B2**、**C1** 或 **C2**
4. 将鼠标悬停在徽章上可查看所使用的引擎和模型
5. 点击扩展图标可打开弹窗并切换引擎

---

## 工作原理

1. 从 YouTube 信息流中提取每个视频的 ID
2. 通过 `youtube-transcript.ai` 获取字幕
3. 将字幕发送给所选的 AI 引擎(Gemini Nano 或 Ollama)进行 CEFR 分级
4. 在视频缩略图上以圆形徽章显示结果
5. 结果会在本地缓存,避免重复分析

---

## 自定义 Ollama 服务器

默认情况下,扩展会连接到 `http://localhost:11434`。如需更改:

1. 打开扩展弹窗
2. 选择 **Ollama** 标签页
3. 输入你的服务器地址(例如:`http://localhost:11434`)
4. 点击 **确定** — 扩展会测试连接并加载可用模型

---

<div align="center">
  <sub>无需 API 密钥或联网连接,所有数据均保存在本地。</sub>
</div>

