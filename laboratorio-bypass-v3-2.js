
/* U-39 Concept V3.2 — Laboratório de By-pass
   Exercício didático. NÃO representa a lógica validada do PLC. */
(() => {
  "use strict";

  function iniciar() {
    if (document.getElementById("bypass")) return;

    const app = document.querySelector(".app-shell");
    const nav = document.getElementById("mainNav");
    if (!app || !nav) return;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "nav-link";
    botao.dataset.target = "bypass";
    botao.textContent = "Lógica de By-pass";
    nav.insertBefore(botao, nav.querySelector('[data-target="avaliacao"]'));

    const estilo = document.createElement("style");
    estilo.textContent = `
      #bypass .bp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr));gap:12px}
      #bypass .bp-field{display:flex;flex-direction:column;gap:5px;color:#bad0df;font-size:13px}
      #bypass input,#bypass select{width:100%;min-height:44px;padding:10px;background:#102539;color:#fff;border:1px solid #628091;border-radius:9px;font-size:16px}
      #bypass .bp-buttons{display:flex;flex-wrap:wrap;gap:10px;margin:15px 0}
      #bypass .bp-btn{min-height:44px;padding:10px 16px;border:1px solid #63889a;border-radius:10px;background:#17364c;color:#fff;cursor:pointer}
      #bypass .bp-btn.active{background:#57d6df;color:#08202b}
      #bypass .bp-results{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:12px;margin-top:15px}
      #bypass .bp-result{padding:14px;border:1px solid #446075;border-radius:12px;background:#13293b}
      #bypass .bp-result strong{display:block;margin-bottom:6px}
      #bypass .bp-result p{font-size:13px;color:#c0d1de;margin:7px 0}
      #bypass .bp-ok{color:#74e1b4;font-weight:750}
      #bypass .bp-pending{color:#ffd38c;font-weight:750}
      #bypass .bp-note{padding:12px;border-left:4px solid #ffc981;background:#30291d;color:#ffedce;border-radius:7px;margin:13px 0}
      #bypass .bp-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px}
      #bypass .bp-step{padding:12px 7px;border:1px solid #456078;border-radius:9px;text-align:center;font-size:12px;background:#15283a}
      #bypass .bp-step.done{background:#164735;border-color:#56b38a}
      #bypass .bp-step.current{border:2px solid #63d7e2}
      #bypass .bp-step.future{opacity:.5}
      #bypass .bp-hidden{display:none}
      @media(max-width:550px){#bypass .bp-steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(estilo);

    const secao = document.createElement("section");
    secao.id = "bypass";
    secao.className = "view";
    secao.setAttribute("aria-labelledby", "bp-title");
    secao.innerHTML = `
      <div class="page-kicker">MÓDULO COMPLEMENTAR · V3.2</div>
      <div class="page-intro">
        <h1 id="bp-title">Laboratório de By-pass</h1>
        <p>Teste os critérios de normalização do by-pass de partida
        e a liberação sequencial do by-pass de parada.</p>
      </div>
      <div class="bp-note">
        <strong>Simulação didática não validada.</strong>
        Os resultados não são permissivos reais.
        Os valores e sequências devem ser confrontados com a lógica
        vigente do PLC e com os procedimentos aprovados.
      </div>
      <div class="bp-buttons">
        <button type="button" class="bp-btn active" id="bp-tab1">Rearme de partida</button>
        <button type="button" class="bp-btn" id="bp-tab2">Sequência de parada</button>
      </div>

      <div id="bp-partida">
        <section class="card">
          <h2>Teste 1 — Normalização das funções</h2>
          <p>Insira os valores instantâneos e os tempos de permanência
          nas condições de normalização.</p>
          <div class="bp-grid" id="bp-entradas"></div>
          <div class="bp-buttons">
            <button type="button" class="bp-btn" id="bp-verificar">Verificar normalização</button>
            <button type="button" class="bp-btn" id="bp-limpar">Restaurar valores</button>
          </div>
          <div id="bp-resumo" role="status" aria-live="polite"></div>
          <div class="bp-results" id="bp-resultados"></div>
        </section>
      </div>

      <div id="bp-parada" class="bp-hidden">
        <section class="card">
          <h2>Teste 2 — Ativação sequencial de parada</h2>
          <div class="bp-note" id="bp-fonte-aviso"></div>
          <label class="bp-field">
            Referência documental
            <select id="bp-fonte">
              <option value="operacional">Descritivo operacional — páginas 14–16</option>
              <option value="projeto">Projeto Betão — páginas 17–19</option>
            </select>
          </label>
          <h3>Condições do processo</h3>
          <div class="bp-grid" id="bp-parada-entradas"></div>
          <h3>Progressão das etapas</h3>
          <div class="bp-steps" id="bp-etapas"></div>
          <div class="bp-result" style="margin-top:15px">
            <strong id="bp-etapa-atual"></strong>
            <p id="bp-condicao"></p>
            <label class="bp-field">
              Qual grupo deve ser liberado a seguir?
              <select id="bp-escolha">
                <option value="">Selecione a próxima etapa</option>
                <option value="superior">FSLL39006 — ramal superior</option>
                <option value="reacao">TSL39010 / LSLL39005</option>
                <option value="diferenciais">PDSLL39018 / PDSLL39022 / FSLL39003</option>
                <option value="soprador">J-3901 — etapa final</option>
              </select>
            </label>
            <div class="bp-buttons">
              <button type="button" class="bp-btn" id="bp-avancar">Verificar e liberar etapa</button>
              <button type="button" class="bp-btn" id="bp-reiniciar">Reiniciar</button>
            </div>
            <p id="bp-feedback" role="status" aria-live="polite"></p>
          </div>
          <h3>Funções contornadas no exercício</h3>
          <div id="bp-ativas" class="bp-results"></div>
        </section>
      </div>
      <section class="card">
        <h2>Referências e divergências documentais</h2>
        <p><strong>Partida:</strong> Procedimento de Partida da U-39,
        revisão 00, páginas 5–8.</p>
        <p><strong>Parada:</strong> Intertravamento U39 maior.doc,
        descritivo operacional e Projeto Betão.</p>
        <p>Existem diferenças documentais nos limites de carga,
        na condição da FSLL39006B e em determinadas associações
        lógicas E/OU. O exercício usa agrupamentos interpretativos
        identificados, não uma reprodução certificada do PLC.</p>
      </section>
    `;
    app.appendChild(secao);

    const paginaConversor = document.querySelector("#conversor .page-intro");
    if (paginaConversor) {
      paginaConversor.insertAdjacentHTML("afterend",
        '<div class="card"><h3>Treinamento complementar</h3>' +
        '<p>Pratique a lógica de normalização e a sequência de by-pass.</p>' +
        '<button type="button" class="btn primary" data-target="bypass">' +
        'Abrir Laboratório de By-pass →</button></div>');
    }

    const $ = id => document.getElementById(id);

    const definicoes = [
      ["inferior", "Carga inferior (m³/d)", 1200],
      ["tInferior", "Tempo de normalização inferior (s)", 0],
      ["superior", "Carga superior (m³/d)", 1200],
      ["tSuperior", "Tempo de normalização superior (s)", 0],
      ["reacao", "Temperatura de reação (°C)", 490],
      ["ar", "Vazão de ar (m³/d)", 1200],
      ["densa", "Temperatura fase densa (°C)", 350],
      ["forninho", "Forninho aceso? 1 = sim; 0 = não", 0],
      ["fotocelula", "Chama confirmada? 1 = sim; 0 = não", 0],
      ["dpGasto", "ΔP catalisador gasto (gf/cm²)", 100],
      ["tDpGasto", "Tempo ΔP gasto (s)", 0],
      ["dpReg", "ΔP catalisador regenerado (gf/cm²)", 100],
      ["tDpReg", "Tempo ΔP regenerado (s)", 0],
      ["vapor", "Vapor de dispersão (t/d)", 35],
      ["tVapor", "Tempo vapor normalizado (s)", 0],
      ["nivel", "Nível regenerador (%)", 35],
      ["tNivel", "Tempo nível normalizado (s)", 0],
      ["borra", "Borra de reciclo (m³/d)", 0]
    ];

    const criarCampo = (id, label, valor, grupo) =>
      '<label class="bp-field">' + label +
      '<input type="number" step="any" min="0" id="' + grupo + id +
      '" value="' + valor + '"></label>';

    $("bp-entradas").innerHTML = definicoes.map(
      x => criarCampo(x[0], x[1], x[2], "bps-")
    ).join("");

    const ler = (prefixo, chave) => {
      const campo = $(prefixo + chave);
      if (!campo || campo.value.trim() === "") return NaN;
      const numero = Number(campo.value);
      return Number.isFinite(numero) && numero >= 0 ? numero : NaN;
    };

    function avaliarPartida() {
      const v = {};
      definicoes.forEach(d => v[d[0]] = ler("bps-", d[0]));

      if (Object.values(v).some(x => !Number.isFinite(x))) {
        $("bp-resumo").textContent = "Preencha todos os valores com números válidos.";
        $("bp-resultados").innerHTML = "";
        return;
      }
      if (![0,1].includes(v.forninho) || ![0,1].includes(v.fotocelula)) {
        $("bp-resumo").textContent = "Forninho e fotocélula devem receber somente 0 ou 1.";
        $("bp-resultados").innerHTML = "";
        return;
      }

      const alimentacao =
        v.inferior > 1637 || v.superior > 1637 || v.borra > 150;

      const regras = [
        {
          tag: "FSLL39005B", ok: v.inferior > 1637 && v.tInferior > 30,
          explicacao: "Carga inferior > 1.637 m³/d por mais de 30 s."
        },
        {
          tag: "FSLL39006B", ok: v.superior > 1637 && v.tSuperior > 30,
          explicacao: "Carga superior > 1.637 m³/d por mais de 30 s, conforme procedimento de partida. O histórico apresenta redação divergente."
        },
        {
          tag: "TSLL39010B", ok: alimentacao && v.reacao > 525,
          explicacao: "Agrupamento didático: alimentação estabelecida E reação > 525 °C. Confirmar associação E/OU da lógica implementada."
        },
        {
          tag: "FSLL39003B",
          ok: v.ar > 3500 &&
            ((v.forninho === 1 && v.fotocelula === 1) ||
             (v.forninho === 0 && v.densa > 400)),
          explicacao: "Com forninho: chama confirmada e ar > 3.500. Sem forninho: fase densa > 400 °C e ar > 3.500."
        },
        {
          tag: "PDSLL39018",
          ok: alimentacao && v.dpGasto > 200 && v.tDpGasto > 30,
          explicacao: "Agrupamento didático: alimentação E ΔP gasto > 200 gf/cm² por mais de 30 s. Confirmar agrupamento lógico."
        },
        {
          tag: "PDSLL39022",
          ok: alimentacao && v.dpReg > 200 && v.tDpReg > 30,
          explicacao: "Agrupamento didático: alimentação E ΔP regenerado > 200 gf/cm² por mais de 30 s. Confirmar agrupamento lógico."
        },
        {
          tag: "FSLL39044B",
          ok: v.vapor > 50 && v.tVapor > 30,
          explicacao: "Vapor de dispersão > 50 t/d por mais de 30 s."
        },
        {
          tag: "LSLL39005",
          ok: v.nivel > 50 && v.tNivel > 30,
          explicacao: "Referência complementar do documento histórico: nível > 50% por mais de 30 s."
        }
      ];

      const atendidas = regras.filter(r => r.ok).length;
      $("bp-resumo").textContent =
        atendidas + " de " + regras.length +
        " condições atendidas neste exercício.";

      $("bp-resultados").innerHTML = regras.map(r =>
        '<article class="bp-result"><strong>' + r.tag + '</strong>' +
        '<span class="' + (r.ok ? "bp-ok" : "bp-pending") + '">' +
        (r.ok ? "Condição atendida" : "Normalização pendente") +
        '</span><p>' + r.explicacao + '</p></article>'
      ).join("");
    }

    $("bp-verificar").addEventListener("click", avaliarPartida);

    $("bp-limpar").addEventListener("click", () => {
      definicoes.forEach(d => $("bps-" + d[0]).value = d[2]);
      avaliarPartida();
    });

    // Segundo teste: progressão sequencial do by-pass de parada.
    const camposParada = [
      ["inf", "Carga inferior (m³/d)", 1600],
      ["sup", "Carga superior (m³/d)", 1600],
      ["trx", "Temperatura reação (°C)", 550],
      ["ar", "Ar regenerador (m³/d)", 4200],
      ["partida", "Existe by-pass de partida? 1 = sim; 0 = não", 1]
    ];

    $("bp-parada-entradas").innerHTML = camposParada.map(
      x => criarCampo(x[0], x[1], x[2], "bpp-")
    ).join("");

    let etapa = 0;
    const nomes = [
      "HSBP39STOP",
      "FSLL39006",
      "TSL39010 / LSLL39005",
      "PDSLL39018 / PDSLL39022 / FSLL39003",
      "J-3901"
    ];
    const escolhas = ["", "superior", "reacao", "diferenciais", "soprador"];
    const ativadas = [
      ["FSLL39005", "Vapor dispersão (tag divergente entre textos)"],
      ["FSLL39006"],
      ["TSL39010", "LSLL39005 (histórico)"],
      ["PDSLL39018", "PDSLL39022", "FSLL39003"],
      ["Proteção de parada J-3901"]
    ];

    function valoresParada() {
      const v = {};
      camposParada.forEach(d => v[d[0]] = ler("bpp-", d[0]));
      return v;
    }

    function limiteCarga() {
      return $("bp-fonte").value === "operacional" ? 500 : 1259;
    }

    function condicao(v, i) {
      if (i === 0) return v.partida === 0;
      if (i === 1) return v.inf < limiteCarga();
      if (i === 2) return v.sup < limiteCarga();
      if (i === 3) return v.trx < 500;
      if (i === 4) return v.ar < 3500;
      return false;
    }

    function descricao(i) {
      if (i === 0) return "Nenhuma função pode permanecer em by-pass de partida.";
      if (i === 1) return "Carga inferior < " + limiteCarga() +
        " m³/d e ramal inferior já contornado.";
      if (i === 2) return "Carga superior < " + limiteCarga() +
        " m³/d e ramal superior já contornado.";
      if (i === 3) return "Temperatura de reação < 500 °C e by-pass de temperatura ativo.";
      if (i === 4) return "Vazão de ar < 3.500 m³/d e by-pass de ar ativo.";
      return "Sequência concluída.";
    }

    function desenharParada() {
      const v = valoresParada();
      const valido = Object.values(v).every(Number.isFinite) &&
        [0,1].includes(v.partida);

      $("bp-fonte-aviso").textContent =
        $("bp-fonte").value === "operacional"
        ? "Fonte operacional: utiliza 500 m³/d para a progressão dos ramais."
        : "Projeto Betão: utiliza 1.259 m³/d da seção 4.3. A seção 4.2 também menciona 5%, sem conversão assumida.";

      $("bp-etapas").innerHTML = nomes.map((nome, i) =>
        '<div class="bp-step ' +
        (i < etapa ? "done" : i === etapa ? "current" : "future") +
        '">' + (i < etapa ? "✓ " : "") + nome + '</div>'
      ).join("");

      $("bp-etapa-atual").textContent =
        etapa === 5 ? "Sequência do exercício concluída" :
        "Etapa " + (etapa + 1) + " — " + nomes[etapa];

      $("bp-condicao").textContent = descricao(etapa);
      $("bp-escolha").disabled = etapa === 0 || etapa === 5;
      $("bp-avancar").disabled = etapa === 5 || !valido;

      const grupos = ativadas.slice(0, etapa).flat();
      $("bp-ativas").innerHTML = grupos.length
        ? grupos.map(t => '<div class="bp-result bp-ok">' + t + '</div>').join("")
        : '<p>Nenhuma função contornada no exercício.</p>';
    }

    function avancar() {
      const v = valoresParada();

      if (Object.values(v).some(x => !Number.isFinite(x)) ||
          ![0,1].includes(v.partida)) {
        $("bp-feedback").textContent = "Verifique os valores de entrada.";
        return;
      }

      if (etapa > 0 && $("bp-escolha").value !== escolhas[etapa]) {
        $("bp-feedback").textContent =
          "Sequência incorreta. Selecione o grupo correspondente à próxima etapa documental.";
        return;
      }

      if (!condicao(v, etapa)) {
        $("bp-feedback").textContent =
          "Etapa bloqueada no exercício. Critério pendente: " + descricao(etapa);
        return;
      }

      etapa++;
      $("bp-escolha").value = "";
      $("bp-feedback").textContent = etapa === 5
        ? "Sequência didática concluída. Não representa liberação operacional."
        : "Etapa anterior atendida. A próxima etapa pode ser avaliada.";
      desenharParada();
    }

    function reiniciar() {
      etapa = 0;
      $("bp-escolha").value = "";
      $("bp-feedback").textContent = "Exercício reiniciado.";
      desenharParada();
    }

    $("bp-avancar").addEventListener("click", avancar);
    $("bp-reiniciar").addEventListener("click", reiniciar);
    $("bp-fonte").addEventListener("change", reiniciar);
    $("bp-parada-entradas").addEventListener("input", desenharParada);

    function trocarTab(parada) {
      $("bp-partida").classList.toggle("bp-hidden", parada);
      $("bp-parada").classList.toggle("bp-hidden", !parada);
      $("bp-tab1").classList.toggle("active", !parada);
      $("bp-tab2").classList.toggle("active", parada);
    }

    $("bp-tab1").addEventListener("click", () => trocarTab(false));
    $("bp-tab2").addEventListener("click", () => trocarTab(true));

    avaliarPartida();
    desenharParada();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();
