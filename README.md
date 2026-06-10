# 💖 Missão Especial — Quiz do Dia dos Namorados

Um site interativo de quiz temático criado com carinho para o Dia dos Namorados, onde cada pergunta acertada revela uma dica que leva ao presente escondido. Com trilha sonora progressiva, efeitos visuais e uma mensagem especial ao final.

---

## ✨ Demonstração

🌐 **[Acesse o site ao vivo →](https://SEU_USUARIO.github.io/valentineday-minigame/)**

> Substitua `SEU_USUARIO` pelo seu nome de usuário no GitHub após publicar.

---

## 🎮 Como funciona

O jogo é dividido em **4 etapas progressivas**:

1. A jogadora lê a pergunta e escolhe uma das 4 alternativas
2. Se **acertar** → uma dica é revelada e ela avança para a próxima etapa
3. Se **errar** → aparece a tela **MELHORE!** e o jogo recomeça do zero
4. Ao completar todas as etapas → uma tela final exibe todas as dicas coletadas, que juntas revelam onde está o presente

---

## 🛠️ Tecnologias utilizadas

Este projeto foi construído com tecnologias **100% nativas do navegador**, sem nenhum framework, biblioteca externa ou dependência de instalação.

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura e semântica das telas |
| **CSS3** | Visual, animações, efeitos de vidro (backdrop-filter), responsividade |
| **JavaScript (Vanilla)** | Lógica do jogo, troca de telas, geração dinâmica de elementos |
| **Web Audio API** | Motor de áudio completo — música de fundo e efeitos sonoros gerados matematicamente pelo navegador, sem arquivos externos |
| **Google Fonts** | Tipografia: Cinzel (títulos) e Lato (corpo) |

> Nenhum `npm install`, nenhum build, nenhum framework. Abre direto no navegador.

---

## 🎵 Sistema de áudio progressivo

Todo o áudio é gerado em tempo real pela **Web Audio API** — sem um único arquivo `.mp3` ou `.ogg`. Isso significa que o site funciona offline e não depende de nenhum recurso externo para o som.

O sistema possui **4 camadas sonoras distintas**, uma para cada etapa, que evoluem conforme a jogadora avança:

| Etapa | Clima | Escala musical | Velocidade |
|---|---|---|---|
| 1 | 🌑 Misteriosa | Menor natural — sombria e curiosa | Lenta |
| 2 | 🌒 Curiosa | Mixolídia — levemente animada | Média |
| 3 | 🌓 Intensa | Pentatônica menor + 2ª voz harmônica | Rápida |
| 4 | 🌕 Épica | Maior festiva + duas vozes | Muito rápida |

Os **efeitos sonoros** também evoluem:

- 🖱️ **Clique:** 1 nota (etapa 1) → 2 → 3 → 4 notas (etapa 4)
- ✅ **Acerto:** acorde ascendente que cresce a cada etapa
- ❌ **Erro:** impacto grave e dissonante (igual em todas as etapas)
- 🎉 **Final:** fanfarra completa com melodia + baixo harmônico

O botão **🔊** fixo no canto superior direito permite silenciar tudo a qualquer momento.

---

## 📁 Estrutura do projeto

```
valentineday-minigame/
├── index.html   ← estrutura completa da página (4 telas)
├── style.css    ← todo o visual: cores, animações, layout responsivo
├── script.js    ← lógica do jogo + motor de áudio (Web Audio API)
└── README.md    ← este arquivo
```

Três arquivos. Sem pastas de dependências. Sem configuração.

---

## 🎨 Design

O visual foi construído com as seguintes escolhas intencionais:

- **Cor principal:** `#780e0e` — vinho escuro, elegante e apaixonado
- **Fundo:** `#0d0303` — preto quente, quase marrom escuro
- **Tipografia:** Cinzel (serifada clássica) para títulos, Lato para texto
- **Efeito glass:** painéis com `backdrop-filter: blur` e `rgba` para opacidade, deixando as pétalas visíveis por trás
- **Pétalas de cerejeira:** animadas com CSS puro, caindo continuamente em loop
- **Corações flutuantes:** aparecem apenas na tela final, subindo da parte inferior
- **Referência temática:** One Piece (Boa Hancock — "Imperatriz Pirata") integrada à narrativa do jogo

---

## 🚀 Como publicar no GitHub Pages

### 1. Crie um repositório

- Acesse [github.com](https://github.com) e clique em **New repository**
- Dê um nome (ex: `valentine-minigame`)
- Deixe como **Public**
- Clique em **Create repository**

### 2. Suba os arquivos

Na página do repositório:
- Clique em **"uploading an existing file"**
- Arraste os arquivos `index.html`, `style.css`, `script.js` e `README.md`
- Clique em **Commit changes**

### 3. Ative o GitHub Pages

- Vá em **Settings → Pages**
- Em **Branch**, selecione `main` e a pasta `/ (root)`
- Clique em **Save**

### 4. Acesse

Após alguns segundos seu site estará disponível em:

```
https://SEU_USUARIO.github.io/valentine-minigame/
```

---

## ✏️ Como personalizar

### Trocar perguntas e respostas

Abra `script.js` e edite o array `questions` no início do arquivo:

```js
{
  icon: "⚓",                             // emoji decorativo da pergunta
  title: "Sua pergunta aqui?",            // texto da pergunta
  options: ["A", "B", "C", "D"],          // as 4 alternativas
  correct: 2,                             // índice da correta (0=A 1=B 2=C 3=D)
  clue: {
    emoji: "🎁",                          // emoji da dica
    text: "Texto da dica revelada"        // dica exibida ao acertar
  }
}
```

### Trocar as cores

No `style.css`, procure por `#780e0e` (cor vinho principal) e substitua pelo hex desejado. O fundo escuro é `#0d0303`.

### Ajustar o volume da música

No `script.js`, dentro do array `stages`, cada etapa tem um campo `vol` (ex: `0.048`). Aumente ou diminua esse valor para controlar o volume de cada fase. Valores entre `0.02` e `0.10` funcionam bem.

---

## 👨‍💻 Autor

Desenvolvido por **Victor "Surtur" Cuba** com carinho 🖤

> *Para que ela encontre o meu "One Piece" que escondi para ela.*

---

## 📄 Licença

Este projeto é pessoal e foi criado com fins afetivos. Sinta-se livre para se inspirar e adaptar para a sua própria pessoa especial. 💞
