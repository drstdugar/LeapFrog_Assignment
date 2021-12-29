import {getRandomInt} from './utility.js';

const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('game-start');
const overScreen = document.getElementById('game-over');
const scoreView = document.getElementById('score');

const ctx = canvas.getContext('2d');

const gameHeight = 690;
const gameWidth = 600;

const laneCount = 3;
const pos = [140, 270, 400];

canvas.height = gameHeight;
canvas.width = gameWidth;

let roadSpeed = 2;

let cars = [];

let score = 0;
let gameSpeed = 4;

let over = false;

class Car {
  constructor(player, lane, posy) {
    this.player = player;
    this.lane = lane;
    this.posx = pos[this.lane];
    this.posy = posy;
    this.height = 120;
    this.width = 70;
  }

  draw() {
    const carImage = new Image();
    carImage.src = this.player
      ? './images/player.png'
      : './images/obstacle.png';

    ctx.drawImage(carImage, this.posx, this.posy, this.width, this.height);
  }

  movePlayer() {
    document.addEventListener('keydown', event => {
      if (event.code === 'ArrowLeft') {
        if (this.lane != 0) {
          this.lane--;
          ctx.clearRect(this.posx, this.posy, this.width, this.height);
          this.posx = pos[this.lane];
          this.draw();
        }
      } else if (event.code === 'ArrowRight') {
        if (this.lane != laneCount - 1) {
          this.lane++;
          ctx.clearRect(this.posx, this.posy, this.width, this.height);
          this.posx = pos[this.lane];
          this.draw();
        }
      } else if (event.code === 'ArrowUp') {
        console.log('bullet');
        const bulletImage = new Image();
        bulletImage.src = './images/bullet.png';
        console.log(bulletImage);
        bulletImage.onload = function () {
          ctx.drawImage(bulletImage, 270, 520 + 20, 100, 100);
        };
      }
    });
  }

  moveObstacles() {
    this.posy += gameSpeed;

    if (this.posy > this.height + gameHeight) {
      this.posy = -getRandomInt(150, 1000);

      checkSpace();

      score++;
      if (score % 4 == 0) gameSpeed = gameSpeed + 3;
      console.log(score, gameSpeed);
    }

    this.checkCollision();
  }

  checkCollision() {
    if (
      this.posx < cars[0].posx + cars[0].width &&
      this.posx + this.width > cars[0].posx &&
      this.posy < cars[0].posy + cars[0].height &&
      this.posy + this.height > cars[0].posy
    ) {
      over = true;
      gameOver();
    }
  }
}

function createObstacle() {
  for (let i = 0; i < laneCount; i++) {
    let obs = new Car(false, i, -getRandomInt(150, 1000, 50));
    cars.push(obs);
  }

  checkSpace();
}

function checkSpace() {
  for (let i = 1; i < laneCount; i++) {
    if (
      Math.abs(cars[i].posy - cars[i + 1].posy) < 2 * cars[i].height &&
      cars[i + 1].posy < 0
    ) {
      cars[i + 1].posy = -(Math.abs(cars[i].posy) + 2.2 * cars[i].height);
      return;
    }
  }
}

function start() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 270, 30);

  for (let i = 0; i < cars.length; i++) {
    cars[i].draw();
    if (!cars[i].player) cars[i].moveObstacles();
  }
  if (!over) requestAnimationFrame(start);
}

function styleRoad() {
  canvas.style.background = "url('./images/road.png')";
  canvas.style.backgroundRepeat = 'repeat-y';
  canvas.style.backgroundSize = 'contain';
}

function startRoad() {
  roadSpeed = roadSpeed + gameSpeed;
  canvas.style.backgroundPositionY = `${roadSpeed}%`;
  if (!over) requestAnimationFrame(startRoad);
}

function startGame() {
  startRoad();

  const player = new Car(true, 1, 500);
  player.draw();
  player.movePlayer();

  cars.push(player);

  createObstacle();
  start();
}

function gameOver() {
  overScreen.style.opacity = 0.72;
  scoreView.textContent = `Your Score: ${score}`;
}

restartBtn.addEventListener('click', () => {
  over = false;
  cars = [];
  score = 0;
  gameSpeed = 4;
  startGame();
  overScreen.style.opacity = 0;
});

styleRoad();
startBtn.addEventListener('click', () => {
  startGame();
  startScreen.style.opacity = 0;
  startScreen.style.zIndex = 0;
  overScreen.style.zIndex = 1;
});
