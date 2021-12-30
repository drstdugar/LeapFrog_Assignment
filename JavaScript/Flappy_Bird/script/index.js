import {Bird} from './bird.js';
import {constants} from './constant.js';
import {Pipes} from './pipes.js';
import {clearCanvas, getRandomInt} from './utilities.js';

const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('play');
const restartBtn = document.getElementById('replay');
const startScreen = document.getElementById('game-start');
const overScreen = document.getElementById('game-over');
const scoreView = document.getElementById('curr-score');
const hScoreView = document.getElementById('high-score');

const ctx = canvas.getContext('2d');

canvas.height = constants.SCREEN_HEIGHT;
canvas.width = constants.GAME_WIDTH;

let speed = 1;
let bird = [];
let pipes = [];

let score = 0;

let gameState = 'Menu';

function styleBackground() {
  canvas.style.background = "url('./assets/background.png')";
  canvas.style.backgroundRepeat = 'repeat-x';
  canvas.style.backgroundSize = 'contain';
}

function start() {
  ctx.font = '15px Arial';
  ctx.fillText(`Score: ${score}`, 270, 30);

  speed -= 0.5;
  canvas.style.backgroundPositionX = `${speed}%`;

  const bottomImage = new Image();
  bottomImage.src = './assets/bottom_background.png';
  bottomImage.onload = function () {
    ctx.drawImage(bottomImage, 0 + speed, 550, constants.GAME_WIDTH, 140);
  };

  bird[0].draw(ctx);
  bird[0].gravityEffect();

  pipesMove();

  if (bird[0].collision) {
    gameState = 'Over';
    checkScore();
  }

  if (gameState != 'Over') {
    requestAnimationFrame(start);
  } else {
    gameState = 'Menu';
    overScreen.style.opacity = 1;
    overScreen.style.zIndex = 1;
    canvas.style.opacity = 1;
    checkScore();
  }
}

function pipesMove() {
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].draw(ctx);
    pipes[i].move();

    bird[0].checkCollision(pipes[i]);

    if (pipes[i].offScreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }
}

function checkScore() {
  let hscore = localStorage.getItem('flappyHighScore');
  hScoreView.textContent = hscore ? `${hscore}` : '0';
  if (hscore < score) {
    localStorage.setItem('flappyHighScore', score);
    hScoreView.textContent = `${localStorage.getItem('flappyHighScore')}`;
  }
  scoreView.textContent = `${score}`;
}

function createBird() {
  const newBird = new Bird();
  bird.push(newBird);
}

function createPipe() {
  const pipe = new Pipes(
    getRandomInt(constants.GAME_WIDTH, 700),
    getRandomInt(100, constants.GAME_HEIGHT - 200)
  );
  pipes.push(pipe);
}

function startGame() {
  styleBackground();
  createBird();
  start();
}

function clearVals() {
  clearInterval(interval);
  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);
  score = 0;
  bird = [];
  pipes = [];
}

function changeStyle() {
  overScreen.style.opacity = 0;
  overScreen.style.zIndex = 0;
  canvas.style.zIndex = 1;
}

let interval = setInterval(() => createPipe(), 1100);

document.addEventListener('click', () => bird[0].jump());

restartBtn.addEventListener('click', () => {
  clearVals();
  gameState = 'Running';
  changeStyle();
  startGame();
  interval = setInterval(() => createPipe(), 1100);
});

startBtn.addEventListener('click', () => {
  gameState = 'Running';
  startGame();
  startScreen.style.opacity = 0;
  startScreen.style.zIndex = 0;
  overScreen.style.zIndex = 1;
});
