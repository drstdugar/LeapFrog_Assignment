import {Content} from './content.js';
import {
  match,
  clickEffect,
  showHint,
  claculateAccuracy,
} from './keyboard_utility.js';
import {calcSpeed, cursor, getRandomInt} from '../utilities.js';
import {paragraphs, lessons} from '../paragraphs.js';
import {constants} from '../constants.js';

const content = document.getElementById('content');
const changePara = document.getElementById('change-para');
const gameMode = document.getElementById('game-mode');
const dropDown = document.getElementById('lesson-option');
const lessonBtn = document.getElementById('lesson-btn');

const keyPressSound = new Audio('./assets/audio/key-click.wav');

let index = 0;
let correct = 0;
let wordCount = 0;

let startTime;

let lessonMode = true;
let lessonNos = 1;

let para = lessonMode
  ? lessons[lessonNos]
  : paragraphs[getRandomInt(1, constants.PARAGRAPH_COUNT)];

changePara.addEventListener('click', () => {
  lessonMode = false;
  resetVals();
});

gameMode.addEventListener(
  'click',
  () => (location.href = './game_navigator.html')
);

lessonBtn.addEventListener('click', () => {
  lessonMode = true;
  lessonNos = dropDown.value;
  resetVals();
});

const contents = new Content(content, para);
contents.createContent();

cursor(index, para.length, 'cursor');

showHint(para, index, contents);

document.addEventListener('keypress', e => {
  let pressedKey = e.code;
  let pressedVal = e.key;

  if (index === para.length) {
    if (lessonMode) lessonNos++;
    dropDown.value = lessonNos;
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
  para = lessonMode
    ? lessons[lessonNos]
    : paragraphs[getRandomInt(1, constants.PARAGRAPH_COUNT)];
  contents.paragraphChange(para);

  correct = 0;
  wordCount = 0;
  index = 0;

  let activeList = document.querySelectorAll('.active');
  activeList.forEach(element => element.classList.remove('active'));

  showHint(para, index, contents);
  cursor(index, para.length, 'cursor');

  document.querySelector('.accuracy').textContent = 'Accuracy: 0%';
  document.querySelector('.speed').textContent = 'Speed: 0 WPM';
}
