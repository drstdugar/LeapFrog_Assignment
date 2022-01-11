export class Player {
  constructor(posx, posy, width, height) {
    this.posx = posx;
    this.posy = posy;
    this.width = width;
    this.height = height;
  }

  draw(ctx, frames, currFrame) {
    const characterImage = new Image();
    characterImage.src =
      './assets/images/snowballs_images/shooting_spritesheet.png';

    const width = characterImage.width / frames;
    const height = characterImage.height;

    ctx.drawImage(
      characterImage,
      width * currFrame,
      0,
      width,
      height,
      this.posx,
      this.posy,
      this.width,
      this.height
    );
  }
}
