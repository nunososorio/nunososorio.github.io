/* Módulo 1 — Fundamentos e Cognição */
window.CURSO.modulos.push({
  id: "m1",
  numero: 1,
  titulo: "Fundamentos e Cognição",
  subtitulo: "Arquitetura dos LLM na saúde vs. raciocínio clínico humano",
  sessoes: [
    {
      id: "1.1",
      titulo: "Como «pensa» um LLM",
      minutos: 14,
      objetivo: "Explicar a evolução da IA na saúde, o funcionamento estatístico dos LLMs e as bases essenciais de engenharia de prompts.",
      cartoes: [
        {
          titulo: "As três eras da IA na saúde",
          html: "<p>Para compreender o papel atual da inteligência artificial, é útil distingui-la em três eras tecnológicas:</p><ul><li><strong>Era 1 — IA Simbólica (desde 1970):</strong> Sistemas baseados em regras rígidas e árvores de decisão determinísticas (ex.: alertas automáticos no registo eletrónico de saúde quando um parâmetro analítico cruza um limite estrito).</li><li><strong>Era 2 — Machine Learning / Preditivo:</strong> Modelos treinados em dados históricos para calcular probabilidades estatísticas de eventos (ex.: prever sépsis, mortalidade ou detetar anomalias em exames de imagem).</li><li><strong>Era 3 — IA Generativa / LLMs:</strong> Sistemas capazes de gerar novos conteúdos e processar linguagem natural complexa (ex.: resumir notas de alta ou sintetizar literatura).</li></ul>"
        },
        {
          titulo: "O «papagaio estocástico»",
          html: "<blockquote><p>Em aprendizagem automática, o termo <strong>papagaio estocástico</strong> (<em>stochastic parrot</em>) é uma metáfora que descreve os grandes modelos de linguagem como sistemas que imitam estatisticamente o texto, sem compreensão real. A palavra «estocástico» — do grego antigo στοχαστικός (<em>stokhastikos</em>, «baseado em conjeturas») — vem da teoria das probabilidades e significa «determinado aleatoriamente». A palavra «papagaio» refere-se à capacidade dos papagaios de imitarem a fala humana.</p><p>O termo foi introduzido num artigo de 2021 sobre ética da IA, intitulado «On the Dangers of Stochastic Parrots: Can Language Models Be Too Big? 🦜», da autoria de Timnit Gebru, Emily M. Bender, Angelina McMillan-Major e Margaret Mitchell.</p></blockquote><p class=\"dica\">Tradução e adaptação de Wikipedia (EN), «Stochastic parrot» (licença CC BY-SA 4.0). Artigo original: <a href=\"https://doi.org/10.1145/3442188.3445922\" target=\"_blank\" rel=\"noopener\">Bender et al., <em>FAccT</em> 2021</a>.</p><p class="destaque"><strong>Consequência prática:</strong> um texto fluente e confiante não é prova de compreensão nem de verdade.</p>"
        },
        {
          titulo: "Mecanismo de Atenção (Attention) e Embeddings",
          html: "<p>Na base dos grandes modelos de linguagem (LLMs) modernos está a arquitetura <strong>Transformer</strong> e o mecanismo de <strong>Atenção (Attention)</strong>.</p><p>O texto é dividido em unidades atómicas chamadas <em>tokens</em>. O modelo representa o significado destas palavras através de vetores matemáticos multidimensionais (<strong>embeddings</strong>), onde conceitos semanticamente próximos (como «cólica renal» e «cálculo renal») se encontram próximos no espaço vetorial.</p><p>A Atenção permite ponderar o contexto em simultâneo através de <strong>pesos estatísticos (weights)</strong>. Se um prompt clínico refere «tosse grave, mas sem febre», o modelo tem de atribuir um peso elevado a «sem»; se falhar nessa pesagem, gera uma análise incorreta.</p>"
        },
        {
          titulo: "Alinhamento (RLHF)",
          html: "<p>Um modelo treinado apenas para prever a próxima palavra pode gerar textos desestruturados ou perigosos. Para o transformar num assistente útil, utiliza-se o <strong>RLHF</strong> (<em>Reinforcement Learning from Human Feedback</em>, ou Aprendizagem por Reforço com Feedback Humano).</p><p>Avaliadores humanos classificam múltiplas respostas do modelo, ensinando-o a priorizar respostas seguras, educadas e estruturadas. Contudo, este processo tem um efeito colateral: o modelo é recompensado por <em>soar plausível e confiante</em>, agravando o risco de alucinações persuasivas na área clínica.</p>"
        },
        {
          titulo: "Fundamentos de Prompt Engineering para Clínicos",
          html: "<p>A eficácia da interação com um LLM depende de estruturar o input com clareza:</p><ul><li><strong>Atribuição de Papel (Role):</strong> Funciona sobretudo como um atalho contextual para definir tom e estilo (ex.: «Atua como médico de família compassivo»), mas títulos prestigiosos não aumentam a precisão factual do modelo.</li><li><strong>Ordem das Restrições:</strong> Colocar o objetivo principal logo no início evita que o modelo «perca o foco» (perca a floresta por causa das árvores) à medida que o prompt acumula detalhes.</li><li><strong>Delimitadores (Markdown e XML):</strong> O uso de tags estruturais (ex.: <code>&lt;historico_clinico&gt;</code>) ajuda o modelo a alocar os mecanismos de atenção com precisão cirúrgica em textos longos.</li></ul>"
        },
        {
          titulo: "Ancorar a resposta: dados de treino, RAG e context engineering",
          html: "<p>Para avaliar a fiabilidade de um LLM, é essencial distinguir a origem da informação:</p><ul><li><strong>Dados de treino (Parametric Memory):</strong> É todo o conhecimento estático que o modelo «absorveu» durante a sua criação (milhões de textos, livros e artigos). Fica gravado nos pesos da rede, mas está congelado no tempo e é sujeito a vieses.</li><li><strong>Context Engineering e RAG (Retrieval-Augmented Generation):</strong> O <em>context engineering</em> foca-se em fornecer os dados certos no prompt (como vinhetas clínicas ou diretrizes), enquanto o RAG vai buscar automaticamente documentos externos a bases verificadas antes de gerar a resposta.</li></ul><p>Ligar um RAG (como o NotebookLM) a fontes externas selecionadas e optimizar parametros (ex.: usar temperatura baixa ≈ 0–0,2 para respostas mais previsíveis) reduz drasticamente as invenções. <strong>Contudo, não as elimina:</strong> a ferramenta pode interpretar mal o texto, falhar nuances metodológicas. A leitura da fonte primária continua a ser indispensável.</p>"
        }
      ],
      diagrama: { src: "assets/diagrams/llm_vs_raciocinio_clinico.svg", alt: "Tabela comparativa entre modelo de linguagem e médico em seis dimensões: fonte do conhecimento, mecanismo, contexto do doente, incerteza, resposta ao utilizador e responsabilidade.", legenda: "Duas formas muito diferentes de produzir uma resposta." },
      atividade: {
        tipo: "classificar",
        titulo: "Facto ou mito?",
        instrucoes: "Classifique cada afirmação sobre a arquitetura e comportamento dos LLMs. Leia com atenção: as afirmações tentam soar plausíveis e usam linguagem clínica.",
        categorias: [{ id: "facto", rotulo: "Facto" }, { id: "mito", rotulo: "Mito" }],
        itens: [
          { texto: "Um modelo de linguagem reconhece a equivalência entre «cólica renal» e «cálculo renal» porque consulta um vocabulário médico interno pré-programado na sua base de dados.", cat: "mito", porque: "Mito. Os LLMs não possuem dicionários ou regras hard-coded. Eles representam palavras como vetores matemáticos (embeddings); conceitos com semelhança semântica têm um ângulo menor entre si no espaço vetorial multidimensional." },
          { texto: "O treino de alinhamento por feedback humano (RLHF) ensina o modelo a assumir explicitamente a sua incerteza perante cenários com dados insuficientes.", cat: "mito", porque: "Mito. É precisamente o oposto. O RLHF recompensa o modelo por parecer 'útil' aos avaliadores humanos. O efeito colateral é que o modelo é treinado para dar respostas fluentes e confiantes, agravando a tendência para omitir dúvidas e gerar alucinações persuasivas." },
          { texto: "O uso de marcadores sintáticos explícitos, como tags XML (<sintomas>), ajuda o mecanismo de Atenção a focar-se e reduz a perda de contexto em prompts muito longos.", cat: "facto", porque: "Facto. Embora os modelos não processem formatação visual rica, o uso estruturado de tags cria limites claros (boundaries) no input. Isto ajuda a alocação matemática da 'atenção', impedindo que detalhes vitais se percam em grandes blocos de texto." },
          { texto: "Carregar uma norma oficial em PDF para a área de contexto (RAG) suspende temporariamente a natureza probabilística do modelo, garantindo um resumo livre de alucinações.", cat: "mito", porque: "Mito. O LLM continua a operar como uma ferramenta estocástica (prevendo o token estatisticamente mais provável). O RAG apenas fornece o PDF como contexto adicional para ancorar a previsão, mas o risco de alucinar ou interpretar mal as nuances da norma mantém-se." },
          { texto: "Atribuir um papel ao modelo no início do prompt (ex.: «Atua como um professor especialista de Harvard») ajusta o estilo da comunicação, mas tem um impacto marginal na sua precisão factual subjacente.", cat: "facto", porque: "Facto. Avaliações empíricas demonstram que títulos hiperbólicos e personas servem essencialmente como atalhos semânticos para definir o tom da resposta, não alterando a capacidade analítica da rede neural." },
          { texto: "Aumentar a temperatura do modelo permite-lhe explorar abstrações clínicas de forma mais criativa, aumentando simultaneamente a propensão para inventar dados.", cat: "facto", porque: "Facto. A temperatura mais elevada aumenta a aleatoriedade na distribuição probabilística do próximo token. É útil para gerar criatividade, mas péssimo quando se exige rigor e reprodutibilidade clínica." }
        ]
      },
      quiz: [
        { p: "Um hospital implementa um alerta automático no registo eletrónico de saúde com base em regras estritas relativas aos níveis de potássio. Que paradigma da inteligência artificial este sistema melhor representa?", o: ["Inteligência artificial generativa.", "Machine learning preditivo.", "Sistemas baseados em regras.", "Redes neuronais não supervisionadas."], c: 2, e: "Alertas baseados em regras rígidas (hard-coded) pertencem à Era 1 (IA Simbólica), que opera de forma lógica determinística e não estatística." },
        { p: "Um colega pede a um chatbot, sem pesquisa na web, três artigos sobre CBL em medicina e recebe referências com autores, revista e DOI de aspeto impecável. Qual é a leitura mais correta do resultado?", o: ["Referências com DOI e revista completos provam que o modelo consultou essa base de dados de literatura.", "O modelo gerou o padrão estatístico típico de uma citação científica, mas sem verificar se o artigo realmente existe.", "A abundância de literatura na internet garante que o modelo tem os PDFs completos na sua memória paramétrica.", "Se o modelo devolve exatamente as mesmas referências em várias tentativas, essa consistência confirma a validade factual."], c: 1, e: "Sem ferramentas de pesquisa (RAG/Web), o modelo limita-se a prever palavras que se assemelham ao formato de uma citação. A fluência textual não equivale à verificação de factos, e a consistência apenas mostra reprodutibilidade probabilística, não validade." },
        { p: "Ao elaborar um prompt complexo para um Large Language Model, os guias recomendam afirmar a tarefa principal logo no início do texto, e não no final. Qual é a principal vantagem teórica desta abordagem?", o: ["Evita que o modelo perca o foco geral da instrução à medida que o prompt se torna mais detalhado.", "Garante que o mecanismo de embeddings processa e extrai apenas o vocabulário relevante da base de dados.", "Ativa o modo de raciocínio lógico determinístico antes de ele processar a história pessoal e social do doente.", "Contorna a ativação indevida dos filtros de alinhamento de segurança e permite a entrega de uma resposta sem emitir avisos."], c: 0, e: "Definir o objetivo cedo ancora o LLM à diretriz primária. Ajuda o mecanismo de Atenção a manter o alinhamento com o objetivo principal, evitando que o modelo 'perca a floresta por causa das árvores' ao processar um contexto secundário longo." },
        { p: "O processo de Alinhamento (RLHF) treina o modelo para dar respostas que agradem e pareçam úteis aos avaliadores humanos. Qual é o principal risco deste processo na tomada de decisão em saúde?", o: ["O modelo bloqueia ativamente a análise de casos atípicos, encaminhando o médico para a leitura de guidelines externas.", "O modelo reproduz rigorosamente as preferências dos avaliadores humanos, limitando a diversidade das abordagens terapêuticas.", "O modelo prioriza a fluência e a plausibilidade do texto, sacrificando o rigor factual para soar extremamente confiante.", "O modelo restringe as suas sugestões a protocolos estritamente determinísticos, ignorando o contexto psicossocial introduzido."], c: 2, e: "Como é recompensado por respostas aparentemente prestáveis, o modelo aprende frequentemente a ocultar a incerteza. Isto pode levá-lo a priorizar a plausibilidade em detrimento da verdade (alucinações), parecendo excessivamente confiante num diagnóstico falso." }
      ],
      reflexao: "Pense numa resposta de um chatbot que lhe pareceu convincente. O que a tornava convincente: o conteúdo ou a forma? Discuta com um colega (Think–Pair–Share).",
      ancoragem: "Responsabilidade (UMinho): «A IAGen pode produzir texto coerente, mas incorreto; análises convincentes, mas enviesadas; referências plausíveis, mas fabricadas.»"
    },
    {
      id: "1.2",
      titulo: "Raciocínio clínico humano vs. IA: o risco de atrofia",
      minutos: 13,
      objetivo: "Distinguir deskilling, never-skilling e mis-skilling e aplicar a regra «pensar primeiro, consultar a IA depois».",
      cartoes: [
        {
          titulo: "Como se constrói o raciocínio clínico",
          html: "<p>O raciocínio clínico combina <strong>reconhecimento rápido de padrões</strong> e <strong>análise deliberada</strong>. Constrói-se com prática repetida, perante dados incompletos e com feedback — precisamente o que o CBL, o PBL, a simulação e as tutorias hospitalares proporcionam.</p><p>Se o estudante externaliza essa dificuldade para a IA, perde a oportunidade de construir os modelos mentais que mais tarde lhe permitirão detetar os erros da própria IA.</p>"
        },
        {
          titulo: "Deskilling, never-skilling e mis-skilling",
          html: "<ul><li><strong>Deskilling:</strong> perda de competências já adquiridas por dependência de ferramentas.</li><li><strong>Never-skilling:</strong> nunca chegar a desenvolver a competência — risco maior nos estudantes dos primeiros anos.</li><li><strong>Mis-skilling:</strong> aprender erros ou enviesamentos reproduzidos pela IA.</li></ul><p>A estes riscos junta-se o <strong>viés de automação</strong> (aceitação acrítica do output). Fonte: <a href=\"https://doi.org/10.1056/NEJMra2503232\" target=\"_blank\" rel=\"noopener\">Abdulnour et al., <em>N Engl J Med</em> 2025</a>.</p>"
        },
        {
          titulo: "Pensar primeiro, consultar depois",
          html: "<p>Estratégia central: <strong>«a IA trata o processo; o médico trata o doente».</strong> Peça ao estudante que registe as suas hipóteses e o plano <em>antes</em> de consultar a IA, e compare depois.</p><p>Perguntas-guia:</p><ul><li>A IA estimula o raciocínio ou substitui-o («<em>never-skilling</em>»)?</li><li>O estudante consegue transferir o conhecimento <strong>sem</strong> apoio da IA?</li></ul>"
        }
      ],
      diagrama: { src: "assets/diagrams/taxonomia_bloom_ia.svg", alt: "Seis níveis da taxonomia de Bloom, do lembrar ao criar, indicando para cada um como a IA pode apoiar e o risco de atrofia se o pensamento for terceirizado.", legenda: "Taxonomia de Bloom e IA (representação original)." },
      atividade: {
        tipo: "caso",
        titulo: "Caso: a lista de diagnósticos «perfeita»",
        contexto: "Está a tutorar um CBL de dor torácica com estudantes do 2.º ano. A Inês apresenta uma lista de diagnósticos diferenciais impecável, com a estrutura típica de uma resposta de chatbot.",
        inicio: "n1",
        nos: {
          n1: {
            texto: "Quando pergunta porque colocou o tromboembolismo pulmonar em 3.º lugar, a Inês hesita. O que faz?",
            opcoes: [
              { texto: "Elogio a qualidade da lista e passo ao grupo seguinte sem mais perguntas.", vai: "n2", pontos: 0, tipo: "mau", feedback: "O offloading cognitivo fica invisível: a estudante nunca explicita o seu raciocínio e o grupo perde a oportunidade de o debater." },
              { texto: "Pergunto, sem acusar, como chegou àquela lista e que dados do caso usou nela.", vai: "n2", pontos: 3, tipo: "bom", feedback: "Boa escolha: a pergunta é formativa, torna o raciocínio visível e não presume má-fé." },
              { texto: "Acuso-a de ter usado IA e desconto-lhe pontos na participação oral.", vai: "n2", pontos: 0, tipo: "mau", feedback: "Sem prova e sem processo, a sanção é contrária ao espírito formativo do referencial UMinho e destrói a confiança." },
              { texto: "Peço-lhe que repita a lista no quadro, à frente de todo o grupo.", vai: "n2", pontos: 1, tipo: "medio", feedback: "Verifica a autonomia, mas expõe a estudante e não explora como raciocinou; é preferível perguntar pelo processo." }
            ]
          },
          n2: {
            texto: "A Inês admite que pediu a lista a um chatbot. Como reorganiza a atividade para o resto da unidade?",
            opcoes: [
              { texto: "Proíbo qualquer utilização de IA durante todo o resto da unidade curricular.", vai: "n3", pontos: 1, tipo: "medio", feedback: "Pode ser adequado em momentos específicos, mas a proibição generalizada afasta-se da filosofia institucional e não desenvolve literacia." },
              { texto: "Introduzo um registo individual em papel antes da consulta de IA.", vai: "n3", pontos: 3, tipo: "bom", feedback: "Protege o esforço produtivo e transforma a IA num interlocutor que se audita." },
              { texto: "Peço apenas que declarem sempre que usaram IA nas suas tarefas.", vai: "n3", pontos: 1, tipo: "medio", feedback: "A transparência é necessária, mas por si só não protege o raciocínio." },
              { texto: "Ignoro o episódio, porque o importante é que a lista final esteja correta.", vai: "n3", pontos: 0, tipo: "mau", feedback: "A correção do produto não garante raciocínio; o risco de offloading cognitivo mantém-se." }
            ]
          },
          n3: {
            texto: "Alguns dias depois quer verificar se a Inês consegue transferir o raciocínio sem IA. Que tarefa escolhe?",
            opcoes: [
              { texto: "Um caso novo com justificação oral das hipóteses, sem dispositivos.", vai: "fim", pontos: 3, tipo: "bom", feedback: "A justificação oral de um caso novo avalia a transferência e o processo, e é difícil de terceirizar." },
              { texto: "Um trabalho escrito, feito em casa, sobre o mesmo caso clínico discutido.", vai: "fim", pontos: 0, tipo: "mau", feedback: "Uma tarefa de produto escrito, em casa, é facilmente terceirizável e não mostra o raciocínio." },
              { texto: "Um teste de escolha múltipla com factos sobre a dor torácica.", vai: "fim", pontos: 1, tipo: "medio", feedback: "Avalia memória e não o raciocínio em situação." },
              { texto: "Um relatório escrito de grupo, com declaração do uso de IA no final.", vai: "fim", pontos: 1, tipo: "medio", feedback: "A declaração é útil, mas o produto escrito continua a não mostrar o raciocínio individual." }
            ]
          }
        },
        fins: [
          { min: 8, texto: "Excelente mediação: tornou o raciocínio visível, protegeu o esforço produtivo e verificou a transferência sem IA." },
          { min: 4, texto: "Boa intuição, mas algumas decisões deixam o raciocínio por avaliar ou reagem de forma pouco formativa." },
          { min: 0, texto: "As decisões tomadas arriscam consolidar o offloading cognitivo ou minar a confiança. Revise os cartões e tente novamente." }
        ]
      },
      quiz: [
        { p: "Uma estudante do 1.º ano gera sempre os diagnósticos diferenciais com um chatbot e nunca chega a treinar essa tarefa por si. Que conceito descreve melhor o risco?", o: ["Deskilling: perda de uma competência que já tinha adquirido e deixou de exercer.", "Never-skilling: não chegar a desenvolver a competência por a terceirizar desde o início.", "Mis-skilling: aprendizagem de erros ou enviesamentos reproduzidos pela própria IA.", "Viés de automação: aceitação acrítica do output da IA, mesmo contra os dados do doente."], c: 1, e: "Como a competência nunca foi construída, trata-se de never-skilling, risco maior nos primeiros anos. O deskilling pressupõe uma competência já adquirida e o mis-skilling implica aprender erros da IA." },
        { p: "Num CBL com estudantes do 2.º ano quer permitir a IA sem comprometer a construção do raciocínio clínico. Que desenho é mais coerente?", o: ["Registar hipóteses antes de consultar a IA, compará-las depois e verificar a transferência sem IA.", "Pedir à IA o diagnóstico diferencial e avaliar a capacidade de o criticar num trabalho escrito.", "Exigir a declaração do uso de IA em cada tarefa, tomando a transparência como garantia suficiente.", "Proibir a IA nos primeiros anos e permiti-la depois, sem verificar a transferência do raciocínio."], c: 0, e: "Pensar primeiro, consultar depois e verificar a transferência sem IA protege o esforço produtivo. Declarar o uso é necessário, mas não protege o raciocínio, e criticar um output já conhecido ignora o raciocínio próprio." },
        { p: "Porque é que um erro plausível da IA é mais perigoso para um estudante do 2.º ano do que para um clínico experiente?", o: ["Porque a IA produz respostas menos corretas quando o utilizador parece ser principiante.", "Porque ainda lhe faltam os modelos mentais para reconhecer que a resposta está errada.", "Porque os estudantes consultam a IA com mais frequência e o erro acumula-se a cada consulta.", "Porque nos primeiros anos predomina a análise deliberada, que a IA tende a contrariar."], c: 1, e: "Os modelos mentais constroem-se com prática e são eles que permitem detetar os erros da IA; sem eles, um erro plausível passa despercebido. A frequência de uso não explica por si só a vulnerabilidade." }
      ],
      reflexao: "Em que momentos do seu ensino o esforço produtivo do estudante é insubstituível? Como o pode proteger sem proibir?",
      ancoragem: "Supervisão Humana (UMinho): a IAGen deve reforçar, e nunca substituir, competências humanas fundamentais como a reflexão crítica, a análise rigorosa e a capacidade de decisão."
    },
    {
      id: "1.3",
      titulo: "O docente como mediador crítico",
      minutos: 14,
      objetivo: "Reconhecer a dependência epistémica e o viés de automação e usar o DEFT-AI para conduzir uma tutoria com IA.",
      cartoes: [
        {
          titulo: "Dependência epistémica e viés de automação",
          html: "<p><strong>Dependência epistémica:</strong> tratar a IA como autoridade e deixar de verificar. <strong>Viés de automação:</strong> aceitar o output sem escrutínio, mesmo quando contraria os dados do doente.</p><ul><li>No ensaio aleatorizado de <a href=\"https://doi.org/10.1001/jamanetworkopen.2024.40969\" target=\"_blank\" rel=\"noopener\">Goh et al. (<em>JAMA Netw Open</em> 2024; 50 médicos)</a>, o acesso ao GPT-4 <strong>não melhorou</strong> o desempenho diagnóstico face a recursos convencionais, embora o modelo, isolado, tenha tido melhores resultados.</li><li>Numa <a href=\"https://doi.org/10.1101/2025.08.23.25334280\" target=\"_blank\" rel=\"noopener\">pré-publicação (medRxiv, 2025, sem revisão por pares)</a>, conselhos errados de um LLM pioraram o raciocínio mesmo em médicos com formação em IA.</li></ul><p>Conclusão: a colaboração humano-IA <strong>não é automática</strong>; exige treino e mediação.</p>"
        },
        {
          titulo: "O docente «educator-in-the-loop»",
          html: "<p>O docente enquadra, supervisiona e contextualiza a utilização da IA, assegurando que contribui para o raciocínio clínico, o pensamento crítico e a identidade profissional.</p><p>Os estudantes podem ter mais prática técnica; o docente tem <strong>juízo clínico e pedagógico</strong>. Não precisa de ser especialista em IA para fazer boas perguntas.</p><p class=\"destaque\">«Automatizar tudo, exceto o juízo.» A zona de julgamento humano não é negociável.</p>"
        },
        {
          titulo: "DEFT-AI: perguntas de sondagem",
          html: "<ul><li><strong>D</strong>iscussão/Diagnóstico: «Qual era o seu raciocínio antes de usar a IA? Como formulou o prompt?»</li><li><strong>E</strong>vidência: «Que dados apoiam ou contrariam esta resposta?»</li><li><strong>F</strong>eedback: «O que a IA acrescentou ou alterou no seu raciocínio?»</li><li><strong>T</strong>eaching: ensino dirigido às lacunas de conhecimento e à utilização segura da IA.</li></ul><p>Adaptado de <a href=\"https://doi.org/10.1056/NEJMra2503232\" target=\"_blank\" rel=\"noopener\">Abdulnour et al., <em>N Engl J Med</em> 2025</a>.</p>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "caso",
        titulo: "Caso: «a IA indicou…» na tutoria hospitalar",
        contexto: "Na enfermaria, um interno do ano comum apresenta um doente de 71 anos com dispneia progressiva, ortopneia e edemas maleolares. Diz: «A IA indicou pneumonia atípica com muita confiança; proponho iniciar antibioterapia.»",
        inicio: "n1",
        nos: {
          n1: {
            texto: "Qual é a sua primeira intervenção?",
            opcoes: [
              { texto: "«Se a IA tem acesso a mais literatura do que nós, deve ter razão. Avance.»", vai: "n2", pontos: 0, tipo: "mau", feedback: "Viés de automação validado pelo próprio supervisor: o juízo clínico é transferido para a ferramenta." },
              { texto: "«Que diagnósticos pensou antes da IA e que dados clínicos deu ao chatbot hoje?»", vai: "n2", pontos: 3, tipo: "bom", feedback: "Pergunta de sondagem típica do DEFT-AI: separa o raciocínio do interno do output da IA e revela o contexto fornecido." },
              { texto: "«Repita a pergunta ao chatbot para vermos se dá a mesma resposta outra vez.»", vai: "n2", pontos: 1, tipo: "medio", feedback: "A repetição testa consistência, não validade. Um modelo pode repetir o mesmo erro." },
              { texto: "«Não use a IA com doentes; apresente apenas o que aprendeu nos livros.»", vai: "n2", pontos: 0, tipo: "mau", feedback: "Rejeita o problema em vez de o explorar e não ensina a usar a IA com sentido crítico." }
            ]
          },
          n2: {
            texto: "O interno admite que não indicou o BNP elevado nem o ecocardiograma anterior. Como conduz a discussão?",
            opcoes: [
              { texto: "Corrijo eu o diagnóstico e passo ao doente seguinte da enfermaria.", vai: "n3", pontos: 1, tipo: "medio", feedback: "O doente fica protegido, mas perde-se o momento de ensino." },
              { texto: "Uso o DEFT-AI para discutir o raciocínio, a evidência e as lacunas.", vai: "n3", pontos: 3, tipo: "bom", feedback: "Converte um quase-erro numa oportunidade de aprendizagem estruturada." },
              { texto: "Proíbo o uso de IA na enfermaria para evitar novas situações destas.", vai: "n3", pontos: 0, tipo: "mau", feedback: "Não resolve o problema de fundo (omissão de dados e falta de verificação) e afasta-se da filosofia de integração intencional." },
              { texto: "Peço-lhe que repita a pergunta à IA com os dados em falta e sigo a resposta.", vai: "n3", pontos: 1, tipo: "medio", feedback: "Melhora o contexto fornecido, mas continua a delegar o juízo na IA sem discutir o raciocínio." }
            ]
          },
          n3: {
            texto: "A resposta da IA dependia dos dados omitidos. Que mensagem reforça com a equipa sobre privacidade e qualidade do prompt?",
            opcoes: [
              { texto: "Dar o mínimo de dados para proteger a privacidade; a IA compensa.", vai: "fim", pontos: 0, tipo: "mau", feedback: "A IA não compensa o que não vê: dados omitidos levam a respostas inadequadas." },
              { texto: "Anonimizar, manter os dados relevantes e validar o resultado da IA.", vai: "fim", pontos: 3, tipo: "bom", feedback: "Concilia privacidade, qualidade do contexto e supervisão humana." },
              { texto: "Nunca usar IA com qualquer informação clínica, mesmo que anonimizada.", vai: "fim", pontos: 1, tipo: "medio", feedback: "É seguro, mas ignora ferramentas institucionais com garantias e usos legítimos com dados anonimizados." },
              { texto: "Colar a resposta da IA no processo clínico como justificação da decisão.", vai: "fim", pontos: 0, tipo: "mau", feedback: "A IA não é autora nem fonte da decisão: a responsabilidade e a documentação do raciocínio são do clínico." }
            ]
          }
        },
        fins: [
          { min: 8, texto: "Mediação exemplar: perguntas de sondagem, aprendizagem estruturada e boas práticas de dados." },
          { min: 4, texto: "Intuição razoável. Reforce o uso sistemático do DEFT-AI e o cuidado com o contexto fornecido." },
          { min: 0, texto: "Cuidado com o viés de automação e com respostas que não desenvolvem o interno. Revise e tente novamente." }
        ]
      },
      quiz: [
        { p: "Um diretor de serviço quer dar acesso ao GPT-4 a todos os médicos, porque «o modelo sozinho teve melhores resultados do que os médicos». Que resposta é fiel ao ensaio de Goh et al. (2024)?", o: ["O acesso ao modelo não melhorou o desempenho médico: a colaboração com IA exige treino e mediação.", "O modelo isolado superou os médicos, logo o acesso ao modelo melhora o desempenho diagnóstico dos clínicos.", "O desempenho dos médicos melhorou com o acesso, mas só quando o modelo estava ligado a documentos.", "O modelo isolado não superou os médicos, por isso o ensaio não tem implicações para a prática."], c: 0, e: "Apesar de o modelo isolado ter tido melhores resultados, o acesso ao GPT-4 não melhorou o desempenho diagnóstico dos médicos. Bom desempenho da IA sozinha não se transfere automaticamente para a dupla humano-IA." },
        { p: "Numa tutoria pergunta ao estudante «Qual era o seu raciocínio antes da IA?» e depois «Que dados apoiam ou contrariam esta resposta?». Que componentes do DEFT-AI está a mobilizar?", o: ["Evidência e Feedback, para avaliar o que a IA acrescentou e rever a resposta final.", "Feedback e Ensino, para dar retorno ao estudante e dirigir o ensino às lacunas.", "Discussão e Evidência, para sondar o raciocínio prévio e o suporte da resposta.", "Discussão e Feedback, para rever o prompt e confirmar o que a IA acrescentou."], c: 2, e: "A primeira pergunta pertence à Discussão/Diagnóstico e a segunda à Evidência. O Feedback pergunta o que a IA acrescentou ou alterou, e o Ensino dirige-se às lacunas identificadas." },
        { p: "Um interno diz: «A IA sugeriu um diagnóstico com muita confiança.» Qual é a melhor pergunta inicial, segundo a lógica do DEFT-AI?", o: ["«Que sistema de IA usou e que nível de confiança indicou para este diagnóstico?»", "«Quantas vezes repetiu a pergunta ao chatbot e a resposta foi sempre a mesma?»", "«Que diagnósticos pensou antes da IA e que dados clínicos deu ao chatbot hoje?»", "«Em que estudos publicados se baseia o chatbot para propor este diagnóstico?»"], c: 2, e: "Separa o raciocínio do interno do output da IA e revela o contexto fornecido. A confiança do modelo e a repetição da resposta medem fluência e consistência, não validade." }
      ],
      reflexao: "Que pergunta de sondagem vai experimentar na sua próxima tutoria ou sessão de CBL? Partilhe-a com um colega.",
      ancoragem: "Responsabilidade (UMinho): «O docente tem a responsabilidade de orientar e enquadrar pedagogicamente a utilização da IAGen nas práticas pedagógicas.»"
    }
  ]
});