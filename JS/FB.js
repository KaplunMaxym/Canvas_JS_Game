let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let bird = new Image();
let background = new Image();
let foreground = new Image();
let pipeUp = new Image();
let pipeDown = new Image();
let sale_persent = new Image();
let game_lose = new Image();
let winner = new Image();
let upAudio = new Audio();
let pointsAudio = new Audio();
let score_for_sale = document.getElementById('score_of_fb');
let game_relode_but = document.getElementById('game_relode_but');


bird.src = "img_game/boot.png";
background.src = "img_game/background.png";
foreground.src = "img_game/fg.png";
pipeUp.src = "img_game/down.png";
pipeDown.src = "img_game/up.png";
sale_persent.src = "img_game/sale.png";
game_lose.src = "img_game/lose.png";
winner.src = "img_game/win.png";
upAudio.src = "audio_game/fly.mp3";
pointsAudio.src = "audio_game/score.mp3";

let distance = 90;
let xb = 10;
let yb = 150;
let grav = 2;
let points = 0;

document.addEventListener("keydown", function(event) {
  if (event.code == 'Space') {
    yb -= 40;
  }
})


var pipes = [];
pipes[0] = {
  x : canvas.width,
  y : 0
}

function draw() {

  context.drawImage(background, 0, 0);
  for (let i = 0; i < pipes.length; i++) {
    context.drawImage(pipeUp, pipes[i].x, pipes[i].y);
    context.drawImage(sale_persent, pipes[i].x, pipes[i].y + 270, 50, 50);
    context.drawImage(pipeDown, pipes[i].x, pipes[i].y +
      pipeUp.height + distance);
    pipes[i].x--;
    if (pipes[i].x == 125) {
      pipes.push({
        x : canvas.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }
    if (xb + bird.width >= pipes[i].x &&
    xb <= pipes[i].x + pipeUp.width &&
    (yb <= pipes[i].y + pipeUp.height ||
    yb + bird.height >= pipes[i].y + pipeUp.height + distance)
    || yb + bird.height  >= canvas.height - foreground.height){
      return context.drawImage(game_lose, 0, 0, 288, 512)
      // location.reload();
    }
    if(points == 20){
      return context.drawImage(winner, 0, 0, 288, 512)
    }
    if (10 == pipes[i].x){
      points++;
      pointsAudio.play();
    }
  }

  context.drawImage(foreground, 0, canvas.height - foreground.height);
  context.drawImage(bird, xb, yb, 38, 26);
  yb += grav;
  context.fillStyle = "#ffd359"
  context.font = "24px Verdana"
  context.fillText(points/2, 10 , canvas.height - 23)
  if(points > 0){
    score_for_sale.textContent = points/2;
  }
  context.drawImage(sale_persent, 60 , canvas.height - 60, 50, 50)
  requestAnimationFrame(draw);
}

game_relode_but.onclick = function(){
  location.reload();
};


pipeDown.onload = draw;
