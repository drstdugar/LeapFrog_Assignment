import {clearCanvas, calcSpeed, cursor, checkScore} from '../utilities.js';
import {constants} from '../constants.js';
import {Monster} from './monster.js';
import {setBackground} from './snowballs_utility.js';
import {Player} from './shooting_character.js';
import {Snowball} from './snowball.js';
import {getWord} from '../words.js';
import {frameInfo} from './frames.js';

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
const typeSpeed = document.getElementById('type-speed');
const lifeBar = document.getElementById('life-bar');
const monsterLife = document.getElementById('life');

const ctx = canvas.getContext('2d');

const keyPressSound = new Audio('./assets/audio/key-click.wav');
const wrongKeyPressSound = new Audio('./assets/audio/wrong_key_press.wav');
const snowballHit = new Audio('./assets/audio/snowball_hit.wav');

let monster;
let character;
let snowball;
let word;
let gameSpeed;
let backShift;
let damage;
let startTime;
let monsterAnimation;

let throwBall = false;

let index = 0;
let wordCount = 0;
let typingSpeed = 0;
let lifeBarPos = 470;
let life = 100;

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
  gameSpeed = constants.SNOWBALL_EASY.speed;
  backShift = constants.SNOWBALL_EASY.back;
  damage = constants.SNOWBALL_EASY.damage;
  document.querySelector('.speed-overlay').style.display = 'none';
  start();
});

mediumBtn.addEventListener('click', () => {
  gameSpeed = constants.SNOWBALL_MEDIUM.speed;
  backShift = constants.SNOWBALL_MEDIUM.back;
  damage = constants.SNOWBALL_MEDIUM.damage;
  document.querySelector('.speed-overlay').style.display = 'none';
  start();
});

hardBtn.addEventListener('click', () => {
  gameSpeed = constants.SNOWBALL_HARD.speed;
  backShift = constants.SNOWBALL_HARD.back;
  damage = constants.SNOWBALL_HARD.damage;
  document.querySelector('.speed-overlay').style.display = 'none';
  start();
});

reloadBtn.addEventListener('click', () => {
  document.querySelector('.finish-overlay').style.display = 'none';
  document.querySelector('.speed-overlay').style.display = 'flex';
  typeSpeed.textContent = 'Speed: 0 WPM';
  index = 0;
});

setBackground(canvas, false);

function start() {
  setBackground(canvas, true);

  monster = new Monster(
    900,
    318,
    constants.MONSTER_WIDTH,
    constants.MONSTER_HEIGHT,
    gameSpeed
  );

  character = new Player(
    270,
    380,
    constants.SNOWBALL_CHARACTER_WIDTH,
    constants.SNOWBALL_CHARACTER_HEIGHT
  );

  snowball = new Snowball(character.posx + 80, character.posy + 35, 20, 20);

  lifeBar.style.display = 'block';

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

  monster.draw(ctx, frameInfo.monster.frames, frameInfo.monster.currFrame);
  character.draw(
    ctx,
    frameInfo.character.frames,
    frameInfo.character.currFrame
  );
  if (throwBall) snowball.draw(ctx);

  monster.move();

  lifeBar.style.right = `${(lifeBarPos += gameSpeed)}px`;

  if (frameInfo.monster.change % 14 === 0) {
    frameInfo.monster.currFrame++;
    frameInfo.monster.change = 0;
  }

  frameInfo.monster.change++;

  if (frameInfo.monster.currFrame % frameInfo.monster.frames == 0) {
    frameInfo.monster.currFrame = 1;
  }

  if (monster.posx > character.posx + character.width) {
    monsterAnimation = requestAnimationFrame(animate);
  } else {
    gameOver();
  }
}

document.addEventListener('keypress', e => {
  if (e.key === word[index]) {
    keyPressSound.play();
    throwBall = true;

    shoot();
    throwSnowball();

    document.querySelector(`#letter${index + 1}`).classList.add('pressed');

    index++;

    cursor(index, word.length, 'highlight');

    if (index === 1 && wordCount === 0) startTime = new Date();

    if (index === word.length) {
      wordCount++;
      index = 0;

      typingSpeed = calcSpeed(startTime, wordCount);
      typeSpeed.textContent = `Speed: ${typingSpeed} WPM`;

      generateWords();
    }
  } else {
    wrongKeyPressSound.play();
  }
});

function shoot() {
  clearCanvas(
    ctx,
    character.posx,
    character.posy,
    character.width,
    character.height
  );

  character.draw(
    ctx,
    frameInfo.character.frames,
    frameInfo.character.currFrame
  );

  if (frameInfo.character.change % 7 === 0) {
    frameInfo.character.currFrame++;
    frameInfo.character.change = 0;
  }

  frameInfo.character.change++;

  if (frameInfo.character.currFrame % frameInfo.character.frames != 0) {
    requestAnimationFrame(shoot);
  } else {
    frameInfo.character.currFrame = 0;
    frameInfo.character.change = 0;
  }
}

function throwSnowball() {
  snowball.draw(ctx);
  snowball.move();

  if (snowball.posx < monster.posx) {
    requestAnimationFrame(throwSnowball);
  } else {
    hitMonster();
  }
}

function hitMonster() {
  snowballHit.play();
  throwBall = false;
  snowball.posx = character.posx + 80;
  monster.posx += backShift;
  lifeBar.style.right = `${(lifeBarPos -= backShift)}px`;

  life -= damage;
  monsterLife.setAttribute('value', life);

  if (life <= 0) {
    console.log('hello');
    gameOver();
  }
}

function gameOver() {
  words.innerHTML = '';
  word = [];
  lifeBarPos = 470;
  life = 100;

  monsterLife.setAttribute('value', life);
  lifeBar.style.display = 'none';

  cancelAnimationFrame(monsterAnimation);
  clearCanvas(ctx, 0, 0, constants.GAME_WIDTH, constants.GAME_HEIGHT);
  setBackground(canvas, false);

  document.querySelector('.finish-overlay').style.display = 'flex';
  document.querySelector('#speed').textContent = `Speed: ${typingSpeed} WPM`;
  document.querySelector('#best-speed').textContent = `Best Speed: ${checkScore(
    typingSpeed,
    'snowballHighScore'
  )} WPM`;
}
