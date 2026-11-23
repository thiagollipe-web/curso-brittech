/* ============================================================
   Portfólio pessoal — Ana Souza (modelo de exemplo)
   - Menu mobile (abrir/fechar)
   - Formulário de contato: valida e mostra mensagem de
     sucesso. NÃO envia nada de verdade (sem back-end).
   ============================================================ */

// ---------- Menu mobile ----------
(function () {
  var botao = document.getElementById("menuBotao");
  var menu = document.getElementById("menuPrincipal");
  if (!botao || !menu) return;

  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    botao.textContent = aberto ? "✕" : "☰";
  });

  // Fecha o menu quando o usuário toca em um link (mobile)
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
      botao.textContent = "☰";
    });
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
