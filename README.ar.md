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
  <img src="screenshots/levels_design.svg" alt="شارات مستوى CEFR (A1-C2) المعروضة على صور YouTube المصغرة" width="700">
  <br>
  <em>شارات مستوى CEFR (A1-C2) المعروضة على صور YouTube المصغرة</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="نافذة الإضافة المنبثقة — علامة تبويب Gemini Nano" width="500">
  <br>
  <em>نافذة الإضافة المنبثقة — علامة تبويب Gemini Nano</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="نافذة الإضافة المنبثقة — علامة تبويب Ollama" width="500">
  <br>
  <em>نافذة الإضافة المنبثقة — علامة تبويب Ollama</em>
</p>

---

## المميزات

- 🏷️ **شارات CEFR** — دوائر ملونة (A1-C2) على صور فيديوهات YouTube المصغرة
- 🤖 **محركا ذكاء اصطناعي** — استخدم Gemini Nano (ذكاء اصطناعي مدمج في Chrome) أو Ollama (نماذج محلية)
- 🌍 **دعم متعدد اللغات** — يحلل الفيديوهات بالإنجليزية والإسبانية والفرنسية والألمانية واليابانية وغيرها
- 🔒 **خصوصية 100%** — كل شيء يعمل محليًا — لا تغادر بياناتك جهازك
- 🎛️ **خادم مخصص** — أشر إلى أي نسخة من Ollama على شبكتك
- ⚡ **ذاكرة تخزين مؤقت سريعة** — يتم تخزين النتائج محليًا لتجنب إعادة التحليل
- 📏 **حجم عينة قابل للتعديل** — اختر عدد الأحرف من النص المراد تحليلها (3000/6000/12000) لموازنة السرعة والدقة

---

## المتطلبات

- **Chrome 128+** أو **Brave** أو أي متصفح قائم على Chromium
- **Gemini Nano**: Chrome 128+ مع تفعيل Prompt API
- **Ollama**: يجب أن يكون Ollama مثبتًا وقيد التشغيل ([ollama.com](https://ollama.com)) مع تنزيل نموذج واحد على الأقل

---

## Gemini Nano

Gemini Nano هو نموذج الذكاء الاصطناعي المدمج في Chrome. يجب عليك تنزيل نموذج الذكاء الاصطناعي أولاً.

> يُنصح باستخدام Chrome مع Gemini Nano. قد لا يعمل في متصفحات أخرى.

> لا يعمل في متصفحك؟ استخدم خيار Ollama أدناه بدلاً من ذلك — يعمل على أي متصفح قائم على Chromium.

> سيتم تنزيل نموذج Gemini Nano. لا تغلق المتصفح حتى يصبح جاهزًا.

### 1. تفعيل Nano AI

1. أدخل هذا في شريط عنوان المتصفح: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. اضبط الخيار على **"Enabled Multilanguage"**
3. انقر على **"Relaunch"** أو أعد تشغيل المتصفح

> إذا لم يبدأ تنزيل النموذج، فعّل أيضًا (موصى به): **`chrome://flags/#optimization-guide-on-device-model`** واختر **"Enabled BypassPerfRequirement"**

### 2. تحقق من حالة النموذج

افتح نافذة YT Level المنبثقة واختر علامة تبويب **Gemini Nano**:

| الحالة | المعنى |
|--------|---------|
| **Available** | جاهز للاستخدام |
| **Downloading** | جارٍ تنزيل النموذج |
| **Downloadable** | يحتاج إلى التنزيل أولاً |
| **Unavailable** | غير مدعوم في متصفحك أو لم يتم تنزيل النموذج |

### 3. اختر لغة التحليل

اختر لغة الفيديو الذي تريد تحليله:

| الرمز | اللغة |
|------|----------|
| en | الإنجليزية |
| es | الإسبانية |
| ja | اليابانية |
| de | الألمانية |
| fr | الفرنسية |

> يدعم Gemini Nano التحليل متعدد اللغات. اختر اللغة التي تطابق محتوى الفيديو.

---

## Ollama

> يعمل على أي متصفح قائم على Chromium: Chrome وBrave وEdge وVivaldi وOpera والمزيد.

### 1. تثبيت Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

قم بتنزيل برنامج التثبيت من [ollama.com/download](https://ollama.com/download) وشغّله.

### 2. تنزيل نموذج

نفّذ هذا في الطرفية (Linux/macOS) أو PowerShell/CMD (Windows):

```bash
ollama pull gemma3:1b
```

> يمكنك استخدام أي نموذج من [مكتبة نماذج Ollama](https://ollama.com/library) — اختره من علامة تبويب Ollama في نافذة الإضافة المنبثقة. يُنصح باستخدام نموذج خفيف/صغير (مثل `gemma3:1b`) للحصول على استجابات أسرع.

### 3. إعداد CORS

تحتاج الإضافة إلى إذن للتواصل مع Ollama من YouTube.

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

1. افتح **خصائص النظام** -> **متغيرات البيئة**
2. أضف **متغير نظام** جديدًا: `OLLAMA_ORIGINS` = `*`
3. انقر على **موافق** وأعد تشغيل Ollama

#### Windows — مؤقت (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> إذا كنت تريد استخدام Ollama من جهاز آخر على شبكتك، افتح إعدادات Ollama وفعّل خيار "كشف Ollama للشبكة". يسمح هذا بالاتصال من أجهزة أخرى على شبكتك المحلية.

### 4. الإعداد داخل الإضافة

1. انقر على أيقونة الإضافة
2. اختر علامة تبويب **Ollama**
3. حدد عنوان URL للخادم (الافتراضي: `http://localhost:11434`)
4. انقر على **موافق** لاختبار الاتصال
5. اختر نموذجًا من القائمة المنسدلة

---

## استخدام الإضافة

1. انتقل إلى **https://www.youtube.com**
2. تعرض الفيديوهات التي تحتوي على نصوص مؤشر تحميل أخضر أثناء التحليل
3. تظهر دائرة ملونة تحمل المستوى: **A1** أو **A2** أو **B1** أو **B2** أو **C1** أو **C2**
4. مرر مؤشر الفأرة فوق الشارة لمعرفة المحرك والنموذج المستخدمين
5. انقر على أيقونة الإضافة لفتح النافذة المنبثقة والتبديل بين المحركين

---

## كيف يعمل

1. يستخرج معرّف كل فيديو من موجز YouTube
2. يجلب النص المكتوب للفيديو
3. يرسل النص إلى محرك الذكاء الاصطناعي المختار (Gemini Nano أو Ollama) لتصنيف مستوى CEFR
4. يعرض النتيجة كشارة دائرية على صورة الفيديو المصغرة
5. يتم تخزين النتائج محليًا لتجنب إعادة التحليل

---

## خادم Ollama مخصص

تتصل الإضافة افتراضيًا بـ `http://localhost:11434`. لتغييره:

1. افتح نافذة الإضافة المنبثقة
2. اختر علامة تبويب **Ollama**
3. أدخل عنوان URL لخادمك (مثال: `http://localhost:11434`)
4. انقر على **موافق** — ستختبر الإضافة الاتصال وتحمّل النماذج المتاحة

---

<div align="center">
  <sub>لا حاجة إلى مفتاح API أو اتصال بالإنترنت. تبقى جميع البيانات محلية.</sub>
</div>

