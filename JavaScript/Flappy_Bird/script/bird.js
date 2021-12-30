import {clearCanvas} from './utilities.js';
import {constants} from './constant.js';

class Bird {
  constructor() {
    this.posx = constants.BIRD_X;
    this.posy = constants.BIRD_Y;
    this.vel = 0;
    this.gravity = 0.05;
    this.lift = -2;
    this.size = 40;
    this.flipTime = 0;
    this.flap = false;
  }

  draw(ctx) {
    const birdImage = new Image();
    birdImage.src = this.flap ? './assets/bird2.png' : './assets/bird1.png';
    birdImage.onload = function () {
      clearCanvas(ctx, 0, 0, 80, constants.GAME_HEIGHT);
      ctx.drawImage(birdImage, this.posx, this.posy, this.size, this.size);
    }.bind(this);
    this.flipTime++;
    if (this.flipTime > 20) {
      this.flap = !this.flap;
      this.flipTime = 0;
    }
    this.gravityEffect();
  }

  jump() {
    this.vel += this.lift;
  }

  gravityEffect() {
    this.vel += this.gravity;
    this.vel *= 1;
    this.posy += this.vel;

    if (this.posy + this.size > constants.GAME_HEIGHT) {
      constants.GAME_STATE = 'Over';
      this.posy = constants.GAME_HEIGHT - this.size;
      this.vel = 0;
    }

    if (this.posy < 0) {
      constants.GAME_STATE = 'Over';
      this.posy = 0;
      this.vel = 0;
      this.gravity = 0;
    }
  }
}

export {Bird};
