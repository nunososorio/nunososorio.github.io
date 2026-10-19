/* Dados base do curso. Os módulos são acrescentados por js/dados/m1.js … m4.js */
window.CURSO = {
  titulo: "Literacia em IA e Pensamento Crítico na Educação Médica",
  subtitulo: "Da Prática Clínica à Pedagogia",
  chaveArmazenamento: "emed_ia_literacia_v1",
  limiteQuiz: 2,
  modulos: [],
  crachas: [
    { id: "primeiros", icone: "🩺", nome: "Triagem Concluída", descricao: "Sinais vitais estáveis! Sobreviveu à primeira micro-sessão do curso." },
    { id: "m1", icone: "🦜", nome: "Domador de Papagaios", descricao: "Concluiu o Módulo 1. Já percebeu que a IA é só estatística e não magia clínica." },
    { id: "m2", icone: "🦯", nome: "House dos Prompts", descricao: "Concluiu o Módulo 2. Não confia em ninguém, muito menos num chatbot. Bisturi cognitivo afiado!" },
    { id: "m3", icone: "🤒", nome: "O Doente Imaginário", descricao: "Concluiu o Módulo 3. Arquiteto de casos clínicos e PBLs que fariam Molière ter inveja." },
    { id: "m4", icone: "📜", nome: "Hipócrates Digital", descricao: "Concluiu o Módulo 4. Primum non nocere: pronto para garantir que o algoritmo não faz mal ao doente." },
    { id: "m5", icone: "☕", nome: "Sobrevivente do Journal Club", descricao: "Concluiu o Módulo 5. Leu criticamente o artigo, sobreviveu à evidência e ainda fez um podcast." },
    { id: "lince", icone: "👻", nome: "Caça-Alucinações", descricao: "Iatrogenia zero! Detetou pelo menos 80% das alucinações da IA nas 3 auditorias (com max. 1 falso alarme)." },
    { id: "semfalhas", icone: "👶", nome: "Apgar 10/10", descricao: "Nenhuma asfixia mental! Precisão cirúrgica ao obter 3/3 à primeira tentativa em 3 quizzes diferentes." },
    { id: "mediador", icone: "🎓", nome: "Chefe de Serviço (com IA)", descricao: "Concluiu o internato e tem alta médica! Completou todas as micro-sessões do curso." }
  ],
  referencias: [
    { grupo: "Orientações institucionais e guiões letivos", itens: [
      { t: "Universidade do Minho. Recomendações Gerais da Universidade do Minho para o uso da Inteligência Artificial no Ensino, na Aprendizagem e na Avaliação (V_21/04/2026).", u: "https://www.uminho.pt/PT/siga-a-uminho/Paginas/Detalhe-do-evento.aspx?Codigo=68646" },
      { t: "Osório NS. Guião Prático «Inteligência Artificial na Prática Clínica» (HDPP4, MIM, 2026). CC BY 4.0.", u: "https://nunososorio.github.io/hdpp/" },
      { t: "Costa B, Osório NS. «A Priming in AI Literacy» — workshop Think-Pair-Share, MBiomed-CIB, 2026.", u: "https://nunososorio.github.io/AIprimer/" }
    ]},
    { grupo: "Evidência científica e orientações (2023–2026)", itens: [
      "Abdulnour RE, Gin B, Boscardin CK. Educational Strategies for Clinical Supervision of Artificial Intelligence Use. N Engl J Med. 2025;393:786-797. doi:10.1056/NEJMra2503232",
      "Goh E, Gallo R, Hom J, et al. Large Language Model Influence on Diagnostic Reasoning: A Randomized Clinical Trial. JAMA Netw Open. 2024;7(10):e2440969. doi:10.1001/jamanetworkopen.2024.40969",
      "Strömberg D, Lei V, Wu Y. The Generative AI Learning Penalty: Evidence from Chinese Secondary Education. SSRN (preprint, sem revisão por pares); junho de 2026. doi:10.2139/ssrn.6868618",
      "Masters K, MacNeil H, Benjamin J, et al. Artificial Intelligence in Health Professions Education assessment: AMEE Guide No. 178. Med Teach. 2025. doi:10.1080/0142159X.2024.2445037",
      "Automation Bias in Large Language Model Assisted Diagnostic Reasoning Among AI-Trained Physicians. medRxiv (pré-publicação, 2025). doi:10.1101/2025.08.23.25334280 — evidência preliminar, sem revisão por pares.",
      "Revisão narrativa «Cognitive reshaping and resurgence of humanness…» (deskilling, never-skilling e viés de automação). Front Med. 2026. doi:10.3389/fmed.2026.1867722",
      "Clusmann J, Kolbinger FR, Muti HS, et al. The future landscape of large language models in medicine. Commun Med. 2023;3:141. doi:10.1038/s43856-023-00370-1",
      "Abd-alrazaq A, AlSaad R, Alhuwail D, et al. Large language models in medical education: opportunities, challenges, and future directions. JMIR Med Educ. 2023;9:e48291. doi:10.2196/48291",
      "Boud D, Molloy E. Rethinking models of feedback for learning: the challenge of design. Assess Eval High Educ. 2013;38(6):698-712. doi:10.1080/02602938.2012.691462",
      "Carless D, Boud D. The development of student feedback literacy: enabling uptake of feedback. Assess Eval High Educ. 2018;43(8):1315-1325. doi:10.1080/02602938.2018.1463354",
      "Awidi IT. Comparing expert tutor evaluation of reflective essays with marking by generative artificial intelligence (AI) tool. Comput Educ Artif Intell. 2024;6:100226. doi:10.1016/j.caeai.2024.100226",
      "Perkins M, Furze L, Roe J, MacVaugh J. The Artificial Intelligence Assessment Scale (AIAS). J Univ Teach Learn Pract. 2024;21(6). doi:10.53761/q3azde36",
      "Bender EM, Gebru T, McMillan-Major A, Shmitchell S. On the Dangers of Stochastic Parrots. FAccT '21. 2021. doi:10.1145/3442188.3445922",
      "Miao F, Cukurova M. AI competency framework for teachers. UNESCO; 2024. doi:10.54675/ZJTE2084"
    ]},
    { grupo: "Enquadramento normativo", itens: [
      { t: "Regulamento (UE) 2024/1689 do Parlamento Europeu e do Conselho, de 13 de junho de 2024 (Regulamento Europeu de Inteligência Artificial).", u: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
      { t: "Regulamento (UE) 2016/679 (Regulamento Geral sobre a Proteção de Dados — RGPD).", u: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
      { t: "High-Level Expert Group on AI. Ethics Guidelines for Trustworthy AI. Comissão Europeia; 2019.", u: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai" },
      { t: "World Health Organization (WHO). Ethics and governance of artificial intelligence for health: WHO guidance (2021).", u: "https://www.who.int/publications/i/item/9789240029200" },
      { t: "International Committee of Medical Journal Editors (ICMJE). Recommendations for the Conduct, Reporting, Editing, and Publication of Scholarly Work in Medical Journals (2026).", u: "https://www.icmje.org/recommendations/" },
      { t: "ALLEA. The European Code of Conduct for Research Integrity (Edição 2023).", u: "https://allea.org/european-code-of-conduct-for-research-integrity/" },
      { t: "European Data Protection Board (EDPB). Parecer 28/2024 sobre proteção de dados e modelos de Inteligência Artificial.", u: "https://edpb.europa.eu/" }
    ]}
  ],
  autor: "Nuno S. Osório",
  email: "nosorio@med.uminho.pt",
  licenca: { nome: "Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)", url: "https://creativecommons.org/licenses/by/4.0/deed.pt" },
  ano: 2026
};