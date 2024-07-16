// NAV BAR
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const carrinhoIcon = document.querySelector('.carrinho');
    const checkoutBar = document.querySelector('.checkout-bar');
    const itemCountCheckout = document.getElementById('item-count-checkout');


// toggle menu mob
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Mostrar/ocultar barra de finalização ao clicar no ícone de carrinho
carrinhoIcon.addEventListener('click', () => {
    checkoutBar.classList.toggle('active');
    updateCheckoutItemCount();
});

// Função para atualizar o número de itens no checkout
function updateCheckoutItemCount() {
    itemCountCheckout.textContent = itemCount;
}


const produtos = [
    {
    imagem: "assets/calcaum.png",
    alt: "Grunge Glossy Jeans",
    nome: "Calça Jeans Grunge",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    preco: "R$ 220,00"
    },

{
    imagem: "assets/calcadois.png",
    alt: "Boyfriend Glossy Jeans",
    nome: "Calça Jeans Boyfriend",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    preco: "R$ 220,00"
},

{
    imagem: "assets/calcatres.png",
    alt: "Star Glossy Jeans",
    nome: "Calça Glossy Star",
    tamanhos: ["PP", "P", "M", "G", "GG"],
    preco: "R$ 220,00"
}
];

// Função criair HTML
function criarProduto(produto) {
    const divProduto = document.createElement('div');
    divProduto.classList.add('produto');
    divProduto.innerHTML =
     `<div class="imagem-produto">
        <span class= "valor-produto">${produto.preco}</span>
        <img src="${produto.imagem}" alt="${produto.alt}">
    </div>
        <h3>${produto.nome}</h3>
     <ul class="tamanhos">${produto.tamanhos.map(tamanho => `<li>${tamanho}</li>`).join('')}</ul>
              
    <button class="btn-comprar">Comprar</button>`;
    return divProduto;
}

// Lugar dos produtos
const allSection = document.getElementById('all');

//  produto na section
produtos.forEach(produto => {
   const  produtoElement = criarProduto(produto);
   allSection.appendChild(produtoElement);
});

//  evento de clique nos tamanhos 
allSection.addEventListener('click', (event) => {
if (event.target.tagName === 'LI' && event.target.parentElement.classList.contains('tamanhos')) {

    const selectedSize = event.target;
    const allSizes =  selectedSize.parentElement.querySelectorAll('li');

      // Remove a classe'tamanho-selecionado' de todos os tamanhos
    allSizes.forEach(li => li.classList.remove('tamanho-selecionado'));

      // adiciona a classe do botao clicado
   selectedSize.classList.add('tamanho-selecionado');
  }
});

   //  adicionar produto ao carrinho
   let itemCount = 0;

allSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-comprar')) {
        const produtoElement = event.target.closest('.produto');
        const tamanhoSelecionado = produtoElement.querySelector('.tamanhos li.tamanho-selecionado');

        if (tamanhoSelecionado) {
            alert('Produto adicionado ao carrinho!');
            itemCount++;
            document.querySelector('.item-count').textContent = itemCount; 

            tamanhoSelecionado.classList.remove('tamanho-selecionado'); }
            else {
    alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
            }
    }
});

    // Detecta a rolagem da tela
    window.addEventListener('scroll', function () {
        var toggleRect = menuToggle.getBoundingClientRect();
        // Ajusta a posição do nav-menu conforme a posição do menu-toggle
        if (toggleRect.top <= 0) {
            navMenu.classList.add('fixed-menu');
        } else {
            navMenu.classList.remove('fixed-menu');
        }
    });
});