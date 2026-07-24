<div align="center">
  <img src="yl-icon.png" alt="YT Level" width="80">
  <h1>YT Level</h1>
  <p><strong>Analisador de Nível de Idioma do YouTube</strong></p>
  <p>Analise o nível CEFR (A1–C2) de qualquer vídeo do YouTube usando IA local — sem chaves de API, sem necessidade de Internet.</p>
  <p>Escolha entre três motores de IA: <strong>Gemini API</strong> (nuvem, nível gratuito), <strong>Gemini Nano</strong> (integrado no Chrome) ou <strong>Ollama</strong> (servidor local). Funciona para <strong>qualquer idioma</strong>.</p>
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
  <img src="screenshots/levels_design.svg" alt="Selos de nível CEFR (A1-C2) sobrepostos nas miniaturas do YouTube" width="700">
  <br>
  <em>Selos de nível CEFR (A1-C2) sobrepostos nas miniaturas do YouTube</em>
</p>

<p align="center">
  <img src="screenshots/sc2.png" alt="Popup da extensão — aba Gemini Nano" width="500">
  <br>
  <em>Popup da extensão — aba Gemini Nano</em>
</p>

<p align="center">
  <img src="screenshots/sc3.png" alt="Popup da extensão — aba Ollama" width="500">
  <br>
  <em>Popup da extensão — aba Ollama</em>
</p>

---

## Funcionalidades

- 🏷️ **Selos CEFR** — Círculos coloridos (A1-C2) nas miniaturas de vídeos do YouTube
- 🤖 **Três motores de IA** — Use o Gemini API (nuvem), Gemini Nano (IA integrada do Chrome) ou Ollama (modelos locais)
- 🌍 **Multi-idioma** — Analisa vídeos em qualquer idioma
- 🔒 **100% privado** — Tudo é executado localmente, nenhum dado sai da sua máquina
- 🎛️ **Servidor personalizado** — Aponte para qualquer instância Ollama na sua rede
- ⚡ **Cache rápido** — Resultados são armazenados em cache localmente para evitar reanálise
- 📏 **Tamanho de amostra ajustável** — Escolha quantos caracteres da transcrição analisar (3000/6000/12000) para equilibrar velocidade e precisão

---

## Requisitos

- **Chrome 128+**, **Brave** ou qualquer navegador baseado em Chromium
- **Gemini API**: Chave de API gratuita do [Google AI Studio](https://aistudio.google.com/apikey)
- **Gemini Nano**: Chrome 128+ com Prompt API ativada
- **Ollama**: Ollama instalado e em execução ([ollama.com](https://ollama.com)) com pelo menos um modelo baixado

---

## Gemini API

O Gemini API usa os modelos de IA em nuvem do Google com uma chave de API gratuita do Google AI Studio. Funciona em qualquer navegador baseado em Chromium e não exige o download de nenhum modelo.

> Ao contrário do Gemini Nano e do Ollama, o Gemini API envia a transcrição para os servidores do Google para processamento.

### 1. Obtenha sua chave de API

1. Acesse o **Google AI Studio**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Faça login com sua conta Google
3. Clique em **"Create API key"**
4. Copie a chave gerada (começa com `AIza...`)

> O Gemini API tem um nível gratuito com limites de uso generosos — não é necessário cartão de crédito para começar.

### 2. Configurar na extensão

1. Clique no ícone da extensão
2. Selecione a aba **API Gemini**
3. Cole sua chave de API no campo
4. Clique em **OK** para salvar e testar a chave
5. Selecione um modelo na lista suspensa

---

## Gemini Nano

O Gemini Nano é o modelo de IA integrado do Chrome. Você precisa baixar o modelo de IA primeiro.

> O Chrome é recomendado para Gemini Nano. Pode não funcionar em outros navegadores.

> Não funciona no seu navegador? Use a opção Ollama abaixo — funciona em qualquer navegador baseado em Chromium.

> Um modelo Gemini Nano será baixado. Não feche o navegador até que esteja pronto.

### 1. Ativar a IA da Nano

1. Digite isto na barra de endereços: **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Defina a flag como **"Enabled Multilanguage"**
3. Clique em **"Relaunch"** ou reinicie o navegador

> Se o modelo não começar a baixar, ative também (recomendado): **`chrome://flags/#optimization-guide-on-device-model`** e selecione **"Enabled BypassPerfRequirement"**

### 2. Verificar o status do modelo

Abra o popup do YT Level e selecione a aba **Gemini Nano**:

| Status | Significado |
|--------|---------|
| **Available** | Pronto para uso |
| **Downloading** | O modelo está sendo baixado |
| **Downloadable** | Precisa baixar primeiro |
| **Unavailable** | Não suportado no seu navegador ou modelo não baixado |

### 3. Escolher o idioma de análise

Selecione o idioma do vídeo que deseja analisar:

| Código | Idioma |
|------|----------|
| en | Inglês |
| es | Espanhol |
| ja | Japonês |
| de | Alemão |
| fr | Francês |

> O Gemini Nano suporta análise multilíngue. Selecione o idioma que corresponde ao conteúdo do vídeo.

---

## Ollama

> Funciona em qualquer navegador baseado em Chromium: Chrome, Brave, Edge, Vivaldi, Opera e mais.

### 1. Instalar o Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

Baixe o instalador de [ollama.com/download](https://ollama.com/download) e execute-o.

### 2. Baixar um modelo

Execute isso em um terminal (Linux/macOS) ou PowerShell/CMD (Windows):

```bash
ollama pull gemma3:1b
```

> Você pode usar qualquer modelo da [biblioteca de modelos do Ollama](https://ollama.com/library) — selecione-o na aba Ollama no popup da extensão. Um modelo leve/pequeno (como `gemma3:1b`) é recomendado para respostas mais rápidas.

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

1. Abra **Propriedades do Sistema** -> **Variáveis de Ambiente**
2. Adicione uma nova **Variável de sistema**: `OLLAMA_ORIGINS` = `*`
3. Clique em **OK** e reinicie o Ollama

#### Windows — Temporário (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> Se você quiser usar o Ollama de outro PC em sua rede, abra as Configurações do Ollama e ative "Expor Ollama à rede". Isso permite conexões de outros dispositivos em sua rede local.

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
2. Obtém a transcrição do vídeo
3. Envia a transcrição para o motor de IA selecionado (Gemini API, Gemini Nano ou Ollama) para classificação CEFR
4. Exibe o resultado como um selo circular na miniatura do vídeo
5. Os resultados são armazenados em cache localmente para evitar reanálise

---

## Servidor Ollama Personalizado

Por padrão, a extensão se conecta a `http://localhost:11434`. Para alterar:

1. Abra o popup da extensão
2. Selecione a aba **Ollama**
3. Insira a URL do seu servidor (ex.: `http://localhost:11434`)
4. Clique em **OK** — a extensão testará a conexão e carregará os modelos disponíveis

---

<div align="center">
  <sub>Gemini Nano e Ollama rodam 100% localmente — nenhuma chave de API é necessária. O Gemini API é opcional e usa uma chave gratuita do Google AI Studio.</sub>
</div>

