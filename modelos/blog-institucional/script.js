// Blog institucional v2 — busca, filtro por categoria (com contador),
// newsletter e reveal ao rolar.
// Sem dependências externas. Tudo roda no navegador, sem servidor.

(function () {
  "use strict";

  var campoBusca = document.getElementById("campo-busca");
  var botoesFiltro = document.querySelectorAll(".filtro");
  var posts = Array.prototype.slice.call(document.querySelectorAll(".post"));
  var contagem = document.getElementById("resultado-contagem");
  var semResultados = document.getElementById("sem-resultados");
  var categoriaAtiva = "todas";

  // Remove acentos para a busca funcionar com ou sem acento
  // ("matematica" encontra "matemática").
  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // Contador de posts em cada botão de categoria.
  // Ex.: "Educação (2)". O botão "Todas" mostra o total.
  function atualizarContadores() {
    botoesFiltro.forEach(function (botao) {
      var categoria = botao.getAttribute("data-categoria");
      var total =
        categoria === "todas"
          ? posts.length
          : posts.filter(function (post) {
              return post.getAttribute("data-categoria") === categoria;
            }).length;

      var span = botao.querySelector(".contador");
      if (!span) {
        span = document.createElement("span");
        span.className = "contador";
        botao.appendChild(span);
      }
      span.textContent = "(" + total + ")";
    });
  }

  function aplicarFiltros() {
    var termo = normalizar(campoBusca.value.trim());
    var visiveis = 0;

    posts.forEach(function (post) {
      var titulo = normalizar(post.getAttribute("data-titulo") || "");
      var categoria = post.getAttribute("data-categoria") || "";
      var bateBusca = termo === "" || titulo.indexOf(termo) !== -1;
      var bateCategoria =
        categoriaAtiva === "todas" || categoria === categoriaAtiva;
      var mostrar = bateBusca && bateCategoria;

      post.style.display = mostrar ? "" : "none";
      if (mostrar) visiveis++;
    });

    contagem.textContent =
      "Mostrando " + visiveis + " de " + posts.length + " posts";
    semResultados.hidden = visiveis !== 0;
  }

  campoBusca.addEventListener("input", aplicarFiltros);

  botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoesFiltro.forEach(function (b) {
        b.classList.remove("ativo");
      });
      botao.classList.add("ativo");
      categoriaAtiva = botao.getAttribute("data-categoria");
      aplicarFiltros();
    });
  });

  atualizarContadores();

  // ---------- Reveal ao rolar (desativado se o usuário prefere menos movimento) ----------
  var reduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reduzirMovimento && "IntersectionObserver" in window) {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observador.observe(el);
    });
  } else {
    // Sem IntersectionObserver ou com movimento reduzido: mostra tudo.
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visivel");
    });
  }

  // ---------- Newsletter (demonstração: não envia nada real) ----------
  var form = document.getElementById("form-newsletter");
  var campoEmail = document.getElementById("email-newsletter");
  var mensagem = document.getElementById("msg-newsletter");

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var email = campoEmail.value.trim();
    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    mensagem.hidden = false;

    if (!emailValido) {
      mensagem.classList.add("msg-erro");
      mensagem.textContent =
        "Digite um e-mail válido para assinar a newsletter.";
      campoEmail.focus();
      return;
    }

    mensagem.classList.remove("msg-erro");
    mensagem.textContent =
      "Obrigado! Sua inscrição foi registrada. (Demonstração — nenhum e-mail foi enviado.)";
    form.reset();
  });
})();
