// ══════════════════════════════════════════════════════════════
//  MOTOR DE ÁUDIO PROGRESSIVO — Web Audio API
//  Cada etapa tem sua própria trilha, escala e efeitos sonoros
// ══════════════════════════════════════════════════════════════

let audioCtx  = null;
let bgGain    = null;
let bgNodes   = [];
let soundOn   = true;
let loopTimer = null;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

// ── Perfil musical de cada etapa ─────────────────────────────
//
//  Etapa 0 — Misteriosa: escala menor, lenta, sombria e curiosa
//  Etapa 1 — Curiosa:    mixolídia, ritmo médio, levemente animada
//  Etapa 2 — Intensa:    pentatônica menor, mais rápida, segunda voz
//  Etapa 3 — Épica:      maior, rápida, duas vozes + harmonia rica
//
const stages = [
  {
    scale:    [220, 246.94, 261.63, 293.66, 311.13, 349.23, 369.99, 440],
    pattern:  [0,4,2,6,1,5,3,7,4,0,6,2,5,1,7,3,2,6,0,4,3,5,1,7],
    stepDur:  0.72,
    waveform: 'sine',
    vol:      0.048,
    padFreqs: [110, 138.59, 164.81],
    padVol:   0.22,
  },
  {
    scale:    [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 466.16, 523.25],
    pattern:  [0,2,4,3,5,4,2,6,1,3,5,7,4,2,0,5,3,6,2,4,7,1,3,5],
    stepDur:  0.55,
    waveform: 'triangle',
    vol:      0.052,
    padFreqs: [130.81, 164.81, 196.00],
    padVol:   0.20,
  },
  {
    scale:    [293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 698.46, 784.00],
    pattern:  [0,2,4,2,6,4,1,3,5,3,7,5,0,4,2,6,3,1,5,3,7,2,4,0],
    stepDur:  0.42,
    waveform: 'triangle',
    vol:      0.058,
    padFreqs: [146.83, 196.00, 246.94],
    padVol:   0.18,
  },
  {
    scale:    [392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 739.99, 784.00],
    pattern:  [0,2,4,7,4,6,5,3,1,0,2,4,6,5,7,4,2,0,3,5,7,6,4,2],
    stepDur:  0.32,
    waveform: 'triangle',
    vol:      0.062,
    padFreqs: [196.00, 246.94, 293.66],
    padVol:   0.16,
  }
];

// ── Clique progressivo por etapa ─────────────────────────────
//  Etapa 0: 1 nota suave  |  1: 2 notas  |  2: 3 notas  |  3: 4 notas
function playClick(stage) {
  if (!soundOn) return;
  const ctx = getCtx();
  const configs = [
    [{ f: 660,  dur: 0.10, type: 'sine',     delay: 0    }],
    [{ f: 660,  dur: 0.08, type: 'sine',     delay: 0    },
     { f: 880,  dur: 0.08, type: 'sine',     delay: 0.07 }],
    [{ f: 523,  dur: 0.07, type: 'triangle', delay: 0    },
     { f: 659,  dur: 0.07, type: 'triangle', delay: 0.06 },
     { f: 784,  dur: 0.07, type: 'triangle', delay: 0.12 }],
    [{ f: 523,  dur: 0.06, type: 'triangle', delay: 0    },
     { f: 659,  dur: 0.06, type: 'triangle', delay: 0.05 },
     { f: 784,  dur: 0.06, type: 'triangle', delay: 0.10 },
     { f: 1047, dur: 0.08, type: 'triangle', delay: 0.15 }],
  ];
  configs[Math.min(stage, 3)].forEach(({ f, dur, type, delay }) => {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = type;
    const t  = ctx.currentTime + delay;
    osc.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.16, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t); osc.stop(t + dur + 0.01);
  });
}

// ── Som de acerto progressivo por etapa ──────────────────────
//  Cresce de 2 notas (etapa 0) até 5 notas (etapa 3)
function playCorrect(stage) {
  if (!soundOn) return;
  const ctx = getCtx();
  const chords = [
    [{ f: 523.25, t: 0    }, { f: 659.25, t: 0.12 }],
    [{ f: 523.25, t: 0    }, { f: 659.25, t: 0.10 }, { f: 783.99, t: 0.20 }],
    [{ f: 523.25, t: 0    }, { f: 659.25, t: 0.09 }, { f: 783.99, t: 0.18 }, { f: 1046.5, t: 0.27 }],
    [{ f: 523.25, t: 0    }, { f: 659.25, t: 0.08 }, { f: 783.99, t: 0.16 }, { f: 1046.5, t: 0.24 }, { f: 1318.5, t: 0.34 }],
  ];
  chords[Math.min(stage, 3)].forEach(({ f, t }) => {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = 'triangle';
    const start = ctx.currentTime + t;
    osc.frequency.setValueAtTime(f, start);
    g.gain.setValueAtTime(0.20, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
    osc.start(start); osc.stop(start + 0.34);
  });
}

// ── Som de erro (igual em todas as etapas) ───────────────────
function playWrong() {
  if (!soundOn) return;
  const ctx = getCtx();
  const osc1 = ctx.createOscillator(); const g1 = ctx.createGain();
  osc1.connect(g1); g1.connect(ctx.destination);
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(220, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.4);
  g1.gain.setValueAtTime(0.3, ctx.currentTime);
  g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
  osc1.start(ctx.currentTime); osc1.stop(ctx.currentTime + 0.45);
  const osc2 = ctx.createOscillator(); const g2 = ctx.createGain();
  osc2.connect(g2); g2.connect(ctx.destination);
  osc2.type = 'square';
  osc2.frequency.setValueAtTime(180, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.3);
  g2.gain.setValueAtTime(0.15, ctx.currentTime);
  g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc2.start(ctx.currentTime); osc2.stop(ctx.currentTime + 0.3);
}

// ── Fanfarra final ────────────────────────────────────────────
function playFanfare() {
  if (!soundOn) return;
  const ctx = getCtx();
  const melody = [
    {f:523.25,t:0.00},{f:659.25,t:0.10},{f:783.99,t:0.20},{f:1046.5,t:0.30},
    {f:1046.5,t:0.45},{f:1174.7,t:0.55},{f:1318.5,t:0.65},{f:1174.7,t:0.75},
    {f:1046.5,t:0.85},{f:783.99,t:0.98},{f:1046.5,t:1.10},{f:1318.5,t:1.22},
    {f:1567.9,t:1.36}
  ];
  melody.forEach(({ f, t }) => {
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = 'triangle';
    const s = ctx.currentTime + t;
    osc.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(0.22, s);
    g.gain.exponentialRampToValueAtTime(0.001, s + 0.26);
    osc.start(s); osc.stop(s + 0.28);
  });
  [[130.8,0.00],[164.8,0.30],[196.0,0.65],[130.8,1.00]].forEach(([f,t]) => {
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = 'sine';
    const s = ctx.currentTime + t;
    osc.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(0.14, s);
    g.gain.exponentialRampToValueAtTime(0.001, s + 0.55);
    osc.start(s); osc.stop(s + 0.57);
  });
}

// ── Música de fundo progressiva ───────────────────────────────
function startBgMusic(stageIdx) {
  stopBgMusic();
  if (!soundOn) return;
  const ctx   = getCtx();
  const stage = stages[Math.min(stageIdx, stages.length - 1)];

  bgGain = ctx.createGain();
  bgGain.gain.setValueAtTime(stage.vol, ctx.currentTime);
  bgGain.connect(ctx.destination);

  function scheduleLoop(startTime) {
    if (!soundOn) return;
    const { scale, pattern, stepDur, waveform, padFreqs, padVol } = stage;
    const loopDur = pattern.length * stepDur;
    const nodes   = [];

    // Melodia principal
    pattern.forEach((idx, i) => {
      const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.connect(g); g.connect(bgGain);
      osc.type = waveform;
      const freq = scale[idx % scale.length];
      const t    = startTime + i * stepDur;
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.75, t + stepDur * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, t + stepDur * 0.82);
      osc.start(t); osc.stop(t + stepDur);
      nodes.push(osc);
    });

    // Pad harmônico de fundo
    padFreqs.forEach(freq => {
      const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.connect(g); g.connect(bgGain);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 0.5, startTime);
      g.gain.setValueAtTime(padVol, startTime);
      g.gain.linearRampToValueAtTime(0.0, startTime + loopDur);
      osc.start(startTime); osc.stop(startTime + loopDur);
      nodes.push(osc);
    });

    // Segunda voz (harmonia a terça) — ativa a partir da etapa 2
    if (stageIdx >= 2) {
      pattern.map(i => (i + 2) % scale.length).forEach((idx, i) => {
        const osc = ctx.createOscillator(); const g = ctx.createGain();
        osc.connect(g); g.connect(bgGain);
        osc.type = 'sine';
        const freq = scale[idx % scale.length];
        const t    = startTime + i * stepDur;
        osc.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.30, t + stepDur * 0.10);
        g.gain.exponentialRampToValueAtTime(0.001, t + stepDur * 0.75);
        osc.start(t); osc.stop(t + stepDur);
        nodes.push(osc);
      });
    }

    bgNodes   = nodes;
    loopTimer = setTimeout(
      () => scheduleLoop(ctx.currentTime + 0.05),
      (loopDur - 0.25) * 1000
    );
  }

  scheduleLoop(ctx.currentTime + 0.1);
}

function stopBgMusic() {
  if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
  bgNodes.forEach(n => { try { n.stop(); } catch (e) {} });
  bgNodes = [];
  if (bgGain) { bgGain.disconnect(); bgGain = null; }
}

function toggleSound() {
  soundOn = !soundOn;
  document.getElementById('sound-toggle').textContent = soundOn ? '🔊' : '🔇';
  if (soundOn) startBgMusic(current);
  else stopBgMusic();
}

// ══════════════════════════════════════════════════════════════
//  PERGUNTAS
//  correct: índice da resposta certa (0=A 1=B 2=C 3=D)
// ══════════════════════════════════════════════════════════════
const questions = [
  {
    icon: "⚓",
    title: "Qual foi o primeiro lugar em que nos encontramos pessoalmente?",
    options: ["Paulista", "Barzinho", "Shopping", "Minha casa"],
    correct: 2, // C) Shopping
    clue: { emoji: "🗝️", text: "Guarda" }
  },
  {
    icon: "🎬",
    title: "Quais filmes assistimos juntos no cinema?",
    options: ["Michael Jackson e Super Mario","Obsessão e Mortal Kombat","Michael Jackson e Obsessão","Michael Jackson e Tinker Bell"],
    correct: 2, // C) Michael Jackson e Obsessão
    clue: { emoji: "👗", text: "Roupa" }
  },
  {
    icon: "🌸",
    title: "Qual o nome do grupo em que nos conhecemos?",
    options: ["Surtados pelos Chapéus de Palha","Surubão dos Chapéus e Palha","Família Donquixote","Igreja Católica do Twitter"],
    correct: 1, // B) Surubão dos Chapéus e Palha
    clue: { emoji: "🚪", text: "Parte da direita, porta da direita" }
  },
  {
    icon: "🎥",
    title: "Qual foi a sequência de filme que vimos primeiro?",
    options: ["Frozen","Carros","Era do Gelo","Tinker Bell"],
    correct: 3, // D) Tinker Bell
    clue: { emoji: "🎁", text: "Encontre o pacote vermelho e fique à vontade para abrir!" }
  }
];

// ══════════════════════════════════════════════════════════════
//  LÓGICA DO JOGO
// ══════════════════════════════════════════════════════════════
let current = 0;
let clues   = [];

function createSakura() {
  const petals = ['🌸','🌺','✿','❀'];
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('div');
    el.className   = 'sakura';
    el.textContent = petals[Math.floor(Math.random() * petals.length)];
    el.style.left              = Math.random() * 100 + 'vw';
    el.style.animationDuration = (6  + Math.random() * 8)  + 's';
    el.style.animationDelay    = (Math.random() * 10)       + 's';
    el.style.fontSize          = (10 + Math.random() * 12) + 'px';
    document.body.appendChild(el);
  }
}

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startGame() {
  playClick(0);
  current = 0; clues = [];
  renderQuestion();
  show('screen-quiz');
  startBgMusic(0);
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById('step-label').textContent =
    `Etapa ${current + 1} de ${questions.length}`;
  document.getElementById('progress-bar').style.width =
    ((current + 1) / questions.length * 100) + '%';
  document.getElementById('q-icon').textContent  = q.icon;
  document.getElementById('q-title').textContent = q.title;

  const opts = document.getElementById('q-options');
  opts.innerHTML = '';
  ['A','B','C','D'].forEach((l, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-letter">${l}</span> ${q.options[i]}`;
    btn.onclick   = () => selectOption(i);
    opts.appendChild(btn);
  });

  document.getElementById('clue-reveal').classList.remove('visible');
  document.getElementById('next-btn').classList.remove('visible');
}

function selectOption(i) {
  const q    = questions[current];
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.onclick = null);

  if (i === q.correct) {
    playCorrect(current);
    btns[i].classList.add('selected');
    document.getElementById('clue-emoji').textContent = q.clue.emoji;
    document.getElementById('clue-text').textContent  = q.clue.text;
    document.getElementById('clue-reveal').classList.add('visible');
    document.getElementById('next-btn').classList.add('visible');
    clues.push(q.clue);
  } else {
    playWrong();
    btns[i].classList.add('wrong');
    setTimeout(() => show('screen-melhore'), 700);
  }
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    showFinal();
  } else {
    playClick(current);
    startBgMusic(current); // ← troca a trilha ao avançar de etapa
    renderQuestion();
  }
}

function resetQuiz() {
  playClick(0);
  current = 0; clues = [];
  renderQuestion();
  show('screen-quiz');
  startBgMusic(0);
}

function showFinal() {
  const list = document.getElementById('final-clues');
  list.innerHTML = '';
  clues.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'clue-item';
    item.innerHTML =
      `<div class="clue-num">${i + 1}</div>` +
      `<div class="clue-item-text">${c.emoji} ${c.text}</div>`;
    list.appendChild(item);
  });
  show('screen-final');
  stopBgMusic();
  setTimeout(() => playFanfare(), 300);
  createHearts();
}

function createHearts() {
  ['💖','💗','💕','🌹','✦'].forEach(s => {
    for (let j = 0; j < 2; j++) {
      const el = document.createElement('div');
      el.className   = 'hearts-float';
      el.textContent = s;
      el.style.left              = Math.random() * 100 + 'vw';
      el.style.animationDuration = (4  + Math.random() * 6) + 's';
      el.style.animationDelay    = (Math.random() * 5)       + 's';
      document.body.appendChild(el);
    }
  });
}

function restart() {
  playClick(0);
  document.querySelectorAll('.hearts-float').forEach(el => el.remove());
  current = 0; clues = [];
  stopBgMusic();
  show('screen-intro');
}

createSakura();
