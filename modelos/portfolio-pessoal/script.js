/* ============================================================
   Portfólio pessoal v2 — Ana Souza (modelo de exemplo)
   - Menu mobile (abrir/fechar)
   - Formulário de contato: valida e mostra mensagem de
     sucesso. NÃO envia nada de verdade (sem back-end).
   - Reveal ao rolar (IntersectionObserver), com respeito a
     prefers-reduced-motion.
   ============================================================ */

// ---------- Menu mobile ----------
(function () {
  var botao = document.getElementById("menuBotao");
  var menu = document.getElementById("menuPrincipal");
  if (!botao || !menu) return;

  function fecharMenu() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  }

  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu quando o usuário toca em um link (mobile)
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
  });

  // Fecha com Esc
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fecharMenu();
  });
})();

// ---------- Formulário de contato ----------
(function () {
  var form = document.getElementById("formContato");
  if (!form) return;

  var nome = document.getElementById("campoNome");
  var email = document.getElementById("campoEmail");
  var mensagem = document.getElementById("campoMensagem");
  var erro = document.getElementById("formErro");
  var sucesso = document.getElementById("formSucesso");

  form.addEventListener("submit", function (evento) {
    evento.preventDefault(); // não envia nada de verdade
    erro.hidden = true;
    sucesso.hidden = true;

    if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
      erro.textContent = "Preencha nome, e-mail e mensagem antes de enviar.";
      erro.hidden = false;
      return;
    }

    if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
      erro.textContent = "Digite um e-mail válido, como nome@email.com.";
      erro.hidden = false;
      return;
    }

    // Demonstração: mostra a mensagem de sucesso e limpa o formulário.
    sucesso.hidden = false;
    form.reset();
    sucesso.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();

// ---------- Reveal ao rolar ----------
(function () {
  var itens = document.querySelectorAll(".reveal");
  if (!itens.length) return;

  // Sem animação quando o usuário prefere movimento reduzido
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    itens.forEach(function (el) { el.classList.add("visivel"); });
    return;
  }

  if (!("IntersectionObserver" in window)) {
    itens.forEach(function (el) { el.classList.add("visivel"); });
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  itens.forEach(function (el) { observador.observe(el); });
})();
