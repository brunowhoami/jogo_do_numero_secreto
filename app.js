// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do número secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";
let numeroSorteado = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
   let campo = document.querySelector(tag);
   campo.innerHTML = texto
   responsiveVoice.speak(texto , "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagem(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagem();

function verificarChute() {
    let chute = document.querySelector("input").value;
    // console.log(chute);

    if(chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Parabéns!!!");
        let palavraTentativas = tentativas > 1 ? 'Tentativas!' : 'Tentativa!';
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela("p", "Seu chute é maior que o número secreto");
        } else {
            exibirTextoNaTela("p", "Seu chute é menor que o número secreto");
        }
        tentativas++;
        limparCampo();
    }

}
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumerosNaLista = numeroSorteado.length;

    if(quantidadeNumerosNaLista == numeroLimite){
        numeroSorteado = [];
    }
        if(numeroSorteado.includes(numeroEscolhido)){
            return gerarNumeroAleatorio();
    } else{
        numeroSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagem();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}