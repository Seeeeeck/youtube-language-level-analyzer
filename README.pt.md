# YT Level — Analisador de Nível de Idioma do YouTube

**Analise o nível CEFR (A1–C2) de qualquer vídeo do YouTube usando IA local — sem chaves de API, sem necessidade de Internet.**

Funciona para **qualquer idioma** (inglês, espanhol, francês, alemão, chinês, etc.). A extensão obtém a transcrição do vídeo e a envia para um modelo Ollama local para classificação CEFR. Um selo colorido aparece em cada miniatura de vídeo.

<p align="center">
  <img src="icons/icon128.png" alt="Ícone do YT Level" width="64">
</p>

---

**🌐 Idioma**

[🇬🇧 English](README.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇵🇹 Português](README.pt.md) · [🇩🇪 Deutsch](README.de.md) · [🇮🇹 Italiano](README.it.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇸🇦 العربية](README.ar.md) · [🇮🇳 हिन्दी](README.hi.md) · [🇷🇺 Русский](README.ru.md)

---

## Funcionalidades

- 🏷️ **Selos CEFR** — círculos coloridos (A1–C2) nas miniaturas de vídeos do YouTube
- 🤖 **IA local** — funciona com qualquer modelo Ollama (gemma, llama, mistral, etc.)
- 🌍 **Multi-idioma** — analisa vídeos em qualquer idioma
- 🎨 **Servidor personalizado** — aponte para qualquer instância Ollama na sua rede
- ⚡ **Cache rápido** — resultados são armazenados em cache localmente para evitar reanálise
- 🔒 **100% privado** — tudo é executado localmente, nenhum dado sai da sua máquina

## Requisitos

- **Chrome 128+**, **Brave** ou qualquer navegador baseado em Chromium
- **Ollama** instalado e em execução ([ollama.com](https://ollama.com))
- Pelo menos **um modelo Ollama** baixado (ex. `ollama pull gemma3:1b`)

## Instalação — Passo a Passo

### 1. Instalar o Ollama

**Linux / macOS:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Baixe o instalador de [ollama.com/download](https://ollama.com/download) e execute-o. O Ollama iniciará automaticamente como um serviço em segundo plano.

### 2. Baixar um modelo

Abra um terminal (Prompt de Comando no Windows) e execute:

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

#### Windows — Opção B: Temporário (Prompt de Comando)

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

> No Windows, execute estes comandos **após** fechar o Ollama pela bandeja do sistema.

### 4. Carregar a extensão no seu navegador

1. Acesse **`chrome://extensions`** (ou **`brave://extensions`**)
2. Ative o **"Modo do desenvolvedor"** (canto superior direito)
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta do projeto

### 5. Conceder permissões (IMPORTANTE)

Alguns navegadores exigem permissão explícita para extensões executarem em sites:

1. Em `chrome://extensions`, clique em **"Detalhes"** em **YT Level**
2. Ative **"Permitir que esta extensão leia e altere todos os seus dados nos sites que você visita"**
3. Se solicitado, clique em **"Permitir"**

> Sem esta etapa, a extensão carrega mas não funciona nas páginas do YouTube.

### 6. Usar a extensão

1. Acesse **https://www.youtube.com**
2. Vídeos com transcrições mostram um spinner verde durante a análise
3. Um círculo colorido aparece com o nível: **A1**, **A2**, **B1**, **B2**, **C1** ou **C2**
4. Passe o mouse sobre o selo para ver qual modelo foi usado
5. Clique no ícone da extensão para abrir o popup:
   - **Servidor** — altere a URL do seu servidor Ollama se necessário
   - **Modelo** — selecione qual modelo instalado usar
   - **Idioma** — altere o idioma da interface da extensão

## Como Funciona

1. Extrai cada ID de vídeo do feed do YouTube
2. Obtém a transcrição via `youtube-transcript.ai`
3. Envia a transcrição para seu modelo Ollama local solicitando classificação CEFR
4. Exibe o resultado como um selo circular na miniatura do vídeo
5. Os resultados são armazenados em cache localmente para evitar reanálise

## Servidor Ollama Personalizado

Por padrão, a extensão se conecta a `http://localhost:11434`. Você pode alterar isso:

1. Clique no ícone da extensão
2. Insira a URL do seu servidor (ex. `http://192.168.1.100:11434`)
3. Clique em **OK** — a extensão testará a conexão e carregará os modelos disponíveis
4. Clique em **↺** para restaurar o padrão

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
- O tempo de análise depende do seu hardware e do tamanho do modelo (20–60 segundos por vídeo na CPU)
- Se o Ollama não estiver em execução ou nenhum modelo estiver instalado, nenhum selo é exibido
- Nenhuma chave de API ou conexão com a Internet é necessária (uma vez que o modelo é baixado)
- Todos os dados permanecem locais — nada é enviado para servidores externos
