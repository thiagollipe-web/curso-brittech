// ============================================================
// CANTINA DO ZÉ — COMIDA CASEIRA
// Modelo do curso Brittech — Seu Primeiro Site com IA
// Sem dependências externas. Só JavaScript puro.
// ============================================================

// ---------- Menu mobile ----------
const botaoMenu = document.getElementById("menu-mobile");
const menu = document.getElementById("menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao tocar num link (no celular)
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// ---------- Filtro do cardápio ----------
const botoesFiltro = document.querySelectorAll(".filtro");
const itens = document.querySelectorAll(".item-cardapio");
const contador = document.getElementById("contador");

function filtrarCardapio(categoria) {
  let visiveis = 0;

  itens.forEach(function (item) {
    const mostrar = categoria === "todos" || item.dataset.categoria === categoria;
    item.classList.toggle("escondido", !mostrar);
    if (mostrar) visiveis += 1;
  });

  if (contador) {
    contador.textContent =
      visiveis === 1
        ? "Mostrando 1 item"
        : "Mostrando " + visiveis + " itens";
  }
}

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botoesFiltro.forEach(function (b) {
      b.classList.remove("ativo");
      b.setAttribute("aria-pressed", "false");
    });
    botao.classList.add("ativo");
    botao.setAttribute("aria-pressed", "true");
    filtrarCardapio(botao.dataset.filtro);
  });
});

// ---------- Ano automático no rodapé ----------
const ano = document.getElementById("ano");
if (ano) {
  ano.textContent = new Date().getFullYear();
}
