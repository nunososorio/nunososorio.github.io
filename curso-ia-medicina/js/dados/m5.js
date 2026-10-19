/* Módulo 5 — Laboratório de Literatura: o Podcast Interrompido */
window.CURSO.artigo = {
  titulo: "The Generative AI Learning Penalty: Evidence from Chinese Secondary Education",
  autores: "David Strömberg, Victor Lei e Yanhui Wu",
  data: "junho de 2026",
  url: "https://doi.org/10.2139/ssrn.6868618"
};

window.CURSO.modulos.push({
  id: "m5",
  numero: 5,
  titulo: "Laboratório de Literatura: o Podcast Interrompido",
  subtitulo: "Ler criticamente um preprint sobre o impacto da IA e dar voz ao debate",
  sessoes: [
    {
      id: "5.1",
      titulo: "Ler o artigo com lupa crítica",
      minutos: 14,
      objetivo: "Extrair do preprint «The Generative AI Learning Penalty» o que ele diz, o que não diz e o que só se pode extrapolar para a educação médica com cautela.",
      cartoes: [
        {
          titulo: "Ficha do artigo",
          html: "<ul><li><strong>Título:</strong> <em>The Generative AI Learning Penalty: Evidence from Chinese Secondary Education</em>.</li><li><strong>Autores:</strong> David Strömberg (Stockholm University), Victor Lei e Yanhui Wu (University of Hong Kong). Junho de 2026.</li><li><strong>Estatuto:</strong> <em>preprint</em> (SSRN 6868618; <a href=\"https://doi.org/10.2139/ssrn.6868618\" target=\"_blank\" rel=\"noopener\">doi:10.2139/ssrn.6868618</a>) — ainda sem revisão por pares.</li><li><strong>Dados:</strong> 26 811 estudantes do 7.º ao 12.º ano, num condado da China central, ao longo de 30 meses; exames mensais sem consulta, exames de acesso (Zhongkao e Gaokao) e notas e tempo de trabalhos de casa em nove disciplinas.</li></ul><p><a href=\"https://doi.org/10.2139/ssrn.6868618\" target=\"_blank\" rel=\"noopener\">Abrir o artigo através do DOI (nova janela)</a>. Leia, pelo menos, o resumo, a introdução e a conclusão antes da atividade.</p>"
        },
        {
          titulo: "Principais resultados",
          html: "<ul><li><strong>Produtividade vs aprendizagem:</strong> a adoção de IA aumentou as notas dos trabalhos de casa em cerca de 18 % e reduziu o tempo de conclusão em cerca de 30 %, mas as notas dos exames mensais sem consulta desceram cerca de 20 % em seis meses.</li><li><strong>Efeito a longo prazo:</strong> nos exames de acesso, as quedas (cerca de 18 % e 24 %) só atingem a dimensão máxima ao fim de cerca de dois anos.</li><li><strong>Mecanismo:</strong> as perdas concentram-se em cerca de 81 % dos utilizadores cujo comportamento é compatível com <em>terceirização do trabalho de casa</em> (tempo muito curto com notas altas). Os utilizadores que gastam tanto tempo como os não utilizadores têm perdas pequenas.</li><li><strong>Heterogeneidade:</strong> perdas maiores nas ciências sociais, nos mais novos, nos melhores alunos e nos rapazes.</li><li><strong>Sugestões dos autores:</strong> informar sobre os custos de longo prazo, dar mais peso a avaliações presenciais sem consulta e monitorizar o esforço (inputs) em vez das notas (outputs).</li></ul>"
        },
        {
          titulo: "Lupa crítica: limites e cuidados",
          html: "<ul><li><strong>Não é um ensaio aleatorizado:</strong> usa diferenças-em-diferenças com adoção escalonada; a identificação assenta no pressuposto de tendências paralelas.</li><li><strong>Medidas indiretas:</strong> o momento de adoção é autorrelatado; a «terceirização» é inferida pelo comportamento (tempo e notas), não observada diretamente.</li><li><strong>Contexto:</strong> ensino secundário, um condado da China central, sistema com exames de acesso de alta pressão. A transposição para a educação médica exige cautela.</li><li><strong>Atenção a números parecidos:</strong> cerca de 80 % reportaram usar IA em junho de 2025; cerca de 81 % <em>dos utilizadores</em> comportam-se como quem terceiriza. São grandezas diferentes.</li><li><strong>Os autores não dizem</strong> que toda a utilização de IA prejudica: reconhecem que ferramentas de tutoria bem desenhadas e alunos motivados podem beneficiar.</li></ul>"
        },
        {
          titulo: "E na educação médica?",
          html: "<p>O padrão «notas dos trabalhos a subir, exame fechado a descer» é um aviso para qualquer avaliação baseada só em produtos feitos sem supervisão. Pontos de reflexão para a sua UC:</p><ul><li>Que parte da avaliação ocorre <strong>sem</strong> acesso a IA (OSCE, prova oral, simulação)?</li><li>Monitoriza o <strong>processo</strong> (rascunhos, registo de verificação) ou apenas o produto final?</li><li>Que tarefas são, na prática, «trabalho de casa» terceirizável?</li></ul><p>Este padrão é coerente com os conceitos de deskilling e never-skilling do Módulo 1, mas <strong>não os prova</strong> em estudantes de medicina.</p>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "classificar",
        titulo: "O artigo diz… ou não diz?",
        instrucoes: "Classifique cada afirmação. «O artigo diz» = consta dos resultados ou da discussão; «Não é suportado» = extrapolação ou erro de leitura.",
        categorias: [{ id: "diz", rotulo: "O artigo diz" }, { id: "nao", rotulo: "Não é suportado pelo artigo" }],
        itens: [
          { texto: "A adoção de IA aumentou as notas dos trabalhos de casa em cerca de 18 % e reduziu o tempo de conclusão em cerca de 30 %.", cat: "diz", porque: "É o primeiro resultado principal: produtividade nos trabalhos de casa." },
          { texto: "As notas dos exames mensais sem consulta desceram cerca de 20 % em seis meses.", cat: "diz", porque: "É a «divergência» entre produtividade e aprendizagem." },
          { texto: "O estudo demonstra que a IA prejudica a aprendizagem de estudantes de medicina.", cat: "nao", porque: "A amostra é de ensino secundário, na China. A transposição para medicina é uma extrapolação." },
          { texto: "As perdas concentram-se nos utilizadores cujo comportamento é compatível com terceirização do trabalho de casa.", cat: "diz", porque: "Cerca de 81 % dos utilizadores apresentam esse padrão." },
          { texto: "Utilizadores de IA que gastam tanto tempo no trabalho de casa como os não utilizadores têm perdas pequenas.", cat: "diz", porque: "Sugere que o problema é o modo de uso (terceirização), não o simples acesso." },
          { texto: "Qualquer utilização de IA, mesmo uma ferramenta de tutoria bem desenhada, prejudica a aprendizagem.", cat: "nao", porque: "Os autores reconhecem que ferramentas bem desenhadas e alunos motivados podem melhorar a aprendizagem." },
          { texto: "Os autores sugerem dar mais peso a avaliações presenciais sem consulta e monitorizar o esforço (inputs) em vez das notas (outputs).", cat: "diz", porque: "Constam das intervenções discutidas na conclusão." },
          { texto: "O estudo é um ensaio clínico aleatorizado.", cat: "nao", porque: "É um estudo observacional com diferenças-em-diferenças e adoção escalonada; a identificação depende de tendências paralelas." },
          { texto: "O efeito máximo nos exames de acesso só se observa ao fim de cerca de dois anos.", cat: "diz", porque: "Daí que estudos de curta duração possam subestimar o custo a longo prazo." }
        ]
      },
      quiz: [
        { p: "Um colega cita o artigo como «resultado estabelecido», porque está no SSRN, tem 26 811 estudantes e é assinado por investigadores de duas universidades. Qual é a reserva mais pertinente?", o: ["A divulgação no SSRN não implica revisão por pares, pelo que os resultados são preliminares.", "Uma amostra de 26 811 estudantes dispensa a revisão por pares, pois a dimensão garante a fiabilidade.", "A ausência de revisão por pares prova que as conclusões do artigo estão incorretas.", "A autoria por duas universidades torna os resultados menos fiáveis do que os de uma só."], c: 0, e: "O SSRN aloja preprints, ainda sem revisão por pares, pelo que a evidência é preliminar. Mas isso não prova que esteja errado: pede cautela, não rejeição." },
        { p: "Um colega diz que, como as notas dos exames desceram depois de os estudantes adotarem IA, a descida «só pode» ser causada pela IA. Que ressalva decorre do desenho do estudo?", o: ["Sem aleatorização, a leitura causal assenta no pressuposto de tendências paralelas entre adotantes.", "Com adoção escalonada, comparar quem adotou cedo com quem adotou tarde é metodologicamente inválido.", "Sem entrevistas aos estudantes, um estudo quantitativo não pode estimar qualquer efeito causal da IA.", "Com exames mensais repetidos, as quedas observadas refletem apenas o cansaço dos estudantes ao longo do ano."], c: 0, e: "É um estudo observacional com diferenças-em-diferenças: a identificação depende de as tendências serem paralelas na ausência da IA. A adoção escalonada é o próprio desenho, não um defeito que o invalide." },
        { p: "Numa UC de medicina avaliada sobretudo por relatórios feitos em casa, as notas subiram desde que os estudantes usam IA. Que leitura é mais ajustada ao artigo?", o: ["Rever o peso dos produtos não supervisionados, vendo o padrão como aviso e não como prova.", "Concluir que os nossos estudantes já sofrem deskilling, dado que o artigo demonstra a perda de aprendizagem.", "Aceitar a subida como melhoria da aprendizagem, pois o artigo mostra ganhos de produtividade nos trabalhos de casa.", "Descartar o artigo, porque o secundário chinês não tem qualquer relevância para a avaliação em educação médica."], c: 0, e: "O artigo mostra notas dos trabalhos a subir com exame fechado a descer: um aviso por analogia, a validar no nosso contexto. Confundir produtividade com aprendizagem é o erro mais tentador, porque as notas subiram mas os exames sem consulta desceram." }
      ],
      reflexao: "Que resultado do artigo mais o surpreendeu? E que limitação o faria hesitar em citá-lo numa reunião pedagógica?",
      ancoragem: "Responsabilidade (UMinho): cabe ao utilizador avaliar criticamente as fontes, os argumentos, os dados e as inferências, incluindo as da literatura científica."
    },
    {
      id: "5.2",
      titulo: "Podcast interrompido: complete o diálogo",
      minutos: 15,
      objetivo: "Ver o início do podcast de Prometeu e da Serpente Alada e escrever as falas seguintes, combinando o seu entendimento do artigo, a sua opinião e a sua criatividade.",
      cartoes: [
        {
          titulo: "As personagens",
          html: "<ul><li><strong>Prometeu</strong> — o titã que roubou o fogo (aqui, a IA generativa) e o entregou aos mortais. Dramático, lamenta o uso que dela se faz e fala em «atrofia cognitiva».</li><li><strong>Serpente Alada</strong> — voz fria e empírica, que convoca métricas e estudos e acusa Prometeu de deixar a emoção toldar-lhe a visão.</li></ul><p>São figuras fictícias, conhecidas da comunidade da UMinho, que aqui encarnam duas atitudes perante a IA. Nenhuma tem sempre razão.</p>"
        },
        {
          titulo: "Antes de escrever: 5 perguntas",
          html: "<ol><li>O que dizem as personagens que está, de facto, no artigo? O que simplificam ou exageram?</li><li>Que grupos de estudantes existem no artigo e o que acontece a cada um?</li><li>Que limitações do estudo uma personagem prudente assinalaria?</li><li>O que muda se trocarmos estudantes do secundário por estudantes de medicina?</li><li>Qual é a <strong>sua</strong> posição?</li></ol>"
        },
        {
          titulo: "Como escrever boas falas",
          html: "<ul><li>Cada fala com 2 a 4 frases, na voz da personagem.</li><li>Inclua <strong>um dado ou ideia do artigo</strong>, <strong>uma nuance ou limitação</strong> e, quando fizer sentido, <strong>uma ligação à sua prática</strong>.</li><li>Pode usar humor, metáforas e ironia, mas sem inventar resultados que o artigo não apresenta.</li><li>Não inclua dados de doentes, de estudantes ou de colegas.</li><li>O texto é guardado apenas neste browser.</li></ul>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "podcast",
        titulo: "Podcast interrompido: complete o diálogo",
        instrucoes: "1) Veja o início do podcast. 2) Consulte o artigo. 3) Escreva as quatro falas seguintes, começando pela resposta a «E os restantes?». 4) Faça a autoavaliação e conclua.",
        video: "assets/podcast/aipodcast.mp4",
        poster: "assets/podcast/poster.jpg",
        minimoCaracteres: 60,
        transcricao: [
          { t: "0:00", quem: "Prometeu", texto: "Eu roubei o fogo primordial da inteligência artificial generativa e entreguei-o, com toda a esperança, aos mortais." },
          { t: "0:16", quem: "Serpente Alada", texto: "E eles agradeceram, imagino, usando-o." },
          { t: "0:18", quem: "Prometeu", texto: "Mas ao usá-lo da pior forma possível. Era uma centelha desenhada para elevar a cognição, para expandir as fronteiras do intelecto humano. Era suposto ser o nosso maior salto evolutivo no campo da aprendizagem, talvez desde a invenção da imprensa." },
          { t: "0:31", quem: "Serpente Alada", texto: "Bem, o salto aconteceu; os dados comprovam-no." },
          { t: "0:34", quem: "Prometeu", texto: "Aconteceu um desastre nas trincheiras da academia, isso sim. O que é que os humanos estão a fazer com esta dádiva de magnitude inimaginável? Estão a usá-la simplesmente para enganar os seus próprios cérebros." },
          { t: "0:44", quem: "Serpente Alada", texto: "Peço-lhe que se acalme, por favor." },
          { t: "0:45", quem: "Prometeu", texto: "Eles fogem dos esforços orgânicos, esquivam-se de forma perfeitamente consciente à dor necessária da consolidação da memória e usam a luz cintilante desta razão artificial apenas para projetar sombras vazias numa parede." },
          { t: "0:58", quem: "Serpente Alada", texto: "A sua indignação tem, de facto, um encanto poético, confesso, mas, como quase sempre acontece com os espíritos excessivamente dramáticos, a emoção tolda-lhe a visão." },
          { t: "1:07", quem: "Prometeu", texto: "A minha visão é perfeitamente límpida. Eles têm o conhecimento universal à distância de um clique, mas a verdadeira inteligência deles está a definhar." },
          { t: "1:16", quem: "Serpente Alada", texto: "O seu lamento é um mero disfarce, no exato momento em que o confrontamos com a frieza gélida dos dados empíricos. Sugiro que deixe a sua filosofia de lado por um minuto e olhe para a realidade das métricas. O que o senhor apelida de enganar os próprios cérebros é, na verdade, uma história de implacável sucesso estatístico." },
          { t: "1:33", quem: "Prometeu", texto: "Sucesso? Como é que a atrofia cognitiva de uma geração inteira pode ser classificada como sucesso empírico?" },
          { t: "1:41", quem: "Serpente Alada", texto: "Pode ser classificada como sucesso quando olhamos para a evidência longitudinal, sem as lentes morais. Refiro-me ao estudo conduzido por David Strömberg." },
          { t: "1:49", quem: "Prometeu", texto: "Ah, sim, em conjunto com Victor Lei e Wu Yanhui. Eu conheço o estudo." },
          { t: "1:53", quem: "Serpente Alada", texto: "Então sabe que não estamos a falar de suposições etéreas sobre o suposto declínio da alma humana. Estamos a falar de ciência dura, baseada numa amostra de 27 mil alunos, com idades compreendidas entre os 12 e os 18 anos, na China." },
          { t: "2:05", quem: "Prometeu", texto: "27 mil alunos inseridos no ecossistema educativo chinês. Onde a pressão para a excelência em exames, como o Zhongkao ou o Gaokao, é absolutamente brutal." },
          { t: "2:16", quem: "Serpente Alada", texto: "Exato." },
          { t: "2:17", quem: "Prometeu", texto: "É um ambiente perfeito para procurar atalhos desesperados, não é um ambiente de aprendizagem serena." },
          { t: "2:21", quem: "Serpente Alada", texto: "É o ambiente perfeito para testar a eficácia de uma ferramenta sob condições de alta exigência. Cerca de 80 % destes jovens relataram o uso intensivo de modelos de linguagem avançados." },
          { t: "2:31", quem: "Prometeu", texto: "Modelos como o Doubao e o DeepSeek, presumo." },
          { t: "2:33", quem: "Serpente Alada", texto: "Precisamente. São os equivalentes asiáticos de sistemas como o ChatGPT ou o Claude, já integrados de forma indissociável na rotina diária destes estudantes." },
          { t: "2:42", quem: "Prometeu", texto: "E os restantes?" }
        ],
        notaTranscricao: "Transcrição assistida por reconhecimento automático de fala e revista manualmente; a atribuição das falas pode conter pequenas imprecisões.",
        ranhuras: [
          { quem: "Serpente Alada", dica: "Responda a «E os restantes?» com base no artigo: que grupos de estudantes existem (não utilizadores, utilizadores que terceirizam, utilizadores que gastam tempo equivalente) e o que acontece a cada um?" },
          { quem: "Prometeu", dica: "Contra-ataque com uma crítica fundamentada que o artigo permite concluir e que a Serpente Alada ignorou." },
          { quem: "Serpente Alada", dica: "Traga o debate para a educação médica: o que muda? Inspire-se em exemplos concretos da sua experiência." },
          { quem: "Prometeu", dica: "Fecho criativo: use a metáfora do fogo para deixar um conselho prático aos docentes. Pode usar humor, mas mantenha o rigor." }
        ],
        criterios: [
          "Usei pelo menos um resultado concreto do artigo.",
          "Assinalei uma limitação ou uma nuance (preprint, desenho, contexto, medidas).",
          "Relacionei o debate com a educação médica ou com a minha prática.",
          "Mantive a voz de cada personagem.",
          "Acrescentei criatividade (metáfora, ironia, humor) sem inventar resultados."
        ],
        posicoes: [
          { id: "prometeu", rotulo: "Mais próximo de Prometeu (preocupação)" },
          { id: "serpente", rotulo: "Mais próximo da Serpente Alada (evidência e cautela)" },
          { id: "nenhum", rotulo: "Nem um nem outro: tenho uma terceira posição" }
        ],
        exemplo: [
          { quem: "Serpente Alada", texto: "Os restantes, cerca de um em cada cinco, ainda não tinham adotado a IA em junho de 2025 e servem de comparação. Mas há outro «80 %» escondido no artigo, e não convém confundi-los: cerca de 81 % dos utilizadores comportam-se como quem terceiriza o trabalho de casa. São esses que perdem na prova fechada." },
          { quem: "Prometeu", texto: "Então o fogo não queima por si: queima quem o usa para escapar ao esforço! Mas não me fale em «ciência dura»: é um preprint, sem revisão por pares, observacional, com a data de adoção autorrelatada e a «terceirização» apenas inferida pelo tempo e pelas notas." },
          { quem: "Serpente Alada", texto: "Concedo. E concedo mais: é ensino secundário, num condado da China central, com exames de acesso brutais. Não se transpõe sem cautela para a EMED. Mas o padrão — notas dos trabalhos a subir, exame fechado a descer — é um aviso a qualquer docente que avalie só produtos feitos em casa." },
          { quem: "Prometeu", texto: "Então, caros docentes: o fogo serve para aquecer a casa, não para queimar o trabalho de casa. Pensem primeiro, consultem depois, avaliem o processo e guardem momentos presenciais — no CBL, na tutoria, na simulação — onde o raciocínio tem de aparecer sem muletas." }
        ]
      },
      quiz: [
        { p: "Um colega resume o podcast: «o artigo mostra que 80 % dos estudantes terceirizam o trabalho de casa». Qual é a correção mais rigorosa?", o: ["Cerca de 80 % relataram usar IA; os cerca de 81 % de terceirização referem-se aos utilizadores.", "Quem usa IA terceiriza, e cerca de 80 % dos estudantes usam IA, pelo que o resumo está essencialmente certo.", "Cerca de 81 % dos estudantes terceirizam, e o valor de 80 % corresponde ao aumento das notas dos trabalhos.", "Cerca de 80 % dos utilizadores terceirizam, pois o uso de IA era generalizado a todos os estudantes da amostra."], c: 0, e: "São grandezas diferentes: prevalência de uso (cerca de 80 %, em junho de 2025) e proporção de utilizadores com comportamento de terceirização (cerca de 81 %). Supor que usar IA equivale a terceirizar é o erro mais tentador, mas há utilizadores que gastam tanto tempo como os não utilizadores." },
        { p: "A Serpente Alada chama «ciência dura» ao estudo, apoiando-se na amostra de cerca de 27 mil estudantes. Qual é a resposta crítica mais ajustada?", o: ["A dimensão é uma força, mas o desenho é observacional e a terceirização inferida: cautela causal.", "Uma amostra desta dimensão, com nove disciplinas e 30 meses, afasta o risco de enviesamento por fatores não medidos.", "Como a terceirização é inferida e não observada, o resultado sobre as notas dos exames fica sem valor.", "Uma amostra desta dimensão permite generalizar as conclusões para qualquer contexto educativo, incluindo a educação médica."], c: 0, e: "Uma amostra grande melhora a precisão, mas não elimina os limites do desenho observacional nem do contexto. Rejeitar o resultado principal por a terceirização ser inferida também falha: a descida nos exames sem consulta é medida diretamente." },
        { p: "Prometeu diz que o estudo prova a «atrofia cognitiva de uma geração inteira» pelo simples uso de IA. O que permite o artigo afirmar acerca de quem perde?", o: ["As perdas concentram-se em quem terceiriza o trabalho; quem gasta tanto tempo como os não utilizadores perde pouco.", "As perdas atingem de forma semelhante todos os utilizadores, e só se manifestam nos exames sem consulta.", "As perdas só surgem a longo prazo, pelo que nos primeiros seis meses de uso não se observa efeito nos exames mensais.", "As perdas são maiores nos alunos mais fracos, que recorrem à IA para compensar as suas lacunas de base."], c: 0, e: "O artigo localiza as perdas nos utilizadores com comportamento de terceirização, o que sugere que o problema é o modo de uso e não o simples acesso. Os efeitos aparecem já em seis meses (cerca de 20 %) e são maiores nos melhores alunos, não nos mais fracos." }
      ],
      reflexao: "Partilhe o seu diálogo com um colega (Pair) e comparem: onde discordam das posições das personagens? Que fala mudariam depois de ouvir o outro?",
      ancoragem: "Supervisão Humana (UMinho): a IAGen reforça, e nunca substitui, a reflexão crítica, a análise rigorosa e a capacidade de decisão — incluindo ao ler literatura sobre a própria IA."
    }
  ]
});
