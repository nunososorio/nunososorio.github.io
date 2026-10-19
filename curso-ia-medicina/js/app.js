/* Aplicação do curso — JavaScript puro, sem dependências nem backend. */
(function () {
  "use strict";

  var C = window.CURSO;
  var KEY = C.chaveArmazenamento;

  /* ---------- Dados derivados ---------- */
  var sessoes = [];
  C.modulos.forEach(function (m) {
    m.sessoes.forEach(function (s) { s.modulo = m; sessoes.push(s); });
  });
  var porId = {};
  sessoes.forEach(function (s) { porId[s.id] = s; });
  var TOTAL = sessoes.length;

  /* ---------- Estado e persistência (localStorage) ---------- */
  var armazenamentoOk = true;

  function estadoInicial() {
    return { v: 1, sessoes: {}, crachas: {}, compromisso: { modalidade: "", atividade: "", c1: "", c2: "", c3: "" }, podcast: { slots: ["", "", "", ""], criterios: [false, false, false, false, false], posicao: "" }, prefs: { fonte: 0, contraste: false } };
  }

  function carregar() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return estadoInicial();
      var o = JSON.parse(raw);
      var base = estadoInicial();
      return {
        v: 1,
        sessoes: o.sessoes || {},
        crachas: o.crachas || {},
        compromisso: Object.assign(base.compromisso, o.compromisso || {}),
        podcast: Object.assign(base.podcast, o.podcast || {}),
        prefs: Object.assign(base.prefs, o.prefs || {})
      };
    } catch (e) {
      armazenamentoOk = false;
      return estadoInicial();
    }
  }

  var estado = carregar();

  function guardar() {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(estado));
    } catch (e) {
      armazenamentoOk = false;
      atualizarNota();
    }
  }

  function ss(id) {
    if (!estado.sessoes[id]) estado.sessoes[id] = { ativ: null, quiz: null };
    return estado.sessoes[id];
  }

  function concluida(id) {
    var s = estado.sessoes[id];
    return !!(s && s.ativ && s.ativ.feito && s.quiz && s.quiz.melhor >= C.limiteQuiz);
  }

  function totalConcluidas() {
    return sessoes.filter(function (s) { return concluida(s.id); }).length;
  }

  function pontosSessao(id) {
    var s = estado.sessoes[id];
    if (!s) return 0;
    return (s.ativ ? s.ativ.pontos : 0) + (s.quiz ? s.quiz.melhor * 5 : 0);
  }

  function pontosTotais() {
    return sessoes.reduce(function (t, s) { return t + pontosSessao(s.id); }, 0);
  }

  /* ---------- Utilitários DOM ---------- */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k === "text") el.textContent = v;
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) anexar(el, arguments[i]);
    return el;
  }

  function anexar(el, c) {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { anexar(el, x); }); return; }
    el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }

  function $(sel) { return document.querySelector(sel); }

  function anunciar(msg) {
    var el = $("#anuncios");
    el.textContent = "";
    window.setTimeout(function () { el.textContent = msg; }, 50);
  }

  function embaralhar(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    for (var j = n - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = a[j]; a[j] = a[k]; a[k] = t;
    }
    return a;
  }

  var uid = 0;
  function novoId(p) { uid += 1; return p + "-" + uid; }

  /* ---------- Telemetria Centralizada (Servidor Python) ---------- */
  function enviarTelemetriaCentral(tipo, detalhes) {
    try {
      var dados = { tipo: tipo, detalhes: detalhes, url: window.location.hash || "#/inicio" };
      fetch('/api/telemetria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      }).catch(function() { /* silenciar erros de rede */ });
    } catch (e) { /* ignorar */ }
  }

  /* ---------- Progresso e crachás ---------- */
  function atualizarProgresso() {
    var n = totalConcluidas();
    var pct = Math.round((n / TOTAL) * 100);
    $("#barra").setAttribute("aria-valuenow", String(pct));
    $("#barra").setAttribute("aria-valuetext", n + " de " + TOTAL + " sessões concluídas");
    $("#barra-preenchida").style.width = pct + "%";
    $("#progresso-texto").textContent = n + " de " + TOTAL + " sessões · " + pct + " %";
  }

  function atualizarNota() {
    var el = $("#nota-local");
    el.textContent = "Nota: O seu progresso é guardado localmente neste browser." +
      (armazenamentoOk ? "" : " (O armazenamento local está indisponível: o progresso só se mantém enquanto esta página estiver aberta.)");
  }

  function crachaConquistado(id) {
    switch (id) {
      case "primeiros": return totalConcluidas() >= 1;
      case "m1": case "m2": case "m3": case "m4": case "m5":
        return C.modulos.filter(function (m) { return m.id === id; })[0].sessoes.every(function (s) { return concluida(s.id); });
      case "lince":
        return ["2.1", "2.2", "4.2"].every(function (sid) {
          var s = estado.sessoes[sid];
          return !!(s && s.ativ && s.ativ.extra && s.ativ.extra.lince);
        });
      case "semfalhas":
        return sessoes.filter(function (s) { var e = estado.sessoes[s.id]; return e && e.quiz && e.quiz.primeira === 3; }).length >= 3;
      case "mediador": return totalConcluidas() === TOTAL;
      default: return false;
    }
  }

  function verificarCrachas() {
    C.crachas.forEach(function (c) {
      if (!estado.crachas[c.id] && crachaConquistado(c.id)) {
        estado.crachas[c.id] = new Date().toISOString();
        toast("🏆 Novo crachá: " + c.icone + " " + c.nome);
        anunciar("Novo crachá desbloqueado: " + c.nome);
      }
    });
  }

  function toast(msg) {
    var t = h("div", { class: "toast", text: msg });
    var cont = $("#toasts");
    cont.appendChild(t);
    while (cont.children.length > 3) cont.removeChild(cont.firstChild);
    window.setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 7000);
  }

  function aposAlteracao() {
    verificarCrachas();
    guardar();
    atualizarProgresso();
    construirMenu();
    atualizarEstadoSessao();
  }

  function registarAtividade(id, pontos, extra) {
    var s = ss(id);
    var anterior = s.ativ;
    var ex = extra || {};
    if (anterior && anterior.extra && anterior.extra.lince) ex.lince = true;
    s.ativ = { feito: true, pontos: Math.max(pontos, anterior ? anterior.pontos : 0), extra: ex };
    enviarTelemetriaCentral("conclusao_atividade", id);
    aposAlteracao();
  }

  function registarQuiz(id, certas) {
    var s = ss(id);
    var q = s.quiz || { melhor: 0, tentativas: 0, primeira: null };
    q.tentativas += 1;
    if (q.primeira === null) q.primeira = certas;
    q.melhor = Math.max(q.melhor, certas);
    s.quiz = q;
    enviarTelemetriaCentral("resultado_quiz", id + "_" + certas + "corretas");
    aposAlteracao();
  }

  /* ---------- Menu lateral ---------- */
  var modulosAbertos = {};

  function construirMenu() {
    var nav = $("#menu");
    var rotaAtual = rota();
    var sidAtual = rotaAtual.tipo === "sessao" ? rotaAtual.id : null;
    nav.textContent = "";

    nav.appendChild(h("ul", { class: "menu-lista menu-geral" },
      itemMenu("#/inicio", "🏠 Início", rotaAtual.tipo === "inicio")
    ));

    C.modulos.forEach(function (m) {
      var feitas = m.sessoes.filter(function (s) { return concluida(s.id); }).length;
      var abre = modulosAbertos[m.id] !== undefined ? modulosAbertos[m.id] : (sidAtual && porId[sidAtual].modulo.id === m.id);
      var det = h("details", { class: "menu-modulo" },
        h("summary", {},
          h("span", { class: "mod-num", "aria-hidden": "true", text: String(m.numero) }),
          h("span", { class: "mod-titulo", text: m.titulo }),
          h("span", { class: "mod-contagem", text: feitas + "/" + m.sessoes.length, "aria-label": feitas + " de " + m.sessoes.length + " sessões concluídas" })
        ),
        h("ul", { class: "menu-lista" }, m.sessoes.map(function (s) {
          var feito = concluida(s.id);
          return h("li", {},
            h("a", { href: "#/sessao/" + s.id, class: "menu-link" + (sidAtual === s.id ? " ativo" : ""), "aria-current": sidAtual === s.id ? "page" : null },
              h("span", { class: "estado", "aria-hidden": "true", text: feito ? "✔" : "○" }),
              h("span", { class: "txt" }, h("span", { class: "sid", text: s.id }), " ", s.titulo),
              h("span", { class: "sr-only", text: feito ? " (concluída)" : " (por concluir)" })
            )
          );
        }))
      );
      if (abre) det.setAttribute("open", "");
      det.addEventListener("toggle", function () { modulosAbertos[m.id] = det.open; });
      nav.appendChild(det);
    });

    nav.appendChild(h("ul", { class: "menu-lista menu-geral" },
      itemMenu("#/crachas", "🏆 Crachás (" + Object.keys(estado.crachas).length + "/" + C.crachas.length + ")", rotaAtual.tipo === "crachas"),
      itemMenu("#/compromisso", "🎯 Compromisso final", rotaAtual.tipo === "compromisso"),
      itemMenu("#/referencias", "📚 Referências", rotaAtual.tipo === "referencias"),
      itemMenu("#/sobre", "ℹ️ Sobre e licença", rotaAtual.tipo === "sobre")
    ));

    nav.appendChild(h("div", { class: "menu-opcoes", role: "group", "aria-label": "Opções de leitura" },
      h("p", { class: "pc", text: "Opções de leitura" }),
      h("button", { type: "button", class: "btn-sec", onclick: function () { mudarFonte(-1); }, "aria-label": "Diminuir o tamanho do texto" }, "A−"),
      h("button", { type: "button", class: "btn-sec", onclick: function () { mudarFonte(1); }, "aria-label": "Aumentar o tamanho do texto" }, "A+"),
      h("button", { type: "button", class: "btn-sec", "data-contraste": "", "aria-pressed": estado.prefs.contraste ? "true" : "false", onclick: alternarContraste }, "Alto contraste")
    ));

    nav.appendChild(h("div", { class: "menu-rodape" },
      h("p", { class: "pc", text: "Pontos de competência: " + pontosTotais() + " / " + TOTAL * 25 }),
      h("button", { type: "button", class: "btn-sec", onclick: apagarProgresso }, "Apagar o meu progresso")
    ));
  }

  function itemMenu(href, texto, ativo) {
    return h("li", {}, h("a", { href: href, class: "menu-link" + (ativo ? " ativo" : ""), "aria-current": ativo ? "page" : null }, h("span", { class: "txt", text: texto })));
  }

  function apagarProgresso() {
    if (!window.confirm("Tem a certeza de que pretende apagar todo o progresso guardado neste browser?")) return;
    try { window.localStorage.removeItem(KEY); } catch (e) { /* ignorar */ }
    var prefs = estado.prefs;
    estado = estadoInicial();
    estado.prefs = prefs;
    guardar();
    atualizarProgresso();
    window.location.hash = "#/inicio";
    render();
    anunciar("Progresso apagado.");
  }

  /* ---------- Atividades: bloco comum ---------- */
  function painelResultado(texto, nivel) {
    return h("div", { class: "resultado " + (nivel || ""), role: "status", tabindex: "-1" }, texto);
  }

  /* ---- Classificar ---- */
  function atividadeClassificar(s, a) {
    var raiz = h("div", { class: "ativ ativ-classificar" });
    var reg = ss(s.id);

    function desenhar(reiniciar) {
      raiz.textContent = "";
      if (reiniciar || !reg.ativEstado || !Array.isArray(reg.ativEstado.respostas) || reg.ativEstado.respostas.length !== a.itens.length) {
        reg.ativEstado = { respostas: a.itens.map(function () { return null; }), verificado: false };
        if (reiniciar) guardar();
      }
      var ae = reg.ativEstado;
      var form = h("form", { novalidate: "novalidate" });
      var fichas = a.itens.map(function (it, i) {
        var nome = novoId("cls");
        var fs = h("fieldset", { class: "ficha" },
          h("legend", { text: (i + 1) + ". " + it.texto }),
          h("div", { class: "opcoes-radio" }, a.categorias.map(function (c) {
            var rid = nome + "-" + c.id;
            var inp = h("input", { type: "radio", name: nome, id: rid, value: c.id });
            if (ae.respostas[i] === c.id) inp.checked = true;
            inp.addEventListener("change", function () {
              ae.respostas[i] = c.id;
              guardar();
            });
            return h("div", { class: "radio" }, inp, h("label", { for: rid, text: c.rotulo }));
          })),
          h("div", { class: "fb", "aria-live": "polite" })
        );
        return { it: it, el: fs, nome: nome };
      });
      fichas.forEach(function (f) { form.appendChild(f.el); });
      var msg = h("p", { class: "aviso-form", role: "alert" });
      var btn = h("button", { type: "submit", class: "btn" }, "Verificar respostas");
      form.appendChild(msg);
      form.appendChild(btn);

      function mostrarVerificacao(salvar) {
        msg.textContent = "";
        var certas = 0;
        fichas.forEach(function (f, i) {
          var ok = ae.respostas[i] === f.it.cat;
          if (ok) certas += 1;
          f.el.classList.add(ok ? "certo" : "errado");
          var cat = a.categorias.filter(function (c) { return c.id === f.it.cat; })[0];
          var fb = f.el.querySelector(".fb");
          fb.textContent = "";
          fb.appendChild(h("p", {}, h("strong", { text: ok ? "✔ Correto. " : "✖ Incorreto — resposta certa: " + cat.rotulo + ". " }), f.it.porque));
          Array.prototype.forEach.call(f.el.querySelectorAll("input"), function (inp) { inp.disabled = true; });
        });
        var pontos = Math.round((10 * certas) / a.itens.length);
        btn.remove();
        form.appendChild(painelResultado("Acertou " + certas + " de " + a.itens.length + " · " + pontos + "/10 pontos de competência.", certas === a.itens.length ? "bom" : "medio"));
        form.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () { desenhar(true); } }, "Tentar novamente"));
        if (salvar) {
          ae.verificado = true;
          registarAtividade(s.id, pontos, {});
          anunciar("Atividade verificada. Acertou " + certas + " de " + a.itens.length + ".");
        }
      }

      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var respostas = fichas.map(function (f) {
          var sel = form.querySelector('input[name="' + f.nome + '"]:checked');
          return sel ? sel.value : null;
        });
        if (respostas.indexOf(null) !== -1) {
          msg.textContent = "Responda a todas as afirmações antes de verificar.";
          return;
        }
        ae.respostas = respostas;
        mostrarVerificacao(true);
      });

      raiz.appendChild(form);
      if (ae.verificado && ae.respostas.indexOf(null) === -1) {
        mostrarVerificacao(false);
      }
    }
    desenhar(false);
    return raiz;
  }

  /* ---- Auditoria de respostas de IA ---- */
  function atividadeAuditoria(s, a) {
    var raiz = h("div", { class: "ativ ativ-auditoria" });
    var reg = ss(s.id);

    function desenhar(reiniciar) {
      raiz.textContent = "";
      if (reiniciar || !reg.ativEstado || !Array.isArray(reg.ativEstado.marcados) || reg.ativEstado.marcados.length !== a.segmentos.length) {
        reg.ativEstado = { marcados: a.segmentos.map(function () { return false; }), verificado: false };
        if (reiniciar) guardar();
      }
      var ae = reg.ativEstado;
      var marcados = ae.marcados;
      var erros = a.segmentos.filter(function (x) { return x.erro; }).length;

      raiz.appendChild(h("div", { class: "pedido" }, h("strong", { text: a.rotulo || "Prompt para o modelo: " }), a.pedido));
      if (a.referencia) {
        a.referencia.forEach(function (r) {
          raiz.appendChild(h("div", { class: "referencia" }, h("strong", { text: r.titulo }), h("ul", {}, r.linhas.map(function (l) { return h("li", { text: l }); }))));
        });
      }
      if (a.tituloSegmentos) raiz.appendChild(h("p", { class: "titulo-segmentos" }, h("strong", { text: a.tituloSegmentos })));
      var lista = h("ol", { class: "segmentos", "aria-label": a.tituloSegmentos || "Resposta fictícia do modelo, dividida em trechos" });
      var botoes = a.segmentos.map(function (seg, i) {
        var b = h("button", { type: "button", class: "seg", "aria-pressed": marcados[i] ? "true" : "false" },
          h("span", { class: "seg-marca", "aria-hidden": "true", text: "⚑" }),
          h("span", { class: "seg-texto", text: seg.t })
        );
        b.addEventListener("click", function () {
          marcados[i] = !marcados[i];
          b.setAttribute("aria-pressed", marcados[i] ? "true" : "false");
          contador.textContent = "Trechos assinalados: " + marcados.filter(Boolean).length;
          guardar();
        });
        lista.appendChild(h("li", {}, b, h("div", { class: "seg-fb", "aria-live": "polite" })));
        return b;
      });
      raiz.appendChild(lista);

      var contador = h("p", { class: "contador", text: "Trechos assinalados: " + marcados.filter(Boolean).length });
      var btn = h("button", { type: "button", class: "btn" }, "Verificar auditoria");
      raiz.appendChild(contador);
      raiz.appendChild(btn);

      function mostrarVerificacao(salvar) {
        var acertos = 0, falsos = 0;
        var itens = lista.children;
        a.segmentos.forEach(function (seg, i) {
          var li = itens[i];
          var fb = li.querySelector(".seg-fb");
          botoes[i].disabled = true;
          var estadoRes = "";
          var texto = "";
          if (seg.erro && marcados[i]) { acertos += 1; estadoRes = "certo"; texto = "✔ Detetado — " + seg.erro.tipo + ". " + seg.erro.exp; }
          else if (seg.erro && !marcados[i]) { estadoRes = "errado"; texto = "✖ Não detetado — " + seg.erro.tipo + ". " + seg.erro.exp; }
          else if (!seg.erro && marcados[i]) { falsos += 1; estadoRes = "falso"; texto = "⚠ Falso alarme — este trecho é aceitável."; }
          if (estadoRes) { li.classList.add(estadoRes); fb.appendChild(h("p", { text: texto })); }
        });
        var pontos = Math.max(0, Math.round((10 * (acertos - 0.5 * falsos)) / erros));
        var lince = acertos / erros >= 0.8 && falsos <= 1;
        btn.remove();
        contador.remove();
        var painel = painelResultado("Detetou " + acertos + " de " + erros + " problemas, com " + falsos + " falso(s) alarme(s) · " + pontos + "/10 pontos de competência." + (lince ? " 🕵️ Desempenho de «Olho de Lince»." : ""), acertos === erros && falsos === 0 ? "bom" : "medio");
        raiz.appendChild(painel);
        raiz.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () { desenhar(true); } }, "Tentar novamente"));
        if (salvar) {
          ae.verificado = true;
          registarAtividade(s.id, pontos, { deteccao: acertos / erros, falsos: falsos, lince: lince });
          anunciar("Auditoria verificada. Detetou " + acertos + " de " + erros + " problemas.");
        }
      }

      btn.addEventListener("click", function () { mostrarVerificacao(true); });
      if (ae.verificado) mostrarVerificacao(false);
    }
    desenhar(false);
    return raiz;
  }

  /* ---- Caso ramificado ---- */
  function atividadeCaso(s, a) {
    var raiz = h("div", { class: "ativ ativ-caso" });
    var reg = ss(s.id);

    function desenhar(reiniciar) {
      raiz.textContent = "";
      var pontos = 0, decisoes = 0;
      raiz.appendChild(h("div", { class: "contexto" }, h("strong", { text: "Contexto: " }), a.contexto));
      var palco = h("div", { class: "palco" });
      raiz.appendChild(palco);

      if (!reiniciar && reg.ativ && reg.ativ.feito && reg.ativEstado && reg.ativEstado.concluido) {
        mostrarResumoFinal(reg.ativEstado.pontos10);
        return;
      }

      function mostrarNo(id) {
        palco.textContent = "";
        var no = a.nos[id];
        var pergunta = h("p", { class: "pergunta", tabindex: "-1", text: no.texto });
        var grupo = h("div", { class: "decisoes", role: "group", "aria-label": "Decisões possíveis" });
        var retorno = h("div", { class: "consequencia", "aria-live": "polite" });
        embaralhar(no.opcoes.length).forEach(function (oi) {
          var op = no.opcoes[oi];
          grupo.appendChild(h("button", { type: "button", class: "decisao", onclick: function () { escolher(op); } }, op.texto));
        });
        palco.appendChild(h("p", { class: "passo", text: "Decisão " + (decisoes + 1) + " de " + Object.keys(a.nos).length }));
        palco.appendChild(pergunta);
        palco.appendChild(grupo);
        palco.appendChild(retorno);
        pergunta.focus({ preventScroll: true });

        function escolher(op) {
          Array.prototype.forEach.call(grupo.children, function (b) { b.disabled = true; });
          decisoes += 1;
          pontos += op.pontos;
          var rot = op.tipo === "bom" ? "✔ Boa decisão" : op.tipo === "medio" ? "⚠ Decisão parcial" : "✖ Decisão a evitar";
          retorno.className = "consequencia " + op.tipo;
          retorno.appendChild(h("p", {}, h("strong", { text: rot + ". " }), op.feedback));

          if (op.vai === "fim") {
            var pontos10 = Math.round((10 * pontos) / (3 * decisoes));
            reg.ativEstado = { concluido: true, pontos10: pontos10 };
            registarAtividade(s.id, pontos10, {});
          }

          var prox = h("button", { type: "button", class: "btn" }, op.vai === "fim" ? "Ver resumo final" : "Continuar");
          prox.addEventListener("click", function () { if (op.vai === "fim") terminar(); else mostrarNo(op.vai); });
          retorno.appendChild(prox);
          prox.focus();
        }
      }

      function mostrarResumoFinal(pontos10) {
        palco.textContent = "";
        var fim = a.fins.filter(function (f) { return pontos10 >= f.min; })[0];
        var nivel = pontos10 >= 8 ? "bom" : pontos10 >= 4 ? "medio" : "mau";
        palco.appendChild(painelResultado(pontos10 + "/10 pontos de competência. " + fim.texto, nivel));
        palco.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () { desenhar(true); } }, "Recomeçar o caso"));
      }

      function terminar() {
        var pontos10 = Math.round((10 * pontos) / (3 * decisoes));
        mostrarResumoFinal(pontos10);
        anunciar("Caso concluído. Pontuação " + pontos10 + " em 10.");
      }

      mostrarNo(a.inicio);
    }
    desenhar(false);
    return raiz;
  }

  /* ---- Podcast interrompido (escrita criativa) ---- */
  function atividadePodcast(s, a) {
    var raiz = h("div", { class: "ativ ativ-podcast" });
    var P = estado.podcast;
    var min = a.minimoCaracteres;

    var video = h("video", { controls: true, preload: "metadata", playsinline: true, poster: a.poster, "aria-label": "Podcast de Prometeu e da Serpente Alada, duração 2 minutos e 43 segundos" },
      h("source", { src: a.video, type: "video/mp4" }),
      "O seu browser não suporta vídeo. Consulte a transcrição abaixo."
    );
    raiz.appendChild(h("div", { class: "podcast-video" }, video));

    raiz.appendChild(h("details", { class: "transcricao" },
      h("summary", { text: "Transcrição do podcast (texto alternativo)" }),
      h("p", { class: "dica", text: a.notaTranscricao }),
      a.transcricao.map(function (l) {
        return h("p", { class: "fala-transc" }, h("span", { class: "t", text: "[" + l.t + "] " }), h("strong", { text: l.quem + ": " }), l.texto);
      })
    ));

    raiz.appendChild(h("div", { class: "corte", role: "note" },
      h("strong", { text: "📡 Sinal interrompido." }),
      " O estúdio perdeu a emissão logo após a pergunta «E os restantes?». Os ouvintes aguardam. ",
      h("strong", { text: "Ajude a completar o diálogo." })
    ));

    raiz.appendChild(h("p", { class: "ligacao-artigo" },
      "📄 Artigo em análise: ", h("em", { text: C.artigo.titulo }), " (" + C.artigo.autores + ", " + C.artigo.data + "). ",
      h("a", { href: C.artigo.url, target: "_blank", rel: "noopener" }, "Abrir através do DOI (nova janela)")
    ));

    var ranhuras = a.ranhuras.map(function (r, i) {
      var cls = r.quem === "Prometeu" ? "prometeu" : "serpente";
      var id = novoId("fala");
      var ta = h("textarea", { id: id, rows: "5", maxlength: "1200", "aria-describedby": id + "-d" });
      ta.value = P.slots[i] || "";
      var cont = h("span", { class: "contador-car", id: id + "-d" });
      function atualizar() {
        var n = ta.value.trim().length;
        cont.textContent = n + " / " + min + " caracteres (mínimo)" + (n >= min ? " ✔" : "");
        fs.classList.toggle("completa", n >= min);
      }
      var fs = h("fieldset", { class: "fala fala-" + cls },
        h("legend", { text: "Fala " + (i + 1) + " — " + r.quem }),
        h("p", { class: "dica-fala", text: r.dica }),
        h("label", { for: id, class: "sr-only", text: "Escreva a fala " + (i + 1) + " de " + r.quem }),
        ta,
        cont
      );
      ta.addEventListener("input", function () { P.slots[i] = ta.value; guardar(); atualizar(); });
      atualizar();
      return { fs: fs, ta: ta };
    });
    ranhuras.forEach(function (r) { raiz.appendChild(r.fs); });

    var posic = h("fieldset", { class: "posicao" }, h("legend", { text: "A minha posição (opcional)" }),
      h("div", { class: "opcoes-radio" }, a.posicoes.map(function (o) {
        var rid = novoId("pos");
        var inp = h("input", { type: "radio", name: "posicao", id: rid, value: o.id });
        if (P.posicao === o.id) inp.checked = true;
        inp.addEventListener("change", function () { P.posicao = o.id; guardar(); });
        return h("div", { class: "radio" }, inp, h("label", { for: rid, text: o.rotulo }));
      }))
    );
    raiz.appendChild(posic);

    var crit = h("fieldset", { class: "criterios" }, h("legend", { text: "Autoavaliação: o meu diálogo…" }),
      a.criterios.map(function (c, i) {
        var cid = novoId("crit");
        var cb = h("input", { type: "checkbox", id: cid });
        cb.checked = !!P.criterios[i];
        cb.addEventListener("change", function () { P.criterios[i] = cb.checked; guardar(); });
        return h("div", { class: "check" }, cb, h("label", { for: cid, text: c }));
      })
    );
    raiz.appendChild(crit);

    var msg = h("p", { class: "aviso-form", role: "alert" });
    var saida = h("div", { class: "saida-podcast", "aria-live": "polite" });
    var btn = h("button", { type: "button", class: "btn" }, "Concluir o diálogo");
    raiz.appendChild(msg);
    raiz.appendChild(btn);
    raiz.appendChild(saida);

    function linhasFinais() {
      var ctx = a.transcricao.slice(-1).map(function (l) { return { quem: l.quem, texto: l.texto, contexto: true }; });
      return ctx.concat(a.ranhuras.map(function (r, i) { return { quem: r.quem, texto: P.slots[i].trim() }; }));
    }

    function textoFinal() {
      return ["PODCAST COMPLETADO — Prometeu e a Serpente Alada", "Artigo: " + C.artigo.titulo + " (" + C.artigo.autores + ", " + C.artigo.data + ")", ""]
        .concat(linhasFinais().map(function (l) { return l.quem.toUpperCase() + ": " + l.texto; })).join("\n");
    }

    function mostrarSaida(pontos) {
      saida.textContent = "";
      if (pontos !== null) saida.appendChild(painelResultado("Diálogo concluído · " + pontos + "/10 pontos de competência (6 por completar as quatro falas + até 4 pela autoavaliação).", "bom"));
      saida.appendChild(h("h3", { class: "sub-saida", text: "O meu podcast completo" }));
      var dialogo = h("div", { class: "dialogo" });
      linhasFinais().forEach(function (l) {
        dialogo.appendChild(h("p", { class: "linha-dialogo " + (l.quem === "Prometeu" ? "prometeu" : "serpente") + (l.contexto ? " contexto" : "") },
          h("strong", { text: l.quem + (l.contexto ? " (última fala emitida)" : "") + ": " }), l.texto));
      });
      saida.appendChild(dialogo);
      var acoes = h("div", { class: "acoes" });
      var aviso = h("p", { class: "aviso-form", role: "status" });
      acoes.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textoFinal()).then(function () { aviso.textContent = "Texto copiado."; }, function () { aviso.textContent = "Não foi possível copiar; use «Descarregar»."; });
        } else { aviso.textContent = "Cópia indisponível; use «Descarregar»."; }
      } }, "Copiar texto"));
      acoes.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () {
        var blob = new Blob([textoFinal()], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var link = h("a", { href: url, download: "meu-podcast-prometeu-serpente.txt" });
        document.body.appendChild(link); link.click(); link.remove();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        aviso.textContent = "Ficheiro descarregado.";
      } }, "Descarregar (.txt)"));
      if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
        acoes.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () { falar(linhasFinais().filter(function (l) { return !l.contexto; })); } }, "🔊 Ouvir o meu diálogo"));
        acoes.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () { window.speechSynthesis.cancel(); } }, "⏹ Parar"));
      }
      saida.appendChild(acoes);
      saida.appendChild(aviso);
      var ex = h("details", { class: "exemplo" }, h("summary", { text: "Ver uma possível continuação (exemplo, não é a única)" }),
        a.exemplo.map(function (l) {
          return h("p", { class: "linha-dialogo " + (l.quem === "Prometeu" ? "prometeu" : "serpente") }, h("strong", { text: l.quem + ": " }), l.texto);
        }),
        h("p", { class: "dica", text: "Compare com a sua versão: que argumentos do artigo usou que o exemplo não usa? Onde discorda?" })
      );
      saida.appendChild(ex);
    }

    function falar(linhas) {
      var sint = window.speechSynthesis;
      sint.cancel();
      var vozes = sint.getVoices().filter(function (v) { return /^pt/i.test(v.lang); });
      var voz = vozes.filter(function (v) { return /pt[-_]PT/i.test(v.lang); })[0] || vozes[0];
      linhas.forEach(function (l) {
        var u = new window.SpeechSynthesisUtterance(l.texto);
        u.lang = "pt-PT";
        if (voz) u.voice = voz;
        u.pitch = l.quem === "Prometeu" ? 0.6 : 1.4;
        sint.speak(u);
      });
    }

    btn.addEventListener("click", function () {
      var curtas = [];
      P.slots.forEach(function (t, i) { if (t.trim().length < min) curtas.push(i + 1); });
      if (curtas.length) {
        msg.textContent = "Escreva pelo menos " + min + " caracteres nas falas: " + curtas.join(", ") + ".";
        var idx = curtas[0] - 1;
        ranhuras[idx].ta.focus();
        return;
      }
      msg.textContent = "";
      var marcados = P.criterios.filter(Boolean).length;
      var pontos = Math.round(6 + (4 * marcados) / a.criterios.length);
      btn.textContent = "Atualizar e concluir";
      mostrarSaida(pontos);
      registarAtividade(s.id, pontos, {});
      anunciar("Diálogo concluído.");
    });

    var e = estado.sessoes[s.id];
    if (e && e.ativ && e.ativ.feito && P.slots.every(function (t) { return t.trim().length >= min; })) {
      btn.textContent = "Atualizar e concluir";
      mostrarSaida(null);
    }
    return raiz;
  }

  /* ---- Ordenar ---- */
  function atividadeOrdenar(s, a) {
    var raiz = h("div", { class: "ativ ativ-ordenar" });
    var reg = ss(s.id);
    var ordem, verificado;

    function desenhar(focoIdx, focoTipo) {
      raiz.textContent = "";
      var lista = h("ol", { class: "ordem" });
      ordem.forEach(function (idx, pos) {
        var li = h("li", { class: "passo-ordem" });
        li.appendChild(h("span", { class: "passo-txt", text: a.itens[idx] }));
        if (!verificado) {
          var sobe = h("button", { type: "button", class: "mov", "aria-label": "Subir o passo " + (pos + 1) + ": " + a.itens[idx], disabled: pos === 0 ? true : null }, "▲ Subir");
          var desce = h("button", { type: "button", class: "mov", "aria-label": "Descer o passo " + (pos + 1) + ": " + a.itens[idx], disabled: pos === ordem.length - 1 ? true : null }, "▼ Descer");
          sobe.addEventListener("click", function () { mover(pos, -1, "sobe"); });
          desce.addEventListener("click", function () { mover(pos, 1, "desce"); });
          li.appendChild(h("span", { class: "movs" }, sobe, desce));
          li._sobe = sobe; li._desce = desce;
        } else {
          var ok = idx === pos;
          li.classList.add(ok ? "certo" : "errado");
          li.appendChild(h("span", { class: "passo-fb", text: ok ? "✔ Posição correta" : "✖ Devia estar na posição " + (idx + 1) }));
        }
        lista.appendChild(li);
      });
      raiz.appendChild(lista);
      if (!verificado) {
        raiz.appendChild(h("button", { type: "button", class: "btn", onclick: function () { verificar(true); } }, "Verificar ordem"));
        if (focoIdx !== undefined) {
          var alvo = lista.children[focoIdx];
          var b = focoTipo === "sobe" ? alvo._sobe : alvo._desce;
          if (b && !b.disabled) b.focus(); else (alvo._sobe && !alvo._sobe.disabled ? alvo._sobe : alvo._desce).focus();
        }
      } else {
        var certas = ordem.filter(function (idx, pos) { return idx === pos; }).length;
        var pontos = Math.round((10 * certas) / ordem.length);
        raiz.appendChild(painelResultado(certas + " de " + ordem.length + " passos na posição correta · " + pontos + "/10 pontos de competência. " + a.explicacao, certas === ordem.length ? "bom" : "medio"));
        raiz.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () { reiniciar(true); } }, "Tentar novamente"));
      }
    }

    function mover(pos, d, tipo) {
      var novo = pos + d;
      var t = ordem[pos]; ordem[pos] = ordem[novo]; ordem[novo] = t;
      reg.ativEstado = { ordem: ordem.slice(), verificado: false };
      guardar();
      desenhar(novo, tipo);
      anunciar("Passo movido para a posição " + (novo + 1));
    }

    function verificar(salvar) {
      verificado = true;
      var certas = ordem.filter(function (idx, pos) { return idx === pos; }).length;
      var pontos = Math.round((10 * certas) / ordem.length);
      reg.ativEstado = { ordem: ordem.slice(), verificado: true };
      desenhar();
      if (salvar) {
        registarAtividade(s.id, pontos, {});
        anunciar("Ordem verificada. " + certas + " de " + ordem.length + " corretos.");
      }
    }

    function reiniciar(limpar) {
      if (!limpar && reg.ativEstado && Array.isArray(reg.ativEstado.ordem) && reg.ativEstado.ordem.length === a.itens.length) {
        ordem = reg.ativEstado.ordem.slice();
        verificado = !!reg.ativEstado.verificado;
      } else {
        ordem = a.ordemInicial.slice();
        verificado = false;
        reg.ativEstado = { ordem: ordem.slice(), verificado: false };
        if (limpar) guardar();
      }
      desenhar();
    }

    reiniciar(false);
    return raiz;
  }

  function atividade(s) {
    var a = s.atividade;
    var corpo;
    if (a.tipo === "classificar") corpo = atividadeClassificar(s, a);
    else if (a.tipo === "auditoria") corpo = atividadeAuditoria(s, a);
    else if (a.tipo === "caso") corpo = atividadeCaso(s, a);
    else if (a.tipo === "podcast") corpo = atividadePodcast(s, a);
    else corpo = atividadeOrdenar(s, a);
    var tipoRot = { classificar: "Classificação", auditoria: "Auditoria de resposta de IA", caso: "Caso interativo ramificado", ordenar: "Ordenação", podcast: "Podcast interrompido: escrita criativa" }[a.tipo];
    return h("section", { class: "bloco", "aria-labelledby": "h-ativ" },
      h("h2", { id: "h-ativ" }, "2. Atividade interativa"),
      h("p", { class: "tipo-ativ" }, h("span", { class: "etiqueta", text: tipoRot }), " ", h("strong", { text: a.titulo })),
      a.instrucoes ? h("p", { class: "instrucoes", text: a.instrucoes }) : null,
      corpo
    );
  }

  /* ---- Quiz (com persistência das opções assinaladas no localStorage) ---- */
  function quiz(s) {
    var raiz = h("div", { class: "quiz" });
    var reg = ss(s.id);

    function desenhar(reiniciar) {
      raiz.textContent = "";
      if (reiniciar || !reg.quizEstado || !Array.isArray(reg.quizEstado.escolhas) || reg.quizEstado.escolhas.length !== s.quiz.length) {
        reg.quizEstado = {
          ordens: s.quiz.map(function (q) { return embaralhar(q.o.length); }),
          escolhas: s.quiz.map(function () { return null; }),
          registado: false
        };
        if (reiniciar) guardar();
      }
      var qe = reg.quizEstado;
      var respondidas = 0, certas = 0;
      var total = s.quiz.length;
      var resumo = h("div", { class: "quiz-resumo" });

      s.quiz.forEach(function (q, qi) {
        var ordem = qe.ordens[qi] || embaralhar(q.o.length);
        var gid = novoId("q");
        var fb = h("div", { class: "fb", "aria-live": "polite" });
        var fs = h("fieldset", { class: "pergunta-quiz" }, h("legend", { text: (qi + 1) + ". " + q.p }));
        var grupo = h("div", { class: "opcoes-quiz" });

        function aplicarEscolha(oiEscolhido, salvar) {
          var ok = oiEscolhido === q.c;
          Array.prototype.forEach.call(grupo.children, function (x) {
            x.disabled = true;
            var xi = Number(x.getAttribute("data-oi"));
            if (xi === q.c) { x.classList.add("certa"); x.appendChild(h("span", { class: "sr-only", text: " (resposta certa)" })); }
            else if (xi === oiEscolhido) { x.classList.add("errada"); x.appendChild(h("span", { class: "sr-only", text: " (a sua resposta, incorreta)" })); }
          });
          fb.className = "fb " + (ok ? "bom" : "mau");
          fb.textContent = "";
          fb.appendChild(h("p", {}, h("strong", { text: ok ? "✔ Correto. " : "✖ Incorreto. " }), q.e));
          respondidas += 1;
          if (ok) certas += 1;
          if (salvar) {
            qe.escolhas[qi] = oiEscolhido;
            guardar();
          }
          if (respondidas === total) concluir(salvar);
        }

        ordem.forEach(function (oi) {
          var b = h("button", { type: "button", class: "opcao", "data-oi": String(oi) }, q.o[oi]);
          b.addEventListener("click", function () {
            aplicarEscolha(oi, true);
          });
          grupo.appendChild(b);
        });
        fs.appendChild(grupo);
        fs.appendChild(fb);
        fs.setAttribute("id", gid);
        raiz.appendChild(fs);

        if (qe.escolhas[qi] !== null && qe.escolhas[qi] !== undefined) {
          aplicarEscolha(qe.escolhas[qi], false);
        }
      });
      raiz.appendChild(resumo);

      function concluir(salvar) {
        var aprovado = certas >= C.limiteQuiz;
        resumo.textContent = "";
        resumo.appendChild(painelResultado("Pontuação: " + certas + "/" + total + ". " + (aprovado ? "Quiz concluído com sucesso." : "Precisa de pelo menos " + C.limiteQuiz + "/" + total + " para concluir a sessão. Reveja os cartões e tente novamente."), aprovado ? "bom" : "mau"));
        resumo.appendChild(h("button", { type: "button", class: "btn-sec", onclick: function () { desenhar(true); } }, "Repetir o quiz"));
        if (salvar && !qe.registado) {
          qe.registado = true;
          registarQuiz(s.id, certas);
          anunciar("Quiz terminado. Pontuação " + certas + " em " + total + ".");
        }
      }
    }
    desenhar(false);
    return h("section", { class: "bloco", "aria-labelledby": "h-quiz" },
      h("h2", { id: "h-quiz" }, "3. Quiz de autoavaliação"),
      h("p", { class: "instrucoes", text: "Escolha uma opção em cada pergunta: o feedback é imediato. Precisa de " + C.limiteQuiz + "/" + s.quiz.length + " para concluir a sessão." }),
      raiz
    );
  }

  /* ---------- Vistas ---------- */
  function rota() {
    var hash = window.location.hash || "#/inicio";
    var p = hash.replace(/^#\/?/, "").split("/");
    if (p[0] === "sessao" && porId[p[1]]) return { tipo: "sessao", id: p[1] };
    if (p[0] === "crachas") return { tipo: "crachas" };
    if (p[0] === "compromisso") return { tipo: "compromisso" };
    if (p[0] === "referencias") return { tipo: "referencias" };
    if (p[0] === "sobre") return { tipo: "sobre" };
    return { tipo: "inicio" };
  }

  function acordeao(cartoes) {
    var cont = h("div", { class: "acordeao" });
    cartoes.forEach(function (c, i) {
      var id = novoId("cartao");
      var painel = h("div", { class: "painel", id: id, role: "region", "aria-labelledby": id + "-b", html: c.html });
      var btn = h("button", { type: "button", class: "acordeao-btn", id: id + "-b", "aria-expanded": i === 0 ? "true" : "false", "aria-controls": id },
        h("span", { class: "acordeao-titulo", text: c.titulo }),
        h("span", { class: "acordeao-icone", "aria-hidden": "true" })
      );
      if (i !== 0) painel.hidden = true;
      btn.addEventListener("click", function () {
        var aberto = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", aberto ? "false" : "true");
        painel.hidden = aberto;
      });
      cont.appendChild(h("div", { class: "cartao" }, h("h3", {}, btn), painel));
    });
    return cont;
  }

  function estadoSessaoPainel(s) {
    var e = estado.sessoes[s.id] || {};
    var fez = !!(e.ativ && e.ativ.feito);
    var qOk = !!(e.quiz && e.quiz.melhor >= C.limiteQuiz);
    return h("div", { class: "estado-sessao " + (fez && qOk ? "feito" : ""), id: "estado-sessao", "aria-live": "polite" },
      h("strong", { text: fez && qOk ? "🎉 Sessão concluída" : "Estado da sessão" }),
      h("ul", {},
        h("li", { text: (fez ? "✔" : "○") + " Atividade interativa" + (fez ? " (" + e.ativ.pontos + "/10)" : "") }),
        h("li", { text: (qOk ? "✔" : "○") + " Quiz com pelo menos " + C.limiteQuiz + "/" + s.quiz.length + (e.quiz ? " (melhor: " + e.quiz.melhor + "/" + s.quiz.length + ")" : "") })
      )
    );
  }

  function atualizarEstadoSessao() {
    var r = rota();
    var atual = $("#estado-sessao");
    if (r.tipo !== "sessao" || !atual) return;
    atual.replaceWith(estadoSessaoPainel(porId[r.id]));
  }

  function vistaSessao(id) {
    var s = porId[id];
    var idx = sessoes.indexOf(s);
    var ant = sessoes[idx - 1], seg = sessoes[idx + 1];
    var art = h("article", { class: "sessao" });
    art.appendChild(h("p", { class: "migalhas" }, h("a", { href: "#/inicio", text: "Início" }), " › Módulo " + s.modulo.numero + " · " + s.modulo.titulo));
    art.appendChild(h("h1", { tabindex: "-1", id: "titulo-vista" }, h("span", { class: "sid", text: s.id }), " ", s.titulo));
    art.appendChild(h("p", { class: "meta" }, h("span", { class: "etiqueta", text: "⏱ ≈ " + s.minutos + " min" }), " ", h("span", { class: "etiqueta", text: "Micro-sessão autónoma" })));
    art.appendChild(h("p", { class: "objetivo" }, h("strong", { text: "Objetivo: " }), s.objetivo));
    art.appendChild(h("section", { class: "bloco", "aria-labelledby": "h-cont" }, h("h2", { id: "h-cont" }, "1. Conteúdos"), acordeao(s.cartoes)));
    if (s.diagrama) {
      art.appendChild(h("figure", { class: "diagrama" },
        h("img", { src: s.diagrama.src, alt: s.diagrama.alt }),
        h("figcaption", {}, s.diagrama.legenda + " ", h("a", { href: s.diagrama.src, target: "_blank", rel: "noopener" }, "Abrir o diagrama em separado"))
      ));
    }
    art.appendChild(atividade(s));
    art.appendChild(quiz(s));
    art.appendChild(h("section", { class: "bloco reflexao", "aria-labelledby": "h-ref" },
      h("h2", { id: "h-ref" }, "4. Reflexão (Think–Pair–Share)"),
      h("p", { text: s.reflexao }),
      h("p", { class: "dica", text: "Reflita individualmente, partilhe com um colega e leve a discussão para partilha em grupo, na sua equipa ou tutoria." })
    ));
    art.appendChild(h("p", { class: "ancoragem" }, h("strong", { text: "Ancoragem institucional. " }), s.ancoragem));
    art.appendChild(estadoSessaoPainel(s));
    art.appendChild(h("nav", { class: "pag", "aria-label": "Sessões anterior e seguinte" },
      ant ? h("a", { class: "btn-sec", href: "#/sessao/" + ant.id }, "← " + ant.id + " " + ant.titulo) : h("span"),
      seg ? h("a", { class: "btn", href: "#/sessao/" + seg.id }, seg.id + " " + seg.titulo + " →") : h("a", { class: "btn", href: "#/compromisso" }, "Compromisso final →")
    ));
    return art;
  }

  function proximaSessao() {
    var p = sessoes.filter(function (s) { return !concluida(s.id); })[0];
    return p || null;
  }

  function vistaInicio() {
    var n = totalConcluidas();
    var prox = proximaSessao();
    var art = h("article", { class: "inicio" });
    art.appendChild(h("h1", { tabindex: "-1", id: "titulo-vista" }, C.titulo, " ", h("span", { class: "sub", text: C.subtitulo })));
    art.appendChild(h("p", { class: "lead" }, "Curso de ", h("strong", { text: "microlearning" }), " para docentes da Escola de Medicina da Universidade do Minho: " + C.modulos.length + " módulos, " + TOTAL + " micro-sessões de 10 a 15 minutos, que pode fazer pela ordem que preferir, no telemóvel ou no computador."));
    art.appendChild(h("blockquote", { class: "citacao" }, "«A IA já não é uma especialidade — é uma literacia esperada de qualquer profissional.»", h("cite", { text: " — World Economic Forum, Future of Jobs Report 2025" })));

    art.appendChild(h("div", { class: "cartao-destaque" },
      h("h2", { text: n === 0 ? "Comece quando quiser" : n === TOTAL ? "Concluiu o curso! 🏅" : "O seu progresso" }),
      h("p", { text: n + " de " + TOTAL + " micro-sessões concluídas · " + pontosTotais() + " pontos de competência · " + Object.keys(estado.crachas).length + " de " + C.crachas.length + " crachás." }),
      prox ? h("a", { class: "btn", href: "#/sessao/" + prox.id }, (n === 0 ? "Começar: " : "Continuar: ") + prox.id + " " + prox.titulo) : h("a", { class: "btn", href: "#/compromisso" }, "Definir o meu compromisso final"),
      h("p", { class: "nota-local-inline", text: "Nota: O seu progresso é guardado localmente neste browser." })
    ));

    art.appendChild(h("h2", { text: "Como funciona cada micro-sessão" }));
    art.appendChild(h("ol", { class: "como" },
      h("li", {}, h("strong", { text: "Conteúdos " }), "em cartões desdobráveis (≈ 4–5 min)."),
      h("li", {}, h("strong", { text: "Atividade interativa: " }), "caso ramificado, auditoria de respostas de IA, classificação ou ordenação (≈ 4–6 min)."),
      h("li", {}, h("strong", { text: "Quiz " }), "de autoavaliação com feedback imediato (precisa de 2/3)."),
      h("li", {}, h("strong", { text: "Reflexão " }), "Think–Pair–Share para levar para a prática.")
    ));

    art.appendChild(h("h2", { text: "Módulos" }));
    var grelha = h("div", { class: "modulos" });
    C.modulos.forEach(function (m) {
      var feitas = m.sessoes.filter(function (s) { return concluida(s.id); }).length;
      grelha.appendChild(h("section", { class: "cartao-modulo", "aria-labelledby": "mod-" + m.id },
        h("p", { class: "mod-etiqueta", text: "Módulo " + m.numero + " · " + feitas + "/" + m.sessoes.length }),
        h("h3", { id: "mod-" + m.id, text: m.titulo }),
        h("p", { class: "mod-sub", text: m.subtitulo }),
        h("ul", {}, m.sessoes.map(function (s) {
          return h("li", {}, h("a", { href: "#/sessao/" + s.id }, h("span", { "aria-hidden": "true", text: concluida(s.id) ? "✔ " : "○ " }), s.id + " " + s.titulo), " ", h("small", { text: "(≈ " + s.minutos + " min)" }), concluida(s.id) ? h("span", { class: "sr-only", text: " — concluída" }) : null);
        }))
      ));
    });
    art.appendChild(grelha);

    art.appendChild(h("h2", { text: "Princípios institucionais" }));
    art.appendChild(h("p", {}, "O curso assenta no referencial da Universidade do Minho: ", h("strong", { text: "Responsabilidade, Transparência, Inclusão e Equidade e Supervisão Humana" }), ". Nem adoção acrítica, nem proibição generalizada: integração intencional, com espírito formativo e não sancionatório."));
    return art;
  }

  function vistaCrachas() {
    var art = h("article", {});
    art.appendChild(h("h1", { tabindex: "-1", id: "titulo-vista", text: "Crachás e marcos de competência" }));
    art.appendChild(h("p", { text: "Conquiste crachás ao concluir módulos e ao demonstrar competências específicas. Têm " + Object.keys(estado.crachas).length + " de " + C.crachas.length + "." }));
    art.appendChild(h("ul", { class: "crachas" }, C.crachas.map(function (c) {
      var data = estado.crachas[c.id];
      return h("li", { class: "cracha " + (data ? "ganho" : "bloqueado") },
        h("span", { class: "cracha-icone", "aria-hidden": "true", text: data ? c.icone : "🔒" }),
        h("div", {},
          h("h2", { text: c.nome }),
          h("p", { text: c.descricao }),
          h("p", { class: "cracha-estado", text: data ? "✔ Conquistado em " + new Date(data).toLocaleDateString("pt-PT") : "Por conquistar" })
        )
      );
    })));
    return art;
  }

  function textoCompromisso() {
    var c = estado.compromisso;
    var mod = { vermelho: "🔴 Proibida", amarelo: "🟡 Condicionada", verde: "🟢 Livre" }[c.modalidade] || "(por escolher)";
    return [
      "O MEU COMPROMISSO — Literacia em IA e Pensamento Crítico (EMED-UMinho)",
      "",
      "Atividade/UC: " + (c.atividade || "(por preencher)"),
      "Modalidade de utilização de IA: " + mod,
      "",
      "Compromissos de supervisão:",
      "1. " + (c.c1 || "(por preencher)"),
      "2. " + (c.c2 || "(por preencher)"),
      "3. " + (c.c3 || "(por preencher)")
    ].join("\n");
  }

  function vistaCompromisso() {
    var art = h("article", {});
    art.appendChild(h("h1", { tabindex: "-1", id: "titulo-vista", text: "Desafio final: o meu compromisso" }));
    art.appendChild(h("p", { class: "lead", text: "Escolha uma atividade real da sua unidade curricular, defina a modalidade de utilização de IA (semáforo) e registe três compromissos de supervisão. O texto é guardado apenas neste browser." }));
    var form = h("form", { class: "form-compromisso" });
    form.addEventListener("submit", function (e) { e.preventDefault(); });

    function campo(rotulo, id, input) {
      return h("div", { class: "campo" }, h("label", { for: id, text: rotulo }), input);
    }
    function ligar(el, chave) {
      el.value = estado.compromisso[chave] || "";
      el.addEventListener("input", function () { estado.compromisso[chave] = el.value; guardar(); });
      return el;
    }
    form.appendChild(campo("Atividade ou unidade curricular", "cp-ativ", ligar(h("input", { type: "text", id: "cp-ativ", autocomplete: "off" }), "atividade")));
    var sel = h("select", { id: "cp-mod" },
      h("option", { value: "", text: "Escolha…" }),
      h("option", { value: "vermelho", text: "🔴 Proibida — competência autónoma, sem IA" }),
      h("option", { value: "amarelo", text: "🟡 Condicionada — etapas delimitadas, validação e declaração" }),
      h("option", { value: "verde", text: "🟢 Livre — a IA integra a competência" })
    );
    form.appendChild(campo("Modalidade de utilização de IA", "cp-mod", ligar(sel, "modalidade")));
    form.appendChild(campo("Compromisso 1 (ex.: o que vou pedir aos estudantes antes de consultarem a IA)", "cp-1", ligar(h("textarea", { id: "cp-1", rows: "3" }), "c1")));
    form.appendChild(campo("Compromisso 2 (ex.: como vou verificar a transferência sem IA)", "cp-2", ligar(h("textarea", { id: "cp-2", rows: "3" }), "c2")));
    form.appendChild(campo("Compromisso 3 (ex.: como vou declarar o meu próprio uso de IA)", "cp-3", ligar(h("textarea", { id: "cp-3", rows: "3" }), "c3")));
    art.appendChild(form);
    var msg = h("p", { class: "aviso-form", role: "status" });
    art.appendChild(h("div", { class: "acoes" },
      h("button", { type: "button", class: "btn", onclick: function () {
        var t = textoCompromisso();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(t).then(function () { msg.textContent = "Texto copiado para a área de transferência."; }, function () { msg.textContent = "Não foi possível copiar. Use a opção de descarregar."; });
        } else { msg.textContent = "Cópia não disponível neste browser. Use a opção de descarregar."; }
      } }, "Copiar texto"),
      h("button", { type: "button", class: "btn-sec", onclick: function () {
        var blob = new Blob([textoCompromisso()], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = h("a", { href: url, download: "meu-compromisso-ia-emed.txt" });
        document.body.appendChild(a); a.click(); a.remove();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        msg.textContent = "Ficheiro descarregado.";
      } }, "Descarregar (.txt)")
    ));
    art.appendChild(msg);
    return art;
  }

  function vistaSobre() {
    var art = h("article", {});
    art.appendChild(h("h1", { tabindex: "-1", id: "titulo-vista", text: "Sobre o curso, autoria e licença" }));
    art.appendChild(h("section", { class: "bloco" }, h("h2", { text: "Autor" }),
      h("p", {}, h("strong", { text: C.autor }), " — Escola de Medicina, Universidade do Minho."),
      h("p", { text: "Curso desenvolvido para a formação de docentes da EMED-UMinho, com base nas Recomendações da Universidade do Minho para o uso da IA no Ensino, na Aprendizagem e na Avaliação (2026)." })
    ));
    art.appendChild(h("section", { class: "bloco" }, h("h2", { text: "Estado: em fase de validação" }),
      h("p", {}, "Este curso está em fase de validação. Agradece-se feedback (erros, sugestões, dificuldades de utilização, pertinência dos conteúdos) para ",
        h("a", { href: "mailto:" + C.email + "?subject=" + encodeURIComponent("Feedback sobre o curso Literacia em IA (EMED-UMinho)"), text: C.email }), "."),
      h("p", { class: "dica", text: "Se possível, indique a sessão (por exemplo, 2.1), o dispositivo e o browser que utilizou. Não envie dados pessoais de doentes ou de estudantes." })
    ));
    art.appendChild(h("section", { class: "bloco" }, h("h2", { text: "Licença de conteúdo" }),
      h("p", {}, "© " + C.ano + " " + C.autor + ". Este curso é disponibilizado ao abrigo da licença ",
        h("a", { href: C.licenca.url, target: "_blank", rel: "noopener license", text: C.licenca.nome }), "."),
      h("p", { text: "Pode partilhar e adaptar o material, mesmo para fins comerciais, desde que atribua o devido crédito ao autor, indique a licença e assinale se foram feitas alterações." }),
      h("p", { class: "citacao-sugerida" }, h("strong", { text: "Como citar: " }), "Osório NS. Literacia em IA e Pensamento Crítico na Educação Médica: Da Prática Clínica à Pedagogia [curso online em fase de validação]. Escola de Medicina, Universidade do Minho; " + C.ano + ". Licença CC BY 4.0."),
      h("p", { text: "Exclusões: documentos institucionais, o artigo «The Generative AI Learning Penalty» (Strömberg, Lei e Wu), marcas, logótipos e demais obras de terceiros citadas mantêm os direitos dos respetivos titulares." })
    ));
    art.appendChild(h("section", { class: "bloco" }, h("h2", { text: "Declaração de utilização de IA" }),
      h("p", { text: "Utilizou-se inteligência artificial generativa (assistentes baseados em LLM) para o apoio na geração de código, estruturação de conteúdos e suporte à criação do vídeo do Módulo 5 nas fases de conceção e redação. O autor revisou, validou e assume a responsabilidade exclusiva por todo o conteúdo, código e materiais apresentados." })
    ));
    art.appendChild(h("section", { class: "bloco" }, h("h2", { text: "Privacidade" }),
      h("p", { text: "O curso não tem servidor nem recolhe dados. O progresso e os textos que escrever ficam guardados apenas neste browser (localStorage). Pode apagá-los a qualquer momento no menu." })
    ));
    return art;
  }

  var GALERIA = [
    ["fluxograma_decisao_docente", "Fluxograma de decisão do docente perante a IA"],
    ["ciclo_ia_cbl", "Ciclo de integração IA–CBL"],
    ["matriz_riscos_eticos", "Matriz de riscos éticos e pedagógicos"],
    ["taxonomia_bloom_ia", "Taxonomia de Bloom e IA"],
    ["llm_vs_raciocinio_clinico", "LLM vs raciocínio clínico humano"]
  ];

  /* Transforma «doi:10.xxxx/yyyy» numa ligação clicável para https://doi.org/ */
  function ligarDoi(texto) {
    var partes = [];
    var re = /doi:(10\.[^\s]+)/g;
    var ultimo = 0, m;
    while ((m = re.exec(texto)) !== null) {
      var doi = m[1].replace(/[.,;)]+$/, "");
      partes.push(texto.slice(ultimo, m.index));
      partes.push(h("a", { href: "https://doi.org/" + doi, target: "_blank", rel: "noopener" }, "doi:" + doi));
      ultimo = m.index + 4 + doi.length;
    }
    partes.push(texto.slice(ultimo));
    return partes;
  }

  function vistaReferencias() {
    var art = h("article", {});
    art.appendChild(h("h1", { tabindex: "-1", id: "titulo-vista", text: "Referências e recursos" }));
    C.referencias.forEach(function (g) {
      art.appendChild(h("section", { class: "bloco" }, h("h2", { text: g.grupo }), h("ul", { class: "refs" }, g.itens.map(function (i) {
        if (typeof i === "string") return h("li", {}, ligarDoi(i));
        return h("li", {}, ligarDoi(i.t), " Disponível em: ", h("a", { href: i.u, target: "_blank", rel: "noopener", text: i.u }));
      }))));
    });
    art.appendChild(h("section", { class: "bloco" }, h("h2", { text: "Galeria de diagramas" }),
      h("ul", { class: "galeria" }, GALERIA.map(function (g) {
        return h("li", {}, h("a", { href: "assets/diagrams/" + g[0] + ".svg", target: "_blank", rel: "noopener", text: g[1] }));
      }))));
    return art;
  }

  /* ---------- Renderização e roteamento ---------- */
  function render() {
    var r = rota();
    var main = $("#conteudo");
    var vista;
    if (r.tipo === "sessao") vista = vistaSessao(r.id);
    else if (r.tipo === "crachas") vista = vistaCrachas();
    else if (r.tipo === "compromisso") vista = vistaCompromisso();
    else if (r.tipo === "referencias") vista = vistaReferencias();
    else if (r.tipo === "sobre") vista = vistaSobre();
    else vista = vistaInicio();
    
    var vistaStr = r.tipo === "sessao" ? "sessao_" + r.id : r.tipo;
    enviarTelemetriaCentral("vista", vistaStr);

    main.textContent = "";
    main.appendChild(vista);
    construirMenu();
    fecharMenu();
    var titulo = $("#titulo-vista");
    var txt = titulo ? titulo.textContent : "";
    document.title = (txt ? txt + " — " : "") + "Literacia em IA — EMED-UMinho";
    window.scrollTo(0, 0);
    if (titulo) titulo.focus({ preventScroll: true });
  }

  /* ---------- Menu móvel e preferências ---------- */
  function abrirMenu() {
    document.body.classList.add("menu-aberto");
    $("#btn-menu").setAttribute("aria-expanded", "true");
    $("#menu-fundo").hidden = false;
  }
  function fecharMenu() {
    document.body.classList.remove("menu-aberto");
    $("#btn-menu").setAttribute("aria-expanded", "false");
    $("#menu-fundo").hidden = true;
  }

  function aplicarPrefs() {
    var f = estado.prefs.fonte;
    document.documentElement.style.fontSize = (100 + f * 12.5) + "%";
    document.body.classList.toggle("alto-contraste", !!estado.prefs.contraste);
    Array.prototype.forEach.call(document.querySelectorAll("[data-contraste]"), function (b) {
      b.setAttribute("aria-pressed", estado.prefs.contraste ? "true" : "false");
    });
  }

  function mudarFonte(d) {
    estado.prefs.fonte = Math.max(-1, Math.min(3, estado.prefs.fonte + d));
    aplicarPrefs();
    guardar();
  }

  function alternarContraste() {
    estado.prefs.contraste = !estado.prefs.contraste;
    aplicarPrefs();
    guardar();
  }

  function iniciar() {
    $("#btn-menu").addEventListener("click", function () {
      if (document.body.classList.contains("menu-aberto")) fecharMenu(); else abrirMenu();
    });
    $("#menu-fundo").addEventListener("click", fecharMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-aberto")) { fecharMenu(); $("#btn-menu").focus(); }
    });
    $("#btn-fonte-mais").addEventListener("click", function () { mudarFonte(1); });
    $("#btn-fonte-menos").addEventListener("click", function () { mudarFonte(-1); });
    $("#btn-contraste").addEventListener("click", alternarContraste);
    window.addEventListener("hashchange", render);
    aplicarPrefs();
    atualizarNota();
    atualizarProgresso();
    render();
  }

  iniciar();
})();