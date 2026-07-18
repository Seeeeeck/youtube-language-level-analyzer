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
  <img src="yl.png" alt="YouTube 동영상의 CEFR 배지" width="700">
  <br>
  <em>YouTube 썸네일 위에 표시된 CEFR 레벨 배지(A1–C2)</em>
</p>

<p align="center">
  <img src="screenshots/screenshot3.png" alt="Screenshot 3" width="500">
  <br>
  <em>Screenshot 3</em>
</p>

<p align="center">
  <img src="screenshots/screenshot4.png" alt="Screenshot 4" width="500">
  <br>
  <em>Screenshot 4</em>
</p>

---

## 기능

- 🏷️ **CEFR 배지** — YouTube 동영상 썸네일에 색상이 있는 원(A1–C2) 표시
- 🤖 **두 가지 AI 엔진** — **Gemini Nano**(Chrome 내장 AI) 또는 **Ollama**(로컬 모델) 사용
- 🌍 **다중 언어** — 모든 언어의 동영상 분석 가능
- 🎨 **사용자 지정 Ollama 서버** — 네트워크상의 모든 Ollama 인스턴스 연결 가능
- ⚡ **빠른 캐시** — 결과를 로컬에 캐시하여 재분석 방지
- 🔒 **100% 프라이빗** — 모든 작업이 로컬에서 실행되며 데이터가 기기를 떠나지 않음

---

## 요구 사항

- **Chrome 128+**, **Brave** 또는 Chromium 기반 브라우저
- **Gemini Nano**: Chrome 128+에서 Prompt API 활성화 필요
- **Ollama**: Ollama 설치 및 실행 ([ollama.com](https://ollama.com))과 최소 하나의 모델 다운로드 필요

---

## Gemini Nano

Gemini Nano는 Chrome에 내장된 AI 모델입니다. 다운로드나 서버가 필요 없습니다.

### 1. Prompt API 플래그 활성화

1. **`chrome://flags/#prompt-api-for-gemini-nano`** 열기
2. 플래그를 **"Enabled"**로 설정
3. **"Relaunch"**를 클릭하여 Chrome 다시 시작

### 2. 다국어 감지 플래그 활성화

1. **`chrome://flags/#language-detection-api-for-gemini-nano`** 열기
2. 플래그를 **"Enabled"**로 설정
3. **"Relaunch"**를 클릭하여 Chrome 다시 시작

### 3. 모델 상태 확인

YT Level 팝업을 열고 **Gemini Nano** 탭을 선택하세요:

| 상태 | 의미 |
|--------|---------|
| **Available** | 사용 가능 |
| **Downloading** | 모델 다운로드 중 |
| **Downloadable** | 다운로드 필요 |
| **Unavailable** | 브라우저에서 지원되지 않음 |

### 4. 분석 언어 선택

분석하려는 동영상의 언어를 선택하세요:

| 코드 | 언어 |
|------|------|
| en | 영어 |
| es | 스페인어 |
| ja | 일본어 |
| de | 독일어 |
| fr | 프랑스어 |

### 5. 분석 모드 선택

- **Quick** — 간단한 프롬프트로 빠른 분류
- **Deep** — 포괄적인 프롬프트로 상세한 CEFR 평가

---

## Ollama

### 1. Ollama 설치

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
설치 프로그램을 [ollama.com/download](https://ollama.com/download)에서 다운로드하여 실행하세요.

### 2. 모델 다운로드

```bash
ollama pull gemma3:1b
```

> 모든 모델을 사용할 수 있습니다. 확장 프로그램 팝업의 Ollama 탭에서 선택하세요.

### 3. CORS 설정

확장 프로그램이 YouTube에서 Ollama와 통신하려면 권한이 필요합니다.

#### Linux — Systemd (영구적)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — 임시

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — 영구적

1. **시스템 속성** → **환경 변수** 열기
2. 새 **시스템 변수** 추가: `OLLAMA_ORIGINS` = `*`
3. **확인**을 클릭하고 Ollama 다시 시작

#### Windows — 임시 (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. 확장 프로그램에서 설정

1. 확장 프로그램 아이콘 클릭
2. **Ollama** 탭 선택
3. 서버 URL 설정 (기본값: `http://localhost:11434`)
4. **확인**을 클릭하여 연결 테스트
5. 드롭다운에서 모델 선택

---

## 확장 프로그램 사용하기

1. **https://www.youtube.com**으로 이동
2. 자막이 있는 동영상은 분석 중에 녹색 스피너가 표시됨
3. **A1**, **A2**, **B1**, **B2**, **C1** 또는 **C2** 수준의 색상이 있는 원이 나타남
4. 배지 위에 마우스를 올리면 사용된 엔진과 모델을 확인 가능
5. 확장 프로그램 아이콘을 클릭하여 팝업을 열고 엔진 간 전환

---

## 작동 방식

1. YouTube 피드에서 각 동영상 ID 추출
2. YouTube에서 자막 가져오기
3. 자막을 선택한 AI 엔진(Gemini Nano 또는 Ollama)으로 전송하여 CEFR 분류 요청
4. 결과를 동영상 썸네일에 원형 배지로 표시
5. 결과를 로컬에 캐시하여 재분석 방지

---

## 사용자 지정 Ollama 서버

기본적으로 확장 프로그램은 `http://localhost:11434`에 연결됩니다. 변경하려면:

1. 확장 프로그램 아이콘 클릭
2. **Ollama** 탭 선택
3. 서버 URL 입력 (예: `http://192.168.1.100:11434`)
4. **확인** 클릭 — 확장 프로그램이 연결을 테스트하고 사용 가능한 모델을 로드

---

<div align="center">
  <sub>API 키나 인터넷 연결이 필요하지 않습니다. 모든 데이터는 로컬에 유지됩니다.</sub>
</div>
