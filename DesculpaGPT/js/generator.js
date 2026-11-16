/**
 * DesculpaGPT - Motor de Inteligência Artificial para Geração de Desculpas Convincentes
 * Desenvolvido especialmente para situações de risco social extremo.
 */

const DesculpaGPT = (() => {
  // Banco de dados contextual e gerador combinatório
  const CidadesEVias = [
    "na Marginal", "no Viaduto principal", "na Avenida Central", "no Anel Viário", 
    "na Linha Amarela", "no Corredor Norte-Sul", "na Rodovia", "na Radial Leste", "perto do viaduto"
  ];

  const Pets = ["meu cachorro", "a gatinha da minha irmã", "o pug do vizinho", "o Golden da minha mãe"];
  const SintomasPet = ["começou a vomitar espuma do nada", "engoliu um pedaço de borracha", "teve uma convulsão leve", "travou a pata no portão"];

  const ErrosTecnicos = [
    { code: "0x80070057", msg: "Falha de I/O e gravação no bloco MBR durante salvamento" },
    { code: "CRITICAL_PROCESS_DIED", msg: "Tela Azul durante compilação e corrupção do volume NTFS" },
    { code: "ERR_CONNECTION_TIMED_OUT", msg: "Instabilidade severa de DNS na operadora de fibra óptica" },
    { code: "KERNEL_DATA_INPAGE_ERROR", msg: "Falha mecânica temporária no setor de paginação do SSD" },
    { code: "AUTH_GATEWAY_DENIED", msg: "Falha criptográfica no token de autenticação bancária Open Finance" }
  ];

  const Bancos = ["Nubank", "Itaú", "Bradesco", "Banco do Brasil", "Inter", "Santander", "C6 Bank"];
  const MotivosBancarios = [
    "bloqueio preventivo pelo algoritmo de análise comportamental de fraude",
    "virada de lote do TED/PIX no Banco Central após manutenção noturna",
    "travamento no módulo de segurança em dois fatores (token desincronizado)",
    "estorno involuntário após tentativa de pagamento duplicado pela operadora",
    "saldo retido no CDB de liquidez diária com carência técnica de D+1"
  ];

  const DesculpasBase = {
    atraso: {
      chefe: {
        corporativo: [
          "Bom dia! Peço sinceras desculpas pelo atraso. Tive uma intercorrência logística imprevista decorrente de um vazamento hidráulico urgente no meu prédio que atingiu o quadro elétrico do andar. O corpo de bombeiros e a defesa civil precisaram liberar a saída dos moradores. Já estou em deslocamento acelerado com previsão de chegada em {tempo} minutos. Já estou com as planilhas e e-mails abertos no celular para não impactar o fluxo.",
          "Olá! Peço desculpas pelo atraso imprevisto. Houve uma ocorrência grave {via} envolvendo uma carreta tombada que interditou completamente 3 faixas, gerando retenção total sem rota de escape pelo Waze. Para mitigar qualquer gargalo, já estou logado pelo 4G monitorando as demandas prioritárias.",
          "Bom dia. Infelizmente tive um incidente doméstico de força maior: uma falha grave na fechadura eletrônica da porta principal me manteve retido até a chegada do chaveiro emergencial. Estou a caminho e chego em {tempo} minutos, plenamente disponível via Teams até lá."
        ],
        dramatico: [
          "Chefe, você não vai acreditar na provação que estou passando hoje... Saí com 40 minutos de antecedência, mas um pneu estourou exatamente em cima da ponte onde é proibido parar. O guincho demorou uma eternidade e começou uma tempestade que alagou a via de acesso. Estou desesperado para chegar, correndo o máximo possível com segurança!",
          "Bom dia... Estou profundamente envergonhado e chateado por mandar essa mensagem. Minha mãe passou mal logo cedo com um pico de pressão e precisei acompanhar a triagem médica de emergência até meu irmão chegar para me render. Já deixei tudo estabilizado e estou voando para a empresa!",
          "Peço mil desculpas! Foi um efeito dominó catastrófico hoje: o alarme do celular não tocou por causa de uma atualização de sistema que reiniciou o aparelho mudo, e quando saí o metrô estava evacuado por fumaça nos trilhos. Já peguei um carro por aplicativo e estou chegando!"
        ],
        tecnico: [
          "Prezado, informo que haverá um desvio pontual de {tempo} minutos no meu SLA presencial matinal. Tive que atender um chamado crítico presencial da concessionária de energia para restabelecimento da fase bifásica do condomínio que ameaçava o nobreak e os backups locais. Rota recalculada, chego pontualmente às {horario}.",
          "Bom dia. Houve uma discrepância operacional no transporte: pane eletromecânica nos freios do trem da Linha 9 entre as estações, exigindo desacoplamento assistido e caminhada guiada. Já contornei a contingência via transporte rodoviário complementar e chego em breve."
        ],
        minimalista: [
          "Bom dia. Tive um imprevisto doméstico urgente logo cedo, já controlado. Previsão de chegada no escritório em {tempo} minutos. Acompanhando e-mails pelo celular.",
          "Olá. Trânsito completamente travado por acidente grave na via principal sem desvio disponível. Chegando por volta das {horario}.",
          "Peço desculpas pelo atraso. Problema mecânico imprevisto no trajeto. Estou a caminho, chego em {tempo} min."
        ],
        caradura: [
          "Bom dia! Acredite ou não, meu vizinho idoso trancou o gato no motor do carro dele e eu não pude simplesmente ignorar os gritos do bichinho antes de ir trabalhar. Resgate concluído com sucesso e agora estou acelerando rumo à firma!",
          "Salve chefe! O trânsito hoje parecia uma convenção mundial de lesmas. Mas já superei o pior trecho e chego trazendo toda a energia acumulada para compensar cada segundo!"
        ]
      },
      professor: {
        corporativo: [
          "Prezado(a) Professor(a), peço escusas pelo atraso na aula de hoje. Tive uma pendência de documentação no cartório cujo agendamento só foi liberado na primeira hora da manhã sob pena de perda de prazo judicial. Já estou me dirigindo à sala de aula.",
          "Professor(a), peço desculpas pela pontualidade prejudicada. Houve um bloqueio de tráfego policial no entorno do campus que retardou todos os ônibus da linha universitária. Já estou ingressando no prédio acadêmico."
        ],
        dramatico: [
          "Professor(a), me perdoe imensamente! Eu passei a madrugada revisando a matéria e tive uma crise de enxaqueca tão severa com náusea que precisei tomar medicação na farmácia 24h e esperar fazer efeito para conseguir enxergar a luz do dia. Estou a caminho da sala!",
          "Professor, sinto muito mesmo! Estava na condução para a faculdade quando uma senhora tropeçou no degrau do ônibus e eu ajudei a socorrer até a ambulância chegar. Jamais me atrasaria por desleixo, valorizo muito sua aula!"
        ],
        minimalista: [
          "Professor(a), peço desculpas pelo atraso. Problema imprevisto no transporte público. Chego em {tempo} minutos para acompanhar o restante do conteúdo.",
          "Bom dia, professor. Consulta médica de retorno estendeu além do previsto. Estou chegando para a segunda parte da aula."
        ]
      },
      crush: {
        dramatico: [
          "Amor, me perdoa de joelhos! Eu estava pronta(o) e impecável pra te ver, quando uma moto passou em alta velocidade numa poça e jogou lama dos pés à cabeça na minha roupa. Tive que voltar correndo pra tomar outro banho e me trocar. Tô tão triste que queria que tudo desse certo... Já tô no Uber indo voando pra você, não desiste de mim!",
          "Você não vai acreditar no meu azar, parece carma de quem tá ansioso demais pra encontrar a pessoa favorita... A bateria do meu celular simplesmente apagou com 40%, não chamava Uber e fiquei preso sem saber o endereço exato. Consegui um carregador emprestado numa padaria e já tô correndo! Te compenso com a melhor sobremesa do cardápio hoje, prometo!"
        ],
        emocional: [
          "Meu bem, desculpa mesmo de coração! Eu queria tanto chegar antes pra te esperar com flores, mas meu irmão pequeno teve febre alta e precisei passar na farmácia correndo antes de sair. Já tô no caminho, contando os segundos pra te dar um abraço bem apertado.",
          "Oii! Desculpa o atraso, não me mata por favor! Passei 30 minutos procurando a chave que meu gato escondeu embaixo do sofá, foi uma comédia trágica. Tô chegando em {tempo} minutinhos e todo o meu foco vai ser em você!"
        ],
        minimalista: [
          "Oii! Me perdoa o atraso, trânsito surreal por causa de um semáforo quebrado na avenida principal. Tô a {tempo} min de distância, tá? Já guardei sua mesa!",
          "Perdão meu bem! Tive um imprevisto bobo na saída de casa, mas já estou pertinho. Me espera 10 minutinhos!"
        ]
      },
      amigo: {
        caradura: [
          "Mano do céu, você não sabe o que me aconteceu. Quando eu fui sair, o carteiro bateu pra entregar uma encomenda que precisava de reconhecimento facial e CPF e o app dos Correios caiu por 20 minutos. Mas ó, já tô no Uber e a primeira rodada de chopp/batata é na minha conta!",
          "Irmão, desculpa! Meu senso de direção hoje foi resetado de fábrica. Peguei o ônibus no sentido contrário ouvindo podcast e fui parar quase em outra comarca. Já dei meia volta e tô colando aí em {tempo} min!"
        ],
        dramatico: [
          "Cara, meu dia hoje tá uma loucura que nem parece real. Tive que descer correndo pra acudir o porteiro do prédio que ficou preso no elevador de carga. Parecia cena de filme de comédia pastelão. Já saí, tô chegando!",
          "Mano, perdoa a mancada! Caiu um temporal repentino aqui no bairro e derrubou uma árvore bem na frente da garagem. Os bombeiros acabaram de desobstruir a calçada. Tô voando praí!"
        ],
        minimalista: [
          "Mano, atrasei feio por conta do trânsito na {via}. Chegando em {tempo} minutos, segura a mesa aí!",
          "Foi mal a demora, imprevisto de última hora na saída de casa. Tô a 15 min."
        ]
      },
      familia: {
        emocional: [
          "Mãe/Pai, me desculpa o atraso! Saí na hora certa, mas encontrei uma vizinha idosa aqui na rua que precisava carregar as compras pesadas até o 4º andar porque o elevador quebrou. Lembrei de vocês e não tive coragem de não ajudar. Já tô chegando pra almoçar!",
          "Família, perdão pela demora! O trânsito de domingo na entrada da cidade parou completamente por causa de blitz. Estou super ansioso(a) pra comer a comida de vocês, já estou chegando!"
        ]
      }
    },

    trabalho: {
      chefe: {
        corporativo: [
          "Olá. Gostaria de alinhar a entrega do relatório/projeto. No processo de consolidação final dos dados e validação de consistência ontem à noite, identificamos uma discrepância no cruzamento de métricas originadas de uma base desatualizada. Para garantir que não enviemos dados com risco de compliance para a diretoria, estou reprocessando a extração com o suporte técnico para entregar o documento blindado e 100% auditável até o final da tarde.",
          "Prezado(a), informo sobre o status da entrega: a compilação do material encontrou uma instabilidade durante a sincronização na nuvem do SharePoint corporativo, gerando duplicidade e perda de integridade nos índices. Já abri chamado prioritário de TI (Ticket #9482) para restauração do ponto de restauração limpo. Assim que a esteira liberar, encaminho o PDF consolidado.",
          "Bom dia. O trabalho já está 90% estruturado, porém durante o teste de estresse dos dados percebi que duas premissas estratégicas precisam de uma revisão qualitativa para evitar refação posterior. Prefiro atrasar a entrega em poucas horas e entregar um trabalho impecável do que apresentar números inconsistentes."
        ],
        tecnico: [
          "Houve uma falha de E/S grave ({erro}) durante a renderização/exportação do banco de dados na madrugada. O arquivo principal sofreu corrupção de cabeçalho binário. Estou executando utilitário de recuperação de setores via chkdsk e sincronizando o commit anterior para recuperar as alterações sem perda de fidelidade. Entrego até as {horario}.",
          "Durante o build e validação das regras de negócio, o compilador acusou quebra de contrato de API nos pacotes de dependência atualizados automaticamente no servidor. Para manter a estabilidade do release, estou revertendo a branch e revalidando a suíte de testes ponta a ponta."
        ],
        dramatico: [
          "Chefe, estou devastado(a)... O projeto estava rigorosamente finalizado às 2h da manhã, mas houve um surto elétrico no bairro durante a chuva que queimou a fonte do meu nobreak e corrompeu a última partição de salvamento local. Já levei a máquina numa assistência técnica especializada em recuperação forense de dados agora de manhã. O técnico prometeu salvar a versão integral até o almoço!"
        ],
        minimalista: [
          "Prezado(a), a entrega precisou de um ajuste emergencial de integridade nos anexos finais. Estou finalizando os últimos detalhes de formatação e submeto até o início da tarde.",
          "Olá. Tivemos uma pendência técnica na extração dos dados finais. O arquivo está sendo reexportado e será encaminhado sem falta hoje."
        ]
      },
      professor: {
        tecnico: [
          "Professor(a), peço sua compreensão e benevolência quanto ao envio do trabalho acadêmico. Ao gerar a versão final no LaTeX/Word de acordo com as normas ABNT 2026, ocorreu uma falha crítica de compilação bibliográfica (mendeley/zotero) que desconfigurou todas as 74 citações cruzadas. Para não entregar um trabalho abaixo do rigor científico exigido pela sua cátedra, estou corrigindo as referências manualmente e anexo o print do erro de compilação.",
          "Prezado(a) Professor(a), durante o upload no portal acadêmico AVA às 23:58, o servidor da instituição retornou erro de timeout (504 Gateway Timeout). Tenho a gravação da tela e os logs do navegador comprovando a tentativa tempestiva. Solicito autorização para reenvio do arquivo íntegro em anexo."
        ],
        dramatico: [
          "Professor, estou com o coração na mão... Passei a semana inteira dedicado a esse trabalho, mas ontem à noite meu notebook simplesmente travou na atualização infinita do sistema operacional (Atualizando 99% - Não desligue o computador) e reiniciou corrompendo a pasta temporária de arquivos temporários. Já consegui recuperar a maior parte dos capítulos e envio completo hoje sem falta!",
          "Professor(a), tive um problema de saúde súbito na família ontem à noite e precisei acompanhar minha avó na emergência do hospital. Não tive como finalizar a digitação das considerações finais. O trabalho está todo rascunhado e eu finalizo em poucas horas se o senhor permitir."
        ],
        minimalista: [
          "Professor(a), tive uma falha no salvamento do arquivo ontem à noite antes do prazo final da plataforma. Solicito autorização para envio em anexo da versão final concluída.",
          "Prezado professor, o portal acadêmico oscilou durante o envio. Estou reencaminhando o documento anexo para avaliação."
        ]
      },
      amigo: {
        caradura: [
          "Irmão, sabe aquele trabalho em grupo? O arquivo ficou tão pesado com as imagens em 4K que o Gmail se recusou a anexar e o WeTransfer acusou violação de cota! Mas relaxa, já baixei a compressão e tô mandando no grupo agorinha mesmo!",
          "Mano, confesso: o trabalho tava pronto, mas aí eu li de novo e achei a introdução tão sem sal que decidi reescrever pra gente garantir o 10. Você vai me agradecer quando o professor elogiar nosso grupo na frente de todo mundo!"
        ]
      }
    },

    esquecimento: {
      crush: {
        emocional: [
          "Amor da minha vida... Como eu sou idiota! Eu passei os últimos 3 dias planejando mentalmente cada detalhe do nosso dia especial e fiquei tão focado em te fazer uma surpresa maior no fim de semana que travei na data de hoje achando que ainda era quarta-feira! Minha cabeça tá a mil com o trabalho, mas meu coração nunca esquece de você. Você é a pessoa mais importante pra mim, deixa eu te mimar hoje como você merece!",
          "Meu bem, me bate, me xinga, mas por favor não duvida do que eu sinto por você! Aconteceu uma confusão absurda: eu anotei na minha agenda do Google com o fuso horário errado e o lembrete simplesmente não apitou. Quando me toquei, meu coração veio na boca. Tô indo na sua casa agora com a sua comida favorita pra me redimir!",
          "Você tem todo direito de ficar bravo(a) comigo... Eu entrei num vórtice de estresse essa semana que fiquei completamente anestesiado(a) e desconectado(a) da realidade. Jamais foi por falta de consideração ou amor. Deixa eu me redimir do jeito certo?"
        ],
        dramatico: [
          "Eu não tenho nem cara de falar nada... Passei tanta vergonha hoje quando percebi. O despertador do meu cérebro deu tela azul total de cansaço acumulado. Me perdoa do fundo da alma, tô me sentindo a pior pessoa do mundo. Prometo nunca mais deixar isso acontecer!"
        ]
      },
      amigo: {
        caradura: [
          "Parabéns meu irmão! Calma, eu NÃO esqueci do seu aniversário! Eu esperei propositalmente passar a meia-noite e todo o spam genérico de parabéns das pessoas superficiais pra ser a mensagem mais marcante e inesquecível do dia seguinte! É estratégia, não esquecimento!",
          "Mano, me perdoa de coração! Minha rotina essa semana foi um moedor de carne, esqueci até de almoçar ontem. Jamais esqueceria de você por querer! Quando a gente vai comemorar? O primeiro copo é meu!"
        ],
        emocional: [
          "Meu parceiro, desculpa a cabeça oca! Você sabe que eu sou desprovido de memória cronológica, mas consideração por você eu tenho de sobra. Parabéns atrasado, você merece todo o sucesso do mundo e mais um pouco!"
        ]
      },
      chefe: {
        corporativo: [
          "Olá. Peço sinceras desculpas pelo lapso no comparecimento à reunião das 10h. O convite do calendário estava arquivado sob outra pasta de e-mail corporativo devido a uma regra de filtro automático na caixa de entrada. Já solicitei ao colega a gravação e a ata da reunião para tomar todas as providências de minha alçada imediatamente.",
          "Peço escusas pela ausência pontual. Tive que atender em paralelo uma demanda de auditoria regulatória urgente que me desconectou do radar de notificações da agenda. Já estou me inteirando dos tópicos debatidos para dar continuidade."
        ]
      }
    },

    dinheiro: {
      cobrador: {
        corporativo: [
          "Prezado(a), boa tarde. Gostaria de formalizar o status do pagamento acordado. Houve uma inconsistência técnica no módulo antifraude da instituição bancária ({banco}) devido à atualização das diretrizes do Banco Central para transações com chave cadastrada recente. O setor de suporte do banco já registrou o protocolo de destravamento com prazo regulamentar de liberação nas próximas horas. O comprovante será enviado imediatamente após a compensação.",
          "Olá! Informo que a ordem de transferência já foi provisionada na minha conta corrente, contudo, por conta do horário limite de TED/liquidação interbancária e do valor da operação, o sistema enquadrou a transação em análise manual de conformidade. Estou acompanhando minuto a minuto e te mantenho atualizado assim que o saldo liquidar."
        ],
        dramatico: [
          "Olha, me perdoa imensamente pelo transtorno, ninguém odeia mais dever do que eu! Passei por um susto absurdo no sábado: clonaram meu cartão e tentaram fazer compras na Indonésia, aí o banco bloqueou preventivamente todas as minhas contas e limites para investigação pericial. Estou na fila da agência física com meus documentos para desbloquear o saldo e transferir sua quantia hoje mesmo!",
          "Eu estou com uma vergonha indescritível... Meu salário que cai pontualmente todo dia 5 atrasou devido à troca do sistema contábil terceirizado da empresa em que presto serviços. A diretoria já emitiu comunicado interno garantindo o depósito extraordinário até o final do dia. Assim que cair o PIX na minha conta, o seu é o primeiríssimo que faço!"
        ],
        tecnico: [
          "Houve uma recusa na liquidação via gateway SPI ({erro}) por divergência no hash de validação do recebedor na CIP (Câmara Interbancária de Pagamentos). O gerente da minha conta PJ informou que o lote será reprocessado no próximo ciclo de liquidação de D+0 às 16h30."
        ],
        minimalista: [
          "Boa tarde. O aplicativo do {banco} está instável hoje para transações externas. Assim que o sistema restabelecer a comunicação com o Banco Central eu envio o comprovante.",
          "Olá! Tive uma inconsistência com a liberação do lote de pagamentos hoje. A resolução está prevista para as próximas horas e te mando o comprovante em seguida."
        ]
      },
      amigo: {
        dramatico: [
          "Irmão, me perdoa de joelhos! Sabe aquele dinheiro que eu te prometi pra hoje? Meu aplicativo do banco travou depois que eu errei a senha de segurança facial duas vezes no escuro ontem. Agora estão pedindo 24h úteis pra validar a selfie no atendimento humano. Mas não se preocupa, tá blindado que até amanhã cedo tá na sua mão, desculpa mesmo!",
          "Mano do céu, que dor de cabeça... Aconteceu uma retenção automática na minha conta por causa de uma taxa de anuidade retroativa que o banco cobrou sem avisar e deixou meu saldo negativo temporariamente. Já fiz a contestação e o estorno entra hoje à tarde, aí já te passo imediatamente!"
        ],
        caradura: [
          "Mano, o dinheiro já tá separado mentalmente e espiritualmente, mas o banco colocou meu Pix em análise de segurança porque achou suspeito eu transferir dinheiro em plena segunda-feira! Assim que o gerente desengavetar lá eu te mando o comprovante!"
        ],
        minimalista: [
          "Mano, tive uma trava técnica no aplicativo do {banco} hoje. Tô resolvendo com o suporte e já te faço o PIX assim que normalizar, valeu pela paciência!"
        ]
      },
      crush: {
        emocional: [
          "Amor, deixa eu te explicar com todo carinho... Esse mês tive uma despesa médica imprevista da minha família que sugou minha reserva de emergência antes do meu pagamento virar. Tô me sentindo super chateado(a) de não poder bancar aquele rolê incrível que a gente combinou, mas queria muito te ver! Topa a gente fazer uma noite de filminho e pipoca na minha casa com todo meu amor?",
          "Meu bem, tive um imprevisto financeiro chato com a manutenção do carro/casa essa semana que me deixou bem apertado(a) até o quinto dia útil. Queria ser transparente com você porque te respeito muito. Posso te compensar com um jantar maravilhoso assim que virar o mês?"
        ]
      }
    },

    custom: {
      todos: [
        "Olha, eu gostaria muito de estar disponível, mas aconteceu uma situação imprevisível e atípica de última hora que demandou 100% da minha atenção e energia física. Não foi por descuido ou má vontade. Assim que tudo estiver sob controle te dou um retorno completo com calma.",
        "Peço sinceras desculpas pelo ocorrido. Fui pego de surpresa por uma sequência de incidentes logísticos e pessoais fora do meu controle que impossibilitaram minha previsão inicial. Estou fazendo o possível para contornar os danos e regularizar a situação com prioridade absoluta."
      ]
    }
  };

  // Funções de apoio para variação dinâmica
  function getRandom(arr) {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function formatVariables(text, params) {
    const via = getRandom(CidadesEVias);
    const pet = getRandom(Pets);
    const sintoma = getRandom(SintomasPet);
    const erroObj = getRandom(ErrosTecnicos);
    const banco = getRandom(Bancos);
    const motivoBanco = getRandom(MotivosBancarios);
    const tempo = params.tempo || String(Math.floor(Math.random() * 25) + 20);

    const now = new Date();
    const futureHour = new Date(now.getTime() + parseInt(tempo, 10) * 60000);
    const horario = `${String(futureHour.getHours()).padStart(2, '0')}:${String(futureHour.getMinutes()).padStart(2, '0')}`;

    return text
      .replace(/{via}/g, via)
      .replace(/{pet}/g, pet)
      .replace(/{sintoma}/g, sintoma)
      .replace(/{erro}/g, erroObj.code)
      .replace(/{erro_msg}/g, erroObj.msg)
      .replace(/{banco}/g, banco)
      .replace(/{motivo_banco}/g, motivoBanco)
      .replace(/{tempo}/g, tempo)
      .replace(/{horario}/g, horario);
  }

  // Gera áudio roteiro com instruções de atuação vocal
  function generateAudioScript(excuse, tone, situation) {
    let direcoes = "*[Tom ofegante, barulho de chave e passos rápidos]* ";
    if (tone === 'dramatico') {
      direcoes = "*[Voz embargada, suspiro pesado no início, fala acelerada de quem está desesperado]* ";
    } else if (tone === 'corporativo') {
      direcoes = "*[Tom formal, firme, porém solícito e seguro, sem gaguejar]* ";
    } else if (tone === 'tecnico') {
      direcoes = "*[Tom calmo, sério, usando pausas metódicas como quem está explicando um diagnóstico]* ";
    } else if (tone === 'caradura') {
      direcoes = "*[Tom descontraído, quase rindo, transmitindo carisma magnético inabalável]* ";
    } else if (tone === 'emocional') {
      direcoes = "*[Voz doce, afetuosa, fazendo beicinho sonoro e muita sinceridade no olhar]* ";
    }

    // Adaptação da fala para linguagem oral brasileira
    let falaOral = excuse
      .replace(/Prezado\(a\)/g, "Oi, tudo bem?")
      .replace(/Prezado/g, "Oi chefe")
      .replace(/peço escusas/g, "peço mil desculpas")
      .replace(/discrepância operacional/g, "problema inesperado")
      .replace(/informo que haverá/g, "só te avisando que vai rolar")
      .substring(0, 280) + "...";

    return `${direcoes}"${falaOral}"`;
  }

  // Análise tática de risco e vulnerabilidades
  function calculateTacticalIntel(situation, tone, target, intensity) {
    let baseScore = 88;
    
    // Ajustes de pontuação baseados na combinação
    if (tone === 'corporativo' && (target === 'chefe' || target === 'professor')) baseScore += 8;
    if (tone === 'dramatico' && target === 'crush') baseScore += 6;
    if (tone === 'tecnico') baseScore += 5; // Detalhes técnicos intimidam questionamentos
    if (intensity > 4) baseScore -= 8; // Drama excessivo gera suspeita
    if (tone === 'caradura' && target === 'chefe') baseScore -= 12; // Arriscado

    const finalScore = Math.min(99, Math.max(68, baseScore + Math.floor(Math.random() * 5)));

    // Análise de risco
    let riskLevel = "Baixo";
    let riskReason = "Narrativa plausível, sem dependência de testemunhas.";
    let weaknesses = [];
    let rules = [];

    if (situation === 'atraso') {
      weaknesses = [
        "A pessoa pode abrir o Waze ou Google Maps para checar o trânsito da sua via.",
        "Se você chegar calmo e com cabelo arrumado demais, destrói a narrativa de correria."
      ];
      rules = [
        "Regra de Ouro: Chegue guardando o celular e guardando a chave com pressa fingida.",
        "Não poste NADA nos Stories do Instagram pelas próximas 6 horas.",
        "Agradeça a compreensão em vez de pedir desculpas repetidas vezes ('Obrigado pela paciência' soa mais maduro)."
      ];
    } else if (situation === 'trabalho') {
      weaknesses = [
        "Podem pedir para você enviar a 'versão corrompida' por e-mail para tentar recuperar.",
        "Se o prazo era estrito, cobrarão o PDF em poucas horas."
      ];
      rules = [
        "Tenha em mãos o arquivo gerador de erro fake (use o botão de Gerar Evidência).",
        "Ao entregar, capriche no dobro da formatação para passar a impressão de perfeccionismo.",
        "Mantenha a versão da falha de arquivo simples (não misture 3 problemas técnicos ao mesmo tempo)."
      ];
    } else if (situation === 'dinheiro') {
      weaknesses = [
        "O cobrador pode pedir o ID/código de transação do PIX travado.",
        "Não seja flagrado gastando em barzinho ou comprando lanche no dia seguinte."
      ];
      rules = [
        "Culpe SEMPRE o algoritmo de segurança do banco e a burocracia do Banco Central.",
        "Dê um prazo específico (ex: 'até às 16h30') para transmitir confiança.",
        "Seja proativo: mande mensagem antes do credor vir te cobrar."
      ];
    } else {
      weaknesses = [
        "Risco de incoerência se você contar detalhes diferentes para terceiros.",
        "Emocionalismo fingido em excesso gera desconfiança."
      ];
      rules = [
        "Menos é mais: desculpas longas demais cheiram a culpa fabricada.",
        "Assuma o erro com convicção e ofereça uma compensação imediata.",
        "Não olhe para o chão ao falar presencialmente; mantenha contato visual sereno."
      ];
    }

    if (finalScore < 80) riskLevel = "Médio a Alto";
    else if (finalScore < 90) riskLevel = "Moderado";

    return {
      score: finalScore,
      riskLevel: riskLevel,
      riskReason: riskReason,
      weaknesses: weaknesses,
      goldenRules: rules
    };
  }

  // Gera versão curta específica para WhatsApp
  function generateShortWhatsApp(mainExcuse, target) {
    if (mainExcuse.length < 130) return mainExcuse;
    
    // Resume de forma natural para mensagem rápida
    const phrases = mainExcuse.split(/[.!?]/).filter(p => p.trim().length > 10);
    if (phrases.length >= 2) {
      return `${phrases[0].trim()}. ${phrases[1].trim()}!`.trim();
    }
    return mainExcuse.substring(0, 140) + "... Já te mando tudo certinho!";
  }

  // Engine Principal
  function generate(options = {}) {
    const {
      situation = 'atraso',
      customContext = '',
      target = 'chefe',
      tone = 'corporativo',
      intensity = 3,
      timeEstimate = '25'
    } = options;

    let excuseTemplate = "";

    // Busca pela situação
    const situationGroup = DesculpasBase[situation] || DesculpasBase.atraso;

    // Busca pelo alvo ou fallback
    const targetGroup = situationGroup[target] || situationGroup.chefe || situationGroup.amigo || DesculpasBase.atraso.chefe;

    // Busca pelo tom ou fallback
    let toneList = targetGroup[tone] || targetGroup.corporativo || targetGroup.dramatico || targetGroup.minimalista;
    
    if (!toneList || toneList.length === 0) {
      // Tenta achar qualquer lista disponível no grupo
      const availableTones = Object.keys(targetGroup);
      if (availableTones.length > 0) {
        toneList = targetGroup[availableTones[0]];
      } else {
        toneList = DesculpasBase.custom.todos;
      }
    }

    excuseTemplate = getRandom(toneList);

    // Se o usuário digitou contexto personalizado
    if (customContext && customContext.trim().length > 3) {
      const customPrefixes = [
        `Referente a ${customContext.trim()}: `,
        `Sobre a situação de ${customContext.trim()}, `,
        `Em relação a ${customContext.trim()}, infelizmente `
      ];
      const prefix = getRandom(customPrefixes);
      excuseTemplate = `${prefix}${excuseTemplate.charAt(0).toLowerCase() + excuseTemplate.slice(1)}`;
    }

    const mainExcuse = formatVariables(excuseTemplate, { tempo: timeEstimate });
    const shortVersion = generateShortWhatsApp(mainExcuse, target);
    const audioScript = generateAudioScript(mainExcuse, tone, situation);
    const tacticalIntel = calculateTacticalIntel(situation, tone, target, intensity);

    // Sugestão de evidência conforme situação
    let evidenceType = "traffic";
    if (situation === 'trabalho') evidenceType = "corrupted_file";
    else if (situation === 'dinheiro') evidenceType = "bank_alert";
    else if (situation === 'atraso') evidenceType = "traffic";
    else if (situation === 'esquecimento') evidenceType = "calendar_glitch";

    return {
      situation,
      target,
      tone,
      intensity,
      mainExcuse,
      shortVersion,
      audioScript,
      tacticalIntel,
      evidenceType,
      timestamp: new Date().toISOString()
    };
  }

  // Botão de Pânico: desculpa rápida de 1 clique sem pensar
  function panicQuickExcuse() {
    const panicList = [
      "Mano/Chefe, imprevisto surreal aqui no prédio com vazamento de gás e evacuação dos bombeiros. Celular quase sem bateria. Previsão de normalizar em 40min!",
      "Bom dia! Pneu furou feio na via rápida e o estepe estava sem pressão. Já estou na borracharia móvel resolvendo, chego o mais rápido possível!",
      "Oii! Tive um colapso na conexão de fibra da região toda por rompimento de cabo subterrâneo. Já roteei o 4G e estou terminando de enviar tudo!",
      "Oi! Meu aplicativo do banco travou no processo de validação de biometria facial para transferências externas. Protocolo #84920 já aberto no suporte, resolvo hoje sem falta!",
      "Perdão total! Minha gatinha engoliu um objeto estranho e precisei correr pro veterinário de plantão às pressas. Já foi medicada e estou a caminho!"
    ];
    return getRandom(panicList);
  }

  return {
    generate,
    panicQuickExcuse,
    CidadesEVias,
    Bancos
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DesculpaGPT;
}
