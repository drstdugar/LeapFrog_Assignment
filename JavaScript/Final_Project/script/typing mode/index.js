import {Content} from './content.js';
import {
  match,
  clickEffect,
  changeContent,
  showHint,
  claculateAccuracy,
} from './keyboard_utility.js';
import {calcSpeed, cursor} from '../utilities.js';

const content = document.getElementById('content');
const changePara = document.getElementById('change-para');
const gameMode = document.getElementById('game-mode');
const typeMode = document.getElementById('type-mode');
const balloonBtn = document.getElementById('balloon-btn');
const snowballBtn = document.getElementById('snowball-btn');

const keyPressSound = new Audio('./assets/audio/key-click.wav');
const wrongKeyPressSound = new Audio('./assets/audio/wrong_key_press.wav');

const contents = new Content(content);

let para = contents.para;
let index = 0;
let correct = 0;
let wordCount = 0;
let startTime;

changePara.addEventListener('click', () => resetVals());

gameMode.addEventListener(
  'click',
  () => (document.querySelector('.overlay').style.display = 'flex')
);

typeMode.addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'none';
  location.href = './index.html';
});

balloonBtn.addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'none';
  location.href = './balloons.html';
});

snowballBtn.addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'none';
  location.href = './snowballs.html';
});

contents.createContent();

cursor(index, para.length, 'cursor');

showHint(para, index, contents);

document.addEventListener('keypress', e => {
  let pressedKey = e.code;
  let pressedVal = e.key;

  if (index === para.length) {
    resetVals();
    document.querySelector('.new-para').style.display = 'none';
    return;
  }

  if (para[index] === ' ') {
    wordCount++;
    document.querySelector('.speed').textContent = `Speed: ${calcSpeed(
      startTime,
      wordCount
    )} WPM`;
  }

  showHint(para, index + 1, contents);

  let element = document.getElementById(pressedKey.toLowerCase());
  clickEffect(element);

  if (contents.newLine.includes(index + 1)) {
    if (match(pressedVal, 'Enter', index)) correct++;
    index++;
    cursor(index, para.length);
    return;
  }

  if (match(para[index], pressedVal, index)) {
    correct++;
    keyPressSound.play();
  } else {
    wrongKeyPressSound.play();
  }

  index++;
  cursor(index, para.length, 'cursor');

  if (index === para.length) {
    document.querySelector('.new-para').style.display = 'inline-block';
  }

  if (index == 1) startTime = new Date();

  claculateAccuracy(correct, index);
});

function resetVals() {
  [para, index] = changeContent(contents);
  correct = 0;
  wordCount = 0;

  let activeList = document.querySelectorAll('.active');
  activeList.forEach(element => element.classList.remove('active'));

  showHint(para, index, contents);
  cursor(index, para.length);

  document.querySelector('.accuracy').textContent = 'Accuracy: 0%';
  document.querySelector('.speed').textContent = 'Speed: 0 WPM';
}
