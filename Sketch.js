let xEsfera = 300;
let yEsfera = 200;
let diametro = 13;
let raio = diametro /2;

//Velocidade da Esfera//

let velocidadeXEsfera = 6;
let velocidadeYEsfera = 6;
let RaqueteComprimento = 10;
let RaqueteAltura = 90;

//Varíaveis da Raquete//

let xRaquete = 5;
let yRaquete = 150;

//Varíaveis do Oponente//

let xRaqueteOponente = 585; 
let yRaqueteOponente = 150;
let velocidadeYOponente;

let bateu = false

//placar do jogo//

let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo//

let raquetada;
let ponto;
let trilha;

function preload(){
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
  raquetada =loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraEsfera();
  movimentaEsfera();
  verificaColisaoEsfera();
  mostraRaquete(xRaquete, yRaquete);
  movimentaraquete();
  verificaColisaoRaquete();
  colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaqueteOponente(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar();
  marcaPonto();
}

function mostraEsfera (){
  circle(xEsfera, yEsfera, diametro);
}

function movimentaEsfera (){
  xEsfera += velocidadeXEsfera;
  yEsfera += velocidadeYEsfera;
}

function verificaColisaoEsfera(){
  if (xEsfera + raio > width ||
     xEsfera - raio < 0){
    velocidadeXEsfera *= -1;
  }
  
  if (yEsfera + raio > height ||
     yEsfera - raio < 0){
    velocidadeYEsfera *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, RaqueteComprimento, RaqueteAltura)
}

function mostraRaqueteOponente(x,y){
  rect(x, y, RaqueteComprimento, RaqueteAltura)
}

function movimentaraquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xEsfera - raio < xRaquete + RaqueteComprimento && yEsfera - raio < yRaquete + RaqueteAltura && yEsfera + raio > yRaquete){
    velocidadeXEsfera *= -1;
    raquetada.play();
  }
}

function colisaoMinhaRaqueteBiblioteca(x,y){
  bateu = collideRectCircle(x, y, RaqueteComprimento, RaqueteAltura, xEsfera, yEsfera, raio);
  if (bateu){
    velocidadeXEsfera *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yEsfera - yRaqueteOponente - RaqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 182, 193));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 182, 193));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xEsfera > 590){
    meusPontos +=1;
    ponto.play();
  }
  if(xEsfera < 10){
    pontosOponente +=1;
    ponto.play();
  }
}