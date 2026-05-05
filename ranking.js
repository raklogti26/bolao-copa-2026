fetch("dados/participantes.json")
  .then(response => response.json())
  .then(dados => {
    // Ordena por pontos (decrescente)
    dados.sort((a, b) => b.pontos - a.pontos);

    const tabela = document.getElementById("tabelaRanking");

    dados.forEach((participante, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${participante.nome}</td>
        <td>${participante.pontos}</td>
      `;

      tabela.appendChild(tr);
    });
  })
  .catch(erro => {
    console.error("Erro ao carregar participantes:", erro);
  });
