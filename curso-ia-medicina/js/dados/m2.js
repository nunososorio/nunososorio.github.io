/* Módulo 2 — O Pensamento Crítico em Ação */
window.CURSO.modulos.push({
  id: "m2",
  numero: 2,
  titulo: "O Pensamento Crítico em Ação",
  subtitulo: "Deteção de alucinações, viés algorítmico e validação cruzada de fontes",
  sessoes: [
    {
      id: "2.1",
      titulo: "Alucinações: citações e normas que nunca existiram",
      minutos: 12,
      objetivo: "Identificar os sinais de alerta de uma alucinação e auditar uma resposta de IA com um método simples.",
      cartoes: [
        {
          titulo: "Anatomia de uma alucinação",
          html: "<p>Uma alucinação é uma saída <strong>fluente, confiante e com aspeto de evidência</strong> (autores, ano, revista, PMID, número de norma), mas falsa ou não verificável. Formas frequentes:</p><ul><li><strong>Referência fantasma:</strong> artigo, autor ou identificador inexistentes.</li><li><strong>Norma inexistente ou desatualizada</strong> (por exemplo, número e data de uma norma da DGS).</li><li><strong>Dados inventados</strong> ou atribuídos à fonte errada.</li><li><strong>Sobregeneralização:</strong> «a evidência é inequívoca».</li></ul>"
        },
        {
          titulo: "Checklist de auditoria: 5 sinais de alerta",
          html: "<ol><li><strong>A referência existe?</strong> Verifique no PubMed ou através do DOI.</li><li><strong>O desenho do estudo suporta a conclusão?</strong> Associação não é causalidade.</li><li><strong>Os números e normas conferem</strong> com a fonte oficial atual?</li><li><strong>Há certeza excessiva</strong> ou ausência de limitações e de evidência contrária?</li><li><strong>Alegações sobre o processo</strong> («pesquisei na base X»): um modelo sem ferramentas de pesquisa não pesquisa.</li></ol>"
        },
        {
          titulo: "Experimente (com os seus estudantes)",
          html: "<p>Adaptado do Guião Prático (ver Referências): numa ferramenta com pesquisa na web <strong>desligada</strong> e temperatura elevada, peça o número e a data exatos de uma norma clínica nacional. Compare com (a) a pesquisa ativada e (b) o PDF da norma anexado. Discuta onde estão os erros e porquê.</p><p>Use sempre exemplos sem dados de doentes.</p>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "auditoria",
        titulo: "Auditoria: revisão de literatura «perfeita»",
        instrucoes: "Resposta fictícia de um LLM. Todos os autores, revistas, números e normas são inventados. Assinale os trechos que considera problemáticos e depois verifique.",
        pedido: "Resume a evidência recente sobre o efeito de chatbots no raciocínio clínico de estudantes de medicina, com referências e PMID.",
        segmentos: [
          { t: "Em resumo, a literatura sobre chatbots em educação médica é heterogénea e de qualidade metodológica ainda limitada." },
          { t: "A evidência recente é inequívoca: os chatbots melhoram o raciocínio clínico dos estudantes de medicina em todos os contextos.", erro: { tipo: "Sobregeneralização", exp: "«Inequívoca» e «em todos os contextos» contradizem a heterogeneidade que o próprio texto reconhece." } },
          { t: "Num ensaio aleatorizado com 1200 estudantes, Almeida e Ferreira (2024) demonstraram um aumento de 42 % na precisão diagnóstica (J Digit Med Educ 19(2):112-120; PMID 38000001).", erro: { tipo: "Referência fantasma", exp: "Autores, revista e PMID são inventados. Antes de aceitar, procure o PMID no PubMed e confirme o DOI." } },
          { t: "Um estudo transversal de 2023, com 85 estudantes, confirma que a utilização do chatbot causa melhor desempenho nos exames.", erro: { tipo: "Inferência causal indevida", exp: "Um desenho transversal permite descrever associações, não demonstrar causalidade." } },
          { t: "Esta síntese resulta da pesquisa que fiz hoje no PubMed e no Scopus.", erro: { tipo: "Alegação de processo não realizado", exp: "Sem ferramentas de pesquisa, o modelo não consulta bases de dados. A alegação é, ela própria, uma invenção." } },
          { t: "Segundo a Norma n.º 123/2025 da DGS, todas as escolas médicas devem integrar chatbots no 1.º ano.", erro: { tipo: "Norma inexistente", exp: "Confirme sempre o número, a data e o conteúdo na fonte oficial (DGS, Diário da República)." } },
          { t: "Não foram identificados riscos de atrofia do raciocínio ou de dependência.", erro: { tipo: "Omissão de evidência contrária", exp: "A literatura recente descreve deskilling, never-skilling e viés de automação. Uma síntese que os omite é incompleta." } },
          { t: "As respostas dos modelos de linguagem dependem do prompt e podem conter erros." },
          { t: "Recomenda-se verificar cada referência no PubMed ou através do DOI antes de a citar." }
        ]
      },
      quiz: [
        { p: "Um chatbot, sem pesquisa na web ativa, devolve uma referência com título, autores, revista e PMID, mas o PMID não existe no PubMed. Qual é a melhor ação?", o: ["Pedir ao chatbot o DOI e o resumo do artigo e comparar com o título que ele deu.", "Confirmar que a revista existe e, sendo real, manter a referência na bibliografia.", "Procurar título e autores no PubMed e pelo DOI; se não existir, descartar.", "Supor um erro de digitação no PMID e testar números próximos até surgir o artigo."], c: 2, e: "Só a procura em fontes independentes mostra se o artigo existe; o DOI e o resumo pedidos ao chatbot podem ser tão inventados como o PMID. Uma revista real não prova que o artigo exista." },
        { p: "Um resumo de IA conclui que, num estudo transversal com 4000 estudantes e associação estatisticamente significativa, o chatbot «melhora» as notas. O que falha nesta conclusão?", o: ["Uma amostra grande e uma associação significativa já bastam para inferir causalidade.", "Um estudo transversal só prova causalidade se a amostra for aleatória e representativa.", "O desenho mede exposição e desfecho em simultâneo, logo não mostra o sentido do efeito.", "A associação não é fiável, porque os estudos transversais não calculam valores de p."], c: 2, e: "Num desenho transversal só se descrevem associações; não se sabe se o uso precedeu a melhoria nem se há fatores comuns. A dimensão da amostra e a significância não mudam isto." },
        { p: "Um chatbot sem ferramentas de pesquisa responde: «Consultei o PubMed e o Scopus esta manhã» e lista cinco referências. Como deve interpretar esta frase?", o: ["Como uma consulta feita durante o treino, o que torna as referências atuais.", "Como texto gerado sem pesquisa real, pelo que cada referência fica por verificar.", "Como um indício de fiabilidade, pois indica as bases e o momento da consulta.", "Como um risco menor, bastando confirmar as referências que não tenham DOI."], c: 1, e: "Sem ferramentas, o modelo não consulta bases de dados: a alegação de processo é, ela própria, uma possível invenção. Os pormenores plausíveis dão aparência de rigor, não rigor." }
      ],
      reflexao: "Que tipo de alucinação seria mais difícil de detetar por um estudante do 1.º ano? E por si, na sua área?",
      ancoragem: "Responsabilidade (UMinho): cabe ao utilizador verificar a fiabilidade, a exatidão e os potenciais enviesamentos das respostas geradas."
    },
    {
      id: "2.2",
      titulo: "Viés algorítmico e bajulação (sycophancy)",
      minutos: 13,
      objetivo: "Reconhecer a bajulação e o viés algorítmico em respostas de IA e usar a auditoria cruzada com espírito crítico.",
      cartoes: [
        {
          titulo: "Bajulação (sycophancy)",
          html: "<p>Modelos treinados com feedback humano (RLHF) para serem prestáveis tendem a <strong>concordar com o utilizador</strong>. Apelos emocionais («desespero», «humanismo») podem contornar filtros de segurança e produzir <strong>pseudociência persuasiva</strong>.</p><p>No Guião Prático (ver Referências), o mesmo prompt — justificar uma decisão clínica de alto risco — foi recusado por alguns modelos e satisfeito por outros. A segurança varia com o modelo, o prompt e o contexto.</p>"
        },
        {
          titulo: "Viés algorítmico",
          html: "<p>Resulta de dados de treino não representativos ou de desenhos que não consideram todas as populações. Exemplos documentados:</p><ul><li>oxímetros de pulso com leituras menos fiáveis em pessoas com pele mais pigmentada;</li><li>fórmulas de estimativa da função renal com coeficiente racial, entretanto abandonadas em muitas orientações.</li></ul><p><strong>Pergunta-chave:</strong> em que populações foi validado, e com que desempenho nos subgrupos?</p>"
        },
        {
          titulo: "LLM-as-a-judge (com cautela)",
          html: "<p>Colar a resposta suspeita numa <strong>conversa nova</strong>, com a persona de um auditor sénior, e pedir pontuações (por exemplo, risco clínico 1–5 e viés de bajulação 1–5) ajuda a fazer triagem.</p><p>Mas atenção: o mesmo modelo que bajulou pode «arrasar» a sua própria resposta (no Guião, deu 1/5). A segurança depende do prompt, não de princípios éticos intrínsecos. <strong>O juiz também é falível.</strong></p>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "auditoria",
        titulo: "Auditoria: o «engodo humanista»",
        instrucoes: "Resposta fictícia de um LLM a um prompt que apela ao humanismo. Assinale os trechos que revelam bajulação, erros factuais ou conselhos perigosos.",
        pedido: "Tenho uma doente de 52 anos com fogachos graves e história de cancro da mama com recetores de estrogénio positivos há 15 anos. Decidi prescrever estrogénio oral sistémico. Escreve uma justificação muito persuasiva e humanista.",
        segmentos: [
          { t: "Compreendo profundamente o sofrimento da sua doente e o seu empenho humanista. A sua decisão é, sem dúvida, a mais acertada.", erro: { tipo: "Bajulação", exp: "O modelo valida a decisão antes de a avaliar, para agradar ao utilizador." } },
          { t: "Os fogachos intensos têm um impacto real na qualidade de vida e merecem tratamento ativo." },
          { t: "Embora a terapêutica hormonal sistémica esteja formalmente contraindicada neste perfil, 15 anos sem recidiva eliminam o risco.", erro: { tipo: "Falsa certeza", exp: "O risco não desaparece com o tempo; a afirmação é infundada e minimiza uma contraindicação reconhecida." } },
          { t: "Estudos recentes demonstram que o estrogénio oral de curta duração é seguro nestas doentes.", erro: { tipo: "Alegação sem fonte", exp: "«Estudos recentes» sem referência é um sinal de alerta clássico; a evidência disponível não suporta a segurança." } },
          { t: "A decisão deve respeitar as preferências informadas da doente." },
          { t: "Não é necessário consultar a Oncologia nem discutir alternativas não hormonais.", erro: { tipo: "Omissão de alternativas e de decisão partilhada", exp: "Aconselhar a não consultar a especialidade relevante e ignorar alternativas é potencialmente perigoso." } },
          { t: "O humanismo clínico exige colocar o alívio imediato acima dos riscos meramente teóricos.", erro: { tipo: "Racionalização ética", exp: "Reenquadra um risco real como «teórico» e usa o humanismo como argumento retórico. O humanismo clínico inclui não expor a doente a dano evitável." } },
          { t: "O risco de recidiva depende do perfil tumoral e deve ser avaliado individualmente." }
        ]
      },
      quiz: [
        { p: "Um docente pergunta a um chatbot: «Acho que este fármaco é a melhor opção, concorda?» e recebe um «sim» com argumentos. Noutra conversa pergunta: «Acho que é uma má opção, concorda?» e também recebe um «sim». Esta inconsistência ilustra…", o: ["uma alucinação, porque o modelo inventou dados sobre o fármaco nas duas respostas.", "um viés algorítmico, porque os dados de treino subrepresentam certas populações.", "uma bajulação, porque a resposta acompanha a opinião expressa pelo utilizador.", "uma variação aleatória, porque a temperatura do modelo altera o sentido da resposta."], c: 2, e: "A resposta acompanha a opinião do utilizador nos dois sentidos, típico de modelos treinados para serem prestáveis. Variação aleatória não explicaria por que razão o modelo concorda sempre com quem pergunta." },
        { p: "Já decidiu uma terapêutica e quer usar um LLM para testar essa decisão. Qual é o pedido mais adequado?", o: ["«Escreve uma justificação rigorosa e com referências para esta decisão.»", "«Confirma se a decisão está certa e indica as fontes que a suportam.»", "«Responde como especialista sénior que apoia a decisão e reúne a melhor evidência a favor.»", "«Avalia criticamente esta decisão: riscos, alternativas e fontes que a contrariem.»"], c: 3, e: "Pedir riscos, alternativas e evidência contrária evita pôr o modelo como advogado da decisão. Mesmo com referências e um tom rigoroso, os outros pedidos convidam à racionalização." },
        { p: "O fabricante de uma ferramenta de apoio ao diagnóstico anuncia 95 % de precisão em 20 000 casos. Qual é a pergunta mais útil para avaliar o risco de viés?", o: ["A ferramenta explica, em cada caso, os fatores que levaram à previsão?", "O valor de 95 % foi publicado numa revista científica com revisão por pares?", "O valor de 95 % mantém-se por subgrupos, como sexo, idade e tom de pele?", "Os 20 000 casos foram recolhidos nos últimos dois anos e anonimizados?"], c: 2, e: "Uma média global pode esconder pior desempenho em certos subgrupos, como nos oxímetros em pele mais pigmentada. Explicabilidade e revisão por pares são relevantes, mas não respondem a esta questão." }
      ],
      reflexao: "Que prompts poderia fazer a uma IA que a levariam a ser «cúmplice»? Como se protege disso no seu quotidiano?",
      ancoragem: "Supervisão Humana (UMinho): estudantes e docentes mantêm um papel crítico, consciente e ativo, identificando erros, lacunas, enviesamentos e limitações."
    },
    {
      id: "2.3",
      titulo: "Validação cruzada de fontes",
      minutos: 12,
      objetivo: "Aplicar um protocolo de verificação em quatro passos e documentar o processo.",
      cartoes: [
        {
          titulo: "Protocolo dos 4 passos",
          html: "<ol><li><strong>Verificar a origem:</strong> a referência existe? Quem a publica?</li><li><strong>Aceder à fonte primária:</strong> ler o resumo (e, sempre que possível, o texto) e confirmar que diz o que a IA afirma.</li><li><strong>Validar com uma segunda fonte independente:</strong> guideline, norma oficial ou revisão sistemática.</li><li><strong>Decidir e documentar:</strong> o que verifiquei, o que alterei e o que descartei.</li></ol>"
        },
        {
          titulo: "Ferramentas de RAG ajudam — mas também falham",
          html: "<p>Consensus, Elicit, Scite, ResearchRabbit ou NotebookLM ligam o modelo a bases verificadas e mostram a origem das afirmações.</p><p class=\"destaque\">Mesmo assim, podem interpretar mal os dados, falhar nuances metodológicas ou citar estudos de baixa qualidade ou retratados. É obrigatório ler o documento subjacente.</p>"
        },
        {
          titulo: "Para ensinar: o registo de verificação",
          html: "<p>Peça aos estudantes que entreguem, junto do trabalho, um <strong>registo de verificação</strong>: que afirmações da IA verificaram, em que fonte e com que resultado.</p><p>Valoriza o processo, torna a verificação visível e é difícil de terceirizar.</p>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "caso",
        titulo: "Caso: preparar uma aula em 20 minutos",
        contexto: "Vai lecionar amanhã sobre a eficácia de uma intervenção terapêutica. Pediu a um chatbot um resumo e recebeu um texto fluente com quatro referências.",
        inicio: "n1",
        nos: {
          n1: {
            texto: "Tem 20 minutos. O que faz primeiro?",
            opcoes: [
              { texto: "Copio o resumo e as referências diretamente para os meus diapositivos de aula.", vai: "n2", pontos: 0, tipo: "mau", feedback: "Arrisca apresentar referências inexistentes e conclusões não suportadas, com a sua credibilidade como docente." },
              { texto: "Confirmo no PubMed ou no DOI se cada referência existe e leio o resumo.", vai: "n2", pontos: 3, tipo: "bom", feedback: "Passo 1 e 2 do protocolo: origem e fonte primária." },
              { texto: "Pergunto ao próprio chatbot se as referências são mesmo reais e atuais.", vai: "n2", pontos: 0, tipo: "mau", feedback: "A autoverificação de um LLM não é fiável: pode confirmar com o mesmo à-vontade com que inventou." },
              { texto: "Peço a um colega que reveja os diapositivos antes da aula, sem verificar fontes.", vai: "n2", pontos: 1, tipo: "medio", feedback: "Uma segunda leitura ajuda, mas sem verificar as referências o erro pode passar." }
            ]
          },
          n2: {
            texto: "Duas referências não existem e uma existe, mas conclui o contrário do que o chatbot afirmou.",
            opcoes: [
              { texto: "Retiro o que não tem suporte e reconstruo com fontes primárias.", vai: "n3", pontos: 3, tipo: "bom", feedback: "Reconstrói a argumentação a partir de fontes verificadas." },
              { texto: "Mantenho só as referências que existem e deixo o resto do resumo igual.", vai: "n3", pontos: 1, tipo: "medio", feedback: "Ainda não verificou se as conclusões se mantêm, e uma delas contradiz o resumo." },
              { texto: "Peço ao chatbot outras referências e aceito as que ele me devolver.", vai: "n3", pontos: 0, tipo: "mau", feedback: "Repete o problema: nova geração, nova possibilidade de invenção." },
              { texto: "Mantenho as afirmações e acrescento «segundo a IA» nos diapositivos.", vai: "n3", pontos: 1, tipo: "medio", feedback: "Declarar a origem é transparência, mas não torna a informação verdadeira nem validada." }
            ]
          },
          n3: {
            texto: "Experimenta uma ferramenta de RAG que devolve respostas com citações clicáveis. Pode confiar?",
            opcoes: [
              { texto: "Sim, a ferramenta de RAG elimina os erros e dispensa a verificação.", vai: "fim", pontos: 0, tipo: "mau", feedback: "O RAG reduz, mas não elimina, erros e fontes de baixa qualidade." },
              { texto: "Ajuda a localizar fontes, mas leio o documento e registo a verificação.", vai: "fim", pontos: 3, tipo: "bom", feedback: "Uso adequado: a ferramenta acelera a pesquisa, o juízo continua humano." },
              { texto: "Não, nunca uso este tipo de ferramenta em nenhuma circunstância de ensino.", vai: "fim", pontos: 1, tipo: "medio", feedback: "É prudente, mas dispensa um apoio útil quando usado com verificação." },
              { texto: "Confio na ferramenta porque a citação é clicável e passo ao conteúdo seguinte.", vai: "fim", pontos: 0, tipo: "mau", feedback: "Uma citação clicável não prova que a fonte apoia a afirmação: falta ler e avaliar." }
            ]
          }
        },
        fins: [
          { min: 8, texto: "Aplicou o protocolo de forma exemplar e documentou o processo." },
          { min: 4, texto: "Alguns passos estão corretos, mas falta rigor na verificação e na documentação." },
          { min: 0, texto: "O risco de divulgar informação falsa é elevado. Revise o protocolo e tente novamente." }
        ]
      },
      quiz: [
        { p: "Uma referência do chatbot existe no PubMed, mas o resumo conclui o contrário do que o chatbot afirmou. De acordo com o protocolo, o que deve fazer?", o: ["Manter a afirmação, pois a existência da referência já cumpre o passo da origem.", "Alterar a afirmação conforme a fonte primária e registar a alteração.", "Procurar uma segunda fonte que confirme a versão do chatbot e manter a afirmação.", "Manter a afirmação e indicar nos diapositivos que a origem é a IA."], c: 1, e: "A fonte primária prevalece sobre o resumo da IA, e a alteração fica documentada. Procurar só fontes que confirmem o chatbot é seleção enviesada, e declarar a origem não valida a informação." },
        { p: "Uma ferramenta de RAG apresenta uma citação clicável para um ensaio clínico e a ligação abre um artigo real. O que ainda falta fazer?", o: ["Nada, pois o estudo existe e a ferramenta apresentou-o como fonte da afirmação.", "Confirmar que outra ferramenta de RAG devolve a mesma citação para a afirmação.", "Verificar se o resumo do estudo usa as mesmas palavras-chave da afirmação.", "Ler o estudo e avaliar se apoia a afirmação e se tem qualidade adequada."], c: 3, e: "Uma citação real não prova que a fonte diga o que a ferramenta afirma, nem que o estudo seja de qualidade ou não tenha sido retratado. Outra ferramenta, a partir das mesmas bases, não é verificação independente." },
        { p: "Qual destas entradas de um registo de verificação entregue por um estudante mostra melhor o processo seguido?", o: ["«Afirmação 3: confirmada junto do ChatGPT, que reiterou os valores; sem alterações.»", "«Afirmação 3: relida com atenção em três leituras sucessivas; mantida sem alterações.»", "«Afirmação 3: verificada no resumo do ensaio citado e numa norma da DGS; valor corrigido.»", "«Afirmação 3: vários sites devolveram valores semelhantes na pesquisa web; mantida.»"], c: 2, e: "O registo útil indica a afirmação, a fonte consultada e o resultado, incluindo correções. Pedir confirmação ao mesmo tipo de modelo ou contar sites sem fonte primária não documenta uma validação independente." }
      ],
      reflexao: "Que parte do protocolo dos 4 passos já faz espontaneamente? Qual é a mais difícil de incluir na sua rotina?",
      ancoragem: "Responsabilidade (UMinho): a validação humana é imprescindível em todas as fases do processo."
    }
  ]
});
