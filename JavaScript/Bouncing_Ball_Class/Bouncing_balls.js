class Balls {
  constructor(background, ...numbers) {
    this.wd_ht = numbers[0];
    this.left = numbers[1];
    this.interval = numbers[2];
    this.background = background;

    this.createBall();
  }

  createBall() {
    const box_element = document.getElementById('box');
    const ball = document.createElement('div');

    box_element.appendChild(ball);

    ball.style.width = `${this.wd_ht}px`;
    ball.style.height = `${this.wd_ht}px`;
    ball.style.top = '0px';
    ball.style.left = `${this.left}%`;
    ball.style.background = this.background;
    ball.style.borderRadius = '50%';
    ball.style.position = 'absolute';

    let moving = parseInt(ball.style.top);
    let up = true;

    setInterval(() => {
      if (up) {
        moving += 10;
        ball.style.top = moving + 'px';
      } else {
        moving -= 10;
        ball.style.top = moving + 'px';
      }
      if (moving == 600 - this.wd_ht || moving == 0) {
        up = !up;
      }
    }, this.interval);
  }
}

const ball1 = new Balls('brown', 80, 25, 30);
const ball2 = new Balls('red', 40, 50, 50);
const ball3 = new Balls('blue', 60, 75, 10);
