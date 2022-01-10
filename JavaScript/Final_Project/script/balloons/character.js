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

  draw(ctx) {
    const characterImage = new Image();
    characterImage.src = './assets/images/balloon-images/spritesheet.png';

    let spritePos = this.stay ? 0 : 70;

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

    if (!this.loaded) {
      characterImage.onload = () => {
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
      };
      this.loaded = true;
    }
  }

  move() {
    this.posy += this.speed;
  }

  jumps(start, end, percent) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    this.posx = start.x + dx * percent;
    this.posy = start.y + dy * percent;
  }
}
