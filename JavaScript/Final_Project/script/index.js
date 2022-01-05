import {Content} from './paragraph.js';
import {
  match,
  clickEffect,
  changeContent,
  cursor,
  showHint,
  claculateAccuracy,
} from './keyboard_utility.js';

const content = document.getElementById('content');
const changePara = document.getElementById('change-para');

const audio = new Audio('./assets/audio/key-click.wav');

const contents = new Content(content);
contents.createContent();

let para = contents.para;
let index = 0;
let correct = 0;

cursor(index, para.length);

changePara.addEventListener('click', () => resetVals());

showHint(para, index, contents);

document.addEventListener('keypress', e => {
  audio.play();

  let pressedKey = e.code;
  let pressedVal = e.key;

  if (index === para.length) {
    resetVals();

    document.querySelector('.new-para').style.display = 'none';
    return;
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

  if (match(para[index], pressedVal, index)) correct++;
  index++;
  cursor(index, para.length);

  if (index === para.length) {
    document.querySelector('.new-para').style.display = 'inline-block';
  }

  document.querySelector(
    '.accuracy'
  ).textContent = `Accuracy: ${claculateAccuracy(correct, index)}%`;
});

function resetVals() {
  [para, index] = changeContent(contents);
  correct = 0;

  let activeList = document.querySelectorAll('.active');
  activeList.forEach(element => element.classList.remove('active'));

  showHint(para, index, contents);
  cursor(index, para.length);

  document.querySelector('.accuracy').textContent = 'Accuracy: 100%';
}
