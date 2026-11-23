// ============================================================
// CANTINA DO ZÉ — COMIDA CASEIRA · v2 (editorial)
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

// ---------- Reveal ao rolar ----------
// Se o navegador não tiver IntersectionObserver, tudo aparece
// de uma vez (o CSS já deixa .reveal visível sem JS? Não —
// por isso o fallback abaixo adiciona a classe direto).
const revelar = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  revelar.forEach(function (el) {
    observador.observe(el);
  });
} else {
  revelar.forEach(function (el) {
    el.classList.add("visivel");
  });
}

// ---------- Ano automático no rodapé ----------
const ano = document.getElementById("ano");
if (ano) {
  ano.textContent = new Date().getFullYear();
}
