<div align="center">
  <img src="yl.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>YouTube भाषा स्तर विश्लेषक</strong></p>
  <p>स्थानीय AI का उपयोग करके किसी भी YouTube वीडियो के CEFR स्तर (A1–C2) का विश्लेषण करें — कोई API कुंजी नहीं, कोई इंटरनेट आवश्यक नहीं।</p>
  <p>दो AI इंजनों में से चुनें: <strong>Gemini Nano</strong> (Chrome में निर्मित) या <strong>Ollama</strong> (स्थानीय सर्वर)। <strong>किसी भी भाषा</strong> के लिए काम करता है।</p>
</div>

---

**🌐 भाषा**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## इंस्टॉल करें

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Chrome Web Store पर उपलब्ध</a>
</div>

> इंस्टॉल होने के बाद, एक्सटेंशन YouTube पर स्वचालित रूप से काम करता है। कॉन्फ़िगर करने के लिए एक्सटेंशन आइकन पर क्लिक करें।

---

## स्क्रीनशॉट

<p align="center">
  <img src="screenshots/badges.svg" alt="YouTube वीडियो पर CEFR बैज" width="700">
  <br>
  <em>YouTube थंबनेल पर CEFR स्तर बैज (A1–C2)</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="एक्सटेंशन पॉपअप" width="280">
  <br>
  <em>कॉन्फ़िगरेशन पॉपअप — Gemini Nano और Ollama टैब के साथ इंजन चयनकर्ता</em>
</p>

---

## विशेषताएँ

- 🏷️ **CEFR बैज** — YouTube वीडियो थंबनेल पर रंगीन वृत्त (A1–C2)
- 🤖 **दो AI इंजन** — **Gemini Nano** (बिल्ट-इन Chrome AI) या **Ollama** (स्थानीय मॉडल) का उपयोग करें
- 🌍 **बहु-भाषा** — किसी भी भाषा के वीडियो का विश्लेषण करता है
- 🎨 **कस्टम Ollama सर्वर** — अपने नेटवर्क पर किसी भी Ollama इंस्टेंस से जुड़ें
- ⚡ **त्वरित कैश** — परिणाम स्थानीय रूप से कैश किए जाते हैं, पुनर्विश्लेषण से बचाता है
- 🔒 **100% निजी** — सब कुछ स्थानीय रूप से चलता है, कोई डेटा आपकी मशीन से बाहर नहीं जाता

---

## आवश्यकताएँ

- **Chrome 128+**, **Brave**, या कोई भी Chromium-आधारित ब्राउज़र
- **Gemini Nano**: Chrome 128+ जिसमें Prompt API सक्षम हो
- **Ollama**: Ollama स्थापित और चालू ([ollama.com](https://ollama.com)) और कम से कम एक मॉडल डाउनलोड हो

---

## Gemini Nano

Gemini Nano Chrome का बिल्ट-इन AI मॉडल है। किसी डाउनलोड या सर्वर की आवश्यकता नहीं।

### 1. Prompt API फ़्लैग सक्षम करें

1. **`chrome://flags/#prompt-api-for-gemini-nano`** खोलें
2. फ़्लैग को **"Enabled"** पर सेट करें
3. Chrome को पुनरारंभ करने के लिए **"Relaunch"** पर क्लिक करें

### 2. मॉडल स्थिति जाँचें

YT Level पॉपअप खोलें और **Gemini Nano** टैब चुनें:

| स्थिति | अर्थ |
|--------|------|
| **Available** | उपयोग के लिए तैयार |
| **Downloading** | मॉडल डाउनलोड हो रहा है |
| **Downloadable** | पहले डाउनलोड करना होगा |
| **Unavailable** | आपके ब्राउज़र में समर्थित नहीं |

### 3. विश्लेषण भाषा चुनें

उस वीडियो की भाषा चुनें जिसका आप विश्लेषण करना चाहते हैं:

| कोड | भाषा |
|-----|------|
| en | English |
| es | Spanish |
| ja | Japanese |
| de | German |
| fr | French |

### 4. प्रयास मोड चुनें

- **Quick** — सरल प्रॉम्प्ट के साथ तेज़ वर्गीकरण
- **Deep** — व्यापक प्रॉम्प्ट के साथ विस्तृत CEFR मूल्यांकन

---

## Ollama

### 1. Ollama स्थापित करें

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
[ollama.com/download](https://ollama.com/download) से इंस्टॉलर डाउनलोड करें और चलाएँ।

### 2. एक मॉडल डाउनलोड करें

```bash
ollama pull gemma3:1b
```

> आप किसी भी मॉडल का उपयोग कर सकते हैं। एक्सटेंशन पॉपअप के Ollama टैब से इसे चुनें।

### 3. CORS कॉन्फ़िगर करें

एक्सटेंशन को YouTube से Ollama से बात करने की अनुमति चाहिए।

#### Linux — Systemd (स्थायी)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — अस्थायी

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — स्थायी

1. **सिस्टम गुण** → **पर्यावरण चर** खोलें
2. एक नया **सिस्टम चर** जोड़ें: `OLLAMA_ORIGINS` = `*`
3. **OK** पर क्लिक करें और Ollama को पुनरारंभ करें

#### Windows — अस्थायी (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. एक्सटेंशन में कॉन्फ़िगर करें

1. एक्सटेंशन आइकन पर क्लिक करें
2. **Ollama** टैब चुनें
3. अपना सर्वर URL सेट करें (डिफ़ॉल्ट: `http://localhost:11434`)
4. कनेक्शन का परीक्षण करने के लिए **OK** पर क्लिक करें
5. ड्रॉपडाउन से एक मॉडल चुनें

---

## एक्सटेंशन का उपयोग करना

1. **https://www.youtube.com** पर जाएँ
2. ट्रांसक्रिप्ट वाले वीडियो विश्लेषण के दौरान हरा स्पिनर दिखाते हैं
3. स्तर के साथ एक रंगीन वृत्त दिखाई देता है: **A1**, **A2**, **B1**, **B2**, **C1**, या **C2**
4. बैज पर होवर करें यह देखने के लिए कि कौन सा इंजन और मॉडल उपयोग किया गया
5. पॉपअप खोलने और इंजनों के बीच स्विच करने के लिए एक्सटेंशन आइकन पर क्लिक करें

---

## यह कैसे काम करता है

1. YouTube फ़ीड से प्रत्येक वीडियो ID निकालता है
2. `youtube-transcript.ai` के माध्यम से ट्रांसक्रिप्ट प्राप्त करता है
3. CEFR वर्गीकरण के लिए ट्रांसक्रिप्ट चयनित AI इंजन (Gemini Nano या Ollama) को भेजता है
4. वीडियो थंबनेल पर परिणाम को वृत्ताकार बैज के रूप में प्रदर्शित करता है
5. परिणाम स्थानीय रूप से कैश किए जाते हैं ताकि पुनर्विश्लेषण न हो

---

## कस्टम Ollama सर्वर

डिफ़ॉल्ट रूप से एक्सटेंशन `http://localhost:11434` से जुड़ता है। इसे बदलने के लिए:

1. एक्सटेंशन पॉपअप खोलें
2. **Ollama** टैब चुनें
3. अपना सर्वर URL दर्ज करें (जैसे `http://192.168.1.100:11434`)
4. **OK** पर क्लिक करें — एक्सटेंशन कनेक्शन का परीक्षण करेगा और उपलब्ध मॉडल लोड करेगा

---

<div align="center">
  <sub>कोई API कुंजी या इंटरनेट कनेक्शन आवश्यक नहीं। सभी डेटा स्थानीय रहता है।</sub>
</div>
