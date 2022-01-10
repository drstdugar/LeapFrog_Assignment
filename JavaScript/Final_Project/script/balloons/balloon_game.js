import {clearCanvas, calcSpeed} from '../utilities.js';
import {generateLetters} from './words.js';
import {constants} from '../constants.js';
import {Character} from './character.js';
import {
  setBackground,
  createBalloons,
  drawBalloons,
  manageDisplay,
  checkScore,
} from './balloon_utility.js';

const canvas = document.getElementById('balloon-game');
const gameMode = document.getElementById('game-mode');
const typingMode = document.getElementById('type-mode');
const balloonBtn = document.getElementById('balloon-btn');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const reloadBtn = document.getElementById('reload-btn');
const typeSpeed = document.getElementById('type-speed');
const life = document.getElementById('lives');

const ctx = canvas.getContext('2d');

const audio = new Audio('./assets/audio/key-click.wav');

let index = 0;
let percent = 0;
let move = 0;
let lives = 3;
let letterCount = 0;
let typingSpeed = 0;

let letters = [];
let balloons = [];

let startTime;
let gameSpeed;
let animationId;
let character;

canvas.width = constants.GAME_WIDTH;
canvas.height = constants.GAME_HEIGHT;

gameMode.addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'flex';
  document.querySelector('.speed-overlay').style.display = 'none';
  document.querySelector('.finish-overlay').style.display = 'none';
});

typingMode.addEventListener('click', () => (location.href = './index.html'));

balloonBtn.addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'none';
  location.href = './balloons.html';
});

easyBtn.addEventListener('click', () => {
  gameSpeed = 4;
  manageDisplay();
  start();
});

mediumBtn.addEventListener('click', () => {
  gameSpeed = 7;
  manageDisplay();
  start();
});

hardBtn.addEventListener('click', () => {
  gameSpeed = 10;
  manageDisplay();
  start();
});

reloadBtn.addEventListener('click', () => {
  document.querySelector('.finish-overlay').style.display = 'none';
  document.querySelector('.speed-overlay').style.display = 'flex';
  life.textContent = 'Lives: 3';
  typeSpeed.textContent = 'Speed: 0 LPM';
  resetVals();
});

setBackground(canvas, false);

function start() {
  letters = generateLetters();

  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);
  setBackground(canvas, true);
  balloons = createBalloons(gameSpeed, letters);

  character = new Character(
    balloons[0].posx + 15,
    balloons[0].posy + 80,
    120,
    70,
    true,
    gameSpeed
  );

  drawBalloons(ctx, balloons, character);
}

document.addEventListener('keypress', e => {
  audio.play();

  if (e.key === letters[index] || index == letters.length) {
    letterCount++;

    cancelAnimationFrame(animationId);
    jump();
    moveBackground();

    if (e.key === letters[index]) balloonDrop();

    index++;

    if (index == 1) startTime = new Date();

    if (index >= 2) {
      typingSpeed = calcSpeed(startTime, letterCount);
      typeSpeed.textContent = `Speed: ${typingSpeed} LPM`;
    }

    if (index == letters.length + 1) {
      document.querySelector('.finish-overlay').style.display = 'flex';
      document.querySelector(
        '#speed'
      ).textContent = `Speed: ${typingSpeed} LPM`;
      document.querySelector(
        '#best-speed'
      ).textContent = `Best Speed: ${checkScore(typingSpeed)} LPM`;
    }
  }
});

function jump() {
  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);
  character.stay = false;

  percent += 0.05;
  character.jumps(
    {x: balloons[0].posx + 8, y: balloons[0].posy + 80},
    {x: balloons[1].posx + 8, y: balloons[1].posy + 80},
    percent
  );

  character.draw(ctx);
  shift();

  if (character.posx < balloons[1].posx + 8) {
    requestAnimationFrame(jump);
  } else {
    afterJump();
  }
}

function afterJump() {
  percent = 0;
  character.posx = balloons[1].posx + 8;
  character.posy = balloons[1].posy + 80;
  character.stay = true;

  balloons[1].draw(ctx, character);

  balloons.splice(0, 1);

  shift();
}

function shift() {
  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);

  balloons.forEach((balloon, i) => {
    slide();
    function slide() {
      balloon.posx -= 10;

      if (balloon.posx > (i + 1) * 220) requestAnimationFrame(slide);
    }
  });

  drawBalloons(ctx, balloons, character);
}

function moveBackground() {
  move += 0.5;
  canvas.style.backgroundPositionX = `-${move}%`;

  if (move % 5 != 0) requestAnimationFrame(moveBackground);
}

function balloonDrop() {
  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);
  balloons[0].draw(ctx, character);
  balloons[0].move(character);

  drawBalloons(ctx, balloons, character);

  if (balloons[0].posy + balloons[0].height <= constants.GAME_HEIGHT) {
    animationId = requestAnimationFrame(balloonDrop);
  } else {
    collideWall();
  }
}

function collideWall() {
  lives--;

  life.textContent = `Lives: ${lives}`;

  resetPos();
  drawBalloons(ctx, balloons, character);

  if (lives === 0) {
    clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);

    document.querySelector('.finish-overlay').style.display = 'flex';
    document.querySelector('#speed').textContent = `Speed: ${typingSpeed} LPM`;
    document.querySelector('#best-speed').style.display = 'none';

    resetVals();
  }
}

function resetVals() {
  balloons = [];
  letters = [];
  index = 0;
  lives = 3;
  letterCount = 0;
  move = 0;
}

function resetPos() {
  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);
  balloons[0].posy = 20;
  character.posx = balloons[0].posx + 15;
  character.posy = balloons[0].posy + 80;
}
