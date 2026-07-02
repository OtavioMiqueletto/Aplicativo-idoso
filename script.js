// Dados dos golpes
const golpes = [
    {
        id: 'whatsapp',
        icone: '📱',
        titulo: 'Golpe do WhatsApp',
        descricaoCurta: 'Alguém com a foto de um parente pede dinheiro urgente.',
        comoFunciona: 'O golpista pega a foto de um filho ou neto seu nas redes sociais, usa um número diferente e manda mensagem dizendo que trocou de número e precisa de um PIX urgente para pagar uma conta.',
        comoProteger: 'NUNCA faça transferências. Ligue por telefone (não pelo WhatsApp) para o número ANTIGO que você tem da pessoa para confirmar se é ela mesma.'
    },
    {
        id: 'banco',
        icone: '🏦',
        titulo: 'Falso Atendente de Banco',
        descricaoCurta: 'Ligação dizendo que seu cartão foi clonado.',
        comoFunciona: 'Alguém liga dizendo ser do seu banco, informando compras estranhas no seu cartão. Eles pedem sua senha ou mandam um motoqueiro buscar o cartão na sua casa.',
        comoProteger: 'Desligue imediatamente! O banco nunca pede sua senha e nunca manda buscar cartões na sua casa. Se estiver na dúvida, vá pessoalmente à sua agência.'
    },
    {
        id: 'links',
        icone: '🔗',
        titulo: 'Links Falsos (Promoções)',
        descricaoCurta: 'Mensagens no celular sobre prêmios ou produtos muito baratos.',
        comoFunciona: 'Você recebe um SMS ou mensagem no WhatsApp dizendo que você ganhou um prêmio, tem pontos a vencer ou com uma geladeira por um preço absurdo de barato. Há um link azul para clicar.',
        comoProteger: 'Não clique nesses links azuis! Apague a mensagem. Se a promoção parece boa demais para ser verdade, provavelmente é mentira.'
    },
    {
        id: 'amoroso',
        icone: '❤️',
        titulo: 'Golpe do Namoro Virtual',
        descricaoCurta: 'Pessoa estranha muito carinhosa na internet.',
        comoFunciona: 'Alguém que você não conhece começa a conversar com você, se mostra muito apaixonado rapidamente e, de repente, inventa uma história triste pedindo dinheiro para uma passagem ou cirurgia.',
        comoProteger: 'Nunca envie dinheiro, PIX ou dados pessoais para pessoas que você conheceu apenas pela internet e nunca viu pessoalmente.'
    }
];

// 1. Função para renderizar os cards na tela inicial
function renderizarCards() {
    const container = document.getElementById('lista-golpes');
    
    golpes.forEach(golpe => {
        const card = document.createElement('button');
        // Estilo do botão card (acessível, grande área de clique)
        card.className = "bg-cartao border-4 border-borda rounded-2xl p-6 text-left hover:border-primaria hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-primaria flex flex-col items-center sm:items-start text-center sm:text-left cursor-pointer transform hover:-translate-y-1";
        card.setAttribute('aria-label', `Ler mais sobre ${golpe.titulo}`);
        card.onclick = () => abrirModal(golpe.id);
        
        card.innerHTML = `
            <div class="text-6xl mb-4">${golpe.icone}</div>
            <h2 class="text-2xl font-bold mb-3 text-texto w-full">${golpe.titulo}</h2>
            <p class="text-lg opacity-90">${golpe.descricaoCurta}</p>
            <div class="mt-6 font-bold text-primaria text-lg flex items-center gap-2 w-full justify-center sm:justify-start">
                Ler como se proteger 
                <svg class="w-6 h-6 icone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        `;
        container.appendChild(card);
    });
}

// 2. Funções do Modal
function abrirModal(id) {
    const golpe = golpes.find(g => g.id === id);
    if (!golpe) return;

    document.getElementById('modal-icone').innerText = golpe.icone;
    document.getElementById('modal-titulo').innerText = golpe.titulo;
    document.getElementById('modal-como-funciona').innerText = golpe.comoFunciona;
    document.getElementById('modal-como-proteger').innerText = golpe.comoProteger;

    const modal = document.getElementById('modal-golpe');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-aberto');
    
    // Focar no botão de fechar para acessibilidade
    modal.querySelector('button').focus();
}

function fecharModal() {
    document.getElementById('modal-golpe').classList.add('hidden');
    document.body.classList.remove('modal-aberto');
}

// Fechar modal ao clicar na área escura (fora da janela)
document.getElementById('modal-golpe').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharModal();
    }
});

// Fechar modal ao apertar a tecla "Esc"
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !document.getElementById('modal-golpe').classList.contains('hidden')) {
        fecharModal();
    }
});

// 3. Funções de Acessibilidade (Tamanho da Fonte)
let tamanhoBase = 18; // Tamanho inicial
const minTamanho = 14;
const maxTamanho = 32; 

function mudarTamanhoFonte(mudanca) {
    tamanhoBase += mudanca;
    
    if (tamanhoBase < minTamanho) tamanhoBase = minTamanho;
    if (tamanhoBase > maxTamanho) tamanhoBase = maxTamanho;

    document.documentElement.style.fontSize = `${tamanhoBase}px`;
}

// 4. Função de Acessibilidade (Alto Contraste)
function alternarContraste() {
    document.body.classList.toggle('alto-contraste');
    
    const estaAtivo = document.body.classList.contains('alto-contraste');
    localStorage.setItem('altoContraste', estaAtivo);
}

// Verifica ao carregar a página se o contraste estava ativo antes
function checarPreferencias() {
    const contrasteSalvo = localStorage.getItem('altoContraste');
    if (contrasteSalvo === 'true') {
        document.body.classList.add('alto-contraste');
    }
}

// Iniciar o site
window.onload = () => {
    renderizarCards();
    checarPreferencias();
};
