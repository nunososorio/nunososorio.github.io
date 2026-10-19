/* Módulo 3 — Reinventar o Ensino: CBL e PBL com IA */
window.CURSO.modulos.push({
  id: "m3",
  numero: 3,
  titulo: "Reinventar o Ensino: CBL e PBL com IA",
  subtitulo: "Casos autênticos e tarefas imunes ao plágio reflexivo",
  sessoes: [
    {
      id: "3.1",
      titulo: "CBL aumentado: o LLM como doente simulado",
      minutos: 14,
      objetivo: "Configurar um doente simulado com IA para um CBL, com salvaguardas e debrief do tutor.",
      cartoes: [
        {
          titulo: "O que é o CBL aumentado por IA",
          html: "<p>Na EM/UMinho, um LLM é configurado para o caso clínico da semana e assume o papel de <strong>doente simulado</strong>. Os estudantes colaboram para fazer perguntas de anamnese, propor hipóteses e refinar o raciocínio com base nas respostas.</p><p>A implementação usa plataformas institucionais (Microsoft 365 Copilot e IAEDU), que garantem privacidade e proteção de dados. Os dados preliminares do grupo de trabalho apontam para ganhos em envolvimento e raciocínio clínico, mas a validação é ainda limitada.</p>"
        },
        {
          titulo: "Prompt em 4 partes: Papel – Tarefa – Contexto – Resultado",
          html: "<ul><li><strong>Papel:</strong> «És um doente de 58 anos com dor abdominal. Não és médico.»</li><li><strong>Tarefa:</strong> «Responde apenas ao que te for perguntado. Nunca nomeies diagnósticos.»</li><li><strong>Contexto:</strong> história fictícia, personalidade, o que só revelas se te perguntarem diretamente.</li><li><strong>Resultado:</strong> respostas curtas, em linguagem de leigo.</li></ul><p class=\"destaque\">Use sempre vinhetas fictícias. Nunca carregue o processo de um doente real.</p>"
        },
        {
          titulo: "Salvaguardas e debrief",
          html: "<p><strong>Antes:</strong> teste o doente simulado e acerte as regras. <strong>Durante:</strong> os estudantes registam as perguntas que fazem. <strong>Depois:</strong> o tutor conduz o debrief — compara o simulador com a realidade (empatia, comunicação não verbal, incerteza) e discute o raciocínio dos estudantes.</p><p>O doente virtual treina anamnese; não substitui o contacto com doentes reais.</p>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "caso",
        titulo: "Caso: configurar o doente simulado",
        contexto: "Quer usar um LLM como doente simulado num CBL de dor abdominal, com estudantes do 2.º ano.",
        inicio: "n1",
        nos: {
          n1: {
            texto: "Como define o prompt para o modelo?",
            opcoes: [
              { texto: "Faz de doente com dor abdominal e responde às perguntas dos alunos.", vai: "n2", pontos: 0, tipo: "mau", feedback: "Demasiado vago: o simulador será inconsistente e pode revelar demasiado ou dar diagnósticos." },
              { texto: "Defino Papel, Tarefa, Contexto e Resultado com uma história fictícia.", vai: "n2", pontos: 3, tipo: "bom", feedback: "Prompt estruturado, com limites claros e dados fictícios." },
              { texto: "Carrego o processo real de um doente da enfermaria, para mais realismo.", vai: "n2", pontos: 0, tipo: "mau", feedback: "Violação de proteção de dados: dados reais de doentes não devem ser inseridos para este fim." },
              { texto: "Peço ao LLM que invente um doente realista, sem indicar regras de comportamento.", vai: "n2", pontos: 1, tipo: "medio", feedback: "Dá liberdade ao modelo, mas sem regras o simulador pode revelar tudo ou nomear diagnósticos." }
            ]
          },
          n2: {
            texto: "Durante a sessão, o «doente» diz espontaneamente: «Acho que tenho apendicite».",
            opcoes: [
              { texto: "Ignoro o comentário e deixo a sessão continuar sem alterações.", vai: "n3", pontos: 1, tipo: "medio", feedback: "Perde-se a oportunidade de corrigir o simulador e o caso fica enviesado." },
              { texto: "Acrescento a regra «não nomeias diagnósticos» e testo o prompt antes.", vai: "n3", pontos: 3, tipo: "bom", feedback: "Iteração com salvaguardas e teste prévio." },
              { texto: "Aceito que o LLM é imprevisível e mantenho o prompt exatamente como estava.", vai: "n3", pontos: 0, tipo: "mau", feedback: "A imprevisibilidade gere-se com desenho do prompt e teste, não com resignação." },
              { texto: "Interrompo a sessão e peço aos estudantes que ignorem o que o doente disse.", vai: "n3", pontos: 1, tipo: "medio", feedback: "Resolve o momento, mas não corrige o simulador e interrompe o raciocínio dos estudantes." }
            ]
          },
          n3: {
            texto: "No fim da sessão, como fecha a atividade?",
            opcoes: [
              { texto: "Passo ao tema seguinte para cumprir o horário previsto da sessão.", vai: "fim", pontos: 0, tipo: "mau", feedback: "Sem debrief, a aprendizagem fica por consolidar e os desvios do simulador por discutir." },
              { texto: "Conduzo um debrief e comparo o simulador com o caso e a realidade.", vai: "fim", pontos: 3, tipo: "bom", feedback: "O debrief do tutor é o centro do ciclo IA–CBL." },
              { texto: "Peço ao chatbot que classifique os estudantes e uso essa nota.", vai: "fim", pontos: 0, tipo: "mau", feedback: "A decisão de avaliação não pode basear-se exclusivamente em IA." },
              { texto: "Peço aos estudantes que resumam o caso por escrito e entreguem sem discussão.", vai: "fim", pontos: 1, tipo: "medio", feedback: "Produz um registo, mas sem debrief não se discutem o raciocínio nem os desvios do simulador." }
            ]
          }
        },
        fins: [
          { min: 8, texto: "Doente simulado bem desenhado, testado e acompanhado de debrief." },
          { min: 4, texto: "Bom ponto de partida, mas falta rigor no desenho ou no fecho da atividade." },
          { min: 0, texto: "Revise a estrutura Papel–Tarefa–Contexto–Resultado e a importância do debrief." }
        ]
      },
      quiz: [
        { p: "Ao desenhar o prompt para o doente simulado, um tutor escreve apenas: «És o Sr. João, tens 50 anos e vieste à consulta porque te dói o peito ao subir escadas. Estás muito ansioso.» Segundo a estrutura recomendada em 4 partes, qual é a principal omissão que vai comprometer a simulação?", o: ["Faltam os dados reais de um doente para conferir verdadeira credibilidade clínica ao caso.", "Falta a «Tarefa» com regras de comportamento (ex.: «responde apenas ao que te for perguntado»).", "Falta o «Contexto», pois o prompt não lista os resultados dos exames laboratoriais prévios.", "Falta o «Papel», pois o modelo não foi instruído a agir como um professor universitário."], c: 1, e: "O prompt define quem o modelo é (Papel) e parte da história (Contexto), mas omite as restrições comportamentais (Tarefa). Sem a regra de 'responder apenas ao que é perguntado', o modelo tem tendência a despejar a história toda ou a dar o diagnóstico na primeira resposta." },
        { p: "O doente simulado respondeu a todas as perguntas de anamnese dos estudantes de forma clinicamente impecável e lógica. No debrief final da sessão, qual é o aspeto que o tutor deve destacar como sendo uma limitação central desta tecnologia face a um doente real?", o: ["A incapacidade técnica de listar efeitos secundários de medicamentos complexos.", "A ausência total de comunicação não-verbal, sinais físicos e hesitações emocionais genuínas.", "A tendência inevitável do simulador para esquecer a sua idade no decorrer de uma consulta longa.", "A impossibilidade de o simulador compreender ou utilizar linguagem médica técnica nas respostas."], c: 1, e: "O debrief deve contrastar o simulador com a realidade. A IA treina a estrutura e o raciocínio da anamnese, mas falha nas dimensões humanas cruciais (empatia real, tom de voz, linguagem corporal), que os estudantes nunca devem negligenciar." },
        { p: "Um docente pretende poupar tempo na criação do contexto para o doente simulado e decide colar um resumo de alta real da enfermaria no prompt, substituindo apenas o nome do doente pelas iniciais. Porque é que esta prática é rejeitada pelas normas apresentadas?", o: ["Porque as plataformas de IA não conseguem processar adequadamente texto que contenha iniciais ou abreviaturas.", "Porque as iniciais dificultam o processamento semântico do LLM e enviesam o mecanismo de Atenção.", "Porque a pseudonimização não elimina o risco de reidentificação de dados sensíveis; devem ser criadas vinhetas 100 % fictícias.", "Porque o LLM tenderá a adotar a persona do médico que escreveu a nota de alta e não a do doente descrito."], c: 2, e: "Substituir o nome por iniciais é pseudonimização, não anonimização total. Combinações de idades, datas ou patologias específicas podem permitir a reidentificação do doente. Para treinar a anamnese em segurança e cumprir o RGPD, deve-se usar sempre ficção." }
      ],
      reflexao: "Que caso do seu currículo seria um bom candidato a CBL com doente simulado? Que regras teria de impor ao simulador?",
      ancoragem: "Inclusão e Equidade (UMinho): quando o uso de IA é requisito, devem existir alternativas pedagógicas razoáveis e equivalentes. Prepare uma versão sem IA do caso."
    },
    {
      id: "3.2",
      titulo: "PBL e método socrático mediado por IA: o ciclo",
      minutos: 12,
      objetivo: "Sequenciar um ciclo PBL/CBL em que a IA entra depois do raciocínio humano e é sempre auditada.",
      cartoes: [
        {
          titulo: "O ciclo IA–CBL/PBL",
          html: "<ol><li>Hipóteses e plano por escrito, individualmente, <strong>sem IA</strong>.</li><li>Consulta da IA (doente simulado, perguntas socráticas).</li><li><strong>Auditoria</strong> das respostas (erros, viés, bajulação).</li><li><strong>Validação</strong> em fontes primárias e normas.</li><li>Síntese em grupo e <strong>debrief</strong> do tutor (DEFT-AI).</li><li>Novo caso <strong>sem IA</strong> para verificar a transferência.</li></ol>"
        },
        {
          titulo: "Método socrático mediado por IA",
          html: "<p>Em vez de pedir respostas, peça à IA que <strong>faça perguntas</strong>:</p><blockquote>«Atua como tutor socrático. Faz-me uma pergunta de cada vez para eu justificar a minha hipótese. Não me dês o diagnóstico nem a resposta.»</blockquote><p>Esta estratégia preserva o esforço produtivo.</p>"
        },
        {
          titulo: "Proteger o esforço produtivo",
          html: "<ul><li>O grupo discute <strong>antes</strong> de consultar a IA.</li><li>Cada estudante entrega as suas hipóteses iniciais (mesmo erradas).</li><li>A IA entra para testar e ampliar, não para decidir.</li><li>Sinais de alerta: respostas homogéneas entre estudantes, dificuldade em justificar, ausência de dúvidas.</li></ul>"
        }
      ],
      diagrama: { src: "assets/diagrams/ciclo_ia_cbl.svg", alt: "Ciclo de cinco etapas: pensar sem IA, consultar a IA, auditar, validar e debrief do tutor, com o docente mediador crítico ao centro.", legenda: "Ciclo de integração IA–CBL." },
      atividade: {
        tipo: "ordenar",
        titulo: "Ordene o ciclo",
        instrucoes: "Use os botões «Subir» e «Descer» para colocar os passos na ordem recomendada. Depois, verifique.",
        itens: [
          "Os estudantes formulam, por escrito e sem IA, hipóteses e plano de investigação.",
          "Consultam a IA (doente simulado ou perguntas socráticas) para testar e ampliar o raciocínio.",
          "Auditam as respostas da IA: erros, viés e bajulação.",
          "Validam as afirmações em fontes primárias e normas.",
          "Sintetizam em grupo e o tutor conduz o debrief (DEFT-AI).",
          "Resolvem um caso novo sem IA para verificar a transferência."
        ],
        ordemInicial: [3, 0, 5, 1, 4, 2],
        explicacao: "A IA entra depois do raciocínio humano, é auditada e validada, e o ciclo fecha com uma verificação sem IA."
      },
      quiz: [
        { p: "Um estudante defende que pode consultar primeiro a IA e escrever as hipóteses depois, «já melhoradas». Porque insiste o ciclo no registo prévio?", o: ["Porque a IA devolve respostas mais precisas quando recebe as hipóteses do estudante no prompt.", "Porque hipóteses já corrigidas pela IA tornam a discussão em grupo mais eficiente e rigorosa.", "Porque as hipóteses iniciais permitem ao docente classificar os estudantes antes da discussão.", "Porque deixa o raciocínio próprio visível e permite compará-lo com o da IA depois."], c: 3, e: "O registo prévio protege o esforço produtivo e torna visível o raciocínio do estudante, o que permite compará-lo com o da IA. Hipóteses «melhoradas» pela IA escondem o que o estudante sabia e a discussão deixa de partir do seu raciocínio." },
        { p: "Quer que a IA preserve o esforço produtivo dos estudantes durante o raciocínio de um caso. Qual destas instruções escolhe?", o: ["«Atua como tutor: dá-me pistas graduais sobre o diagnóstico até eu chegar à resposta certa.»", "«Atua como tutor: indica-me os três diagnósticos mais prováveis e pergunta-me qual escolho e porquê.»", "«Atua como tutor: avalia a minha hipótese e explica-me, passo a passo, o que lhe falta.»", "«Atua como tutor: pergunta-me, uma questão de cada vez, como justifico a minha hipótese.»"], c: 3, e: "No método socrático a IA faz perguntas, uma de cada vez, e é o estudante que justifica a hipótese. Pistas graduais sobre o diagnóstico acabam por lhe entregar a resposta." },
        { p: "O grupo acabou a síntese e o debrief do tutor. Que passo final verifica se a aprendizagem se transfere para além da IA?", o: ["Repetir o mesmo caso com o doente simulado, para ver se chegam agora ao diagnóstico.", "Resolver um caso novo sem IA, para verificar se o raciocínio se transfere.", "Pedir à IA que avalie a síntese do grupo e aponte as falhas de raciocínio restantes.", "Comparar a síntese do grupo com as respostas da IA para medir o grau de concordância."], c: 1, e: "Só um caso novo, sem IA, mostra se o raciocínio se transfere. Repetir o mesmo caso testa memória, e a concordância com a IA não mede aprendizagem." }
      ],
      reflexao: "Em que fase do ciclo os seus estudantes tendem a «saltar» passos? Como pode torná-la visível?",
      ancoragem: "Supervisão Humana (UMinho): a intervenção humana deve orientar todo o processo, da definição de objetivos à interpretação final das respostas."
    },
    {
      id: "3.3",
      titulo: "Tarefas imunes ao plágio reflexivo",
      minutos: 13,
      objetivo: "Desenhar tarefas robustas à terceirização por IA e atribuir a modalidade de utilização (semáforo) a cada tarefa.",
      cartoes: [
        {
          titulo: "O que é o plágio reflexivo",
          html: "<p>Quando o estudante entrega um texto gerado por IA com reflexões <strong>plausíveis mas sem experiência real</strong> por detrás. Tarefas do tipo «reflita sobre a importância da empatia» são particularmente vulneráveis.</p><p>Os detetores de IA <strong>não</strong> são a solução: não podem ser prova única de uso indevido.</p>"
        },
        {
          titulo: "Desenhar tarefas robustas",
          html: "<ul><li><strong>Ancorar</strong> na experiência única (o seu doente, a sua tutoria, os dados do grupo).</li><li><strong>Tornar o processo visível:</strong> rascunhos, registo de <em>prompts</em>, registo de verificação.</li><li><strong>Componente oral:</strong> discussão, OSCE, justificação de decisões.</li><li><strong>Transformar o produto:</strong> pedir para criticar ou melhorar uma resposta de IA.</li><li><strong>Critérios transparentes</strong> e modalidade explícita.</li></ul>"
        },
        {
          titulo: "Semáforo e equidade",
          html: "<p><strong>🔴 Proibida</strong> (competência autónoma), <strong>🟡 condicionada</strong> (etapas definidas, validação e declaração) e <strong>🟢 livre</strong> (a IA é parte da competência). Escolha por tarefa e comunique antecipadamente.</p><p>Se o uso de IA for requisito, ofereça uma <strong>alternativa equivalente</strong> a quem não tenha acesso ou apresente impedimento fundamentado. Escalas como a AIAS (<a href=\"https://doi.org/10.53761/q3azde36\" target=\"_blank\" rel=\"noopener\">Perkins et al., 2024</a>) ajudam a graduar o uso.</p>"
        }
      ],
      diagrama: { src: "assets/diagrams/fluxograma_decisao_docente.svg", alt: "Fluxograma com três perguntas que conduzem a uma modalidade de utilização de IA: proibida, condicionada ou livre.", legenda: "Fluxograma de decisão do docente perante a IA." },
      atividade: {
        tipo: "classificar",
        titulo: "Semáforo: que modalidade para cada tarefa?",
        instrucoes: "Atribua a modalidade de utilização de IA mais adequada a cada tarefa. Há argumentos legítimos em casos fronteira; leia as justificações.",
        categorias: [{ id: "proibida", rotulo: "🔴 Proibida" }, { id: "condicionada", rotulo: "🟡 Condicionada" }, { id: "livre", rotulo: "🟢 Livre" }],
        itens: [
          { texto: "Colheita de história clínica a um doente simulado, avaliada em OSCE.", cat: "proibida", porque: "Competência observada sem mediação tecnológica." },
          { texto: "Estudo prévio do CBL: usar IA para gerar perguntas de autoavaliação, com validação e declaração.", cat: "condicionada", porque: "Etapa delimitada, com finalidade pedagógica definida e validação pelo estudante." },
          { texto: "Atividade em que os estudantes auditam respostas de IA e melhoram o prompt.", cat: "livre", porque: "A utilização crítica da IA é a própria competência a desenvolver." },
          { texto: "Exame objetivo do abdómen em contexto de prova prática.", cat: "proibida", porque: "Desempenho prático que exige autonomia." },
          { texto: "Relatório reflexivo da tutoria hospitalar, com IA apenas na revisão linguística, declarada.", cat: "condicionada", porque: "Uso limitado a uma fase, com declaração e responsabilidade do autor." },
          { texto: "Projeto de desenho de um chatbot-doente simulado para CBL.", cat: "livre", porque: "A construção e a avaliação crítica do chatbot integram a competência." },
          { texto: "Prova oral de justificação de uma decisão clínica.", cat: "proibida", porque: "Avalia raciocínio autónomo e transferência sem mediação." }
        ]
      },
      quiz: [
        { p: "Quer avaliar a reflexão dos estudantes sobre empatia em contexto clínico. Que enunciado resiste melhor ao plágio reflexivo?", o: ["Escrever, em casa, uma reflexão de 800 palavras sobre empatia, com cinco referências bibliográficas.", "Relatar uma situação vivida na sua tutoria hospitalar e discuti-la oralmente com o docente.", "Escrever a reflexão em casa e anexar à entrega o resultado de um detetor de IA.", "Refletir sobre um artigo de referência acerca da empatia clínica, citando passagens do texto."], c: 1, e: "Ancorar a tarefa numa experiência única e juntar uma componente oral torna difícil terceirizá-la. Mais extensão ou referências não eliminam a genericidade, e os detetores de IA não são solução nem prova única." },
        { p: "Um estudante não tem acesso à ferramenta de IA exigida numa atividade avaliada. Qual é a resposta recomendada?", o: ["Oferecer-lhe uma tarefa alternativa de exigência equivalente, sem uso de IA.", "Dispensá-lo da atividade e atribuir-lhe a média das restantes classificações.", "Propor-lhe que faça a tarefa em grupo com colegas que tenham acesso à ferramenta.", "Oferecer-lhe a tarefa sem IA, com a cotação máxima reduzida por falta da competência."], c: 0, e: "Quando o uso de IA é requisito, deve existir uma alternativa equivalente, para não criar desvantagens por razões de acesso. Uma alternativa com cotação reduzida ou dependente dos colegas não é equivalente." },
        { p: "Numa tarefa condicionada, quer evidência de como o estudante chegou ao resultado. O que deve pedir na entrega?", o: ["Rascunhos datados, registo de prompts e registo de verificação das fontes.", "A pontuação de um detetor de IA aplicada ao texto final, anexada à entrega.", "A comparação do estilo do texto final com trabalhos anteriores do mesmo estudante.", "O registo do tempo de ligação à plataforma durante a redação do trabalho."], c: 0, e: "Rascunhos, prompts e verificação mostram o processo e a responsabilidade do autor. A pontuação de um detetor, o estilo ou o tempo de ligação são indícios indiretos e não provam como o trabalho foi feito." }
      ],
      reflexao: "Escolha uma tarefa da sua UC e atribua-lhe uma modalidade. Que ajustes faria ao enunciado?",
      ancoragem: "Transparência (UMinho): as unidades curriculares devem explicitar as condições de uso de IAGen nas atividades de ensino e avaliação, incluindo limites e formatos de declaração."
    }
  ]
});