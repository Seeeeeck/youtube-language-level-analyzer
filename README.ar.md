<div align="center" dir="rtl">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>محلّل مستوى اللغة على YouTube</strong></p>
  <p>حلّل مستوى CEFR (A1–C2) لأي فيديو على YouTube باستخدام الذكاء الاصطناعي المحلي — بدون مفاتيح API، بدون اتصال بالإنترنت.</p>
  <p>اختر بين محركي ذكاء اصطناعي: <strong>Gemini Nano</strong> (مدمج في Chrome) أو <strong>Ollama</strong> (خادم محلي). يعمل <strong>لأي لغة</strong>.</p>
</div>

---

**🌐 اللغة**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## التثبيت

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">متوفّر على متجر Chrome</a>
</div>

> بعد التثبيت، تعمل الإضافة تلقائياً على YouTube. انقر على أيقونة الإضافة لتعديل الإعدادات.

---

## لقطات الشاشة

<p align="center">
  <img src="yl.png" alt="شارات CEFR على فيديوهات YouTube" width="700">
  <br>
  <em>شارات مستوى CEFR (A1–C2) على الصور المصغّرة لفيديوهات YouTube</em>
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

## المميزات

- 🏷️ **شارات CEFR** — دوائر ملونة (A1–C2) على الصور المصغّرة لفيديوهات YouTube
- 🤖 **محركان للذكاء الاصطناعي** — استخدم **Gemini Nano** (AI المدمج في Chrome) أو **Ollama** (نماذج محلية)
- 🌍 **متعدد اللغات** — يحلل الفيديوهات بأي لغة
- 🎨 **خادم Ollama مخصص** — وجّه إلى أي مثيل Ollama على شبكتك
- ⚡ **تخزين مؤقت سريع** — يتم تخزين النتائج محلياً لتجنب إعادة التحليل
- 🔒 **خصوصية 100%** — كل شيء يعمل محلياً، لا تغادر أي بيانات جهازك

---

## المتطلبات

- **Chrome 128+**، **Brave**، أو أي متصفح يعتمد على Chromium
- **Gemini Nano**: Chrome 128+ مع تفعيل Prompt API
- **Ollama**: Ollama مثبّت وقيد التشغيل ([ollama.com](https://ollama.com)) مع تنزيل نموذج واحد على الأقل

---

## Gemini Nano

Gemini Nano هو نموذج AI المدمج في Chrome. لا حاجة لتنزيلات أو خوادم.

### 1. تفعيل علامة Prompt API

1. افتح **`chrome://flags/#prompt-api-for-gemini-nano`**
2. اضبط العلامة على **"Enabled"**
3. انقر **"Relaunch"** لإعادة تشغيل Chrome

### 2. التحقق من حالة النموذج

افتح نافذة YT Level المنبثقة واختر علامة التبويب **Gemini Nano**:

| الحالة | المعنى |
|--------|--------|
| **Available** | جاهز للاستخدام |
| **Downloading** | يتم تنزيل النموذج |
| **Downloadable** | يحتاج إلى تنزيل أولاً |
| **Unavailable** | غير مدعوم في متصفحك |

### 3. اختيار لغة التحليل

اختر لغة الفيديو الذي تريد تحليله:

| الرمز | اللغة |
|-------|-------|
| en | الإنجليزية |
| es | الإسبانية |
| ja | اليابانية |
| de | الألمانية |
| fr | الفرنسية |

### 4. اختيار وضع الجهد

- **Quick** — تصنيف سريع باستخدام موجه بسيط
- **Deep** — تقييم CEFR مفصّل باستخدام موجه شامل

---

## Ollama

### 1. تثبيت Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
قم بتنزيل المثبت من [ollama.com/download](https://ollama.com/download) وقم بتشغيله.

### 2. تنزيل نموذج

```bash
ollama pull gemma3:1b
```

> يمكنك استخدام أي نموذج. اختره من علامة تبويب Ollama في نافذة الإضافة المنبثقة.

### 3. إعداد CORS

الإضافة تحتاج إلى إذن للتواصل مع Ollama من موقع YouTube.

#### Linux — Systemd (دائم)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — مؤقت

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — دائم

1. افتح **خصائص النظام** ← **متغيرات البيئة**
2. أضف متغير **نظام** جديد: `OLLAMA_ORIGINS` = `*`
3. انقر **موافق** وأعد تشغيل Ollama

#### Windows — مؤقت (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. الإعداد في الإضافة

1. انقر على أيقونة الإضافة
2. اختر علامة التبويب **Ollama**
3. حدد عنوان URL لخادمك (الافتراضي: `http://localhost:11434`)
4. انقر **موافق** لاختبار الاتصال
5. اختر نموذجاً من القائمة المنسدلة

---

## استخدام الإضافة

1. اذهب إلى **https://www.youtube.com**
2. الفيديوهات التي تحتوي على نصوص مكتوبة تظهر مؤشر تحميل أخضر أثناء التحليل
3. تظهر دائرة ملونة مع المستوى: **A1**، **A2**، **B1**، **B2**، **C1**، أو **C2**
4. مرر الماوس فوق الشارة لرؤية أي محرك ونموذج تم استخدامه
5. انقر على أيقونة الإضافة لفتح اللوحة المنبثقة والتبديل بين المحركات

---

## كيف يعمل

1. يستخرج معرف كل فيديو من قناة YouTube
2. يجلب النص المكتوب عبر `youtube-transcript.ai`
3. يرسل النص إلى محرك AI المحدد (Gemini Nano أو Ollama) لتصنيف CEFR
4. يعرض النتيجة كشارة دائرية على الصورة المصغّرة للفيديو
5. تُخزَّن النتائج محلياً لتجنب إعادة التحليل

---

## خادم Ollama مخصص

افتراضياً، تتصل الإضافة بـ `http://localhost:11434`. لتغيير ذلك:

1. افتح نافذة الإضافة المنبثقة
2. اختر علامة التبويب **Ollama**
3. أدخل عنوان URL لخادمك (مثال: `http://192.168.1.100:11434`)
4. انقر **موافق** — ستختبر الإضافة الاتصال وتحمّل النماذج المتاحة

---

<div align="center">
  <sub>لا حاجة لمفتاح API أو اتصال بالإنترنت. جميع البيانات تبقى محلياً.</sub>
</div>
