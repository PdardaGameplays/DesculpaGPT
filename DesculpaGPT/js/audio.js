/**
 * DesculpaGPT - Módulo de Áudio e Efeitos Sonoros
 * Utiliza Web Audio API (100% sintetizado, sem arquivos externos) e Web Speech API
 */

const AudioGPT = (() => {
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Efeito sonoro: Clique suave de botão
  function playClick() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignora silenciosamente se o navegador bloquear autoplay
    }
  }

  // Efeito sonoro: Quem gera a desculpa com sucesso (IA Processando)
  function playMagicWhoosh() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }

  // Efeito sonoro: Copiado com sucesso (Chime agradável)
  function playSuccess() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.09, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  // Efeito sonoro: Sirene do Botão de Pânico
  function playPanic() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.15);
      osc.frequency.linearRampToValueAtTime(440, now + 0.3);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // Sintetizador de Voz para simular áudio do WhatsApp
  let speechUtterance = null;
  let isSpeaking = false;

  function speakExcuse(text, tone, onProgress, onEnd) {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta síntese de voz.');
      return;
    }

    window.speechSynthesis.cancel();

    // Remove anotações cênicas como *[tom ofegante]*
    const cleanText = text.replace(/\*\[.*?\]\*/g, '').replace(/["']/g, '').trim();

    speechUtterance = new SpeechSynthesisUtterance(cleanText);
    speechUtterance.lang = 'pt-BR';

    // Ajusta tom e velocidade de acordo com a persona da desculpa
    if (tone === 'dramatico') {
      speechUtterance.rate = 1.15;
      speechUtterance.pitch = 1.3;
    } else if (tone === 'corporativo') {
      speechUtterance.rate = 0.95;
      speechUtterance.pitch = 0.9;
    } else if (tone === 'tecnico') {
      speechUtterance.rate = 1.0;
      speechUtterance.pitch = 0.85;
    } else if (tone === 'caradura') {
      speechUtterance.rate = 1.1;
      speechUtterance.pitch = 1.05;
    } else {
      speechUtterance.rate = 1.0;
      speechUtterance.pitch = 1.0;
    }

    // Tenta encontrar uma voz em português
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt') || v.lang.includes('BR'));
    if (ptVoice) {
      speechUtterance.voice = ptVoice;
    }

    speechUtterance.onstart = () => {
      isSpeaking = true;
      if (onProgress) onProgress(true);
    };

    speechUtterance.onend = () => {
      isSpeaking = false;
      if (onEnd) onEnd();
      if (onProgress) onProgress(false);
    };

    speechUtterance.onerror = () => {
      isSpeaking = false;
      if (onEnd) onEnd();
      if (onProgress) onProgress(false);
    };

    window.speechSynthesis.speak(speechUtterance);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
    }
  }

  function isAudioPlaying() {
    return isSpeaking;
  }

  return {
    playClick,
    playMagicWhoosh,
    playSuccess,
    playPanic,
    speakExcuse,
    stopSpeech,
    isAudioPlaying
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioGPT;
}
