/* ============================================================
   LANDING PAGE — CURSO (modelo Brittech)
   Sem dependências externas. Tudo funciona abrindo o
   index.html direto no navegador (duplo clique).
   ============================================================ */

// Ano atual no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

/* ---------- Menu mobile (abre / fecha) ---------- */
const menuBtn = document.getElementById("menuBtn");
const menuNav = document.getElementById("menuNav");

menuBtn.addEventListener("click", function () {
  const aberto = menuNav.classList.toggle("aberto");
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

/* ---------- FAQ em acordeão ---------- */
document.querySelectorAll(".faq-item").forEach(function (item) {
  const pergunta = item.querySelector(".faq-pergunta");
  const resposta = item.querySelector(".faq-resposta");

  pergunta.addEventListener("click", function () {
    const estaAberto = item.classList.contains("aberto");

    // Fecha todas as outras respostas
    document.querySelectorAll(".faq-item.aberto").forEach(function (outro) {
      outro.classList.remove("aberto");
      outro.querySelector(".faq-resposta").style.maxHeight = null;
      outro.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
    });

    // Abre (ou fecha, se já estava aberta) a clicada
    if (!estaAberto) {
      item.classList.add("aberto");
      resposta.style.maxHeight = resposta.scrollHeight + "px";
      pergunta.setAttribute("aria-expanded", "true");
    }
  });
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
