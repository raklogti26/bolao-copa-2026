// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", async () => {

  const tabela = document.getElementById("tabelaRanking");
  tabela.innerHTML = "";

  // ==========================
  // 🔥 BUSCA PARTICIPANTES NO FIREBASE
  // ==========================
  const snapshot = await firebase.database().ref("participantes").once("value");
  const dados = snapshot.val();

  let participantes = [];

  // ✅ Cria base do ranking com 0 pontos
  for (let key in dados) {
    participantes.push({
      nome: dados[key].nome,
      pontos: 0
    });
  }

  // ==========================
  // 🔥 SE EXISTIR FUNÇÃO DE PONTUAÇÃO
  // ==========================
  if (typeof calcularPontuacao === "function") {

    const pontuados = await calcularPontuacao();

    // Substitui pontos se existirem
    participantes.forEach(p => {
      const encontrado = pontuados.find(x => x.nome === p.nome);
      if (encontrado) {
        p.pontos = encontrado.pontos;
      }
    });
  }

  // ==========================
  // 🔥 ORDENA RANKING
  // ==========================
  participantes.sort((a, b) => b.pontos - a.pontos);

  // ==========================
  // 🔥 RENDERIZA TABELA
  // ==========================
  participantes.forEach((p, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.nome}</td>
      <td>${p.pontos}</td>
    `;

    tabela.appendChild(tr);
  });

  // ==========================
  // 🕒 DATA/HORA
  // ==========================
  const agora = new Date();
  const el = document.getElementById("ultimaAtualizacao");

  if (el) {
    el.textContent =
      agora.toLocaleDateString("pt-BR") + " " +
      agora.toLocaleTimeString("pt-BR");
  }

});
