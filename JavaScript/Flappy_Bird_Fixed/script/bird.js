import {clearCanvas} from './utilities.js';
import {constants} from './constant.js';
class Bird {
  constructor() {
    this.posx = constants.BIRD_X;
    this.posy = constants.BIRD_Y;
    this.vel = 0;
    this.gravity = 0.05;
    this.lift = -1.5;
    this.size = 40;
    this.flipTime = 0;
    this.flap = false;
    this.collision = false;
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
    this.vel = this.lift;
  }

  gravityEffect() {
    this.vel += this.gravity;
    this.vel *= 1;
    this.posy += this.vel;
  }

  checkCollision(pipe) {
    if (this.posy + this.size > constants.GAME_HEIGHT) {
      this.collision = true;
      this.vel = 0;
    }

    if (this.posy < 0) {
      this.collision = true;
      this.vel = 0;
      this.gravity = 0;
    }

    if (
      (this.posy <= pipe.top ||
        this.posy + this.size >= constants.GAME_HEIGHT - pipe.bottom) &&
      this.posx >= pipe.posx
    ) {
      this.posx = pipe.posx - this.size;
      this.collision = true;
    }
  }
}

export {Bird};
