import {constants} from '../constants.js';
import {clearCanvas} from '../utilities.js';

export class Balloon {
  constructor(posx, posy, height, width, text, speed, start) {
    this.posx = posx;
    this.posy = posy;
    this.height = height;
    this.width = width;
    this.start = start;
    this.text = text;
    this.speed = speed;
  }

  draw(ctx, char) {
    const balloonImage = new Image();
    balloonImage.src = './assets/balloon-images/balloon.png';
    balloonImage.onload = function () {
      clearCanvas(ctx, this.posx, 0, this.width + 30, constants.GAME_HEIGHT);
      ctx.drawImage(
        balloonImage,
        this.posx,
        this.posy,
        this.width,
        this.height
      );

      if (char) char.draw(ctx);

      ctx.font = '27px Arial';
      ctx.fillStyle = 'white';

      if (this.start) {
        ctx.fillText(this.text, this.posx + 4, this.posy + 45);
      } else {
        ctx.fillText(this.text, this.posx + 28, this.posy + 45);
      }
    }.bind(this);
  }

  move(char) {
    this.posy += this.speed;
    if (char) char.move();
  }
}
