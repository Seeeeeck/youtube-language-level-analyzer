# YT Level — YouTube 语言级别分析器

**使用本地 AI 分析任何 YouTube 视频的 CEFR 级别（A1–C2）——无需 API 密钥，无需互联网。**

可在两种 AI 引擎之间选择：**Gemini Nano**（Chrome 内置）或 **Ollama**（本地服务器）。适用于**任何语言**（英语、西班牙语、法语、德语、中文等）。该扩展程序会获取视频字幕并分类其 CEFR 级别。每个视频缩略图上会显示一个彩色徽章。

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
  <em>配置弹出窗口 — 带有 Gemini Nano 和 Ollama 选项卡的引擎选择器</em>
</p>

## 功能特点

- 🏷️ **CEFR 徽章** — YouTube 视频缩略图上的彩色圆圈（A1–C2）
- 🤖 **两种 AI 引擎** — 使用 **Gemini Nano**（Chrome 内置 AI）或 **Ollama**（本地模型）
- 🌍 **多语言** — 分析任何语言的视频
- 🎨 **自定义 Ollama 服务器** — 指向网络上的任何 Ollama 实例
- ⚡ **快速缓存** — 结果本地缓存，避免重复分析
- 🔒 **100% 私密** — 一切在本地运行，数据不会离开你的设备

## 系统要求

- **Chrome 128+**、**Brave** 或任何基于 Chromium 的浏览器
- **Gemini Nano**：Chrome 128+ 并已启用 Prompt API（见下文）
- **Ollama**：已安装并运行 Ollama（[ollama.com](https://ollama.com)），且已下载至少一个模型

---

## 安装 — Gemini Nano

Gemini Nano 是 Chrome 内置的 AI 模型。无需下载或服务器。

### 1. 启用 Prompt API 标志

1. 打开 **`chrome://flags/#prompt-api-for-gemini-nano`**
2. 将该标志设置为 **"Enabled"**
3. 点击 **"Relaunch"** 重启 Chrome

### 2. 在扩展程序中检查模型状态

1. 点击 YT Level 扩展程序图标
2. 选择 **Gemini Nano** 选项卡
3. 状态将显示：
   - **Available** — 准备就绪
   - **Downloading** — 模型正在下载
   - **Downloadable** — 需要先下载（点击触发下载）
   - **Unavailable** — 你的浏览器不支持

### 3. 选择分析语言

在 Gemini Nano 选项卡中，选择你想要分析的视频语言：

| 代码 | 语言   |
|------|--------|
| en   | 英语   |
| es   | 西班牙语 |
| ja   | 日语   |
| de   | 德语   |
| fr   | 法语   |

### 4. 选择努力模式

- **Quick**（快速）— 使用简单提示进行快速分类
- **Deep**（深度）— 使用全面提示进行详细的 CEFR 评估

### 5. 加载扩展程序

1. 前往 **`chrome://extensions`**（或 **`brave://extensions`**）
2. 启用 **"开发者模式"**（右上角）
3. 点击 **"加载已解压的扩展程序"**
4. 选择项目文件夹

### 6. 授予权限（重要）

1. 在 `chrome://extensions` 中，点击 **YT Level** 的 **"详细信息"**
2. 启用 **"允许此扩展程序读取和更改您访问的网站上的所有数据"**
3. 如果出现提示，点击 **"允许"**

> 如果没有此步骤，扩展程序会加载但无法在 YouTube 页面上运行。

---

## 安装 — Ollama

### 1. 安装 Ollama

**Linux / macOS：**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows：**
从 [ollama.com/download](https://ollama.com/download) 下载安装程序并运行。Ollama 将自动作为后台服务启动。

### 2. 下载模型

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

1. 打开 **系统属性** → **环境变量**
2. 添加一个新的 **系统变量**：
   - 名称：`OLLAMA_ORIGINS`
   - 值：`*`
3. 点击 **确定**，然后从系统托盘重启 Ollama（右键 → 退出，然后重新启动）

#### Windows — 选项 B：临时（PowerShell）

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> 在 Windows 上，请先从系统托盘关闭 Ollama，然后再运行这些命令。

### 4. 加载扩展程序

与上述 Gemini Nano 部分的步骤 5 和 6 相同。

### 5. 使用 Ollama 运行扩展程序

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

## 工作原理

1. 从 YouTube 信息流中提取每个视频 ID
2. 通过 `youtube-transcript.ai` 获取字幕
3. 将字幕发送到选定的 AI 引擎（Gemini Nano 或 Ollama）进行 CEFR 分类
4. 在视频缩略图上显示为圆形徽章
5. 结果本地缓存，避免重复分析

## 自定义 Ollama 服务器

默认情况下，扩展程序连接到 `http://localhost:11434`。你可以更改此设置：

1. 点击扩展程序图标
2. 选择 **Ollama** 选项卡
3. 输入你的服务器 URL（例如 `http://192.168.1.100:11434`）
4. 点击 **确定** — 扩展程序将测试连接并加载可用模型
5. 点击 **↺** 重置为默认值

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
- 分析时间取决于你的硬件（使用 Gemini Nano 更快，CPU 上使用 Ollama 每个视频 20–60 秒）
- 如果没有可用引擎，则不显示徽章
- 无需 API 密钥或互联网连接
- 所有数据保留在本地 — 不会发送到外部服务器
