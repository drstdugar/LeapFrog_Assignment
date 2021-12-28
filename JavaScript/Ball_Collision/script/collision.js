import {getRandomInt, getRandomColor, calcDistance} from './utility.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ballCount = 100;
const balls = [];

const wallHeight = 690;
const wallWidth = 1400;

canvas.height = wallHeight;
canvas.width = wallWidth;

class Ball {
  constructor(posx, posy, velx, vely, radius, mass, color) {
    this.posx = posx;
    this.posy = posy;
    this.velx = velx;
    this.vely = vely;
    this.radius = radius;
    this.mass = mass;
    this.color = color;
  }

  drawBall() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  moveBall() {
    this.resolveWallCollision();
    this.checkBallCollision();
  }

  resolveWallCollision() {
    if (this.posx + this.radius > wallWidth) {
      this.velx = -this.velx;
      this.posx = wallWidth - this.radius;
    } else if (this.posx - this.radius < 0) {
      this.velx = -this.velx;
      this.posx = this.radius;
    } else if (this.posy + this.radius > wallHeight) {
      this.vely = -this.vely;
      this.posy = wallHeight - this.radius;
    } else if (this.posy - this.radius < 0) {
      this.vely = -this.vely;
      this.posy = this.radius;
    }

    this.posx += this.velx;
    this.posy += this.vely;
  }

  checkBallCollision() {
    balls.forEach(ball => {
      if (this != ball) {
        if (calcDistance(this, ball) < this.radius + ball.radius) {
          this.resolveBallCollision(this, ball);
        }
      }
    });
  }

  resolveBallCollision(ball1, ball2) {
    let dx = ball1.posx - ball2.posx;
    let dy = ball1.posy - ball2.posy;

    let collisionAngle = Math.atan2(dy, dx);

    let speed1 = Math.sqrt(ball1.velx * ball1.velx + ball1.vely * ball1.vely);
    let speed2 = Math.sqrt(ball2.velx * ball2.velx + ball2.vely * ball2.vely);

    let direction1 = Math.atan2(ball1.vely, ball1.velx);
    let direction2 = Math.atan2(ball2.vely, ball2.velx);

    let velx1 = speed1 * Math.cos(direction1 - collisionAngle);
    let vely1 = speed1 * Math.sin(direction1 - collisionAngle);
    let velx2 = speed2 * Math.cos(direction2 - collisionAngle);
    let vely2 = speed2 * Math.sin(direction2 - collisionAngle);

    let final_velx1 =
      ((ball1.mass - ball2.mass) * velx1 + 2 * ball2.mass * velx2) /
      (ball1.mass + ball2.mass);
    let final_velx2 =
      ((ball2.mass - ball1.mass) * velx2 + 2 * ball1.mass * velx1) /
      (ball1.mass + ball2.mass);

    ball1.velx =
      Math.cos(collisionAngle) * final_velx1 +
      Math.cos(collisionAngle + Math.PI / 2) * vely1;
    ball1.vely =
      Math.sin(collisionAngle) * final_velx1 +
      Math.sin(collisionAngle + Math.PI / 2) * vely1;
    ball2.velx =
      Math.cos(collisionAngle) * final_velx2 +
      Math.cos(collisionAngle + Math.PI / 2) * vely2;
    ball2.vely =
      Math.sin(collisionAngle) * final_velx2 +
      Math.sin(collisionAngle + Math.PI / 2) * vely2;

    ball1.posx = ball1.posx += ball1.velx;
    ball1.posy = ball1.posy += ball1.vely;
    ball2.posx = ball2.posx += ball2.velx;
    ball2.posy = ball2.posy += ball2.vely;
  }
}

function createBalls() {
  for (let i = 0; i < ballCount; i++) {
    let ball = generateBall();

    // check overlapping balls at start
    if (i != 0) {
      for (let j = 0; j < balls.length; j++) {
        if (calcDistance(ball, balls[j]) < ball.radius + balls[j].radius) {
          ball = generateBall();
          j = -1;
        }
      }
    }
    balls.push(ball);
  }
}

function generateBall() {
  let radius = getRandomInt(10, 20);
  return new Ball(
    getRandomInt(radius, wallWidth - radius),
    getRandomInt(radius, wallHeight - radius),
    getRandomInt(1, 5),
    getRandomInt(1, 5),
    radius,
    getRandomInt(1, 10),
    getRandomColor()
  );
}

function startAnimate() {
  ctx.clearRect(0, 0, wallWidth, wallHeight);
  for (let i = 0; i < ballCount; i++) {
    balls[i].drawBall();
    balls[i].moveBall();
  }
  requestAnimationFrame(startAnimate);
}

createBalls();
startAnimate();
