import {clearCanvas, calcSpeed} from '../utilities.js';
import {constants} from '../constants.js';
import {Monster} from './monster.js';
import {setBackground} from './snowballs_utility.js';
import {cursor} from '../typing mode/keyboard_utility.js';
import {Player} from './shooting_character.js';
import {Snowball} from './snowball.js';
import {getWord} from '../words.js';

const canvas = document.getElementById('snowball-game');

const gameMode = document.getElementById('game-mode');
const typingMode = document.getElementById('type-mode');
const balloonBtn = document.getElementById('balloon-btn');
const snowballBtn = document.getElementById('snowball-btn');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const reloadBtn = document.getElementById('reload-btn');
const words = document.getElementById('words');
// const typeSpeed = document.getElementById('type-speed');
// const life = document.getElementById('lives');

const ctx = canvas.getContext('2d');

const keyPressSound = new Audio('./assets/audio/key-click.wav');

let monster;
let character;
let snowball;
let index = 0;
// let letterCount = 0;
// let typingSpeed = 0;

// let letters = [];
// let balloons = [];

// let startTime;
let gameSpeed;
// let animationId;
// let character;

canvas.width = constants.GAME_WIDTH;
canvas.height = constants.GAME_HEIGHT;

gameMode.addEventListener('click', () => {
  document.querySelector('.overlay-games').style.display = 'flex';
  document.querySelector('.speed-overlay').style.display = 'none';
  document.querySelector('.finish-overlay').style.display = 'none';
});

typingMode.addEventListener('click', () => (location.href = './index.html'));

balloonBtn.addEventListener('click', () => {
  document.querySelector('.overlay-games').style.display = 'none';
  location.href = './balloons.html';
});

snowballBtn.addEventListener('click', () => {
  document.querySelector('.overlay-games').style.display = 'none';
  location.href = './snowballs.html';
});

easyBtn.addEventListener('click', () => {
  gameSpeed = 0.3;
  document.querySelector('.speed-overlay').style.display = 'none';
  //   document.querySelector('.speed-lives').style.display = 'block';
  start();
});

mediumBtn.addEventListener('click', () => {
  gameSpeed = 0.6;
  document.querySelector('.speed-overlay').style.display = 'none';
  //   document.querySelector('.speed-lives').style.display = 'block';
  start();
});

hardBtn.addEventListener('click', () => {
  gameSpeed = 0.9;
  document.querySelector('.speed-overlay').style.display = 'none';
  //   document.querySelector('.speed-lives').style.display = 'block';
  start();
});

let word;

let yetiFrames = 5;
let currFrame = 0;
let change = 0;

let charFrames = 4;
let charCurrFrame = 0;
let charChange = 0;

let throwBall = false;

reloadBtn.addEventListener('click', () => {
  document.querySelector('.finish-overlay').style.display = 'none';
  document.querySelector('.speed-overlay').style.display = 'flex';
  // life.textContent = 'Lives: 3';
  // typeSpeed.textContent = 'Speed: 0 LPM';
  // resetVals();
});

setBackground(canvas, false);

function start() {
  setBackground(canvas, true);

  monster = new Monster(
    950,
    318,
    constants.MONSTER_WIDTH,
    constants.MONSTER_HEIGHT,
    gameSpeed
  );

  character = new Player(
    320,
    380,
    constants.CHARACTER_WIDTH,
    constants.CHARACTER_HEIGHT
  );

  snowball = new Snowball(character.posx + 80, character.posy + 35, 20, 20);
  generateWords();

  animate();
}

function generateWords() {
  words.innerHTML = '';
  word = getWord();

  for (let i = 0; i < word.length; i++) {
    const letters = document.createElement('span');

    letters.classList.add('letters-snowball');
    letters.setAttribute('id', `letter${i + 1}`);
    letters.textContent = word[i];

    words.append(letters);
  }

  cursor(index, word.length, 'highlight');
}

function animate() {
  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);

  monster.draw(ctx, yetiFrames, currFrame);
  character.draw(ctx, charFrames, charCurrFrame);
  if (throwBall) snowball.draw(ctx);

  monster.move();
  if (change % 14 === 0) {
    currFrame++;
    change = 0;
  }

  change++;

  if (currFrame % yetiFrames == 0) {
    currFrame = 1;
  }

  if (monster.posx > character.posx + character.width) {
    requestAnimationFrame(animate);
  } else {
    document.querySelector('.finish-overlay').style.display = 'flex';
  }
}

document.addEventListener('keypress', e => {
  keyPressSound.play();

  if (e.key === word[index]) {
    throwBall = true;

    shoot();
    throwSnowball();

    document.querySelector(`#letter${index + 1}`).classList.add('pressed');

    index++;

    cursor(index, word.length, 'highlight');

    if (index === word.length) {
      index = 0;
      generateWords();
    }
  }

  //   if (e.key === letters[index] || index == letters.length) {
  //     letterCount++;

  //     cancelAnimationFrame(animationId);

  //     index++;

  //     if (index == 1) startTime = new Date();

  //     if (index >= 2) {
  //       typingSpeed = calcSpeed(startTime, letterCount);
  //       typeSpeed.textContent = `Speed: ${typingSpeed} LPM`;
  //     }

  //     if (index == letters.length + 1) {
  //       document.querySelector('.finish-overlay').style.display = 'flex';
  //       document.querySelector(
  //         '#speed'
  //       ).textContent = `Speed: ${typingSpeed} LPM`;
  //       document.querySelector(
  //         '#best-speed'
  //       ).textContent = `Best Speed: ${checkScore(typingSpeed)} LPM`;
  //     }
  //   }
});

function throwSnowball() {
  snowball.draw(ctx);
  snowball.move();

  if (snowball.posx < monster.posx) {
    requestAnimationFrame(throwSnowball);
  } else {
    throwBall = false;
    snowball.posx = character.posx + 80;
    monster.posx += 20;
  }
}

function shoot() {
  clearCanvas(
    ctx,
    character.posx,
    character.posy,
    character.width,
    character.height
  );

  character.draw(ctx, charFrames, charCurrFrame);

  if (charChange % 7 === 0) {
    charCurrFrame++;
    charChange = 0;
  }

  charChange++;

  if (charCurrFrame % charFrames != 0) {
    requestAnimationFrame(shoot);
  } else {
    charCurrFrame = 0;
    charChange = 0;
  }
}

// function resetVals() {
//   balloons = [];
//   letters = [];
//   index = 0;
//   lives = 3;
//   letterCount = 0;
//   move = 0;
// }

// function resetPos() {
//   clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);
//   balloons[0].posy = 20;
//   character.posx = balloons[0].posx + 20;
//   character.posy = balloons[0].posy + 80;
// }
