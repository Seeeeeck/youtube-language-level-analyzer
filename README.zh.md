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
  <img src="yl.png" alt="YouTube 视频上的 CEFR 徽章" width="700">
  <br>
  <em>YouTube 缩略图上的 CEFR 等级徽章（A1–C2）</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="扩展弹出窗口" width="280">
  <br>
  <em>配置弹出窗口 — 带有 Gemini Nano 和 Ollama 选项卡的引擎选择器</em>
</p>

---

## 功能特点

- 🏷️ **CEFR 徽章** — YouTube 视频缩略图上的彩色圆圈（A1–C2）
- 🤖 **两种 AI 引擎** — 使用 **Gemini Nano**（Chrome 内置 AI）或 **Ollama**（本地模型）
- 🌍 **多语言** — 分析任何语言的视频
- 🎨 **自定义 Ollama 服务器** — 指向网络上的任何 Ollama 实例
- ⚡ **快速缓存** — 结果本地缓存，避免重复分析
- 🔒 **100% 私密** — 一切在本地运行，数据不会离开你的设备

---

## 系统要求

- **Chrome 128+**、**Brave** 或任何基于 Chromium 的浏览器
- **Gemini Nano**：Chrome 128+ 并已启用 Prompt API
- **Ollama**：已安装并运行 Ollama（[ollama.com](https://ollama.com)），且已下载至少一个模型

---

## Gemini Nano

Gemini Nano 是 Chrome 内置的 AI 模型。无需下载或服务器。

### 1. 启用 Prompt API 标志

1. 打开 **`chrome://flags/#prompt-api-for-gemini-nano`**
2. 将该标志设置为 **"Enabled"**
3. 点击 **"Relaunch"** 重启 Chrome

### 2. 检查模型状态

打开 YT Level 弹出窗口并选择 **Gemini Nano** 选项卡：

| 状态 | 含义 |
|--------|---------|
| **Available** | 准备就绪 |
| **Downloading** | 模型正在下载 |
| **Downloadable** | 需要先下载 |
| **Unavailable** | 你的浏览器不支持 |

### 3. 选择分析语言

选择你要分析的视频语言：

| 代码 | 语言 |
|------|------|
| en | 英语 |
| es | 西班牙语 |
| ja | 日语 |
| de | 德语 |
| fr | 法语 |

### 4. 选择努力模式

- **Quick（快速）** — 使用简单提示进行快速分类
- **Deep（深度）** — 使用全面提示进行详细的 CEFR 评估

---

## Ollama

### 1. 安装 Ollama

**Linux / macOS：**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows：**
从 [ollama.com/download](https://ollama.com/download) 下载安装程序并运行。

### 2. 下载模型

```bash
ollama pull gemma3:1b
```

> 你可以使用任何模型。从扩展程序弹出窗口的 Ollama 选项卡中选择它。

### 3. 配置 CORS

扩展程序需要获得从 YouTube 与 Ollama 通信的权限。

#### Linux — Systemd（永久生效）

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

#### Windows — 永久生效

1. 打开 **系统属性** → **环境变量**
2. 添加一个新的 **系统变量**：`OLLAMA_ORIGINS` = `*`
3. 点击 **确定** 并重启 Ollama

#### Windows — 临时（PowerShell）

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. 在扩展程序中配置

1. 点击扩展程序图标
2. 选择 **Ollama** 选项卡
3. 设置你的服务器 URL（默认：`http://localhost:11434`）
4. 点击 **确定** 测试连接
5. 从下拉菜单中选择一个模型

---

## 使用扩展程序

1. 前往 **https://www.youtube.com**
2. 带有字幕的视频会在分析时显示绿色旋转图标
3. 出现一个彩色圆圈，显示级别：**A1**、**A2**、**B1**、**B2**、**C1** 或 **C2**
4. 将鼠标悬停在徽章上可查看使用了哪个引擎和模型
5. 点击扩展程序图标打开弹出窗口，在引擎之间切换

---

## 工作原理

1. 从 YouTube 信息流中提取每个视频 ID
2. 通过 `youtube-transcript.ai` 获取字幕
3. 将字幕发送到选定的 AI 引擎（Gemini Nano 或 Ollama）进行 CEFR 分类
4. 在视频缩略图上显示为圆形徽章
5. 结果本地缓存，避免重复分析

---

## 自定义 Ollama 服务器

默认情况下，扩展程序连接到 `http://localhost:11434`。要更改此设置：

1. 打开扩展程序弹出窗口
2. 选择 **Ollama** 选项卡
3. 输入你的服务器 URL（例如 `http://192.168.1.100:11434`）
4. 点击 **确定** — 扩展程序将测试连接并加载可用模型

---

<div align="center">
  <sub>无需 API 密钥或互联网连接。所有数据保留在本地。</sub>
</div>
