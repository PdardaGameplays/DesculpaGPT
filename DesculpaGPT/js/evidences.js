/**
 * DesculpaGPT - Gerador de Evidências Visuais Falsas
 * Renderiza em Canvas prints ultra-realistas de:
 * 1. Arquivo Corrompido / Erro do Windows / Office
 * 2. Alerta do Banco / PIX em Análise Antifraude
 * 3. Notificação do Waze / Trânsito Caótico
 * 4. Tela de Atualização do Windows 99%
 */

const EvidenciasGPT = (() => {

  // Desenha uma janela do Windows clássica/moderna para erro de arquivo
  function drawCorruptedFile(canvas, fileName = "Trabalho_Final_V3_DEFINITIVO.docx") {
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 720);
    const height = (canvas.height = 420);

    // Fundo escuro do desktop
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Janela de erro (Modal Windows 11 style)
    const boxX = 60, boxY = 60, boxW = 600, boxH = 300, radius = 12;
    
    // Sombra
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 15;
    
    ctx.fillStyle = '#202020';
    roundRect(ctx, boxX, boxY, boxW, boxH, radius);
    ctx.fill();

    // Reset de sombra
    ctx.shadowColor = 'transparent';

    // Borda sutil
    ctx.strokeStyle = '#383838';
    ctx.lineWidth = 1.5;
    roundRect(ctx, boxX, boxY, boxW, boxH, radius);
    ctx.stroke();

    // Barra de título
    ctx.fillStyle = '#2b2b2b';
    roundRectTop(ctx, boxX, boxY, boxW, 44, radius);
    ctx.fill();

    // Título
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Microsoft Office Word - Erro de Integridade', boxX + 20, boxY + 28);

    // Botão fechar (X)
    ctx.fillStyle = '#888888';
    ctx.font = '16px monospace';
    ctx.fillText('✕', boxX + boxW - 28, boxY + 28);

    // Ícone de Erro Crítico (Círculo Vermelho com X)
    const iconX = boxX + 45;
    const iconY = boxY + 115;
    ctx.fillStyle = '#e81123';
    ctx.beginPath();
    ctx.arc(iconX, iconY, 26, 0, Math.PI * 2);
    ctx.fill();

    // X dentro do ícone
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(iconX - 10, iconY - 10);
    ctx.lineTo(iconX + 10, iconY + 10);
    ctx.moveTo(iconX + 10, iconY - 10);
    ctx.lineTo(iconX - 10, iconY + 10);
    ctx.stroke();

    // Texto do erro
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Não é possível abrir '${fileName}'`, boxX + 90, boxY + 105);

    ctx.fillStyle = '#cccccc';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('O arquivo parece estar corrompido ou foi gravado em um setor com defeito.', boxX + 90, boxY + 130);
    ctx.fillText('Código de Exceção I/O: 0x80070057 (STATUS_DATA_CHECKSUM_ERROR)', boxX + 90, boxY + 155);

    // Timestamp
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} - ${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    ctx.fillStyle = '#777777';
    ctx.font = '12px monospace';
    ctx.fillText(`Timestamp do evento: ${timeStr} | CRC32: FAILED`, boxX + 90, boxY + 185);

    // Botões no rodapé
    drawButton(ctx, boxX + boxW - 130, boxY + boxH - 55, 110, 36, 'Cancelar', false);
    drawButton(ctx, boxX + boxW - 270, boxY + boxH - 55, 130, 36, 'Tentar Reparar', true);
  }

  // Desenha alerta de segurança bancária (PIX bloqueado)
  function drawBankAlert(canvas, bankName = "Nubank") {
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 680);
    const height = (canvas.height = 460);

    // Fundo Mobile Dark
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // Moldura de Notificação Push
    const cardX = 40, cardY = 50, cardW = 600, cardH = 360, radius = 24;

    ctx.fillStyle = '#171717';
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 1.5;
    roundRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.fill();
    ctx.stroke();

    // Topo da notificação: Ícone do App + Nome + Tempo
    ctx.fillStyle = '#a855f7'; // Roxo estilo tech
    ctx.beginPath();
    ctx.arc(cardX + 45, cardY + 45, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${bankName} Notificações`, cardX + 75, cardY + 50);

    ctx.fillStyle = '#888888';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('agora mesmo', cardX + cardW - 120, cardY + 50);

    // Divisor
    ctx.strokeStyle = '#262626';
    ctx.beginPath();
    ctx.moveTo(cardX + 25, cardY + 75);
    ctx.lineTo(cardX + cardW - 25, cardY + 75);
    ctx.stroke();

    // Ícone de Alerta Amarelo de Segurança
    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 24px -apple-system, sans-serif';
    ctx.fillText('⚠️', cardX + 35, cardY + 120);

    // Título do Alerta
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Transferência PIX em Análise de Segurança', cardX + 75, cardY + 118);

    // Mensagem detalhada
    ctx.fillStyle = '#d4d4d4';
    ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Sua transação recente acionou uma verificação preventiva do Mecanismo', cardX + 75, cardY + 155);
    ctx.fillText('Especial de Devolução (MED / Diretriz Bacen nº 142).', cardX + 75, cardY + 180);
    ctx.fillText('Para sua proteção, o saldo ficará temporariamente cativo até a conclusão.', cardX + 75, cardY + 205);

    // Box do Protocolo
    const protoX = cardX + 75, protoY = cardY + 235, protoW = cardW - 120, protoH = 75;
    ctx.fillStyle = '#222222';
    ctx.strokeStyle = '#383838';
    roundRect(ctx, protoX, protoY, protoW, protoH, 10);
    ctx.fill();
    ctx.stroke();

    const randomProto = `BCB-2026-${Math.floor(100000 + Math.random() * 900000)}-SEC`;
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '13px monospace';
    ctx.fillText(`Protocolo Bacen: ${randomProto}`, protoX + 16, protoY + 30);
    ctx.fillStyle = '#4ade80';
    ctx.fillText(`Status: Aguardando fila de liberação de chave (Previsão: D+0)`, protoX + 16, protoY + 54);
  }

  // Desenha alerta de Waze / Trânsito
  function drawTrafficAlert(canvas, via = "Avenida Principal") {
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 680);
    const height = (canvas.height = 420);

    // Fundo Waze Dark Mode
    ctx.fillStyle = '#181b20';
    ctx.fillRect(0, 0, width, height);

    // Desenha representação estilizada do mapa no fundo com vias escuras
    ctx.strokeStyle = '#2a2e39';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(250, 120);
    ctx.lineTo(450, 320);
    ctx.lineTo(680, 340);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(250, 120);
    ctx.lineTo(280, 420);
    ctx.stroke();

    // Via Congestionada em Vermelho Intenso
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(150, 200);
    ctx.lineTo(350, 240);
    ctx.lineTo(520, 260);
    ctx.stroke();

    // Card de Trânsito Waze Flutuante
    const cardX = 50, cardY = 70, cardW = 580, cardH = 280, radius = 20;
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#222631';
    roundRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1.5;
    roundRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.stroke();

    // Ícone de Acidente / Waze
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cardX + 50, cardY + 55, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('🚗💥', cardX + 30, cardY + 62);

    // Texto de alerta
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Acidente grave na via`, cardX + 90, cardY + 50);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`+${Math.floor(40 + Math.random() * 35)} min de retenção • Parado completamente`, cardX + 90, cardY + 75);

    // Localização
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Trecho afetado: ${via}`, cardX + 35, cardY + 125);
    ctx.fillText(`Relatado por 48 motoristas há 6 minutos`, cardX + 35, cardY + 150);

    // Barra de progresso de tráfego
    const barX = cardX + 35, barY = cardY + 180, barW = cardW - 70, barH = 12;
    ctx.fillStyle = '#374151';
    roundRect(ctx, barX, barY, barW, barH, 6);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    roundRect(ctx, barX, barY, barW * 0.85, barH, 6);
    ctx.fill();

    // Botão Recalcular
    drawButton(ctx, cardX + cardW - 190, cardY + cardH - 65, 155, 42, 'Recalcular Rota', true);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '13px monospace';
    ctx.fillText('GPS Conectado • Alta Precisão', cardX + 35, cardY + cardH - 40);
  }

  // Desenha tela de atualização travada do Windows
  function drawWindowsUpdate(canvas) {
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 680);
    const height = (canvas.height = 420);

    // Fundo azul Windows
    ctx.fillStyle = '#005a9e';
    ctx.fillRect(0, 0, width, height);

    // Círculo giratório (representação visual de progresso)
    const centerX = width / 2;
    const centerY = height / 2 - 40;
    const radius = 28;

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const dotX = centerX + Math.cos(angle) * radius;
      const dotY = centerY + Math.sin(angle) * radius;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + (i / 6) * 0.8})`;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Texto
    ctx.fillStyle = '#ffffff';
    ctx.font = '22px "Segoe UI Light", "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Trabalhando nas atualizações', centerX, centerY + 80);

    ctx.font = 'bold 26px "Segoe UI", sans-serif';
    ctx.fillText('99% concluído', centerX, centerY + 120);

    ctx.font = '16px "Segoe UI", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Não desligue o computador. Isso pode levar alguns minutos.', centerX, centerY + 160);
    ctx.textAlign = 'left';
  }

  // Utilitários de desenho geométrico para canvas
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function roundRectTop(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function drawButton(ctx, x, y, w, h, text, isPrimary) {
    ctx.fillStyle = isPrimary ? '#2563eb' : '#374151';
    roundRect(ctx, x, y, w, h, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x + w / 2, y + h / 2 + 5);
    ctx.textAlign = 'left';
  }

  return {
    drawCorruptedFile,
    drawBankAlert,
    drawTrafficAlert,
    drawWindowsUpdate
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EvidenciasGPT;
}
