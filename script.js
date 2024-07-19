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
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');

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

    // Toggle do menu móvel
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Mostrar/ocultar barra de finalização ao clicar no ícone de carrinho
    carrinhoIcon.addEventListener('click', () => {
        checkoutBar.classList.toggle('active');
        updateCheckoutList();
        updateCheckoutItemCount();
    });

    // Evento de clique no ícone de fechar
    closeBtn.addEventListener('click', () => {
        checkoutBar.classList.remove('active'); 
        clearCheckoutList();
    });

    // Função para atualizar o número de itens no resumo da compra
    function updateCheckoutItemCount() {
        itemCountCheckout.textContent = itemCount;
        itemCountDisplay.textContent = itemCount;
    }

    // Função para limpar a lista de produtos no resumo da compra
    function clearCheckoutList() {
        checkoutList.innerHTML = '';
        itemCount = 0;
        produtos.forEach(produto => produto.quantidade = 0);
        updateCheckoutItemCount();
    }

    // Função para adicionar produto ao carrinho
    function addToCart(produto) {
        produto.quantidade++;
        itemCount++;
        updateCheckoutList();
        updateCheckoutItemCount();
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

                // Adiciona evento de clique para o botão de remover
                const removeButton = item.querySelector('.remove-btn');
                removeButton.addEventListener('click', () => {
                    removeProduct(index);
                });
            }
        });
    }

    // Exibir o modal ao clicar no botão de finalizar
    btnFinalizar.addEventListener('click', () => {
        if (itemCount > 0) {
            loginModal.style.display = 'flex';
        } else {
            alert('Adicione produtos ao carrinho antes de finalizar a compra');
        }
    });

    // Fechar o modal ao clicar no botão de fechar
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Processar o formulário de login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            alert('Compra concluída com sucesso!');
        
        clearCheckoutList();

            loginModal.style.display = 'none';
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
                alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
            }
        });

        return divProduto;
    }

    // Adiciona cada produto à seção de produtos
    produtos.forEach(produto => {
        const produtoElement = criarProduto(produto);
        allSection.appendChild(produtoElement);
    });

    // Evento de clique nos tamanhos
    allSection.addEventListener('click', event => {
        if (event.target.tagName === 'LI' && event.target.parentElement.classList.contains('tamanhos')) {
            const selectedSize = event.target;
            const allSizes = selectedSize.parentElement.querySelectorAll('li');

            // Remove a classe 'tamanho-selecionado' de todos os tamanhos
            allSizes.forEach(li => li.classList.remove('tamanho-selecionado'));

            // Adiciona a classe ao tamanho selecionado
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
