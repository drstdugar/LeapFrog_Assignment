import {constants} from './constants.js';

const leftHand = document.getElementById('left-hand');
const rightHand = document.getElementById('right-hand');

function clickEffect(element) {
  element.classList.add('clicked');

  setTimeout(() => element.classList.remove('clicked'), 300);
}

function match(letter1, letter2, index) {
  if (letter1 === letter2) {
    correctBg(index);
    return true;
  } else {
    wrongBg(index);
  }
}

function correctBg(index) {
  document.querySelector(`#letter${index + 1}`).style.background =
    'rgba(0, 255, 13, 0.4)';
}

function wrongBg(index) {
  document.querySelector(`#letter${index + 1}`).style.background =
    'rgba(255, 0, 0, 0.4)';
}

function changeContent(content) {
  content.paragraphChange();
  document.querySelector('.new-para').style.display = 'none';
  return [content.para, 0];
}

function cursor(index, length) {
  if (index < length) {
    let currId = '#letter' + (index + 1);
    let prevId;

    document.querySelector(currId).classList.add('letters', 'cursor');

    if (index != 0) {
      prevId = '#letter' + index;
      document.querySelector(prevId).classList.remove('cursor');
    }
  }
}

function showHint(para, index, content) {
  let prevChar;
  let prevShiftKey, currShiftKey;
  if (index != 0) {
    prevChar = para[index - 1].toLowerCase();

    prevShiftKey = checkShift(para[index - 1]);

    if (prevChar.match('[a-z A-Z]')) {
      prevChar = prevChar === ' ' ? 'space' : prevChar;
      prevChar = content.newLine.includes(index) ? 'enter' : prevChar;
    } else {
      prevChar = specialChars(prevChar);
    }

    document.querySelector(`.${prevChar}`).classList.remove('active');
    if (prevShiftKey) prevShiftKey.classList.remove('active');
  }

  if (index < para.length) {
    let currChar = para[index].toLowerCase();

    if (currChar.match('[a-z A-Z]')) {
      currChar =
        currChar === ' '
          ? content.newLine.includes(index + 1)
            ? 'enter'
            : 'space'
          : currChar;
    } else {
      currChar = specialChars(currChar);
    }

    moveHand(currChar);

    currShiftKey = checkShift(para[index]);

    document.querySelector(`.${currChar}`).classList.add('active');
    if (currShiftKey) currShiftKey.classList.add('active');
  }
}

function specialChars(char) {
  switch (char) {
    case '[':
    case '{':
      return 'rightbrackets';

    case ']':
    case '}':
      return 'leftbrackets';

    case '\\':
    case '|':
      return 'backslash';

    case ';':
    case ':':
      return 'semicolon';

    case "'":
    case '"':
      return 'quote';

    case '<':
    case ',':
      return 'comma';

    case '.':
    case '>':
      return 'period';

    case '/':
    case '?':
      return 'slash';

    default:
      break;
  }
}

function checkShift(letter) {
  if (constants.SHIFT_RIGHT.includes(letter)) {
    rightHand.setAttribute('src', './assets/hand_positions/shift-right.svg');
    return document.getElementById('shift-right');
  }

  if (constants.SHIFT_LEFT.includes(letter)) {
    leftHand.setAttribute('src', './assets/hand_positions/shift-left.svg');
    return document.getElementById('shift-left');
  }
}

function claculateAccuracy(correct, typed) {
  return Math.floor((correct / typed) * 100);
}

function moveHand(currChar) {
  if (constants.LEFT.includes(currChar)) {
    leftHand.setAttribute('src', `./assets/hand_positions/${currChar}.svg`);
    rightHand.setAttribute('src', './assets/hand_positions/neutral-right.svg');
  } else {
    leftHand.setAttribute('src', './assets/hand_positions/neutral-left.svg');
    rightHand.setAttribute('src', `./assets/hand_positions/${currChar}.svg`);
  }
}

export {cursor, match, clickEffect, changeContent, showHint, claculateAccuracy};
