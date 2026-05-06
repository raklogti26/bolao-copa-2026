// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", async () => {
  if (typeof calcularPontuacao !== "function") {
    console.error("Função calcularPontuacao não encontrada.");
    return;
  }

  const participantes = await calcularPontuacao();

  // Ordena por pontos (decrescente)
  participantes.sort((a, b) => b.pontos - a.pontos);

  const tabela = document.getElementById("tabelaRanking");
  tabela.innerHTML = "";

  participantes.forEach((p, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.nome}</td>
      <td>${p.pontos}</td>
    `;

    tabela.appendChild(tr);
  });

  // Atualiza data/hora
  const agora = new Date();
  const el = document.getElementById("ultimaAtualizacao");
  if (el) {
    el.textContent =
      agora.toLocaleDateString("pt-BR") + " " +
      agora.toLocaleTimeString("pt-BR");
  }
});