import {constants} from '../constants.js';

export class Content {
  constructor(content, para) {
    this.content = content;
    this.para = para;
    this.tokens = this.para.split(' ');
    this.newLine = [];
  }

  createContent() {
    let wordcount = 0;
    let words = 0;
    let classCount = 0;
    let lines = Math.ceil(this.para.length / constants.LINE_SIZE);

    for (let i = 0; i < lines; i++) {
      const line = document.createElement('span');

      line.style.display = 'block';
      line.classList.add('lines');

      for (let j = words; j < this.tokens.length; j++) {
        for (let k = 0; k < this.tokens[j].length; k++) {
          classCount++;
          wordcount++;

          const letters = document.createElement('span');

          letters.textContent = this.tokens[j][k];
          letters.classList.add('letters');
          letters.setAttribute('id', `letter${classCount}`);

          line.append(letters);
        }

        if (j != this.tokens.length - 1) {
          classCount++;
          const letters = document.createElement('span');

          letters.textContent = ' ';
          letters.classList.add('letters');
          letters.setAttribute('id', `letter${classCount}`);

          line.append(letters);
        }

        wordcount++;
        if (
          wordcount + this.tokens[words].length >= constants.LINE_SIZE ||
          words === this.tokens.length - 1
        ) {
          words++;
          wordcount = 0;
          break;
        }
        words++;
      }

      this.content.appendChild(line);
      this.newLine.push(classCount);
    }

    this.newLine.pop();
  }

  paragraphChange(para) {
    this.para = para;
    this.resetVals();
    this.createContent();
  }

  resetVals() {
    this.tokens = this.para.split(' ');
    this.content.innerHTML = '';
    this.newLine = [];
  }
}
