//declarar as var em escopo global
var altura = 0
var largura = 0
var vidas = 1
var tempo = 20
var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
	criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
	criaMosquitoTempo = 750
}

//medir a tela do usuário para os objetos não aparecerem fora da área visível
function ajustaTamanhoTela() {
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(largura, altura)
}

ajustaTamanhoTela()

var cronometro = setInterval(function() {
	tempo--
	if (tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo

	}
}, 1000)

/*
gerando uma posição aleatória
aqui, encapsulei todos os códigos em uma função para que ela seja chamada depois
da criação do body no documento HTML
antes de gerar, testar se já existe mosquito
*/
function posicaoRandomica() {
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		if (vidas > 3) {
			window.location.href = 'gameover.html'
		} else {

			console.log('elemento selecionado foi v' + vidas)
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
			vidas++
		}
		
	}

	var posicaoX = Math.floor(Math.random() * largura) - 90 //tirar uma margem do máximo
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX //evita que a posição seja negativa com a margem	
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento HTML através do DOM
	var mosquito = document.createElement('img') //var mosquito cria uma img

	document.body.appendChild(mosquito) //cria um mosquito (img) filho no body
	mosquito.src = 'imagens/mosca.png' //modifica os atributos de mosquito
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {this.remove()}
}

//criar uma randomização do tamanho
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	console.log(classe)

	switch(classe) {
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

console.log(tamanhoAleatorio())

//criar randomização para o lado da imagem
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)

	switch(classe) {
		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}

console.log(ladoAleatorio())
