<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analisador de Nível de Idioma do YouTube</strong></p>
  <p>Analise o nível CEFR (A1–C2) de qualquer vídeo do YouTube usando IA local — sem chaves de API, sem necessidade de Internet.</p>
  <p>Escolha entre dois motores de IA: <strong>Gemini Nano</strong> (integrado no Chrome) ou <strong>Ollama</strong> (servidor local). Funciona para <strong>qualquer idioma</strong>.</p>
</div>

---

**🌐 Idioma**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Instalação

<div align="center">
  <a href="#" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Disponível na Chrome Web Store</a>
</div>

> Após a instalação, a extensão funciona automaticamente no YouTube. Clique no ícone da extensão para configurar.

---

## Capturas de Tela

<p align="center">
  <img src="yl.png" alt="Selos CEFR em vídeos do YouTube" width="700">
  <br>
  <em>Selos de nível CEFR (A1–C2) sobrepostos nas miniaturas do YouTube</em>
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

## Funcionalidades

- 🏷️ **Selos CEFR** — círculos coloridos (A1–C2) nas miniaturas de vídeos do YouTube
- 🤖 **Dois motores de IA** — use o **Gemini Nano** (IA integrada do Chrome) ou **Ollama** (modelos locais)
- 🌍 **Multi-idioma** — analisa vídeos em qualquer idioma
- 🎨 **Servidor Ollama personalizado** — aponte para qualquer instância Ollama na sua rede
- ⚡ **Cache rápido** — resultados são armazenados em cache localmente para evitar reanálise
- 🔒 **100% privado** — tudo é executado localmente, nenhum dado sai da sua máquina

---

## Requisitos

- **Chrome 128+**, **Brave** ou qualquer navegador baseado em Chromium
- **Gemini Nano**: Chrome 128+ com Prompt API ativada
- **Ollama**: Ollama instalado e em execução ([ollama.com](https://ollama.com)) com pelo menos um modelo baixado

---

## Gemini Nano

O Gemini Nano é o modelo de IA integrado do Chrome. Sem downloads ou servidores necessários.

### 1. Ativar a flag da Prompt API

1. Abra **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Defina a flag como **"Enabled"**
3. Clique em **"Relaunch"** para reiniciar o Chrome

### 2. Ativar a flag de detecção multilingue

1. Abra **`chrome://flags/#language-detection-api-for-gemini-nano`**
2. Defina a flag como **"Enabled"**
3. Clique em **"Relaunch"** para reiniciar o Chrome

### 3. Verificar o status do modelo

Abra o popup do YT Level e selecione a aba **Gemini Nano**:

| Status | Significado |
|--------|-------------|
| **Available** | Pronto para uso |
| **Downloading** | O modelo está sendo baixado |
| **Downloadable** | Precisa baixar primeiro |
| **Unavailable** | Não suportado no seu navegador |

### 4. Escolher o idioma de análise

Selecione o idioma do vídeo que deseja analisar:

| Código | Idioma   |
|--------|----------|
| en     | Inglês   |
| es     | Espanhol |
| ja     | Japonês  |
| de     | Alemão   |
| fr     | Francês  |

### 5. Escolher o modo de esforço

- **Quick** — classificação rápida com um prompt simples
- **Deep** — avaliação CEFR detalhada com um prompt abrangente

---

## Ollama

### 1. Instalar o Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Baixe o instalador de [ollama.com/download](https://ollama.com/download) e execute-o.

### 2. Baixar um modelo

```bash
ollama pull gemma3:1b
```

> Você pode usar qualquer modelo. Selecione-o na aba Ollama no popup da extensão.

### 3. Configurar CORS

A extensão precisa de permissão para se comunicar com o Ollama a partir do YouTube.

#### Linux — Systemd (permanente)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Temporário

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Permanente

1. Abra **Propriedades do Sistema** → **Variáveis de Ambiente**
2. Adicione uma nova **Variável de sistema**: `OLLAMA_ORIGINS` = `*`
3. Clique em **OK** e reinicie o Ollama

#### Windows — Temporário (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 4. Configurar na extensão

1. Clique no ícone da extensão
2. Selecione a aba **Ollama**
3. Defina a URL do seu servidor (padrão: `http://localhost:11434`)
4. Clique em **OK** para testar a conexão
5. Selecione um modelo na lista suspensa

---

## Usando a Extensão

1. Acesse **https://www.youtube.com**
2. Vídeos com transcrições mostram um spinner verde durante a análise
3. Um círculo colorido aparece com o nível: **A1**, **A2**, **B1**, **B2**, **C1** ou **C2**
4. Passe o mouse sobre o selo para ver qual motor e modelo foram usados
5. Clique no ícone da extensão para abrir o popup e alternar entre os motores

---

## Como Funciona

1. Extrai cada ID de vídeo do feed do YouTube
2. Obtém a transcrição do YouTube
3. Envia a transcrição para o motor de IA selecionado (Gemini Nano ou Ollama) para classificação CEFR
4. Exibe o resultado como um selo circular na miniatura do vídeo
5. Os resultados são armazenados em cache localmente para evitar reanálise

---

## Servidor Ollama Personalizado

Por padrão, a extensão se conecta a `http://localhost:11434`. Para alterar:

1. Abra o popup da extensão
2. Selecione a aba **Ollama**
3. Insira a URL do seu servidor (ex.: `http://192.168.1.100:11434`)
4. Clique em **OK** — a extensão testará a conexão e carregará os modelos disponíveis

---

<div align="center">
  <sub>Nenhuma chave de API ou conexão com Internet necessária. Todos os dados permanecem locais.</sub>
</div>
