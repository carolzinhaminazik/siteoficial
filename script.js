document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const carrinhoIcon = document.querySelector('.carrinho');
    const checkoutBar = document.querySelector('.checkout-bar');
    const itemCountCheckout = document.getElementById('item-count-checkout');
    const checkoutList = document.getElementById('checkout-list');
    const itemCountDisplay = document.querySelector('.item-count');
    const btnFinalizar = document.getElementById('btn-finalizar');
    const allSection = document.getElementById('all');

    const closeBtn = document.querySelector('.close-btn');
    const emptyCartModal = document.getElementById('empty-cart-modal');
    const closeEmptyCartButton = document.getElementById('close-empty-cart-modal');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const sizeSelectionModal = document.getElementById('size-selection-modal');
    const closeSizeModal = document.getElementById('close-size-modal');
    const btnConcluirModal = document.querySelector('btn-concluir-modal');
    const compraSuccessModal = document.getElementById('compra-success-modal');


    let itemCount = 0;
    const produtos = [
        {
            imagem: "assets/calcaum.png",
            alt: "Grunge Glossy Jeans",
            nome: "Calça Jeans Grunge",
            tamanhos: ["PP", "P", "M", "G", "GG"],
            preco: "R$ 220,00",
            quantidade: 0,
            tamanhoSelecionado: ''
        },
        {
            imagem: "assets/calcadois.png",
            alt: "Boyfriend Glossy Jeans",
            nome: "Calça Jeans Boyfriend",
            tamanhos: ["PP", "P", "M", "G", "GG"],
            preco: "R$ 220,00",
            quantidade: 0,
            tamanhoSelecionado: ''
        },
        {
            imagem: "assets/calcatres.png",
            alt: "Star Glossy Jeans",
            nome: "Calça Glossy Star",
            tamanhos: ["PP", "P", "M", "G", "GG"],
            preco: "R$ 220,00",
            quantidade: 0,
            tamanhoSelecionado: ''
        }
    ];
      // Função para salvar o estado do carrinho no localStorage
      function saveCartState() {
        const cartState = produtos.map(produto => ({
            nome: produto.nome,
            quantidade: produto.quantidade,
            tamanhoSelecionado: produto.tamanhoSelecionado
        }));
        localStorage.setItem('cartState', JSON.stringify(cartState));
    }

    // Função para carregar o estado do carrinho do localStorage
    function loadCartState() {
        const cartState = localStorage.getItem('cartState');
        if (cartState) {
            const savedCart = JSON.parse(cartState);
            savedCart.forEach(savedItem  => {
                const produto = produtos.find(p => p.nome === savedItem.nome);
                if (produto) {
                    produto.quantidade = savedItem.quantidade;
                    produto.tamanhoSelecionado = savedItem.tamanhoSelecionado;
                }
            });
            updateCheckoutList();
            updateCheckoutItemCount();
        }
    }

    loadCartState();

    // Toggle do celu
    menuToggle.addEventListener('click', () => { 
        if (checkoutBar.classList.contains('active')){
        checkoutBar.classList.remove('active');
    }
        navMenu.classList.toggle('active');
    });

    // Mostrar/ocultar barra de finalização ao clicar no ícone de carrinho
    carrinhoIcon.addEventListener('click', () => { 
        if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
        checkoutBar.classList.toggle('active');
        updateCheckoutList();
        updateCheckoutItemCount();
    });


    // Evento de clique no ícone de fechar checkout
    closeBtn.addEventListener('click', () => {
        checkoutBar.classList.remove('active'); 
    });

    // Função para atualizar o número de itens no resumo da compra
    function updateCheckoutItemCount() {
        itemCount = produtos.reduce((total, produto) => total + produto.quantidade, 0);
        itemCountCheckout.textContent = itemCount;
        itemCountDisplay.textContent = itemCount;
        saveCartState();
    }

    // Função para limpar a lista de produtos no resumo da compra
    function clearCheckoutList() {
        checkoutList.innerHTML = '';
        produtos.forEach(produto => produto.quantidade = 0);
        updateCheckoutItemCount();
    }

    // Função para adicionar produto ao carrinho
    function addToCart(produto) {
        produto.quantidade++;
        itemCount++;
        updateCheckoutList();
        updateCheckoutItemCount();
        checkoutBar.classList.add('active');
    }

    // Função para remover produto do carrinho
    function removeProduct(index) {
        const produto = produtos[index];
        if (produto.quantidade > 0) {
            produto.quantidade--;
            itemCount--;
            updateCheckoutList();
            updateCheckoutItemCount();
        }
    }

    // Função para atualizar a lista de produtos no resumo da compra
    function updateCheckoutList() {
        checkoutList.innerHTML = '';
        produtos.forEach((produto, index) => {
            if (produto.quantidade > 0) {
                const item = document.createElement('li');
                item.classList.add('produto-resumo');
                item.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.alt}">
                    <div class="info">
                        <h4>${produto.nome}</h4>
                        <p>Quantidade: ${produto.quantidade}</p>
                        <p>Tamanho: ${produto.tamanhoSelecionado}</p>
                        <p>Preço: ${produto.preco}</p>
                    </div>
                    <div class="action-buttons">
                        <button class="remove-btn">Remover</button>
                    </div>
                `;
                checkoutList.appendChild(item);

                
                const removeButton = item.querySelector('.remove-btn');
                removeButton.addEventListener('click', () => {
                    removeProduct(index);
                });
            }
        });
        saveCartState();
    }

    // Exibir o modal de sucesso
function showPurchaseSuccessModal() {
    compraSuccessModal.style.display = 'flex';
}

// Ocultar o modal de sucesso
function closePurchaseSuccessModal() {
    compraSuccessModal.style.display = 'none';
}

  // Adicionar evento ao botão de concluir modal
  if (btnConcluirModal) {
    btnConcluirModal.addEventListener('click', closePurchaseSuccessModal);
} 

// Adicionar evento ao botão de fechar do modal de sucesso
const closeConcluir = document.getElementById('close-concluir');
if (closeConcluir) {
    closeConcluir.addEventListener('click', closePurchaseSuccessModal);
} else {
    console.error('Botão de fechar do modal de sucesso não encontrado.');
}

      // Mostrar o modal de seleção de tamanho
      function showSizeSelectionModal() {
        sizeSelectionModal.style.display = 'flex';
    }

   // Função para fechar o modal de seleção de tamanho
   function closeSizeSelectionModal() {
    sizeSelectionModal.style.display = 'none';
}

   // Adicionar evento de clique ao botão de fechar do modal de seleção de tamanho
   if (closeSizeModal) {
    closeSizeModal.addEventListener('click', closeSizeSelectionModal);
} else {
    console.error('Botão de fechar do modal de seleção de tamanho não encontrado.');
}

      // Exibir o modal ao clicar no botão de finalizar
    btnFinalizar.addEventListener('click', () => {
        if (itemCount > 0) { 
            loginModal.style.display = 'flex';
         } else {
            emptyCartModal.style.display = 'flex';
            }
        });
        
        // Função para fechar o modal de carrinho vazio
        function closeEmptyCartModal() {
            emptyCartModal.style.display = 'none';
        }

       // Adicionar evento ao botão de fechar do modal de carrinho vazio
    if (closeEmptyCartButton) {
        closeEmptyCartButton.addEventListener('click', closeEmptyCartModal);
    } else {
        console.error('Botão de fechar do modal de carrinho vazio não encontrado.');
    }

      // Função para fechar o modal de login
    function closeModalFunction() {
        loginModal.style.display = 'none';
    }
      // Adicionar evento de clique ao botão de fechar do modal de login
      if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    } else {
        console.error('Botão de fechar do modal de login não encontrado.');
    }

    //  formulário de login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            closeModalFunction();
            showPurchaseSuccessModal();
            clearCheckoutList();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

      // Função para criar o HTML de cada produto
      function criarProduto(produto) {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.innerHTML = `
            <div class="imagem-produto">
                <span class="valor-produto">${produto.preco}</span>
                <img src="${produto.imagem}" alt="${produto.alt}">
            </div>
            <h3>${produto.nome}</h3>
            <ul class="tamanhos">${produto.tamanhos.map(tamanho => `<li>${tamanho}</li>`).join('')}</ul>
            <button class="btn-comprar">Comprar</button>
        `;

        // Adiciona evento de clique para adicionar ao carrinho
    divProduto.querySelector('.btn-comprar').addEventListener('click', () => {
            const tamanhoSelecionado = divProduto.querySelector('.tamanhos li.tamanho-selecionado');

            if (tamanhoSelecionado) {
                produto.tamanhoSelecionado = tamanhoSelecionado.textContent;
                addToCart(produto);
                tamanhoSelecionado.classList.remove('tamanho-selecionado');
            } else {
                showSizeSelectionModal();
            }
        });

        return divProduto;
    }

    // Adiciona cada produto à seção de produtos
    produtos.forEach(produto => {
    const produtoElement = criarProduto(produto);
    allSection.appendChild(produtoElement);
    });

    // Evento de clique tamanho
    allSection.addEventListener('click', event => {
    if (event.target.tagName === 'LI' && event.target.parentElement.classList.contains('tamanhos')) {
        const selectedSize = event.target;
        const allSizes = selectedSize.parentElement.querySelectorAll('li');

        allSizes.forEach(li => li.classList.remove('tamanho-selecionado'));

        selectedSize.classList.add('tamanho-selecionado');
    }
});

    // Detecta a rolagem da tela
    window.addEventListener('scroll', () => {
        const toggleRect = menuToggle.getBoundingClientRect();

        // Ajusta a posição do nav-menu conforme a posição do menu-toggle
        if (toggleRect.top <= 0) {
            navMenu.classList.add('fixed-menu');
        } else {
            navMenu.classList.remove('fixed-menu');
        }
    });
});