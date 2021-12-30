import {constants} from './constant.js';
import {clearCanvas} from './utilities.js';

class Pipes {
  constructor(posx, top) {
    this.posx = posx;
    this.top = top;
    this.bottom = constants.GAME_HEIGHT - (this.top + constants.HOLE);
    this.width = constants.PIPE_WIDTH;
  }

  draw(ctx) {
    const topPipe = new Image();
    topPipe.src = './assets/top_pipe.png';
    topPipe.onload = function () {
      clearCanvas(ctx, this.posx, 0, this.width + 20, this.top);
      ctx.drawImage(topPipe, this.posx, 0, this.width, this.top);
    }.bind(this);

    const bottomPipe = new Image();
    bottomPipe.src = './assets/bottom_pipe.png';
    bottomPipe.onload = function () {
      clearCanvas(
        ctx,
        this.posx,
        constants.GAME_HEIGHT - this.bottom,
        this.width + 20,
        this.bottom
      );
      ctx.drawImage(
        bottomPipe,
        this.posx,
        constants.GAME_HEIGHT - this.bottom,
        this.width,
        this.bottom
      );
    }.bind(this);
  }

  move() {
    this.posx -= 5;
  }

  offScreen() {
    if (this.posx + this.width <= 0) {
      return true;
    }
  }
}

export {Pipes};
