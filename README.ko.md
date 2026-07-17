# YT Level — YouTube 언어 수준 분석기

**로컬 AI를 사용하여 모든 YouTube 동영상의 CEFR 수준(A1–C2)을 분석합니다 — API 키 불필요, 인터넷 불필요.**

**모든 언어**(영어, 스페인어, 프랑스어, 독일어, 중국어 등)에서 작동합니다. 확장 프로그램이 동영상 자막을 가져와 로컬 Ollama 모델로 전송하여 CEFR 분류를 수행합니다. 각 동영상 썸네일에 색상이 있는 배지가 표시됩니다.

---

**🌐 언어**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## 스크린샷

<p align="center">
  <img src="screenshots/badges.svg" alt="YouTube 동영상의 CEFR 배지" width="600">
  <br>
  <em>YouTube 썸네일 위에 표시된 CEFR 레벨 배지(A1–C2)</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="확장 프로그램 팝업" width="300">
  <br>
  <em>설정 팝업 — 서버, 모델, 언어</em>
</p>

## 기능

- 🏷️ **CEFR 배지** — YouTube 동영상 썸네일에 색상이 있는 원(A1–C2) 표시
- 🤖 **로컬 AI** — 모든 Ollama 모델(gemma, llama, mistral 등)과 호환
- 🌍 **다중 언어** — 모든 언어의 동영상 분석 가능
- 🎨 **사용자 지정 서버** — 네트워크상의 모든 Ollama 인스턴스 연결 가능
- ⚡ **빠른 캐시** — 결과를 로컬에 캐시하여 재분석 방지
- 🔒 **100% 프라이빗** — 모든 작업이 로컬에서 실행되며 데이터가 기기를 떠나지 않음

## 요구 사항

- **Chrome 128+**, **Brave** 또는 Chromium 기반 브라우저
- **Ollama** 설치 및 실행 ([ollama.com](https://ollama.com))
- 최소 **하나의 Ollama 모델** 다운로드 (예: `ollama pull gemma3:1b`)

## 설치 — 단계별 가이드

### 1. Ollama 설치

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
설치 프로그램을 [ollama.com/download](https://ollama.com/download)에서 다운로드하여 실행하세요. Ollama가 백그라운드 서비스로 자동 시작됩니다.

### 2. 모델 다운로드

터미널(Windows의 경우 명령 프롬프트)을 열고 다음을 실행하세요:

```bash
ollama pull gemma3:1b
```

> 모든 모델을 사용할 수 있습니다. 확장 프로그램의 팝업에서 사용할 모델을 선택할 수 있습니다.

### 3. Ollama에서 CORS 설정

확장 프로그램이 YouTube 웹사이트에서 Ollama와 통신하려면 권한이 필요합니다.

#### Linux — 방법 A: Systemd (영구적, 권장)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — 방법 B: 수동 (임시)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — 방법 A: 영구적 (권장)

1. 시스템 속성 → 환경 변수 열기
2. 새 시스템 변수 추가:
   - 이름: `OLLAMA_ORIGINS`
   - 값: `*`
3. 확인을 클릭하고 시스템 트레이에서 Ollama를 다시 시작하세요 (마우스 오른쪽 버튼 → 종료, 다시 시작)

#### Windows — 방법 B: 임시 (명령 프롬프트)

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

> Windows에서는 시스템 트레이에서 Ollama를 종료한 후 이 명령어를 실행하세요.

### 4. 브라우저에 확장 프로그램 로드

1. **`chrome://extensions`** (또는 **`brave://extensions`**)로 이동
2. **"개발자 모드"** 활성화 (오른쪽 상단)
3. **"압축 해제된 확장 프로그램 로드"** 클릭
4. 프로젝트 폴더 선택

### 5. 권한 부여 (중요)

일부 브라우저는 웹사이트에서 실행하기 위해 명시적 권한이 필요합니다:

1. `chrome://extensions`에서 **YT Level**의 **"세부정보"** 클릭
2. **"이 확장 프로그램이 방문하는 웹사이트의 모든 데이터를 읽고 변경하도록 허용"** 활성화
3. 메시지가 표시되면 **"허용"** 클릭

> 이 단계를 수행하지 않으면 확장 프로그램은 로드되지만 YouTube 페이지에서 실행되지 않습니다.

### 6. 확장 프로그램 사용

1. **https://www.youtube.com**으로 이동
2. 자막이 있는 동영상은 분석 중에 녹색 스피너가 표시됨
3. **A1**, **A2**, **B1**, **B2**, **C1** 또는 **C2** 수준의 색상이 있는 원이 나타남
4. 배지 위에 마우스를 올리면 사용된 모델을 확인 가능
5. 확장 프로그램 아이콘을 클릭하여 팝업 열기:
   - **서버** — 필요시 Ollama 서버 URL 변경
   - **모델** — 사용할 설치된 모델 선택
   - **언어** — 확장 프로그램 UI 언어 변경

## 작동 방식

1. YouTube 피드에서 각 동영상 ID 추출
2. `youtube-transcript.ai`를 통해 자막 가져오기
3. 자막을 로컬 Ollama 모델로 전송하여 CEFR 분류 요청
4. 결과를 동영상 썸네일에 원형 배지로 표시
5. 결과를 로컬에 캐시하여 재분석 방지

## 사용자 지정 Ollama 서버

기본적으로 확장 프로그램은 `http://localhost:11434`에 연결됩니다. 변경하려면:

1. 확장 프로그램 아이콘 클릭
2. 서버 URL 입력 (예: `http://192.168.1.100:11434`)
3. **확인** 클릭 — 확장 프로그램이 연결을 테스트하고 사용 가능한 모델을 로드
4. **↺** 클릭하여 기본값으로 재설정

## 파일 구조

```
├── manifest.json      확장 프로그램 설정
├── content.js         메인 스크립트 (YouTube에 삽입)
├── background.js      서비스 워커
├── popup.html         확장 프로그램 팝업
├── popup.js           팝업 로직
├── styles.css         추가 스타일
├── analyzer.js        휴리스틱 분석기 (대체)
├── icons/             확장 프로그램 아이콘
└── README.md          이 파일
```

## 참고 사항

- YouTube에서 **자막을 사용할 수 있는** 동영상만 분석
- 분석 시간은 하드웨어와 모델 크기에 따라 다름 (CPU 기준 동영상당 20–60초)
- Ollama가 실행 중이 아니거나 설치된 모델이 없으면 배지가 표시되지 않음
- API 키나 인터넷 연결 불필요 (모델 다운로드 후)
- 모든 데이터는 로컬에 유지 — 외부 서버로 전송되는 정보 없음
