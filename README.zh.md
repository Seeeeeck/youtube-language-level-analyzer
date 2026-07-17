# YT Level — YouTube 语言水平分析器

**使用本地 AI 分析任何 YouTube 视频的 CEFR 级别（A1–C2）——无需 API 密钥，无需互联网。**

适用于**任何语言**（英语、西班牙语、法语、德语、中文等）。该扩展程序会获取视频字幕并将其发送到本地 Ollama 模型进行 CEFR 分类。每个视频缩略图上会显示一个彩色徽章。

<p align="center">
  <img src="icons/icon128.png" alt="YT Level 图标" width="64">
</p>

---

**🌐 语言**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## 屏幕截图

<p align="center">
  <img src="screenshots/badges.svg" alt="YouTube 视频上的 CEFR 徽章" width="600">
  <br>
  <em>YouTube 缩略图上的 CEFR 等级徽章（A1–C2）</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="扩展弹出窗口" width="300">
  <br>
  <em>配置弹出窗口 — 服务器、模型和语言</em>
</p>

## 功能特点

- 🏷️ **CEFR 徽章** — YouTube 视频缩略图上的彩色圆圈（A1–C2）
- 🤖 **本地 AI** — 支持任何 Ollama 模型（gemma、llama、mistral 等）
- 🌍 **多语言** — 分析任何语言的视频
- 🎨 **自定义服务器** — 指向网络上的任何 Ollama 实例
- ⚡ **快速缓存** — 结果本地缓存，避免重复分析
- 🔒 **100% 私密** — 一切在本地运行，数据不会离开你的设备

## 系统要求

- **Chrome 128+**、**Brave** 或任何基于 Chromium 的浏览器
- 已安装并运行 **Ollama**（[ollama.com](https://ollama.com)）
- 已下载至少**一个 Ollama 模型**（例如 `ollama pull gemma3:1b`）

## 安装步骤

### 1. 安装 Ollama

**Linux / macOS：**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows：**
从 ollama.com/download 下载安装程序并运行。Ollama 将自动作为后台服务启动。

### 2. 下载模型

打开终端（Windows 上为命令提示符）并运行：

```bash
ollama pull gemma3:1b
```

> 你可以使用任何模型。扩展程序允许你从弹出窗口中选择要使用的模型。

### 3. 在 Ollama 中配置 CORS

扩展程序需要获得从 YouTube 网站与 Ollama 通信的权限。

#### Linux — 选项 A：Systemd（永久生效，推荐）

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — 选项 B：手动（临时）

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — 选项 A：永久生效（推荐）

1. 打开系统属性 → 环境变量
2. 添加一个新的系统变量：
   - 名称：`OLLAMA_ORIGINS`
   - 值：`*`
3. 点击确定，然后从系统托盘重启 Ollama（右键 → 退出，然后重新启动）

#### Windows — 选项 B：临时（命令提示符）

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

> 在 Windows 上，请先从系统托盘关闭 Ollama，然后再运行这些命令。

### 4. 在浏览器中加载扩展程序

1. 前往 **`chrome://extensions`**（或 **`brave://extensions`**）
2. 启用 **"开发者模式"**（右上角）
3. 点击 **"加载已解压的扩展程序"**
4. 选择项目文件夹

### 5. 授予权限（重要）

某些浏览器需要明确授权扩展程序才能在网站上运行：

1. 在 `chrome://extensions` 中，点击 **YT Level** 的 **"详细信息"**
2. 启用 **"允许此扩展程序读取和更改您访问的网站上的所有数据"**
3. 如果出现提示，点击 **"允许"**

> 如果没有此步骤，扩展程序会加载但无法在 YouTube 页面上运行。

### 6. 使用扩展程序

1. 前往 **https://www.youtube.com**
2. 带有字幕的视频会在分析时显示绿色旋转图标
3. 出现一个彩色圆圈，显示级别：**A1**、**A2**、**B1**、**B2**、**C1** 或 **C2**
4. 将鼠标悬停在徽章上可查看使用了哪个模型
5. 点击扩展程序图标打开弹出窗口：
   - **服务器** — 根据需要更改 Ollama 服务器 URL
   - **模型** — 选择要使用的已安装模型
   - **语言** — 更改扩展程序界面语言

## 工作原理

1. 从 YouTube 信息流中提取每个视频 ID
2. 通过 `youtube-transcript.ai` 获取字幕
3. 将字幕发送到本地 Ollama 模型，请求 CEFR 分类
4. 在视频缩略图上显示为圆形徽章
5. 结果本地缓存，避免重复分析

## 自定义 Ollama 服务器

默认情况下，扩展程序连接到 `http://localhost:11434`。你可以更改此设置：

1. 点击扩展程序图标
2. 输入你的服务器 URL（例如 `http://192.168.1.100:11434`）
3. 点击 **确定** — 扩展程序将测试连接并加载可用模型
4. 点击 **↺** 重置为默认值

## 文件结构

```
├── manifest.json      扩展程序配置
├── content.js         主脚本（注入到 YouTube 中）
├── background.js      服务工作线程
├── popup.html         扩展程序弹出窗口
├── popup.js           弹出窗口逻辑
├── styles.css         附加样式
├── analyzer.js        启发式分析器（备用方案）
├── icons/             扩展程序图标
└── README.md         本文件
```

## 说明

- 仅分析 YouTube 上**有可用字幕**的视频
- 分析时间取决于你的硬件和模型大小（CPU 上每个视频 20–60 秒）
- 如果 Ollama 未运行或未安装任何模型，则不显示徽章
- 无需 API 密钥或互联网连接（模型下载后）
- 所有数据保留在本地 — 不会发送到外部服务器
