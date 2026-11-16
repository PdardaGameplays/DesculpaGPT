/**
 * DesculpaGPT - Orquestrador da Interface & Interatividade
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM - Controles
  const excuseForm = document.getElementById('excuseForm');
  const targetSelect = document.getElementById('targetSelect');
  const toneSelect = document.getElementById('toneSelect');
  const intensityRange = document.getElementById('intensityRange');
  const intensityLabel = document.getElementById('intensityLabel');
  const customContext = document.getElementById('customContext');
  const btnRoulette = document.getElementById('btnRoulette');
  const btnPanic = document.getElementById('btnPanic');
  const btnHistory = document.getElementById('btnHistory');

  // Elementos do DOM - Resultado
  const meterCircle = document.getElementById('meterCircle');
  const meterScore = document.getElementById('meterScore');
  const meterVerdict = document.getElementById('meterVerdict');
  const riskBadge = document.getElementById('riskBadge');
  const waAvatar = document.getElementById('waAvatar');
  const waContactName = document.getElementById('waContactName');
  const waExcuseText = document.getElementById('waExcuseText');
  const waTime = document.getElementById('waTime');
  const btnPlayAudio = document.getElementById('btnPlayAudio');
  const waWaveform = document.getElementById('waWaveform');
  const waAudioDuration = document.getElementById('waAudioDuration');

  // Botões de Ação
  const btnCopyMain = document.getElementById('btnCopyMain');
  const btnCopyShort = document.getElementById('btnCopyShort');
  const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
  const btnOpenEvidence = document.getElementById('btnOpenEvidence');
  const btnFavorite = document.getElementById('btnFavorite');

  // Abas
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const tacticalRulesList = document.getElementById('tacticalRulesList');
  const audioScriptText = document.getElementById('audioScriptText');
  const tacticalFlawsList = document.getElementById('tacticalFlawsList');

  // Modal de Evidência
  const evidenceModal = document.getElementById('evidenceModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const evidenceCanvas = document.getElementById('evidenceCanvas');
  const btnDownloadEvidence = document.getElementById('btnDownloadEvidence');
  const evidenceTypeBtns = document.querySelectorAll('.evidence-type-btn');

  // Modal de Histórico
  const historyModal = document.getElementById('historyModal');
  const btnCloseHistoryModal = document.getElementById('btnCloseHistoryModal');
  const btnCloseHistory = document.getElementById('btnCloseHistory');
  const btnClearHistory = document.getElementById('btnClearHistory');
  const historyContainer = document.getElementById('historyContainer');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  // Estado Atual
  let currentExcuseData = null;
  let currentEvidenceType = 'corrupted_file';
  let speechTimer = null;

  // Dicionário de Avatares & Nomes
  const TargetProfiles = {
    chefe: { icon: '👔', name: 'Chefe / Diretoria' },
    professor: { icon: '🎓', name: 'Professor(a) / Orientador' },
    crush: { icon: '❤️', name: 'Crush / Amor ❤️' },
    amigo: { icon: '🍻', name: 'Grupo dos Amigos' },
    familia: { icon: '👵', name: 'Mãe / Família' },
    cobrador: { icon: '🏦', name: 'Cobrança / Banco' }
  };

  const IntensityNames = {
    1: 'Nível 1 (Sutil & Discreto)',
    2: 'Nível 2 (Plausível)',
    3: 'Nível 3 (Equilibrado)',
    4: 'Nível 4 (Dramático)',
    5: 'Nível 5 (Apocalíptico)'
  };

  // Inicializa Barrinhas de Waveform do Áudio
  function buildWaveform() {
    waWaveform.innerHTML = '';
    const heights = [8, 14, 22, 10, 16, 24, 18, 12, 20, 26, 14, 10, 22, 16, 12, 18, 24, 20, 14, 8, 16, 22, 12, 10, 18, 14];
    heights.forEach(h => {
      const bar = document.createElement('div');
      bar.className = 'wa-wave-bar';
      bar.style.height = `${h}px`;
      waWaveform.appendChild(bar);
    });
  }

  // Atualiza Horário do WhatsApp
  function updateWhatsAppClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    waTime.textContent = `${hours}:${minutes}`;
  }

  // Toast Helper
  function showToast(msg, icon = '✅') {
    toastMessage.textContent = msg;
    toastIcon.textContent = icon;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  // Renderiza Desculpa na Tela
  function renderExcuse(data) {
    currentExcuseData = data;

    // Atualiza WhatsApp
    waExcuseText.textContent = data.mainExcuse;
    updateWhatsAppClock();

    const profile = TargetProfiles[data.target] || { icon: '👤', name: 'Contato' };
    waAvatar.textContent = profile.icon;
    waContactName.textContent = profile.name;

    // Convincenteômetro
    const intel = data.tacticalIntel;
    meterScore.textContent = `${intel.score}%`;
    meterCircle.style.setProperty('--percentage', intel.score);

    if (intel.score >= 90) {
      meterVerdict.textContent = 'Eficácia blindada: narrativa impecável e de difícil contestação.';
      riskBadge.textContent = '🛡️ Risco de Desmascaramento: Baixo';
      riskBadge.style.color = '#34d399';
    } else if (intel.score >= 80) {
      meterVerdict.textContent = 'Plausível: convence na maioria dos casos se mantiver a postura.';
      riskBadge.textContent = '⚖️ Risco de Desmascaramento: Moderado';
      riskBadge.style.color = '#facc15';
    } else {
      meterVerdict.textContent = 'Ousada: requer alta atuação teatral e convicção inabalável.';
      riskBadge.textContent = '⚠️ Risco de Desmascaramento: Alto';
      riskBadge.style.color = '#f87171';
    }

    // Checklist Tático
    tacticalRulesList.innerHTML = intel.goldenRules.map(rule => {
      return `<li><span>📌</span> <div>${rule}</div></li>`;
    }).join('');

    // Roteiro de Áudio
    audioScriptText.textContent = data.audioScript;

    // Vulnerabilidades
    tacticalFlawsList.innerHTML = intel.weaknesses.map(flaw => {
      return `<li><span>⚠️</span> <div>${flaw}</div></li>`;
    }).join('');

    // Previsão de duração de áudio simulada
    const wordsCount = data.mainExcuse.split(' ').length;
    const estSeconds = Math.max(12, Math.floor(wordsCount / 2.5));
    waAudioDuration.textContent = `0:${String(estSeconds).padStart(2, '0')}`;

    // Atualiza botão de favoritos
    const isFav = StorageGPT.isFavorite(data.mainExcuse);
    btnFavorite.textContent = isFav ? '⭐ Favoritada' : '⭐ Favoritar';
    if (isFav) {
      btnFavorite.classList.add('highlight');
    } else {
      btnFavorite.classList.remove('highlight');
    }

    // Salva no histórico
    StorageGPT.saveToHistory(data);
  }

  // Gera nova desculpa a partir do formulário
  function triggerGenerate() {
    AudioGPT.playMagicWhoosh();

    const selectedSituation = document.querySelector('input[name="situation"]:checked').value;
    const selectedTarget = targetSelect.value;
    const selectedTone = toneSelect.value;
    const intensity = parseInt(intensityRange.value, 10);
    const custom = customContext.value;

    const data = DesculpaGPT.generate({
      situation: selectedSituation,
      target: selectedTarget,
      tone: selectedTone,
      intensity: intensity,
      customContext: custom
    });

    renderExcuse(data);
  }

  // Evento: Submissão do Formulário
  excuseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerGenerate();
  });

  // Evento: Slider de Intensidade
  intensityRange.addEventListener('input', (e) => {
    const val = e.target.value;
    intensityLabel.textContent = IntensityNames[val] || `Nível ${val}`;
  });

  // Evento: Roleta da Salvação (Aleatório Divertido)
  btnRoulette.addEventListener('click', () => {
    AudioGPT.playClick();
    
    // Sorteia situação
    const sitRadios = document.querySelectorAll('input[name="situation"]');
    const randomSit = sitRadios[Math.floor(Math.random() * sitRadios.length)];
    randomSit.checked = true;

    // Sorteia Alvo
    const targets = Array.from(targetSelect.options).map(o => o.value);
    targetSelect.value = targets[Math.floor(Math.random() * targets.length)];

    // Sorteia Tom
    const tones = Array.from(toneSelect.options).map(o => o.value);
    toneSelect.value = tones[Math.floor(Math.random() * tones.length)];

    // Sorteia Intensidade
    const randIntensity = Math.floor(Math.random() * 5) + 1;
    intensityRange.value = randIntensity;
    intensityLabel.textContent = IntensityNames[randIntensity];

    showToast('🎲 Roleta girada! Combinação surpresa gerada.', '🎰');
    triggerGenerate();
  });

  // Evento: Botão de Pânico (Emergência Total)
  btnPanic.addEventListener('click', () => {
    AudioGPT.playPanic();

    const panicText = DesculpaGPT.panicQuickExcuse();
    navigator.clipboard.writeText(panicText).catch(() => {});

    // Renderiza emergência no zap
    waExcuseText.textContent = panicText;
    updateWhatsAppClock();
    waContactName.textContent = 'Alerta Vermelho 🚨';
    meterScore.textContent = '99%';
    meterCircle.style.setProperty('--percentage', 99);
    meterVerdict.textContent = 'Desculpa rápida de 1 clique copiada para sua área de transferência!';
    riskBadge.textContent = '🚨 MODO DE SOBREVIVÊNCIA ATIVADO';
    riskBadge.style.color = '#ef4444';

    showToast('🚨 PÂNICO! Desculpa copiada pro Clipboard! Cole agora no Zap!', '🚨');
  });

  // Evento: Copiar Mensagem Principal
  btnCopyMain.addEventListener('click', () => {
    if (!currentExcuseData) return;
    navigator.clipboard.writeText(currentExcuseData.mainExcuse).then(() => {
      AudioGPT.playSuccess();
      showToast('Mensagem copiada para a área de transferência!', '📋');
    });
  });

  // Evento: Copiar Versão Curta
  btnCopyShort.addEventListener('click', () => {
    if (!currentExcuseData) return;
    navigator.clipboard.writeText(currentExcuseData.shortVersion).then(() => {
      AudioGPT.playSuccess();
      showToast('Versão curta copiada!', '💬');
    });
  });

  // Evento: Enviar no WhatsApp Web
  btnSendWhatsApp.addEventListener('click', () => {
    if (!currentExcuseData) return;
    AudioGPT.playClick();
    const encoded = encodeURIComponent(currentExcuseData.mainExcuse);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  });

  // Evento: Favoritar
  btnFavorite.addEventListener('click', () => {
    if (!currentExcuseData) return;
    AudioGPT.playClick();
    const added = StorageGPT.toggleFavorite(currentExcuseData);
    if (added) {
      btnFavorite.textContent = '⭐ Favoritada';
      btnFavorite.classList.add('highlight');
      showToast('Adicionada aos favoritos!', '⭐');
    } else {
      btnFavorite.textContent = '⭐ Favoritar';
      btnFavorite.classList.remove('highlight');
      showToast('Removida dos favoritos.', '🗑️');
    }
  });

  // Evento: Reprodução do Áudio
  btnPlayAudio.addEventListener('click', () => {
    if (!currentExcuseData) return;

    if (AudioGPT.isAudioPlaying()) {
      AudioGPT.stopSpeech();
      btnPlayAudio.textContent = '▶';
      waWaveform.querySelectorAll('.wa-wave-bar').forEach(b => b.classList.remove('active'));
      return;
    }

    btnPlayAudio.textContent = '⏸';
    const bars = waWaveform.querySelectorAll('.wa-wave-bar');

    AudioGPT.speakExcuse(
      currentExcuseData.mainExcuse,
      currentExcuseData.tone,
      (speaking) => {
        if (speaking) {
          btnPlayAudio.textContent = '⏸';
          let activeIndex = 0;
          speechTimer = setInterval(() => {
            bars.forEach((b, idx) => {
              b.classList.toggle('active', idx <= activeIndex);
            });
            activeIndex = (activeIndex + 1) % bars.length;
          }, 150);
        } else {
          clearInterval(speechTimer);
          btnPlayAudio.textContent = '▶';
          bars.forEach(b => b.classList.remove('active'));
        }
      },
      () => {
        clearInterval(speechTimer);
        btnPlayAudio.textContent = '▶';
        bars.forEach(b => b.classList.remove('active'));
      }
    );
  });

  // Troca de Abas Táticas
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioGPT.playClick();
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Gerenciamento do Modal de Evidências
  btnOpenEvidence.addEventListener('click', () => {
    AudioGPT.playClick();
    evidenceModal.classList.add('active');
    
    // Seleciona o tipo de evidência baseado na situação atual
    if (currentExcuseData) {
      currentEvidenceType = currentExcuseData.evidenceType || 'corrupted_file';
    }
    
    // Atualiza botões
    evidenceTypeBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-type') === currentEvidenceType);
    });

    renderEvidenceCanvas();
  });

  btnCloseModal.addEventListener('click', () => {
    evidenceModal.classList.remove('active');
  });

  evidenceTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioGPT.playClick();
      evidenceTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentEvidenceType = btn.getAttribute('data-type');
      renderEvidenceCanvas();
    });
  });

  function renderEvidenceCanvas() {
    if (currentEvidenceType === 'corrupted_file') {
      const fileName = customContext.value ? `${customContext.value.trim().replace(/\s+/g, '_')}.docx` : 'Relatorio_Consolidado_Final.docx';
      EvidenciasGPT.drawCorruptedFile(evidenceCanvas, fileName);
    } else if (currentEvidenceType === 'traffic') {
      const via = DesculpaGPT.CidadesEVias[0];
      EvidenciasGPT.drawTrafficAlert(evidenceCanvas, via);
    } else if (currentEvidenceType === 'bank_alert') {
      const banco = DesculpaGPT.Bancos[0];
      EvidenciasGPT.drawBankAlert(evidenceCanvas, banco);
    } else if (currentEvidenceType === 'windows_update') {
      EvidenciasGPT.drawWindowsUpdate(evidenceCanvas);
    }
  }

  // Download da Evidência
  btnDownloadEvidence.addEventListener('click', () => {
    AudioGPT.playSuccess();
    const link = document.createElement('a');
    link.download = `evidencia_${currentEvidenceType}_${Date.now()}.png`;
    link.href = evidenceCanvas.toDataURL('image/png');
    link.click();
    showToast('Evidência visual baixada com sucesso!', '🖼️');
  });

  // Gerenciamento do Modal de Histórico
  btnHistory.addEventListener('click', () => {
    AudioGPT.playClick();
    renderHistoryModal();
    historyModal.classList.add('active');
  });

  btnCloseHistoryModal.addEventListener('click', () => {
    historyModal.classList.remove('active');
  });

  btnCloseHistory.addEventListener('click', () => {
    historyModal.classList.remove('active');
  });

  btnClearHistory.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar todo o histórico de desculpas?')) {
      StorageGPT.clearHistory();
      renderHistoryModal();
      showToast('Histórico limpo.', '🗑️');
    }
  });

  function renderHistoryModal() {
    const list = StorageGPT.getHistory();
    if (list.length === 0) {
      historyContainer.innerHTML = '<p style="text-align: center; color: #64748b; padding: 30px;">Nenhuma desculpa salva no histórico ainda.</p>';
      return;
    }

    historyContainer.innerHTML = list.map(item => {
      const date = new Date(item.timestamp || Date.now());
      const dateStr = `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')} - ${date.toLocaleDateString('pt-BR')}`;
      return `
        <div class="history-item">
          <div class="history-item-header">
            <span><strong>${item.situation ? item.situation.toUpperCase() : 'DESFORRA'}</strong> • Para: ${item.target || 'Geral'}</span>
            <span>${dateStr}</span>
          </div>
          <div class="history-item-text">${item.mainExcuse}</div>
          <div class="history-item-actions">
            <button class="btn-secondary btn-copy-history" data-text="${encodeURIComponent(item.mainExcuse)}">
              📋 Copiar
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Adiciona listener nos botões de copiar do histórico
    historyContainer.querySelectorAll('.btn-copy-history').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = decodeURIComponent(btn.getAttribute('data-text'));
        navigator.clipboard.writeText(text).then(() => {
          AudioGPT.playSuccess();
          showToast('Desculpa copiada do histórico!', '📋');
        });
      });
    });
  }

  // Inicialização
  buildWaveform();
  triggerGenerate();
});
