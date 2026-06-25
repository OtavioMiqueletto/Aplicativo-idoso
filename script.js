// --- 1. CONTROLE DE ACESSIBILIDADE (FONTE E CONTRASTE) ---
let tamanhoFonteAtual = 18; 
const tamanhoMinimo = 14;
const tamanhoMaximo = 32;

function alterarTamanhoFonte(mudanca) {
    tamanhoFonteAtual += mudanca;
    
    if (tamanhoFonteAtual < tamanhoMinimo) tamanhoFonteAtual = tamanhoMinimo;
    if (tamanhoFonteAtual > tamanhoMaximo) tamanhoFonteAtual = tamanhoMaximo;

    document.documentElement.style.setProperty('--tamanho-fonte-base', tamanhoFonteAtual + 'px');
}

function alternarAltoContraste() {
    document.body.classList.toggle('alto-contraste');
}

// --- 2. CONTROLE DA LISTA DE VERIFICAÇÃO (CHECKLIST) ---
function marcarItem(elemento) {
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    if (event.target !== checkbox && event.target.tagName !== 'LABEL') {
        checkbox.checked = !checkbox.checked;
    }
    calcularSeguranca();
}

function calcularSeguranca() {
    let marcados = 0;
    
    if (document.getElementById('opcao-whats').checked) marcados++;
    if (document.getElementById('opcao-ligar').checked) marcados++;
    if (document.getElementById('opcao-senha').checked) marcados++;
    if (document.getElementById('opcao-links').checked) marcados++;
    if (document.getElementById('opcao-aplicativos').checked) marcados++;

    const divResultado = document.getElementById('resultado-checklist');
    
    if (marcados === 0) {
        divResultado.innerHTML = "❌ Marque os itens acima para avaliar sua segurança.";
        divResultado.style.backgroundColor = "var(--cor-botao-fundo)";
        divResultado.style.color = "var(--cor-texto)";
    } else if (marcados <= 2) {
        divResultado.innerHTML = "⚠️ Nível: Alerta! Você pode se proteger mais. Tente aplicar as dicas acima no seu telefone o quanto antes.";
        divResultado.style.backgroundColor = "#e53e3e";
        divResultado.style.color = "#ffffff";
    } else if (marcados <= 4) {
        divResultado.innerHTML = "🛡️ Nível: Muito bom! Você já toma ótimos cuidados de segurança. Continue assim!";
        divResultado.style.backgroundColor = "#dd6b20";
        divResultado.style.color = "#ffffff";
    } else {
        divResultado.innerHTML = "👑 Nível: Mestre da Segurança! Parabéns! Seu celular está muito protegido contra golpistas.";
        divResultado.style.backgroundColor = "var(--cor-sucesso)";
        divResultado.style.color = "#ffffff";
    }
}

// --- 3. CONTROLE DO JOGO / SIMULADOR INTERATIVO ---
const cenarios = [
    {
        titulo: "Desafio 1: Conversa no WhatsApp",
        tipo: "WhatsApp",
        mensagemHtml: `
            <div class="balao-conversa">Oi mãe! Esse é meu número novo. Salva aí na sua agenda tá?</div>
            <div class="balao-conversa">Estou tentando fazer um pagamento aqui mas meu aplicativo do banco deu erro. Você consegue fazer um PIX de R$ 900 para mim? Te pago de volta amanhã cedo, juro! 🙏</div>
        `,
        respostaCorreta: "golpe",
        explicacaoCorreta: "Excelente escolha! É um GOLPE! Um número desconhecido pedindo PIX urgente fingindo ser seu filho é o golpe mais comum do WhatsApp. Sempre ligue para o número antigo dele para conferir por ligação de voz ou vídeo.",
        explicacaoIncorreta: "Atenção! Isso é um GOLPE perigoso. Nunca envie dinheiro para números novos sem antes telefonar de volta para o número original e falar cara a cara ou ouvir a voz real do seu parente!"
    },
    {
        titulo: "Desafio 2: Mensagem de Texto (SMS) do Banco",
        tipo: "SMS",
        mensagemHtml: `
            <div class="balao-conversa" style="background-color: #f7fafc; color: #1a202c;">
                <strong>BANCO NOTÍCIA:</strong> Compra aprovada no valor de R$ 2.450,00 nas Lojas de Varejo em 25/06/2026. Caso desconheça a transação, cancele agora mesmo clicando no link: <u>bancoseguro-ajuda.com/recuperar</u>
            </div>
        `,
        respostaCorreta: "golpe",
        explicacaoCorreta: "Correto! É um GOLPE! Bancos de verdade nunca mandam links de cancelamento ou que peçam seus dados e senhas em mensagens de texto. Se tiver dúvida, ignore e verifique diretamente em seu extrato oficial.",
        explicacaoIncorreta: "Muito cuidado! É um GOLPE clássico. Bancos de verdade NUNCA enviam mensagens com links urgentes de cancelamento de compras. Eles usam esses sites falsos para capturar sua senha bancária."
    },
    {
        titulo: "Desafio 3: Contato do seu Gerente Real",
        tipo: "Contato Físico",
        mensagemHtml: `
            <div class="balao-conversa" style="background-color: #f7fafc; color: #1a202c;">
                Você está no banco oficial da sua cidade ou abriu o seu aplicativo do banco que já usa há anos e há um aviso padrão na sua caixa de entrada oficial sobre atualizações de segurança para as agências físicas.
            </div>
        `,
        respostaCorreta: "seguro",
        explicacaoCorreta: "Perfeito! Isso é SEGURO. Informações vistas dentro do aplicativo oficial que você baixou na Play Store/App Store ou tiradas na agência oficial do seu banco físico com o gerente de confiança são seguras.",
        explicacaoIncorreta: "Na verdade, isso é SEGURO! Consultar informações na própria agência do banco ou direto no app oficial (que você já tinha instalado de forma segura) é o método correto de cuidar das suas contas!"
    }
];

let cenarioAtualIndex = 0;

function carregarCenario(index) {
    const cenario = cenarios[index];
    const divCenario = document.getElementById('simulador-conteudo');
    
    // Oculta a área de feedback
    document.getElementById('resposta-feedback').style.display = 'none';

    // Carrega o layout visual da conversa
    divCenario.innerHTML = `
        <h3 style="text-align: center; color: var(--cor-destaque);">${cenario.titulo}</h3>
        <div class="mensagem-tela">
            <div style="font-size: 0.85em; color: #666666; text-align: center; margin-bottom: 10px;">Conversa Recebida</div>
            ${cenario.mensagemHtml}
        </div>
    `;
}

function verificarEscolha(escolhaUsuario) {
    const cenario = cenarios[cenarioAtualIndex];
    const divFeedback = document.getElementById('resposta-feedback');
    const tituloFeedback = document.getElementById('titulo-feedback');
    const textoFeedback = document.getElementById('texto-feedback');

    divFeedback.style.display = 'block';

    if (escolhaUsuario === cenario.respostaCorreta) {
        tituloFeedback.innerText = "🎉 Resposta Correta!";
        tituloFeedback.style.color = "var(--cor-sucesso)";
        textoFeedback.innerText = cenario.explicacaoCorreta;
    } else {
        tituloFeedback.innerText = "❌ Alerta de Segurança!";
        tituloFeedback.style.color = "var(--cor-alerta)";
        textoFeedback.innerText = cenario.explicacaoIncorreta;
    }
    
    // Faz a página rolar de forma suave até o feedback
    divFeedback.scrollIntoView({ behavior: 'smooth' });
}

function proximoCenario() {
    cenarioAtualIndex++;
    if (cenarioAtualIndex >= cenarios.length) {
        // Reinicia os desafios caso termine
        cenarioAtualIndex = 0;
    }
    carregarCenario(cenarioAtualIndex);
}

// Inicializa o primeiro desafio na tela quando a página carrega
window.onload = function() {
    carregarCenario(0);
    calcularSeguranca();
};