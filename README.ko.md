<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>YouTube 언어 수준 분석기</strong></p>
  <p>로컬 AI를 사용하여 모든 YouTube 동영상의 CEFR 수준(A1–C2)을 분석합니다 — API 키 불필요, 인터넷 불필요.</p>
  <p><strong>Gemini Nano</strong>(Chrome 내장) 또는 <strong>Ollama</strong>(로컬 서버) 중에서 AI 엔진을 선택하세요. <strong>모든 언어</strong>에서 작동합니다.</p>
</div>

---

**🌐 언어**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## 설치

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Chrome 웹 스토어에서 이용 가능</a>
</div>

> 설치 후 확장 프로그램이 YouTube에서 자동으로 작동합니다. 확장 프로그램 아이콘을 클릭하여 설정하세요.

---

## 스크린샷

<p align="center">
  <img src="screenshots/levels_design.svg" alt="YouTube 동영상 썸네일에 표시되는 CEFR 등급 배지(A1-C2)" width="700">
  <br>
  <em>YouTube 동영상 썸네일에 표시되는 CEFR 등급 배지(A1-C2)</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="확장 프로그램 팝업 — Gemini Nano 탭" width="500">
  <br>
  <em>확장 프로그램 팝업 — Gemini Nano 탭</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="확장 프로그램 팝업 — Ollama 탭" width="500">
  <br>
  <em>확장 프로그램 팝업 — Ollama 탭</em>
</p>

---

## 기능

- 🏷️ **CEFR 배지** — YouTube 동영상 썸네일에 표시되는 색상별 원형 배지(A1-C2)
- 🤖 **두 가지 AI 엔진** — Gemini Nano(Chrome 내장 AI) 또는 Ollama(로컬 모델) 사용
- 🌍 **다국어 지원** — 영어, 스페인어, 프랑스어, 독일어, 일본어 등 다양한 언어의 동영상 분석
- 🔒 **100% 비공개** — 모든 작업이 로컬에서 실행됩니다 — 데이터가 기기 밖으로 나가지 않습니다
- 🎛️ **사용자 지정 서버** — 네트워크의 어떤 Ollama 인스턴스든 지정 가능
- ⚡ **빠른 캐시** — 결과가 로컬에 캐시되어 재분석을 방지합니다
- 📏 **분석 길이 조절 가능** — 스크립트에서 분석할 글자 수(3000/6000/12000)를 선택해 속도와 정확도의 균형을 맞출 수 있습니다

---

## 요구 사항

- **Chrome 128 이상**, **Brave**, 또는 Chromium 기반 브라우저
- **Gemini Nano**: Prompt API가 활성화된 Chrome 128 이상
- **Ollama**: Ollama가 설치되어 실행 중이어야 하며 ([ollama.com](https://ollama.com)), 최소 하나의 모델이 다운로드되어 있어야 합니다

---

## Gemini Nano

Gemini Nano는 Chrome에 내장된 AI 모델입니다. 먼저 AI 모델을 다운로드해야 합니다.

> Gemini Nano에는 Chrome 사용을 권장합니다. 다른 브라우저에서는 작동하지 않을 수 있습니다.

> 사용 중인 브라우저에서 작동하지 않나요? 대신 아래 Ollama 옵션을 사용하세요 — Chromium 기반 브라우저라면 어디서든 작동합니다.

> Gemini Nano 모델이 다운로드됩니다. 준비가 완료될 때까지 브라우저를 닫지 마세요.

### 1. Nano AI 활성화하기

1. 브라우저 주소창에 다음을 입력하세요: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. 플래그를 **"Enabled Multilanguage"**로 설정하세요
3. **"Relaunch"**를 클릭하거나 브라우저를 재시작하세요

> 모델 다운로드가 시작되지 않으면 다음도 활성화하세요 (권장): **`chrome://flags/#optimization-guide-on-device-model`** 에서 **"Enabled BypassPerfRequirement"** 선택

### 2. 모델 상태 확인하기

YT Level 팝업을 열고 **Gemini Nano** 탭을 선택하세요:

| 상태 | 의미 |
|--------|---------|
| **Available** | 사용 가능 |
| **Downloading** | 모델을 다운로드하는 중 |
| **Downloadable** | 먼저 다운로드가 필요함 |
| **Unavailable** | 브라우저에서 지원되지 않거나 모델이 다운로드되지 않음 |

### 3. 분석 언어 선택하기

분석하려는 동영상의 언어를 선택하세요:

| 코드 | 언어 |
|------|----------|
| en | 영어 |
| es | 스페인어 |
| ja | 일본어 |
| de | 독일어 |
| fr | 프랑스어 |

> Gemini Nano는 다국어 분석을 지원합니다. 동영상 내용에 맞는 언어를 선택하세요.

---

## Ollama

> Chromium 기반 브라우저(Chrome, Brave, Edge, Vivaldi, Opera 등)에서 작동합니다.

### 1. Ollama 설치하기

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

[ollama.com/download](https://ollama.com/download)에서 설치 프로그램을 다운로드하여 실행하세요.

### 2. 모델 다운로드하기

터미널(Linux/macOS) 또는 PowerShell/CMD(Windows)에서 다음을 실행하세요:

```bash
ollama pull gemma3:1b
```

> [Ollama 모델 라이브러리](https://ollama.com/library)의 어떤 모델이든 사용할 수 있습니다 — 확장 프로그램 팝업의 Ollama 탭에서 선택하세요. 더 빠른 응답을 위해 가볍고 작은 모델(예: `gemma3:1b`)을 권장합니다.

### 3. CORS 설정하기

확장 프로그램이 YouTube에서 Ollama와 통신하려면 권한이 필요합니다.

#### Linux — Systemd (영구 적용)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — 임시 적용

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — 영구 적용

1. **시스템 속성** -> **환경 변수**를 여세요
2. 새 **시스템 변수**를 추가하세요: `OLLAMA_ORIGINS` = `*`
3. **확인**을 클릭하고 Ollama를 재시작하세요

#### Windows — 임시 적용 (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> 네트워크의 다른 PC에서 Ollama를 사용하려면 Ollama 설정을 열고 "네트워크에 Ollama 노출"을 활성화하세요. 이렇게 하면 로컬 네트워크의 다른 기기에서 연결할 수 있습니다.

### 4. 확장 프로그램에서 설정하기

1. 확장 프로그램 아이콘을 클릭하세요
2. **Ollama** 탭을 선택하세요
3. 서버 URL을 설정하세요 (기본값: `http://localhost:11434`)
4. **확인**을 클릭하여 연결을 테스트하세요
5. 드롭다운에서 모델을 선택하세요

---

## 확장 프로그램 사용하기

1. **https://www.youtube.com**으로 이동하세요
2. 자막이 있는 동영상은 분석 중 초록색 로딩 스피너가 표시됩니다
3. 분석이 끝나면 등급을 나타내는 색상별 원이 표시됩니다: **A1**, **A2**, **B1**, **B2**, **C1**, **C2**
4. 배지 위에 마우스를 올리면 사용된 엔진과 모델을 확인할 수 있습니다
5. 확장 프로그램 아이콘을 클릭하면 팝업이 열리고 엔진을 전환할 수 있습니다

---

## 작동 방식

1. YouTube 피드에서 각 동영상의 ID를 추출합니다
2. 동영상의 스크립트를 가져옵니다
3. 선택한 AI 엔진(Gemini Nano 또는 Ollama)으로 자막을 보내 CEFR 등급을 분류합니다
4. 결과를 동영상 썸네일에 원형 배지로 표시합니다
5. 결과가 로컬에 캐시되어 재분석을 방지합니다

---

## 사용자 지정 Ollama 서버

기본적으로 확장 프로그램은 `http://localhost:11434`에 연결됩니다. 변경하려면:

1. 확장 프로그램 팝업을 여세요
2. **Ollama** 탭을 선택하세요
3. 서버 URL을 입력하세요 (예: `http://localhost:11434`)
4. **확인**을 클릭하세요 — 확장 프로그램이 연결을 테스트하고 사용 가능한 모델을 불러옵니다

---

<div align="center">
  <sub>API 키나 인터넷 연결이 필요하지 않습니다. 모든 데이터는 로컬에 보관됩니다.</sub>
</div>

