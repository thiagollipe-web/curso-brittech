/* ============================================================
   Loja Verde v2 — carrinho simples (só JavaScript, sem servidor)
   ------------------------------------------------------------
   PARA TROCAR OS PRODUTOS: edite a lista PRODUTOS abaixo.
   Cada produto tem: id, nome, preco (em reais, com ponto),
   descricao, icone (letra ou símbolo) e cor (classe CSS em style.css).
   ============================================================ */

document.documentElement.classList.add("js");

const PRODUTOS = [
  { id: 1, nome: "Sabonete Artesanal de Lavanda", preco: 18.90, descricao: "Sabonete feito à mão com óleo essencial de lavanda. Suave para a pele.", icone: "S", cor: "cor-1" },
  { id: 2, nome: "Shampoo Sólido de Alecrim", preco: 32.90, descricao: "Barra de shampoo sem plástico, com alecrim. Dura cerca de 2 meses.", icone: "Sh", cor: "cor-2" },
  { id: 3, nome: "Óleo Essencial de Hortelã — 10 ml", preco: 24.90, descricao: "Óleo essencial puro de hortelã. Para difusor, massagem ou banho.", icone: "Ó", cor: "cor-3" },
  { id: 4, nome: "Mel Orgânico — 500 g", preco: 39.90, descricao: "Mel puro de abelhas criadas sem agrotóxico. Colhido na serra.", icone: "M", cor: "cor-4" },
  { id: 5, nome: "Chá Verde Orgânico — 100 g", preco: 21.90, descricao: "Folhas de chá verde orgânico, colhidas à mão. Rende até 50 xícaras.", icone: "Ch", cor: "cor-5" },
  { id: 6, nome: "Granola Artesanal — 400 g", preco: 28.90, descricao: "Granola crocante com aveia, castanha e mel. Sem açúcar refinado.", icone: "G", cor: "cor-6" },
  { id: 7, nome: "Creme Hidratante de Karité", preco: 45.90, descricao: "Creme corporal com manteiga de karité. Hidrata sem deixar oleoso.", icone: "C", cor: "cor-7" },
  { id: 8, nome: "Vela Aromática de Eucalipto", preco: 34.90, descricao: "Vela de cera vegetal com aroma de eucalipto. Queima por 30 horas.", icone: "V", cor: "cor-8" }
];

// O carrinho guarda: { id do produto: quantidade }
// Exemplo: { 1: 2, 4: 1 } = 2 sabonetes + 1 mel.
let carrinho = {};

// ---------- Utilidades ----------

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buscarProduto(id) {
  return PRODUTOS.find(function (produto) { return produto.id === id; });
}

function totalDeItens() {
  return Object.values(carrinho).reduce(function (soma, quantidade) { return soma + quantidade; }, 0);
}

function totalDoCarrinho() {
  return Object.entries(carrinho).reduce(function (soma, entrada) {
    const produto = buscarProduto(Number(entrada[0]));
    return produto ? soma + produto.preco * entrada[1] : soma;
  }, 0);
}

// ---------- Montar a grade de produtos (índice editorial) ----------

function montarProdutos() {
  const grade = document.getElementById("grade-produtos");
  grade.innerHTML = "";

  PRODUTOS.forEach(function (produto, indice) {
    const numero = String(indice + 1).padStart(2, "0");
    const artigo = document.createElement("article");
    artigo.className = "cartao-produto reveal";
    // Entrada escalonada: cada cartão entra um pouco depois do anterior.
    artigo.style.setProperty("--atraso", (indice * 70) + "ms");
    artigo.innerHTML =
      '<div class="imagem-produto ' + produto.cor + '" aria-hidden="true">' + produto.icone + "</div>" +
      '<span class="indice-produto" aria-hidden="true">' + numero + "</span>" +
      '<div class="corpo-produto">' +
      "<h3>" + produto.nome + "</h3>" +
      "<p>" + produto.descricao + "</p>" +
      "</div>" +
      '<p class="preco">' + formatarPreco(produto.preco) + "</p>" +
      '<button class="botao-adicionar" type="button" data-id="' + produto.id + '">Adicionar<span class="seta" aria-hidden="true">→</span></button>';
    grade.appendChild(artigo);
  });

  grade.querySelectorAll(".botao-adicionar").forEach(function (botao) {
    botao.addEventListener("click", function () {
      adicionarAoCarrinho(Number(botao.getAttribute("data-id")));
    });
  });
}

// ---------- Carrinho: adicionar / remover / limpar ----------

function adicionarAoCarrinho(id) {
  const produto = buscarProduto(id);
  if (!produto) return;
  carrinho[id] = (carrinho[id] || 0) + 1;
  atualizarCarrinho();
  pulsarContador();
  mostrarAviso(produto.nome + " adicionado ao carrinho.");
}

function mudarQuantidade(id, delta) {
  if (!carrinho[id]) return;
  carrinho[id] += delta;
  if (carrinho[id] <= 0) delete carrinho[id];
  atualizarCarrinho();
}

function removerItem(id) {
  delete carrinho[id];
  atualizarCarrinho();
}

function limparCarrinho() {
  carrinho = {};
  esconderMensagemFinalizar();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const vazio = document.getElementById("mensagem-carrinho-vazio");
  const rodape = document.getElementById("rodape-carrinho");
  const contador = document.getElementById("contador-carrinho");
  const total = document.getElementById("total-carrinho");

  contador.textContent = totalDeItens();
  lista.innerHTML = "";

  const ids = Object.keys(carrinho);
  vazio.hidden = ids.length > 0;
  rodape.hidden = ids.length === 0;

  ids.forEach(function (idTexto) {
    const id = Number(idTexto);
    const produto = buscarProduto(id);
    if (!produto) return;
    const quantidade = carrinho[id];

    const item = document.createElement("li");
    item.className = "item-carrinho";
    item.innerHTML =
      "<div><strong>" + produto.nome + "</strong><br>" +
      '<span class="item-preco-unitario">' + formatarPreco(produto.preco) + " cada</span></div>" +
      '<p class="item-subtotal">' + formatarPreco(produto.preco * quantidade) + "</p>" +
      '<div class="controles-quantidade">' +
      '<button type="button" data-acao="menos" aria-label="Diminuir quantidade de ' + produto.nome + '">−</button>' +
      "<span>" + quantidade + "</span>" +
      '<button type="button" data-acao="mais" aria-label="Aumentar quantidade de ' + produto.nome + '">+</button>' +
      "</div>" +
      '<button class="botao-remover" type="button">Remover</button>';

    item.querySelector('[data-acao="menos"]').addEventListener("click", function () { mudarQuantidade(id, -1); });
    item.querySelector('[data-acao="mais"]').addEventListener("click", function () { mudarQuantidade(id, 1); });
    item.querySelector(".botao-remover").addEventListener("click", function () { removerItem(id); });
    lista.appendChild(item);
  });

  total.textContent = formatarPreco(totalDoCarrinho());
}

// ---------- Finalizar (demonstração, sem pagamento) ----------

function finalizarPedido() {
  const mensagem = document.getElementById("mensagem-finalizar");
  if (totalDeItens() === 0) {
    mensagem.textContent = "Seu carrinho está vazio. Adicione um produto antes de finalizar.";
  } else {
    mensagem.textContent =
      "Pedido de exemplo registrado! Total: " + formatarPreco(totalDoCarrinho()) +
      ". Nenhum pagamento foi cobrado e nenhum pedido real foi enviado — este é só um modelo de demonstração.";
  }
  mensagem.hidden = false;
}

function esconderMensagemFinalizar() {
  document.getElementById("mensagem-finalizar").hidden = true;
}

// ---------- Abrir / fechar o carrinho ----------

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("aberto");
  document.getElementById("carrinho").setAttribute("aria-hidden", "false");
  document.getElementById("fundo-carrinho").hidden = false;
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("aberto");
  document.getElementById("carrinho").setAttribute("aria-hidden", "true");
  document.getElementById("fundo-carrinho").hidden = true;
}

// ---------- Aviso temporário ----------

let temporizadorAviso = null;

function mostrarAviso(texto) {
  const aviso = document.getElementById("aviso");
  aviso.textContent = texto;
  aviso.hidden = false;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(function () { aviso.hidden = true; }, 2500);
}

// ---------- Feedback visual: o contador pulsa ao adicionar ----------

function pulsarContador() {
  const contador = document.getElementById("contador-carrinho");
  contador.classList.remove("pulso");
  // Força o navegador a reiniciar a animação mesmo em cliques seguidos.
  void contador.offsetWidth;
  contador.classList.add("pulso");
}

// ---------- Reveal ao rolar (IntersectionObserver) ----------

function ativarReveal() {
  const alvos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (el) { el.classList.add("visivel"); });
    return;
  }
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  alvos.forEach(function (el) { observador.observe(el); });
}

// ---------- Início ----------

document.getElementById("botao-abrir-carrinho").addEventListener("click", abrirCarrinho);
document.getElementById("botao-fechar-carrinho").addEventListener("click", fecharCarrinho);
document.getElementById("fundo-carrinho").addEventListener("click", fecharCarrinho);
document.getElementById("botao-finalizar").addEventListener("click", finalizarPedido);
document.getElementById("botao-limpar").addEventListener("click", limparCarrinho);
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") fecharCarrinho();
});

montarProdutos();
atualizarCarrinho();
ativarReveal();
