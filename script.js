document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const carrinhoIcon = document.querySelector('.carrinho');
    const checkoutBar = document.querySelector('.checkout-bar');
    const itemCountCheckout = document.getElementById('item-count-checkout');
    const checkoutList = document.getElementById('checkout-list');
    const itemCountDisplay = document.querySelector('.item-count');
    const btnFinalizar = document.getElementById('btn-finalizar');
    const allSection = document.getElementById('all'); // Elemento onde os produtos são renderizados
    const closeBtn = document.querySelector('.close-btn'); // Ícone de fechar

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
        updateCheckoutItemCount();
        updateCheckoutList();
    });

    // Evento de clique no ícone de fechar
    closeBtn.addEventListener('click', () => {
        checkoutBar.classList.remove('active');
        // Limpar a lista de produtos no checkout ao fechar
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
        updateCheckoutItemCount();
    }

    // Função para adicionar produto ao carrinho
    function addToCart(produto) {
        console.log(`Produto ${produto.nome} adicionado ao carrinho!`);
        itemCount++;

        // Atualiza o contador de itens no carrinho
        updateCheckoutItemCount();
        console.log(`Quantidade atual no carrinho: ${itemCount}`);

        alert(`Produto ${produto.nome} adicionado ao carrinho com sucesso!`);
    }

    // Função para remover produto do carrinho
    function removeProduct(index) {
        const produto = produtos[index];
        if (produto.quantidade > 0) {
            console.log(`Removendo produto ${produto.nome} do carrinho.`);
            produto.quantidade--;

            // Atualiza o contador de itens no carrinho
            itemCount--;

            // Atualiza a lista de checkout para refletir a remoção do produto
            updateCheckoutList();

            // Atualiza o contador de itens no resumo da compra
            updateCheckoutItemCount();

            console.log(`Quantidade atual no carrinho: ${itemCount}`);
        }
    }

    // Função para atualizar a lista de produtos no resumo da compra
    function updateCheckoutList() {
        checkoutList.innerHTML = ''; // Limpa a lista atual

        // Cria novos itens na lista baseados nos produtos no carrinho
        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];
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
                    removeProduct(i); // Remove o produto da posição i
                });
            }
        }
    }

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
                // Atualiza a quantidade do produto no objeto
                produto.quantidade++;
                produto.tamanhoSelecionado = tamanhoSelecionado.textContent;

                // Adiciona ao carrinho
                addToCart(produto);
                // Limpa a seleção de tamanho
                tamanhoSelecionado.classList.remove('tamanho-selecionado');

                // Atualiza a lista de produtos no resumo da compra imediatamente após adicionar
                updateCheckoutList();
            } else {
                alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
            }
        });

        return divProduto;
    }

    // Adiciona cada produto à seção de produtos
    produtos.forEach(produto => {
        const produtoElement = criarProduto(produto);
        allSection.appendChild(produtoElement); // Aqui adicionamos ao 'allSection'
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

    // Evento de clique no botão Finalizar
    btnFinalizar.addEventListener('click', () => {
        if (itemCount > 0) {
            finalizarCompra();
        } else {
            alert('Adicione produtos ao carrinho antes de finalizar a compra.');
        }
    });

    // Função para finalizar a compra
    function finalizarCompra() {
        alert('Compra finalizada!');
        
        // Resetar a quantidade de itens e atualizar os contadores
        itemCount = 0;
        updateCheckoutItemCount();

        // Limpar a lista de produtos no checkout
        clearCheckoutList();

        // Esconder a barra de checkout
        checkoutBar.classList.remove('active');
    }

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
