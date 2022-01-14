import {constants} from '../constants.js';

export class Character {
  constructor(posx, posy, height, width, stay, speed) {
    this.posx = posx;
    this.posy = posy;
    this.height = height;
    this.width = width;
    this.stay = stay;
    this.speed = speed;
    this.loaded = false;
  }

  set(ctx) {
    const characterImage = new Image();
    characterImage.src = './assets/images/balloon-images/spritesheet.png';

    let spritePos = this.stay ? 0 : 70;
    this.draw(ctx, characterImage, spritePos);

    if (!this.loaded) {
      characterImage.onload = () => {
        this.draw(ctx, characterImage, spritePos);
      };
      this.loaded = true;
    }
  }

  draw(ctx, characterImage, spritePos) {
    ctx.drawImage(
      characterImage,
      spritePos,
      0,
      this.width,
      this.height,
      this.posx,
      this.posy,
      this.width,
      this.height
    );
  }

  move() {
    this.posy += this.speed;
  }

  jumps(start, end, jumpSpeed) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    this.posx = start.x + dx * jumpSpeed;
    this.posy = start.y + dy * jumpSpeed;
  }

  // after collision with screen
  reset(balloon) {
    this.posx = balloon.posx + constants.BALLOON_CHARACTER_OFFSETX;
    this.posy = balloon.posy + constants.BALLOON_CHARACTER_OFFSETY;
  }
}
