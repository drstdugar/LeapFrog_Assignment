import {Balloon} from './balloon.js';
import {getRandomInt, clearCanvas} from '../utilities.js';
import {generateLetters} from './words.js';
import {constants} from '../constants.js';
import {Character} from './character.js';

const canvas = document.getElementById('balloon-game');
const gameMode = document.getElementById('game-mode');
const typingMode = document.getElementById('type-mode');
const balloonBtn = document.getElementById('balloon-btn');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');

const ctx = canvas.getContext('2d');

const balloons = [];

const audio = new Audio('./assets/audio/key-click.wav');

let index = 0;
let percent = 0;
let move = 0;
let letters = [];
let gameSpeed;
let lives = 3;

let animationId;
let char;

canvas.width = constants.GAME_WIDTH;
canvas.height = constants.GAME_HEIGHT;

gameMode.addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'flex';
});

typingMode.addEventListener('click', () => (location.href = './index.html'));

balloonBtn.addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'none';
  location.href = './balloons.html';
});

easyBtn.addEventListener('click', () => {
  document.querySelector('.speed-overlay').style.display = 'none';
  gameSpeed = 4;
  start();
});

mediumBtn.addEventListener('click', () => {
  document.querySelector('.speed-overlay').style.display = 'none';
  gameSpeed = 7;
  start();
});

hardBtn.addEventListener('click', () => {
  document.querySelector('.speed-overlay').style.display = 'none';
  gameSpeed = 10;
  start();
});

setBackground();

function start() {
  letters = generateLetters();
  createBalloons();

  char = new Character(
    balloons[0].posx + 15,
    balloons[0].posy + 80,
    120,
    70,
    true,
    gameSpeed
  );

  drawBalloons(balloons);
}

function createBalloons() {
  balloons.push(
    new Balloon(10, getRandomInt(5, 100), 150, 70, 'Start', gameSpeed, true)
  );

  for (let i = 0; i < letters.length; i++) {
    let balloon = new Balloon(
      (i + 1) * 160,
      getRandomInt(5, 100),
      150,
      70,
      letters[i],
      gameSpeed
    );

    balloons.push(balloon);
  }

  balloons.push(
    new Balloon(
      (letters.length + 1) * 170,
      getRandomInt(5, 100),
      150,
      60,
      'Ends',
      gameSpeed,
      true
    )
  );
}

function drawBalloons() {
  balloons.forEach((balloon, i) => {
    if (i === 0) {
      balloon.draw(ctx, char);
    } else {
      balloon.draw(ctx);
    }
  });
}

document.addEventListener('keypress', e => {
  audio.play();

  if (e.key === letters[index] || index == letters.length) {
    cancelAnimationFrame(animationId);
    jump();
    moveBackground();
    if (e.key === letters[index]) balloonDrop();

    index++;
  }
});

function jump() {
  char.stay = false;
  char.draw(ctx);

  percent += 0.05;
  char.jumps(
    {x: balloons[0].posx, y: balloons[0].posy},
    {x: balloons[1].posx + 15, y: balloons[1].posy + 80},
    percent
  );

  if (char.posx < balloons[1].posx + 15) {
    requestAnimationFrame(jump);
  } else {
    percent = 0;
    char.posx = 235;
    char.posy = balloons[1].posy + 80;
    char.stay = true;

    balloons[1].draw(ctx, char);

    balloons.splice(0, 1);

    clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);

    balloons.forEach((balloon, index) => {
      balloon.posx = (index + 1) * 220;
    });

    drawBalloons();
  }
}

function moveBackground() {
  move += 0.5;
  canvas.style.backgroundPositionX = `-${move}%`;

  if (move % 5 != 0) requestAnimationFrame(moveBackground);
}

function balloonDrop() {
  balloons[0].draw(ctx, char);
  balloons[0].move(char);

  if (balloons[0].posy + balloons[0].height < constants.GAME_HEIGHT) {
    animationId = requestAnimationFrame(balloonDrop);
  } else {
    lives--;
  }
}

function setBackground() {
  canvas.style.background =
    "url('./assets/balloon-images/balloon_background.jpg')";
  canvas.style.backgroundRepeat = 'repeat-x';
  canvas.style.backgroundSize = 'contain';
}
