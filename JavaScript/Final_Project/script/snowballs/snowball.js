export class Snowball {
  constructor(posx, posy, width, height, gameSpeed) {
    this.posx = posx;
    this.posy = posy;
    this.width = width;
    this.height = height;
    this.gameSpeed = gameSpeed;
  }

  draw(ctx) {
    const snowballImage = new Image();
    snowballImage.src = './assets/images/snowballs_images/snowball.png';

    ctx.drawImage(snowballImage, this.posx, this.posy, this.width, this.height);
  }

  move() {
    this.posx += 10;
  }
}
