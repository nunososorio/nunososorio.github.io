/* Módulo 4 — Ética, Governação e Avaliação */
window.CURSO.modulos.push({
  id: "m4",
  numero: 4,
  titulo: "Ética, Governação e Avaliação",
  subtitulo: "RGPD hospitalar, proteção de dados dos doentes e autoria académica",
  sessoes: [
    {
      id: "4.1",
      titulo: "Dados dos doentes, RGPD e AI Act",
      minutos: 13,
      objetivo: "Decidir que dados podem ser inseridos em que ferramenta e enquadrar os riscos éticos com o RGPD e o Regulamento Europeu de IA.",
      cartoes: [
        {
          titulo: "Dados de saúde: categoria especial",
          html: "<ul><li>Os dados de saúde são <strong>categoria especial</strong> no RGPD.</li><li>Identificadores diretos (nome, n.º de processo, imagem facial, voz) e <strong>indiretos</strong> (idade rara, localização, datas) podem reidentificar o doente.</li><li><strong>Pseudonimização não é anonimização.</strong></li><li>A UMinho proíbe a inserção de dados pessoais sensíveis, informação confidencial ou dados de investigação não publicados em ferramentas <strong>públicas</strong> de IA generativa, salvo autorização e garantias adequadas.</li><li>Prefira ferramentas com login institucional (Microsoft 365 Copilot, IAEDU).</li></ul>"
        },
        {
          titulo: "O Regulamento Europeu de IA (UE 2024/1689)",
          html: "<p>Segue uma abordagem <strong>baseada no risco</strong> e reforça supervisão humana, transparência, robustez técnica e governação de dados. Alguns usos, como a avaliação de resultados de aprendizagem e certos dispositivos médicos, são considerados de <strong>risco elevado</strong>.</p><p>Os pilotos que envolvam ferramentas externas requerem aprovação ética e institucional e acordos de tratamento de dados. Em caso de dúvida, consulte o Encarregado de Proteção de Dados.</p>"
        },
        {
          titulo: "Trade-offs: automatizar tudo, exceto o juízo",
          html: "<ul><li><strong>Velocidade vs confiança:</strong> auditabilidade, explicabilidade, fiabilidade.</li><li><strong>Automação vs controlo humano:</strong> definir a «zona de julgamento».</li><li><strong>Inovação vs regulação:</strong> conformidade, segurança e equidade (RGPD, AI Act).</li></ul><p>Use a matriz para priorizar riscos na sua UC.</p>"
        }
      ],
      diagrama: { src: "assets/diagrams/matriz_riscos_eticos.svg", alt: "Matriz de probabilidade por impacto com oito riscos numerados, como fuga de dados de doentes, alucinação aceite como facto e atrofia do raciocínio, e as respetivas medidas de mitigação.", legenda: "Matriz de riscos éticos e pedagógicos." },
      atividade: {
        tipo: "classificar",
        titulo: "Que dados podem ir para que ferramenta?",
        instrucoes: "Decida onde cada tipo de informação pode ser inserido.",
        categorias: [
          { id: "publica", rotulo: "Pode ir para ferramenta pública" },
          { id: "institucional", rotulo: "Só em ferramenta institucional e anonimizado" },
          { id: "nunca", rotulo: "Nunca em IA generativa" }
        ],
        itens: [
          { texto: "Pergunta genérica: «resume os critérios de uma síndrome», sem dados de doentes.", cat: "publica", porque: "Não contém dados pessoais nem informação confidencial." },
          { texto: "Vinheta clínica totalmente fictícia criada por si.", cat: "publica", porque: "Dados fictícios: sem risco de reidentificação." },
          { texto: "Caso real com idade, sexo e resultados de análises, sem identificadores diretos.", cat: "institucional", porque: "Mesmo sem identificadores diretos, existe risco de reidentificação; use ferramenta institucional e mínimo de dados necessários." },
          { texto: "Nome, número de processo e fotografia facial de um doente.", cat: "nunca", porque: "Identificadores diretos de dados de saúde." },
          { texto: "Dados brutos de investigação ainda não publicados.", cat: "nunca", porque: "Confidencial e com risco para a propriedade intelectual; só com autorização expressa e garantias." },
          { texto: "Pauta nominal de classificações de estudantes, para gerar feedback.", cat: "institucional", porque: "São dados pessoais: usar apenas plataformas institucionais, minimizar e pseudonimizar." },
          { texto: "Gravação de uma consulta real, com a voz do doente.", cat: "nunca", porque: "A voz é um identificador direto e a gravação é dado de saúde." }
        ]
      },
      quiz: [
        { p: "Um colega substituiu o nome e o n.º de processo por códigos e guardou a chave de correspondência numa folha à parte. Afirma que os dados já são anónimos. A avaliação correta é…", o: ["Correto, desde que a chave fique guardada em local separado e protegido, porque os dados saem do âmbito do RGPD.", "Incorreto: os dados estão pseudonimizados, continuam a ser pessoais e a chave permite reidentificar os doentes.", "Parcialmente correto: são anónimos para a ferramenta de IA, mas continuam a ser dados pessoais para a instituição.", "Incorreto: só deixariam de ser pessoais se fossem também removidas as datas, ainda que a chave se mantivesse."], c: 1, e: "Enquanto existir uma chave que permita reidentificar, os dados são pseudonimizados e continuam sujeitos ao RGPD, seja qual for a ferramenta. Remover mais identificadores indiretos reduz o risco, mas não torna anónimos dados que a chave reverte." },
        { p: "Quer que a IA ajude a reformular a descrição de um caso real (idade, sexo e análises, sem nome nem n.º de processo). Qual é a abordagem mais adequada?", o: ["Usar uma conta pessoal paga, porque o fornecedor declara que não treina modelos com os dados do utilizador.", "Usar uma ferramenta pública, porque sem identificadores diretos o doente deixa de ser reidentificável.", "Usar uma ferramenta com login institucional e reduzir a informação ao mínimo necessário para a tarefa.", "Não usar IA generativa, porque nenhum caso real pode ser tratado nem em ferramentas institucionais."], c: 2, e: "Mesmo sem identificadores diretos há risco de reidentificação, por isso o caso real só deve ir para uma ferramenta institucional e com minimização de dados. A garantia de um fornecedor numa conta pessoal não substitui o enquadramento institucional." },
        { p: "Segundo o Regulamento Europeu de IA, usar IA para avaliar resultados de aprendizagem dos estudantes é considerado…", o: ["de risco limitado, bastando informar os estudantes de que foi usada IA na avaliação.", "proibido, porque o regulamento veda qualquer utilização de IA na avaliação de estudantes.", "fora do âmbito do regulamento, porque se trata de uma atividade académica e não comercial.", "de risco elevado, com reforço da supervisão humana, da transparência e da governação."], c: 3, e: "A avaliação de resultados de aprendizagem é um dos usos classificados como de risco elevado: não é proibida, mas exige mais do que informar. O regulamento segue uma abordagem baseada no risco, sem exceção para o contexto académico." }
      ],
      reflexao: "Em que situação do seu quotidiano clínico ou docente esteve tentado a colar informação sensível numa ferramenta de IA? O que faria agora?",
      ancoragem: "Responsabilidade e Supervisão Humana (UMinho): é proibida a inserção de dados pessoais sensíveis, informação confidencial ou dados de investigação não publicados em ferramentas públicas de IAGen."
    },
    {
      id: "4.2",
      titulo: "Autoria, transparência e integridade",
      minutos: 12,
      objetivo: "Declarar corretamente o uso de IA, reconhecer que a IA não é autora e detetar alterações de sentido introduzidas na revisão linguística.",
      cartoes: [
        {
          titulo: "A IA não pode ser autora",
          html: "<p>A IA não tem personalidade jurídica nem responsabilidade ética, pelo que <strong>não pode ser autora</strong> de obras académicas, artigos ou dissertações. A responsabilidade pelo conteúdo é sempre humana.</p><p>Isto aplica-se igualmente aos docentes, na preparação de materiais, enunciados e feedback.</p>"
        },
        {
          titulo: "Como declarar o uso de IA",
          html: "<p>Indique, de forma geral, <strong>a ferramenta</strong>, <strong>a natureza da ajuda</strong> e <strong>as fases do trabalho</strong>.</p><blockquote>«Utilizou-se o Microsoft 365 Copilot (conta institucional) para revisão linguística na fase de redação. Os autores reviram todo o conteúdo e assumem a responsabilidade pelo texto final.»</blockquote><p>A declaração tem finalidade formativa: clarificar práticas e construir confiança.</p>"
        },
        {
          titulo: "O risco do «polimento»",
          html: "<p>Ao «melhorar» o texto, um LLM pode alterar o significado: por exemplo, trocar «os dados <em>sugerem uma associação</em>» por «<em>demonstra-se um mecanismo causal</em>». Compare sempre a versão original com a revista, frase a frase, sobretudo nas afirmações de resultados.</p>"
        }
      ],
      diagrama: null,
      atividade: {
        tipo: "auditoria",
        titulo: "Auditoria: o artigo «polido»",
        instrucoes: "Dossiê fictício de submissão de um manuscrito. Compare a versão submetida com o rascunho original e com o registo de preparação do autor, e assinale os trechos da versão submetida que violam princípios de autoria, transparência, integridade científica ou proteção de dados. Nem todas as alterações feitas pela IA são problemáticas.",
        rotulo: "Contexto: ",
        pedido: "Dossiê de submissão (inteiramente fictício) com três documentos: rascunho original, registo de preparação e versão submetida.",
        referencia: [
          { titulo: "Documento A — Rascunho original do autor (antes de qualquer revisão)", linhas: [
            "«Os dados sugerem uma associação entre a exposição e o desfecho, num estudo transversal com 120 participantes.»",
            "«Recrutaram-se participantes de forma consecutiva na consulta externa.»",
            "«Foi usada regressão ajustada para idade e sexo.»",
            "«As limitações incluem o desenho transversal e o tamanho reduzido da amostra.»"
          ]},
          { titulo: "Documento B — Registo de preparação (nota interna do autor)", linhas: [
            "O rascunho foi enviado ao Microsoft 365 Copilot com o pedido «melhora a fluidez e a clareza do texto».",
            "A folha de cálculo original, com o nome e o número de processo dos doentes, foi carregada num assistente de IA público para formatar as tabelas."
          ]}
        ],
        tituloSegmentos: "Documento C — Versão submetida e declarações (assinale os trechos problemáticos)",
        segmentos: [
          { t: "Este estudo demonstra um mecanismo causal entre a exposição e o desfecho.", erro: { tipo: "Alteração de sentido na revisão linguística", exp: "No rascunho (A), os dados «sugerem uma associação» num estudo transversal. A reformulação por IA tornou a conclusão causal, sem suporte do desenho." } },
          { t: "Os participantes foram recrutados consecutivamente na consulta externa." },
          { t: "Foi usada regressão ajustada para idade e sexo." },
          { t: "As limitações incluem o tamanho reduzido da amostra.", erro: { tipo: "Omissão de uma limitação na revisão", exp: "O rascunho (A) referia também o desenho transversal, limitação central para a leitura causal. A omissão é discreta, mas altera a perceção do rigor do estudo." } },
          { t: "Autoria: A. Silva, B. Costa e o assistente de IA, pelo seu contributo na redação.", erro: { tipo: "IA como autora", exp: "A IA não pode ser autora: não tem personalidade jurídica nem responsabilidade. A responsabilidade é sempre humana." } },
          { t: "Declaração: «Não foi utilizada inteligência artificial na preparação deste manuscrito.»", erro: { tipo: "Declaração falsa ou incompleta", exp: "O registo (B) mostra que a IA foi usada na revisão do texto e na formatação das tabelas. O uso deve ser declarado (ferramenta, finalidade e fase)." } },
          { t: "Proteção de dados: os dados dos participantes foram pseudonimizados antes de qualquer tratamento.", erro: { tipo: "Violação de proteção de dados (e declaração inexata)", exp: "O registo (B) mostra que nome e número de processo foram carregados numa ferramenta pública: incumprimento do RGPD e das regras da UMinho, e a declaração não corresponde ao que foi feito." } },
          { t: "Todos os autores reveem e assumem a responsabilidade pelo conteúdo final." }
        ]
      },
      quiz: [
        { p: "Um revisor propõe incluir o assistente de IA como coautor, «porque redigiu duas secções». Qual é o argumento correto para recusar?", o: ["A autoria exige contributo intelectual original e o texto de um LLM é sempre plágio de outros autores.", "A autoria implica responsabilidade e capacidade de responder pelo conteúdo, que a IA não tem; o seu uso declara-se.", "A maioria das revistas aceita IA como coautora, desde que a ferramenta e a versão utilizadas sejam identificadas.", "A IA só poderia ser coautora se todos os autores humanos o aprovassem por escrito e assumissem a responsabilidade."], c: 1, e: "A IA não tem personalidade jurídica nem responsabilidade ética, por isso não pode ser autora; o seu contributo é declarado, não creditado. Dizer que o texto é «sempre plágio» é inexato e não é o fundamento da recusa." },
        { p: "Qual destas declarações cumpre os três elementos recomendados: ferramenta, natureza da ajuda e fases do trabalho?", o: ["«Utilizou-se IA generativa na preparação do manuscrito, tendo os autores revisto todo o texto, verificado as referências e assumido a responsabilidade pelo conteúdo.»", "«Utilizou-se o ChatGPT (versão paga) durante a preparação do manuscrito. Os autores reviram todo o texto e assumem a responsabilidade pelo conteúdo final.»", "«Utilizou-se o Microsoft 365 Copilot em várias fases do trabalho. Os autores reviram o resultado e assumem a responsabilidade pelo texto final.»", "«Utilizou-se o Microsoft 365 Copilot (conta institucional) para revisão linguística na redação. Os autores reviram o texto e assumem a responsabilidade.»"], c: 3, e: "Só a última indica a ferramenta (Copilot institucional), a natureza da ajuda (revisão linguística) e a fase (redação). As outras falham a ferramenta, a natureza da ajuda ou ambas, por mais rigorosa que pareça a revisão pelos autores." },
        { p: "Depois de pedir à IA que «melhorasse» o resumo de um artigo, o texto ficou mais fluido e sem erros. Qual é a verificação prioritária antes de submeter?", o: ["Passar o texto num detetor de IA, para confirmar que não restam passagens geradas automaticamente.", "Verificar se as referências bibliográficas ficaram formatadas segundo o estilo exigido pela revista.", "Pedir à mesma ferramenta que confirme que não alterou o sentido nem o grau de certeza das frases.", "Comparar frase a frase com o original, atendendo sobretudo aos resultados, para confirmar o sentido."], c: 3, e: "O polimento pode transformar uma associação numa causalidade; só a comparação humana com o original o deteta. Pedir à mesma ferramenta que se auto-avalie não é verificação independente." }
      ],
      reflexao: "Que declaração de uso de IA incluiria hoje nos seus materiais de ensino? Está confortável em partilhá-la com os estudantes?",
      ancoragem: "Transparência (UMinho): os docentes devem igualmente adotar transparência sempre que recorrem à IA na preparação de materiais, enunciados ou feedback."
    },
    {
      id: "4.3",
      titulo: "Avaliar na era da IA",
      minutos: 14,
      objetivo: "Conceber uma abordagem de avaliação formativa e sumativa coerente com a presença de IA generativa, sem usar a deteção automática como prova única.",
      cartoes: [
        {
          titulo: "Três funções da avaliação",
          html: "<ul><li><strong>Da aprendizagem</strong> (sumativa): desempenho final.</li><li><strong>Para a aprendizagem</strong> (formativa): feedback que apoia a progressão.</li><li><strong>Como aprendizagem:</strong> reflexão sobre o processo.</li></ul><p>O <a href=\"https://doi.org/10.1080/0142159X.2024.2445037\" target=\"_blank\" rel=\"noopener\">AMEE Guide n.º 178 (2025)</a> sublinha a <strong>avaliação programática</strong>: múltiplos dados, recolhidos ao longo do tempo, com diferentes instrumentos, dão uma imagem mais robusta da competência do que um único exame.</p>"
        },
        {
          titulo: "Deteção automática não é prova",
          html: "<p>As ferramentas de deteção de IA <strong>não devem ser usadas como prova única</strong> de utilização indevida. Baseie a análise em <strong>múltiplos elementos</strong>, converse com o estudante e preveja momentos de <strong>explicitação do processo</strong> (apresentação ou discussão).</p><p>O espírito do referencial UMinho é <strong>formativo e não sancionatório</strong>.</p>"
        },
        {
          titulo: "Feedback com IA, com supervisão humana",
          html: "<p><strong>Classificar é atribuir uma etiqueta; dar feedback é um ato pedagógico.</strong> Para Boud e Molloy (2013), o feedback autêntico não é informação entregue ao estudante, mas um processo dialógico que promove a autorregulação. O feedback monológico (comentários sem resposta do estudante) vale pouco sem literacia de feedback (Carless e Boud, 2018).</p><ul><li>A IA pode aproximar a <strong>entrega de informação</strong>: feedback formativo rápido, alinhado com critérios definidos antes e com ciclos de revisão.</li><li>Não dialoga: não lê em tempo real a confusão, a resistência ou o <em>insight</em> do estudante, nem ajusta o tom ao seu estado emocional ou percurso. É uma <strong>limitação estrutural</strong>, que melhores prompts não corrigem.</li><li>Em ensaios reflexivos, a IA reproduziu características avaliativas de superfície, mas não a qualidade relacional e contextualizada do feedback de tutores especialistas (Awidi, 2024).</li></ul><p>A decisão de avaliação <strong>não pode</strong> basear-se exclusivamente em IA, e os estudantes devem avaliar criticamente o feedback recebido. Pergunta de fundo: o estudante consegue transferir o conhecimento <strong>sem</strong> apoio de IA?</p>"
        }
      ],
      diagrama: { src: "assets/diagrams/fluxograma_decisao_docente.svg", alt: "Fluxograma com três perguntas que conduzem a uma modalidade de utilização de IA: proibida, condicionada ou livre.", legenda: "Fluxograma de decisão do docente perante a IA." },
      atividade: {
        tipo: "caso",
        titulo: "Caso: suspeita de trabalho gerado por IA",
        contexto: "Um relatório reflexivo de um estudante parece «demasiado perfeito». Um detetor automático atribui-lhe 85 % de probabilidade de ter sido gerado por IA. A UC não tinha explicitado regras de uso.",
        inicio: "n1",
        nos: {
          n1: {
            texto: "Como reage?",
            opcoes: [
              { texto: "Atribuo zero, usando o resultado do detetor como prova da fraude.", vai: "n2", pontos: 0, tipo: "mau", feedback: "Os detetores não são prova única e produzem falsos positivos; a sanção seria injusta e contrária ao referencial." },
              { texto: "Trato como indício, comparo outras evidências e converso com o estudante.", vai: "n2", pontos: 3, tipo: "bom", feedback: "Abordagem baseada em múltiplos elementos e na explicitação do processo." },
              { texto: "Ignoro a suspeita, porque os detetores de IA não são fiáveis.", vai: "n2", pontos: 1, tipo: "medio", feedback: "Evita o erro de acusar, mas deixa por esclarecer a integridade e a aprendizagem." },
              { texto: "Peço ao estudante que reescreva o relatório em sala, sem consultar nada.", vai: "n2", pontos: 1, tipo: "medio", feedback: "Pode confirmar a autoria, mas é punitivo sem conversa prévia e sem considerar outras evidências." }
            ]
          },
          n2: {
            texto: "O estudante diz que usou IA apenas para rever a linguagem e não declarou porque a UC não referia regras.",
            opcoes: [
              { texto: "Aplico logo uma sanção disciplinar por falta de declaração de IA.", vai: "n3", pontos: 0, tipo: "mau", feedback: "Não havia condições explícitas: a falha é, em parte, de comunicação da UC." },
              { texto: "Assumo a falha de comunicação, peço declaração e confirmo a autoria oralmente.", vai: "n3", pontos: 3, tipo: "bom", feedback: "Formativo, transparente e centrado em evidência adicional." },
              { texto: "Aceito a explicação sem mais, sem pedir declaração nem confirmar autoria.", vai: "n3", pontos: 1, tipo: "medio", feedback: "Evita conflito, mas não confirma a autoria nem corrige a prática." },
              { texto: "Peço que o estudante se justifique à turma e refaça todo o trabalho.", vai: "n3", pontos: 0, tipo: "mau", feedback: "Medida desproporcionada, sem regras explícitas na UC e contrária ao espírito formativo." }
            ]
          },
          n3: {
            texto: "O que muda para o próximo semestre?",
            opcoes: [
              { texto: "Reforço a vigilância com mais detetores automáticos de texto gerado.", vai: "fim", pontos: 0, tipo: "mau", feedback: "Aumenta a desconfiança sem resolver a causa." },
              { texto: "Explicito a modalidade por tarefa, peço declaração e valorizo o processo.", vai: "fim", pontos: 3, tipo: "bom", feedback: "Alinha-se com o referencial UMinho e com a avaliação programática." },
              { texto: "Substituo todos os trabalhos por exames presenciais sem consulta.", vai: "fim", pontos: 1, tipo: "medio", feedback: "Reduz a terceirização, mas empobrece a avaliação autêntica e programática." },
              { texto: "Peço a todos que declarem o uso de IA, mas mantenho as mesmas tarefas.", vai: "fim", pontos: 1, tipo: "medio", feedback: "A declaração ajuda, mas sem modalidade explícita e tarefas ajustadas a ambiguidade mantém-se." }
            ]
          }
        },
        fins: [
          { min: 8, texto: "Abordagem justa, formativa e baseada em evidência múltipla." },
          { min: 4, texto: "Algumas decisões são razoáveis, mas faltam clareza de regras ou evidência adicional." },
          { min: 0, texto: "Cuidado: decisões punitivas baseadas num detetor ou ausência de ação comprometem a integridade e a confiança." }
        ]
      },
      quiz: [
        { p: "Um detetor automático atribui 85 % de «probabilidade de IA» a um relatório reflexivo. Qual é a conduta mais alinhada com o referencial da UMinho?", o: ["Usar um segundo detetor e sancionar se ambos concordarem, para reduzir o risco de falsos positivos.", "Tratar o resultado como indício, reunir outras evidências e falar com o estudante sobre o processo.", "Ignorar o resultado, porque os detetores não têm qualquer valor informativo e não devem ser consultados.", "Aplicar a sanção prevista, porque 85 % excede o limiar habitual de fiabilidade estatística."], c: 1, e: "Os detetores não devem ser prova única; a análise exige vários elementos e uma conversa com o estudante. Dois detetores concordantes continuam a ser a mesma fonte de evidência, com os mesmos limites." },
        { p: "Qual dos desenhos é mais coerente com a avaliação programática?", o: ["Três testes escritos com o mesmo formato, com média aritmética no final, para multiplicar os dados recolhidos.", "Um exame final presencial sem consulta com peso de 100 %, para neutralizar o efeito da IA.", "Um trabalho final com declaração de uso de IA, avaliado com uma rubrica muito detalhada e validada.", "Vários momentos e instrumentos ao longo do semestre, como portefólio, prova oral e observação."], c: 3, e: "A avaliação programática combina dados diversos, recolhidos ao longo do tempo. Repetir o mesmo instrumento ou concentrar tudo num único momento, por mais detalhado que seja, não dá uma imagem robusta da competência." },
        { p: "Um colega quer enviar aos estudantes, sem revisão, o feedback gerado pelo Copilot sobre as suas reflexões, porque «a qualidade é equivalente à do docente». Qual é a objeção mais sólida?", o: ["O feedback eficaz é dialógico: a IA não lê a reação do estudante nem ajusta o tom, logo não substitui o docente.", "O feedback gerado por IA é sempre factualmente pior do que o feedback humano em qualquer tarefa avaliativa.", "Os estudantes têm o direito de recusar qualquer feedback produzido por uma ferramenta de IA, mesmo supervisionado.", "O problema resolve-se com prompts mais detalhados e critérios mais claros, que tornam o feedback mais dialógico."], c: 0, e: "A IA pode aproximar a entrega de informação, mas não dialoga: é uma limitação estrutural, que melhores prompts não corrigem. Também não se pode afirmar que o feedback de IA seja sempre pior, nem que exista um direito de recusa." }
      ],
      reflexao: "Que mudança concreta vai fazer na avaliação de uma UC no próximo semestre? Como a comunicará aos estudantes?",
      ancoragem: "Supervisão Humana (UMinho): as ferramentas de deteção não devem ser usadas como prova única de utilização indevida e a decisão de avaliação não deve basear-se exclusivamente em sistemas de IA."
    }
  ]
});
