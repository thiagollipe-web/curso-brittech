/* ============================================================
   LANDING PAGE — CURSO · v2 (modelo Brittech)
   Sem dependências externas. Tudo funciona abrindo o
   index.html direto no navegador (duplo clique).
   v2: reveal ao rolar (IntersectionObserver) + menu mobile
   + FAQ em acordeão + aviso de compra de exemplo.
   Respeita prefers-reduced-motion (o CSS desliga as
   animações; aqui o observer revela tudo de imediato).
   ============================================================ */

// Ano atual no rodapé
var anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

/* ---------- Reveal ao rolar ---------- */
var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var revelar = document.querySelectorAll(".reveal");

if (reduzMovimento || !("IntersectionObserver" in window)) {
  // Sem animação: mostra tudo de imediato
  revelar.forEach(function (el) { el.classList.add("visivel"); });
} else {
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  revelar.forEach(function (el) { observador.observe(el); });
}

/* ---------- Menu mobile (abre / fecha) ---------- */
var menuBtn = document.getElementById("menuBtn");
var menuNav = document.getElementById("menuNav");

if (menuBtn && menuNav) {
  menuBtn.addEventListener("click", function () {
    var aberto = menuNav.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", aberto);
    menuBtn.textContent = aberto ? "✕ Fechar" : "☰ Menu";
  });

  // Fecha o menu ao clicar em um link (no celular)
  menuNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menuNav.classList.remove("aberto");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰ Menu";
    });
  });
}

/* ---------- FAQ em acordeão ---------- */
document.querySelectorAll(".faq-item").forEach(function (item) {
  var pergunta = item.querySelector(".faq-pergunta");
  var resposta = item.querySelector(".faq-resposta");
  if (!pergunta || !resposta) return;

  pergunta.addEventListener("click", function () {
    var estaAberto = item.classList.contains("aberto");

    // Fecha todas as outras respostas
    document.querySelectorAll(".faq-item.aberto").forEach(function (outro) {
      outro.classList.remove("aberto");
      var outraResposta = outro.querySelector(".faq-resposta");
      if (outraResposta) outraResposta.style.maxHeight = null;
      var outraPergunta = outro.querySelector(".faq-pergunta");
      if (outraPergunta) outraPergunta.setAttribute("aria-expanded", "false");
    });

    // Abre (ou fecha, se já estava aberta) a clicada
    if (!estaAberto) {
      item.classList.add("aberto");
      resposta.style.maxHeight = resposta.scrollHeight + "px";
      pergunta.setAttribute("aria-expanded", "true");
    }
  });
});

// Recalcula a altura da resposta aberta se a janela mudar de tamanho
window.addEventListener("resize", function () {
  var aberto = document.querySelector(".faq-item.aberto .faq-resposta");
  if (aberto) aberto.style.maxHeight = aberto.scrollHeight + "px";
});

/* ---------- Botão de compra (EXEMPLO — troque pelo checkout real) ----------
   Hoje o botão aponta para "#" e mostra este aviso.
   Para usar de verdade:
   1. Troque href="#" pelo link do checkout (ex.: Kiwify)
      em TODOS os botões com class="btn-comprar" no index.html.
   2. Apague este bloco de código (do "document.querySelectorAll"
      até o "});" final deste trecho) — ou deixe, que ele só
      roda quando o href ainda é "#".
   ----------------------------------------------------------------------- */
document.querySelectorAll("[data-compra]").forEach(function (botao) {
  botao.addEventListener("click", function (evento) {
    evento.preventDefault();
    alert(
      "⚠ LINK DE EXEMPLO\n\n" +
      "Este botão ainda não leva ao checkout real.\n\n" +
      "Troque o href=\"#\" pelo link de pagamento do seu curso " +
      "(ex.: o link da Kiwify) em todos os botões de compra do index.html."
    );
  });
});
