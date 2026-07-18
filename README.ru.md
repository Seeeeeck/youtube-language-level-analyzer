<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Анализатор уровня языка YouTube</strong></p>
  <p>Анализируйте уровень CEFR (A1–C2) любого видео на YouTube с помощью локального ИИ — без API-ключей, без интернета.</p>
  <p>Выберите один из двух движков ИИ: <strong>Gemini Nano</strong> (встроен в Chrome) или <strong>Ollama</strong> (локальный сервер). Работает для <strong>любого языка</strong>.</p>
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
  <img src="yl.png" alt="Значки CEFR на видео YouTube" width="700">
  <br>
  <em>Значки уровня CEFR (A1–C2) на миниатюрах YouTube</em>
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

## Возможности

- 🏷️ **Значки CEFR** — цветные кружки (A1–C2) на миниатюрах видео YouTube
- 🤖 **Два движка ИИ** — используйте **Gemini Nano** (встроенный ИИ Chrome) или **Ollama** (локальные модели)
- 🌍 **Многоязычность** — анализирует видео на любом языке
- 🎨 **Свой сервер Ollama** — укажите любой экземпляр Ollama в вашей сети
- ⚡ **Быстрый кеш** — результаты сохраняются локально, исключая повторный анализ
- 🔒 **100% приватность** — всё работает локально, данные не покидают ваше устройство

---

## Требования

- **Chrome 128+**, **Brave** или любой браузер на Chromium
- **Gemini Nano**: Chrome 128+ с включённым Prompt API
- **Ollama**: Установленный и запущенный Ollama ([ollama.com](https://ollama.com)) с хотя бы одной загруженной моделью

---

## Gemini Nano

Gemini Nano — это встроенная модель ИИ в Chrome. Никаких загрузок или серверов не требуется.

### 1. Включите флаг Prompt API

1. Откройте **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Установите флаг в положение **«Enabled»**
3. Нажмите **«Relaunch»** для перезапуска Chrome

### 2. Проверьте статус модели

Откройте всплывающее окно YT Level и выберите вкладку **Gemini Nano**:

| Статус | Значение |
|--------|----------|
| **Available** | Готов к использованию |
| **Downloading** | Модель загружается |
| **Downloadable** | Требуется загрузка |
| **Unavailable** | Не поддерживается в вашем браузере |

### 3. Выберите язык анализа

Выберите язык видео, которое хотите проанализировать:

| Код | Язык |
|-----|------|
| en | Английский |
| es | Испанский |
| ja | Японский |
| de | Немецкий |
| fr | Французский |

### 4. Выберите режим усилий

- **Quick** — быстрая классификация с простым запросом
- **Deep** — детальная оценка CEFR с расширенным запросом

---

## Ollama

### 1. Установите Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Скачайте установщик с [ollama.com/download](https://ollama.com/download) и запустите его.

### 2. Загрузите модель

```bash
ollama pull gemma3:1b
```

> Вы можете использовать любую модель. Выберите её на вкладке Ollama во всплывающем окне расширения.

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

1. Откройте **Свойства системы** → **Переменные среды**
2. Добавьте новую **системную переменную**: `OLLAMA_ORIGINS` = `*`
3. Нажмите **OK** и перезапустите Ollama

#### Windows — Временно (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

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
5. Нажмите на иконку расширения, чтобы открыть окно и переключиться между движками

---

## Как это работает

1. Извлекает ID каждого видео из ленты YouTube
2. Получает транскрипцию через `youtube-transcript.ai`
3. Отправляет транскрипцию выбранному движку ИИ (Gemini Nano или Ollama) для классификации CEFR
4. Отображает результат в виде цветного значка на миниатюре видео
5. Результаты сохраняются локально в кеше

---

## Свой сервер Ollama

По умолчанию расширение подключается к `http://localhost:11434`. Чтобы изменить это:

1. Нажмите на иконку расширения
2. Выберите вкладку **Ollama**
3. Введите URL вашего сервера (например `http://192.168.1.100:11434`)
4. Нажмите **OK** — расширение проверит подключение и загрузит доступные модели

---

<div align="center">
  <sub>Не требуется API-ключ или подключение к интернету. Все данные остаются локальными.</sub>
</div>
