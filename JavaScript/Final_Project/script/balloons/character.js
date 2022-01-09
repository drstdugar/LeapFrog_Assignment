import {clearCanvas} from '../utilities.js';

export class Character {
  constructor(posx, posy, height, width, stay, speed) {
    this.posx = posx;
    this.posy = posy;
    this.height = height;
    this.width = width;
    this.stay = stay;
    this.speed = speed;
  }

  draw(ctx) {
    const characterImage = new Image();
    characterImage.src = this.stay
      ? './assets/balloon-images/char_hang.png'
      : './assets/balloon-images/char_jump.png';

    characterImage.onload = function () {
      if (!this.stay)
        clearCanvas(
          ctx,
          this.posx - 10,
          this.posy - 20,
          this.width,
          this.height + 40
        );

      ctx.drawImage(
        characterImage,
        this.posx,
        this.posy,
        this.width,
        this.height
      );
    }.bind(this);
  }

  move() {
    this.posy += this.speed;
  }

  jumps(start, end, percent) {
    var dx = end.x - start.x;
    var dy = end.y - start.y;
    this.posx = start.x + dx * percent;
    this.posy = start.y + dy * percent;
  }
}
