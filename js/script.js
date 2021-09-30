//var variable = "" - variável simples
//var variable = [] - array/lista
//var variable = {} - objeto JS. Dentro do objeto teremos "chaves:valores" separados por vírgula

var toad = {
  avatar: "../img/toad.jpg",
  nome: "Toad",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0,
  resultado: "none"
};

// console.log(mario); chama no console todos os dados do objeto
// console.log(mario.empates); chama no console o dado específico "empates"

var mario = {
  avatar: "../img/mario.jpg",
  nome: "Mario",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0,
  resultado: "none"
};

var luigi = {
  avatar: "../img/luigi.jpg",
  nome: "Luigi",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0,
  resultado: "none"
};

var yoshi = {
  avatar: "../img/yoshi.jpg",
  nome: "Yoshi",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0,
  resultado: "none"
};

//joga o resultado retorno da função calculaPontos() para a variável específica de cada objeto/jogador
toad.pontos = calculaPontos(toad);
mario.pontos = calculaPontos(mario);
luigi.pontos = calculaPontos(luigi);
yoshi.pontos = calculaPontos(yoshi);

function calculaPontos(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates;
  return pontos;
}

var jogadores = [toad, mario, luigi, yoshi];

exibeJogadoresNaTela(jogadores);
//linha para chamada da função abaixo:

function exibeJogadoresNaTela(jogadores) {
  verificar();
  var html = "";
  for (var i = 0; i < jogadores.length; i++) {
    html +=
      "<tr class='" +
      jogadores[i].resultado +
      "'><td><img height='50px' src='" +
      jogadores[i].avatar +
      "'></td>";
    html += "<td>" + jogadores[i].nome + "<span id='emoji'>✌</span></td>";
    html += "<td>" + jogadores[i].vitorias + "</td>";
    html += "<td>" + jogadores[i].empates + "</td>";
    html += "<td>" + jogadores[i].derrotas + "</td>";
    html += "<td>" + jogadores[i].pontos + "</td>";
    html +=
      "<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
    html +=
      "<td><button onClick='adicionarEmpate(" + i + ")'>Empate</button></td>";
    html +=
      "<td><button onClick='excluirJogador(" + i + ")'>❌</button></td></tr>";
  }
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = html;
}

//html+= significa que html = html + algum outro parâmetro ("o elemento é somado a si mesmo e algo mais")

//Criamos a função acima para coletar os dados do array Jogadores através do for e salvar dentro da variável "html", já com formatação de linhas (tr) e colunas (td). Depois indicamos ao JS que precisamos buscar um determinado campo específico no HTML para onde enviaremos estes dados. O comando .getElementById puxa do HTML o identificador (id) utilizado na estrutura da página para onde devemos enviar esses dados e o comando .innerHTML= indica quais os dados que deverão ser retornados para essa id.

function adicionarVitoria(i) {
  var jogador = jogadores[i];
  for (var i = 0; i < jogadores.length; i++) {
    if (jogadores[i] !== jogador) {
      jogadores[i].derrotas++;
    } else {
      jogador.vitorias++;
    }
  }
  jogador.pontos = calculaPontos(jogador);
  exibeJogadoresNaTela(jogadores);
}

function adicionarEmpate(i) {
  for (var i = 0; i < jogadores.length; i++) {
    var jogador = jogadores[i];
    jogador.empates++;
    jogador.pontos = calculaPontos(jogador);
  }
  exibeJogadoresNaTela(jogadores);
}

function excluirJogador(i) {
  var jogador = jogadores[i];
  for (var i = 0; i < jogadores.length; i++) {
    if (jogadores[i] == jogador) {
      var indice = jogadores.indexOf(jogador);
      if (indice > -1) {
        jogadores.splice(indice, 1);
      }
    }
  }
  exibeJogadoresNaTela(jogadores);
}

function adicionarJogador() {
  var novoJogador = document.getElementById("jogador").value;
  var avatar = document.getElementById("avatar").value;
  if (novoJogador != "") {
    if (avatar.endsWith(".jpg") || avatar.endsWith(".png")) {
      jogador.innerHTML = novoJogador;
      var novoJogador = {
        avatar: avatar,
        nome: novoJogador,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        pontos: 0,
        resultado: "none"
      };
      jogadores.push(novoJogador);
      novoJogador.pontos = calculaPontos(novoJogador);
      exibeJogadoresNaTela(jogadores);
    } else {
      alert("Endereço de imagem inválido");
    }
  } else {
    alert("É obrigatório inserir o nome do jogador");
  }
  document.getElementById("jogador").value = "";
  document.getElementById("avatar").value = "";
}

function resetarJogo() {
  for (var i = 0; i < jogadores.length; i++) {
    jogadores[i].vitorias = 0;
    jogadores[i].empates = 0;
    jogadores[i].derrotas = 0;
    jogadores[i].pontos = 0;
  }
  exibeJogadoresNaTela(jogadores);
}

function resetarTabela() {
  var aviso = confirm("Você tem certeza que quer remover todos os jogadores?");
  if (aviso == true) {
    jogadores = [];
  }
  exibeJogadoresNaTela(jogadores);
}

function verificar() {
  var j = 0;
  var pt_max = 0;
  for (var i = 0; i < jogadores.length; i++) {
    jogadores[i].resultado = "none";
    if (jogadores[i].pontos > pt_max) {
      pt_max = jogadores[i].pontos;
      j = i;
    }
  }

  if (pt_max != 0) {
    jogadores[j].resultado = "win";
  }
}
