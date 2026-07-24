<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Анализатор уровня языка YouTube</strong></p>
  <p>Анализируйте уровень CEFR (A1–C2) любого видео на YouTube с помощью локального ИИ — без API-ключей, без интернета.</p>
  <p>Выберите один из трёх движков ИИ: <strong>Gemini API</strong> (облако, бесплатный уровень), <strong>Gemini Nano</strong> (встроен в Chrome) или <strong>Ollama</strong> (локальный сервер). Работает для <strong>любого языка</strong>.</p>
</div>

---

**🌐 Язык**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Установка

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Доступно в Chrome Web Store</a>
</div>

> После установки расширение работает автоматически на YouTube. Нажмите на иконку расширения для настройки.

---

## Скриншоты

<p align="center">
  <img src="screenshots/levels_design.svg" alt="Значки уровня CEFR (A1-C2) на миниатюрах YouTube" width="700">
  <br>
  <em>Значки уровня CEFR (A1-C2) на миниатюрах YouTube</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="Всплывающее окно расширения — вкладка Gemini Nano" width="500">
  <br>
  <em>Всплывающее окно расширения — вкладка Gemini Nano</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="Всплывающее окно расширения — вкладка Ollama" width="500">
  <br>
  <em>Всплывающее окно расширения — вкладка Ollama</em>
</p>

---

## Возможности

- 🏷️ **Значки CEFR** — Цветные кружки (A1-C2) на миниатюрах видео YouTube
- 🤖 **Три движка ИИ** — Используйте Gemini API (облако), Gemini Nano (встроенный ИИ Chrome) или Ollama (локальные модели)
- 🌍 **Многоязычность** — Анализирует видео на любом языке
- 🔒 **100% приватность** — Всё работает локально, никакие данные не покидают ваше устройство
- 🎛️ **Свой сервер Ollama** — Укажите любой экземпляр Ollama в вашей сети
- ⚡ **Быстрый кэш** — Результаты сохраняются локально, чтобы избежать повторного анализа
- 📏 **Настраиваемый размер выборки** — Выберите, сколько символов транскрипции анализировать (3000/6000/12000), чтобы сбалансировать скорость и точность

---

## Требования

- **Chrome 128+**, **Brave** или любой браузер на Chromium
- **Gemini API**: бесплатный API-ключ с [Google AI Studio](https://aistudio.google.com/apikey)
- **Gemini Nano**: Chrome 128+ с включённым Prompt API
- **Ollama**: установленная и запущенная Ollama ([ollama.com](https://ollama.com)) с хотя бы одной загруженной моделью

---

## Gemini API

Gemini API использует облачные модели ИИ Google с бесплатным API-ключом из Google AI Studio. Работает в любом браузере на основе Chromium и не требует загрузки какой-либо модели.

> В отличие от Gemini Nano и Ollama, Gemini API отправляет транскрипцию на серверы Google для обработки.

### 1. Получите свой API-ключ

1. Перейдите в **Google AI Studio**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Войдите в свой аккаунт Google
3. Нажмите **"Create API key"**
4. Скопируйте созданный ключ (начинается с `AIza...`)

> У Gemini API есть бесплатный уровень со щедрыми лимитами использования — кредитная карта для начала работы не требуется.

### 2. Настройте в расширении

1. Нажмите на иконку расширения
2. Выберите вкладку **API Gemini**
3. Вставьте свой API-ключ в поле
4. Нажмите **OK**, чтобы сохранить и проверить ключ
5. Выберите модель из выпадающего списка

---

## Gemini Nano

Gemini Nano — это встроенная в Chrome модель ИИ. Сначала нужно загрузить модель ИИ.

> Для Gemini Nano рекомендуется Chrome. В других браузерах он может не работать.

> Не работает в вашем браузере? Используйте вариант Ollama ниже — он работает в любом браузере на основе Chromium.

> Будет загружена модель Gemini Nano. Не закрывайте браузер, пока она не будет готова.

### 1. Активируйте Nano AI

1. Введите это в адресную строку браузера: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Установите флаг в положение **"Enabled Multilanguage"**
3. Нажмите **"Relaunch"** или перезапустите браузер

> Если модель не начинает загружаться, также включите (рекомендуется): **`chrome://flags/#optimization-guide-on-device-model`** и выберите **"Enabled BypassPerfRequirement"**

### 2. Проверьте статус модели

Откройте всплывающее окно YT Level и выберите вкладку **Gemini Nano**:

| Статус | Значение |
|--------|---------|
| **Available** | Готов к использованию |
| **Downloading** | Модель загружается |
| **Downloadable** | Требуется загрузка |
| **Unavailable** | Не поддерживается в вашем браузере или модель не загружена |

### 3. Выберите язык анализа

Выберите язык видео, которое хотите проанализировать:

| Код | Язык |
|------|----------|
| en | Английский |
| es | Испанский |
| ja | Японский |
| de | Немецкий |
| fr | Французский |

> Gemini Nano поддерживает многоязычный анализ. Выберите язык, соответствующий содержанию видео.

---

## Ollama

> Работает в любом браузере на основе Chromium: Chrome, Brave, Edge, Vivaldi, Opera и другие.

### 1. Установите Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

Скачайте установщик с [ollama.com/download](https://ollama.com/download) и запустите его.

### 2. Загрузите модель

Выполните это в терминале (Linux/macOS) или PowerShell/CMD (Windows):

```bash
ollama pull gemma3:1b
```

> Вы можете использовать любую модель из [библиотеки моделей Ollama](https://ollama.com/library) — выберите её на вкладке Ollama во всплывающем окне расширения. Для быстрых ответов рекомендуется лёгкая/малая модель (например, `gemma3:1b`).

### 3. Настройте CORS

Расширению нужно разрешение на общение с Ollama с сайта YouTube.

#### Linux — Systemd (постоянно)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Временно

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Постоянно

1. Откройте **Свойства системы** -> **Переменные среды**
2. Добавьте новую **системную переменную**: `OLLAMA_ORIGINS` = `*`
3. Нажмите **OK** и перезапустите Ollama

#### Windows — Временно (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Если хотите использовать Ollama с другого компьютера в вашей сети, откройте настройки Ollama и включите «Expose Ollama to network» (открыть Ollama для сети). Это разрешит подключения с других устройств вашей локальной сети.

### 4. Настройте в расширении

1. Нажмите на иконку расширения
2. Выберите вкладку **Ollama**
3. Укажите URL вашего сервера (по умолчанию: `http://localhost:11434`)
4. Нажмите **OK**, чтобы проверить подключение
5. Выберите модель из выпадающего списка

---

## Использование расширения

1. Перейдите на **https://www.youtube.com**
2. У видео с транскрипцией отображается зелёный индикатор во время анализа
3. Появляется цветной кружок с уровнем: **A1**, **A2**, **B1**, **B2**, **C1** или **C2**
4. Наведите курсор на значок, чтобы увидеть, какой движок и модель использовались
5. Нажмите на иконку расширения, чтобы открыть окно и переключаться между движками

---

## Как это работает

1. Извлекает ID каждого видео из ленты YouTube
2. Получает транскрипцию видео
3. Отправляет транскрипцию выбранному движку ИИ (Gemini API, Gemini Nano или Ollama) для классификации CEFR
4. Отображает результат в виде цветного значка на миниатюре видео
5. Результаты сохраняются локально в кэш

---

## Свой сервер Ollama

По умолчанию расширение подключается к `http://localhost:11434`. Чтобы изменить это:

1. Откройте всплывающее окно расширения
2. Выберите вкладку **Ollama**
3. Введите URL вашего сервера (например `http://localhost:11434`)
4. Нажмите **OK** — расширение проверит подключение и загрузит доступные модели

---

<div align="center">
  <sub>Gemini Nano и Ollama работают на 100% локально — API-ключ не нужен. Gemini API опционален и использует бесплатный ключ из Google AI Studio.</sub>
</div>

