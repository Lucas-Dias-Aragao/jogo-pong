let xBolinha = 300;
let yBolinha = 200;
let diametro = 23;
let raio = diametro/2;

let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let meusPontos = 0;
let pontosDoOponente = 0;

let somRaquetada;
let somPonto;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  somPonto = loadSound("ponto.mp3");
  somRaquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(color(0,0,255));
  rect(0, 198, 600, 4)
  rect(299, 0, 2, 400)
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();  
}

function bolinhaNaoFicaPresa(){
  if (xBolinha + raio < 5|| xBolinha > 595){
  xBolinha = 300;
  }
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio> width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if(yBolinha + raio > height || yBolinha -raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }
}
/*
function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
} */

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
} 

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    somRaquetada.play();
  } 

  else if (xBolinha > xRaqueteOponente - raqueteComprimento && yBolinha + raio < yRaqueteOponente + raqueteAltura && yBolinha + raio > yRaqueteOponente) {
    velocidadeXBolinha *= -1;
    somRaquetada.play();
  } 
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(179, 6, 44, 25);
  fill(255);
  text(meusPontos, 200, 26);
  fill(color(255, 140, 0));
  rect(379, 6, 44, 25);
  fill(255);
  text(pontosDoOponente, 400, 26);
}

function marcaPonto() {
  if (xBolinha < 15) {
    pontosDoOponente += 1;
    somPonto.play();
  }

  else if (xBolinha > 585) {
    meusPontos += 1;
    somPonto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 10
    if (chanceDeErrar >= 40){
    chanceDeErrar = 41
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
