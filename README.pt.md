# YT Level — Analisador de Nível do YouTube

**Analise o nível CEFR (A1–C2) de qualquer vídeo do YouTube usando IA local — sem chaves de API, sem necessidade de Internet.**

Escolha entre dois motores de IA: **Gemini Nano** (IA integrada no Chrome) ou **Ollama** (servidor local). Funciona para **qualquer idioma** (inglês, espanhol, francês, alemão, chinês, etc.). A extensão obtém a transcrição do vídeo e classifica seu nível CEFR. Um selo colorido aparece em cada miniatura de vídeo.

<p align="center">
  <img src="icons/icon128.png" alt="Ícone do YT Level" width="64">
</p>

---

**🌐 Idioma**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Capturas de Tela

<p align="center">
  <img src="screenshots/badges.svg" alt="Selos CEFR em vídeos do YouTube" width="600">
  <br>
  <em>Selos de nível CEFR (A1–C2) sobrepostos nas miniaturas do YouTube</em>
</p>

<p align="center">
  <img src="screenshots/popup.svg" alt="Popup da extensão" width="300">
  <br>
  <em>Popup de configuração — seletor de motor com abas Gemini Nano e Ollama</em>
</p>

## Funcionalidades

- 🏷️ **Selos CEFR** — círculos coloridos (A1–C2) nas miniaturas de vídeos do YouTube
- 🤖 **Dois motores de IA** — use o **Gemini Nano** (IA integrada no Chrome) ou **Ollama** (modelos locais)
- 🌍 **Multi-idioma** — analisa vídeos em qualquer idioma
- 🎨 **Servidor Ollama personalizado** — aponte para qualquer instância Ollama na sua rede
- ⚡ **Cache rápido** — resultados são armazenados em cache localmente para evitar reanálise
- 🔒 **100% privado** — tudo é executado localmente, nenhum dado sai da sua máquina

## Requisitos

- **Chrome 128+**, **Brave** ou qualquer navegador baseado em Chromium
- **Gemini Nano**: Chrome 128+ com Prompt API ativada (veja abaixo)
- **Ollama**: Ollama instalado e em execução ([ollama.com](https://ollama.com)) com pelo menos um modelo baixado

---

## Instalação — Gemini Nano

O Gemini Nano é o modelo de IA integrado do Chrome. Sem downloads ou servidores necessários.

### 1. Ativar a flag da Prompt API

1. Abra **`chrome://flags/#prompt-api-for-gemini-nano`**
2. Defina a flag como **"Enabled"**
3. Clique em **"Relaunch"** para reiniciar o Chrome

### 2. Verificar o status do modelo na extensão

1. Clique no ícone da extensão YT Level
2. Selecione a aba **Gemini Nano**
3. O status exibirá:
   - **Available** — pronto para uso
   - **Downloading** — o modelo está sendo baixado
   - **Downloadable** — precisa baixar primeiro (clique para iniciar o download)
   - **Unavailable** — não suportado no seu navegador

### 3. Escolher o idioma de análise

Na aba Gemini Nano, selecione o idioma do vídeo que deseja analisar:

| Código | Idioma   |
|--------|----------|
| en     | Inglês   |
| es     | Espanhol |
| ja     | Japonês  |
| de     | Alemão   |
| fr     | Francês  |

### 4. Escolher o modo de esforço

- **Quick** — classificação rápida com um prompt simples
- **Deep** — avaliação CEFR detalhada com um prompt abrangente

### 5. Carregar a extensão

1. Acesse **`chrome://extensions`** (ou **`brave://extensions`**)
2. Ative o **"Modo do desenvolvedor"** (canto superior direito)
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta do projeto

### 6. Conceder permissões (IMPORTANTE)

1. Em `chrome://extensions`, clique em **"Detalhes"** em **YT Level**
2. Ative **"Permitir que esta extensão leia e altere todos os seus dados nos sites que você visita"**
3. Se solicitado, clique em **"Permitir"**

> Sem esta etapa, a extensão carrega mas não funciona nas páginas do YouTube.

---

## Instalação — Ollama

### 1. Instalar o Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Baixe o instalador de [ollama.com/download](https://ollama.com/download) e execute-o. O Ollama iniciará automaticamente como um serviço em segundo plano.

### 2. Baixar um modelo

```bash
ollama pull gemma3:1b
```

> Você pode usar qualquer modelo. A extensão permite selecionar qual usar através do popup.

### 3. Configurar CORS no Ollama

A extensão precisa de permissão para se comunicar com o Ollama a partir do site do YouTube.

#### Linux — Opção A: Systemd (permanente, recomendado)

```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d

echo '[Service]
Environment=OLLAMA_ORIGINS=*' | sudo tee /etc/systemd/system/ollama.service.d/override.conf

sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Linux — Opção B: Manual (temporário)

```bash
sudo systemctl stop ollama
OLLAMA_ORIGINS=* ollama serve
```

#### Windows — Opção A: Permanente (recomendado)

1. Abra **Propriedades do Sistema** → **Variáveis de Ambiente**
2. Adicione uma nova **Variável de sistema**:
   - Nome: `OLLAMA_ORIGINS`
   - Valor: `*`
3. Clique em **OK** e reinicie o Ollama pela bandeja do sistema (clique direito → Sair, e então inicie novamente)

#### Windows — Opção B: Temporário (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

> No Windows, execute estes comandos **após** fechar o Ollama pela bandeja do sistema.

### 4. Carregar a extensão

Mesmos passos 5 e 6 da seção Gemini Nano acima.

### 5. Usar a extensão com Ollama

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

## Como Funciona

1. Extrai cada ID de vídeo do feed do YouTube
2. Obtém a transcrição via `youtube-transcript.ai`
3. Envia a transcrição para o motor de IA selecionado (Gemini Nano ou Ollama) para classificação CEFR
4. Exibe o resultado como um selo circular na miniatura do vídeo
5. Os resultados são armazenados em cache localmente para evitar reanálise

## Servidor Ollama Personalizado

Por padrão, a extensão se conecta a `http://localhost:11434`. Você pode alterar isso:

1. Clique no ícone da extensão
2. Selecione a aba **Ollama**
3. Insira a URL do seu servidor (ex. `http://192.168.1.100:11434`)
4. Clique em **OK** — a extensão testará a conexão e carregará os modelos disponíveis
5. Clique em **↺** para restaurar o padrão

## Estrutura de Arquivos

```
├── manifest.json      Configuração da extensão
├── content.js         Script principal (injetado no YouTube)
├── background.js      Service worker
├── popup.html         Popup da extensão
├── popup.js           Lógica do popup
├── styles.css         Estilos adicionais
├── analyzer.js        Analisador heurístico (fallback)
├── icons/             Ícones da extensão
└── README.md          Este arquivo
```

## Observações

- Analisa apenas vídeos que têm **transcrições disponíveis** no YouTube
- O tempo de análise depende do seu hardware (mais rápido com Gemini Nano, 20–60 segundos por vídeo na CPU com Ollama)
- Se nenhum motor estiver disponível, nenhum selo é exibido
- Nenhuma chave de API ou conexão com a Internet é necessária
- Todos os dados permanecem locais — nada é enviado para servidores externos
