export class Balloon {
  constructor(posx, posy, height, width, text, speed, start) {
    this.posx = posx;
    this.posy = posy;
    this.height = height;
    this.width = width;
    this.text = text;
    this.speed = speed;
    this.start = start;
    this.loaded = false;
  }

  set(ctx, char) {
    const balloonImage = new Image();
    balloonImage.src = './assets/images/balloon-images/balloon.png';
    this.draw(ctx, balloonImage);

    if (!this.loaded) {
      balloonImage.onload = () => {
        this.draw(ctx, balloonImage);
        this.loaded = true;
      };
    }

    if (char) char.set(ctx);
  }

  draw(ctx, balloonImage) {
    ctx.drawImage(balloonImage, this.posx, this.posy, this.width, this.height);

    ctx.font = '27px Arial';
    ctx.fillStyle = 'white';

    if (this.start) {
      ctx.fillText(this.text, this.posx + 4, this.posy + 45);
    } else {
      ctx.fillText(this.text, this.posx + 28, this.posy + 45);
    }
  }

  move(char) {
    this.posy += this.speed;
    if (char) char.move();
  }
}
