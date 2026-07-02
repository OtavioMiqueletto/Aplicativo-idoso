// --- 1. Lógica de Acessibilidade (Tamanho da Fonte) ---
let tamanhoFonteAtual = 16; 
const rootHtml = document.documentElement;

function mudarTamanhoTexto(passo) {
    tamanhoFonteAtual += passo;
    
    // Limites para o texto não ficar minúsculo demais nem gigante a ponto de quebrar a tela
    if (tamanhoFonteAtual < 14) tamanhoFonteAtual = 14;
    if (tamanhoFonteAtual > 26) tamanhoFonteAtual = 26;
    
    rootHtml.style.fontSize = tamanhoFonteAtual + 'px';
}

// --- 2. Lógica de Alto Contraste ---
function alternarContraste() {
    document.body.classList.toggle('alto-contraste');
}

// --- 3. Base de Dados dos Golpes (Conteúdo do Modal) ---
const conteudoGolpes = {
    whatsapp: {
        icone: "📱",
        titulo: "Golpes no WhatsApp",
        texto: `
            <p class="font-bold text-red-600 dark-alto-contraste">Como funciona:</p>
            <p>O criminoso manda mensagem de um número desconhecido usando a foto do seu filho, neto ou amigo. Ele diz que "trocou de número" e, logo depois, inventa uma emergência pedindo uma transferência em dinheiro ou PIX.</p>
            
            <div class="bg-green-100 p-4 rounded-lg mt-4 border-l-4 border-green-600 text-black">
                <p class="font-bold text-green-800 text-2xl mb-2">🛡️ Como se proteger:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>NUNCA</strong> transfira dinheiro para um número novo sem antes falar com a pessoa.</li>
                    <li>Ligue para o número <strong>ANTIGO</strong> da pessoa (por telefone normal ou chamada de voz).</li>
                    <li>Se a pessoa disser que não pode atender ligações, <strong>desconfie na hora</strong>. É golpe.</li>
                </ul>
            </div>
        `
    },
    banco: {
        icone: "🏦",
        titulo: "Falso Funcionário do Banco",
        texto: `
            <p class="font-bold text-red-600">Como funciona:</p>
            <p>Você recebe uma ligação de alguém muito educado dizendo ser do seu banco. Eles dizem que seu cartão foi clonado ou que há uma compra suspeita. Eles pedem para você digitar sua senha no telefone e dizem que mandarão um motoboy buscar seu cartão cortado.</p>
            
            <div class="bg-green-100 p-4 rounded-lg mt-4 border-l-4 border-green-600 text-black">
                <p class="font-bold text-green-800 text-2xl mb-2">🛡️ Como se proteger:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>O banco <strong>NUNCA</strong> manda alguém buscar seu cartão na sua casa.</li>
                    <li>O banco <strong>NUNCA</strong> pede sua senha por telefone.</li>
                    <li>Se receber essa ligação, <strong>desligue imediatamente</strong>. Se quiser confirmar, pegue o número que está atrás do seu cartão e ligue usando o celular de outra pessoa.</li>
                </ul>
            </div>
        `
    },
    links: {
        icone: "🔗",
        titulo: "Links Falsos no Celular",
        texto: `
            <p class="font-bold text-red-600">Como funciona:</p>
            <p>Você recebe um SMS ou mensagem no WhatsApp dizendo que seus pontos do cartão vão expirar, que tem um pacote nos Correios preso, ou uma multa falsa. Junto, vem um link azul para você clicar.</p>
            
            <div class="bg-green-100 p-4 rounded-lg mt-4 border-l-4 border-green-600 text-black">
                <p class="font-bold text-green-800 text-2xl mb-2">🛡️ Como se proteger:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Não clique</strong> em links enviados por mensagens de desconhecidos.</li>
                    <li>Não preencha formulários na internet com seus dados pessoais (CPF, senhas).</li>
                    <li>Se estiver na dúvida, feche a mensagem e abra o aplicativo oficial da loja, banco ou Correios.</li>
                </ul>
            </div>
        `
    },
    compras: {
        icone: "🛒",
        titulo: "Promoções Milagrosas",
        texto: `
            <p class="font-bold text-red-600">Como funciona:</p>
            <p>Você vê um anúncio no Facebook ou Instagram de um produto caro (como uma TV, celular ou geladeira) por um preço absurdamente barato. Você clica, o site parece verdadeiro, mas após pagar (geralmente por PIX ou boleto), o produto nunca chega.</p>
            
            <div class="bg-green-100 p-4 rounded-lg mt-4 border-l-4 border-green-600 text-black">
                <p class="font-bold text-green-800 text-2xl mb-2">🛡️ Como se proteger:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Se o preço está barato demais, <strong>é mentira</strong>.</li>
                    <li>Prefira comprar em lojas grandes e famosas que você já conhece.</li>
                    <li>Peça ajuda a um familiar mais jovem antes de realizar compras em sites desconhecidos.</li>
                </ul>
            </div>
        `
    },
    amoroso: {
        icone: "❤️",
        titulo: "Golpe do Amor Virtual",
        texto: `
            <p class="font-bold text-red-600">Como funciona:</p>
            <p>Uma pessoa desconhecida e muito bonita começa a conversar com você pela internet. Ela ganha sua confiança ao longo de semanas, finge estar apaixonada e, de repente, surge uma "emergência" (doença, viagem, problemas na alfândega) e ela pede dinheiro emprestado.</p>
            
            <div class="bg-green-100 p-4 rounded-lg mt-4 border-l-4 border-green-600 text-black">
                <p class="font-bold text-green-800 text-2xl mb-2">🛡️ Como se proteger:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Nunca envie dinheiro</strong> para pessoas que você conheceu apenas pela internet e nunca viu pessoalmente.</li>
                    <li>Não envie fotos íntimas ou dados pessoais.</li>
                    <li>Fique atento: criminosos têm paciência e podem conversar por meses antes de pedir dinheiro.</li>
                </ul>
            </div>
        `
    }
};

// --- 4. Lógica do Modal ---
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalScrollArea = document.getElementById('modalScrollArea');

function abrirModal(chave) {
    const dados = conteudoGolpes[chave];
    
    modalTitle.innerHTML = `<span>${dados.icone}</span> ${dados.titulo}`;
    modalBody.innerHTML = dados.texto;
    
    modalOverlay.classList.remove('hidden');
    modalScrollArea.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    
    ajustarCoresModalAltoContraste();
}

function fecharModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

modalOverlay.addEventListener('click', function(evento) {
    if (evento.target === modalOverlay) {
        fecharModal();
    }
});

document.addEventListener('keydown', function(evento) {
    if (evento.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        fecharModal();
    }
});

function ajustarCoresModalAltoContraste() {
    const boxes = document.querySelectorAll('.bg-green-100');
    const titulos = document.querySelectorAll('.text-red-600');
    
    if (document.body.classList.contains('alto-contraste')) {
        boxes.forEach(box => {
            box.style.backgroundColor = '#000000';
            box.style.color = '#ffff00';
            box.style.borderColor = '#ffff00';
        });
        titulos.forEach(titulo => {
            titulo.style.color = '#ffff00';
        });
    } else {
        boxes.forEach(box => {
            box.style.backgroundColor = '';
            box.style.color = '';
            box.style.borderColor = '';
        });
        titulos.forEach(titulo => {
            titulo.style.color = '';
        });
    }
}

const observer = new MutationObserver(ajustarCoresModalAltoContraste);
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });