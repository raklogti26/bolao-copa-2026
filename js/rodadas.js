
fetch("dados/grupos.json")
  .then(res => res.json())
  .then(grupos => {
    renderizarGrupos(grupos);
  })
  .catch(err => console.error("Erro ao carregar grupos:", err));


/* ==================================================
   FASE DE GRUPOS
================================================== */
function renderizarGrupos(grupos) {
  const container = document.getElementById("gruposContainer");
  if (!container) return;

  container.innerHTML = "";

  grupos.forEach(g => {
    const bloco = document.createElement("div");

    bloco.innerHTML = `<h4>Grupo ${g.grupo}</h4>`;

    const ul = document.createElement("ul");

    g.jogos.forEach(j => {
      const placar =
        j.gols1 === null ? "— x —" : `${j.gols1} x ${j.gols2}`;
      const status =
        j.status === "encerrado" ? "Fim do jogo" : "Agendado";

      const li = document.createElement("li");
      li.textContent = `${j.selecao1} ${placar} ${j.selecao2} — ${status}`;

      ul.appendChild(li);
    });

    bloco.appendChild(ul);
    container.appendChild(bloco);
  });
}

/* ==================================================
   ELIMINATÓRIAS — CHAVE EM COLUNAS
================================================== */
function renderizarEliminatorias(fases) {
  const mapaFases = {
    "Oitavas de Final": "oitavas",
    "Quartas de Final": "quartas",
    "Semifinal": "semifinal",
    "Final": "final"
  };

  // Limpa colunas
  Object.values(mapaFases).forEach(id => {
    const col = document.getElementById(id);
    if (col) col.innerHTML = "";
  });

  fases.forEach(fase => {
    const idColuna = mapaFases[fase.fase];
    if (!idColuna) return;

    const coluna = document.getElementById(idColuna);
    if (!coluna) return;

    fase.jogos.forEach(jogo => {
      const placar =
        jogo.gols1 === null ? "— x —" : `${jogo.gols1} x ${jogo.gols2}`;

      const card = document.createElement("div");

      card.textContent = `${jogo.selecao1} ${placar} ${jogo.selecao2}`;

      coluna.appendChild(card);
    });
  });
}
