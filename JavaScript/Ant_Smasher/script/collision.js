import {getRandomInt, calcDistance} from './utility.js';

const canvas = document.getElementById('canvas'),
  elemLeft = canvas.offsetLeft + canvas.clientLeft,
  elemTop = canvas.offsetTop + canvas.clientTop,
  ctx = canvas.getContext('2d');

const antCount = 10;
const ants = [];

const wallHeight = 690;
const wallWidth = 1400;

canvas.height = wallHeight;
canvas.width = wallWidth;

class Ant {
  constructor(posx, posy, velx, vely, size, mass) {
    this.posx = posx;
    this.posy = posy;
    this.velx = velx;
    this.vely = vely;
    this.size = size;
    this.mass = mass;
  }

  drawBall() {
    const base_image = new Image();
    base_image.src = './images/ant.jpg';
    ctx.drawImage(base_image, this.posx, this.posy, this.size, this.size);
  }

  moveBall() {
    this.posx += this.velx;
    this.posy += this.vely;

    this.checkWallCollision();
    this.checkSelfCollision();
  }

  checkWallCollision() {
    if (this.posx + this.size > wallWidth) {
      this.velx = -this.velx;
      this.posx = wallWidth - this.size;
    } else if (this.posx < 0) {
      this.velx = -this.velx;
    } else if (this.posy + this.size > wallHeight) {
      this.vely = -this.vely;
      this.posy = wallHeight - this.size;
    } else if (this.posy < 0) {
      this.vely = -this.vely;
    }
  }

  checkSelfCollision() {
    ants.forEach(ant => {
      if (this != ant) {
        if (calcDistance(this, ant) < ant.size) {
          this.resolveSelfCollision(this, ant);
        }
      }
    });
  }

  resolveSelfCollision(ant1, ant2) {
    let dx = ant1.posx - ant2.posx;
    let dy = ant1.posy - ant2.posy;

    let collisionAngle = Math.atan2(dy, dx);

    let speed1 = Math.sqrt(ant1.velx * ant1.velx + ant1.vely * ant1.vely);
    let speed2 = Math.sqrt(ant2.velx * ant2.velx + ant2.vely * ant2.vely);

    let direction1 = Math.atan2(ant1.vely, ant1.velx);
    let direction2 = Math.atan2(ant2.vely, ant2.velx);

    let velx1 = speed1 * Math.cos(direction1 - collisionAngle);
    let vely1 = speed1 * Math.sin(direction1 - collisionAngle);
    let velx2 = speed2 * Math.cos(direction2 - collisionAngle);
    let vely2 = speed2 * Math.sin(direction2 - collisionAngle);

    let final_velx1 =
      ((ant1.mass - ant2.mass) * velx1 + 2 * ant2.mass * velx2) /
      (ant1.mass + ant2.mass);
    let final_velx2 =
      ((ant2.mass - ant1.mass) * velx2 + 2 * ant1.mass * velx1) /
      (ant1.mass + ant2.mass);

    ant1.velx =
      Math.cos(collisionAngle) * final_velx1 +
      Math.cos(collisionAngle + Math.PI / 2) * vely1;
    ant1.vely =
      Math.sin(collisionAngle) * final_velx1 +
      Math.sin(collisionAngle + Math.PI / 2) * vely1;
    ant2.velx =
      Math.cos(collisionAngle) * final_velx2 +
      Math.cos(collisionAngle + Math.PI / 2) * vely2;
    ant2.vely =
      Math.sin(collisionAngle) * final_velx2 +
      Math.sin(collisionAngle + Math.PI / 2) * vely2;

    ant1.posx = ant1.posx += ant1.velx;
    ant1.posy = ant1.posy += ant1.vely;
    ant2.posx = ant2.posx += ant2.velx;
    ant2.posy = ant2.posy += ant2.vely;
  }
}

function createBalls() {
  for (let i = 0; i < antCount; i++) {
    let ant = generateBall();

    // check overlapping ants at start
    if (i != 0) {
      for (let j = 0; j < ants.length; j++) {
        if (calcDistance(ant, ants[j]) < ant.size + ants[j].size) {
          ant = generateBall();
          j = -1;
        }
      }
    }
    ants.push(ant);
  }
}

function generateBall() {
  let size = 40;
  return new Ant(
    getRandomInt(size, wallWidth - size),
    getRandomInt(size, wallHeight - size),
    getRandomInt(1, 5),
    getRandomInt(1, 5),
    size,
    getRandomInt(1, 10)
  );
}

function startAnimate() {
  ctx.clearRect(0, 0, wallWidth, wallHeight);

  if (ants.length == 0) {
    ctx.fillStyle = 'red';
    ctx.font = '50px Arial';
    ctx.fillText('Game Over', 550, 330);
    ctx.font = '40px Arial';
    ctx.fillText(`Score: ${antCount}`, 600, 380);
    ctx.font = '30px Arial';
    ctx.fillText('Please Reload!!!', 570, 430);
  }

  for (let i = 0; i < ants.length; i++) {
    ants[i].drawBall();
    ants[i].moveBall();
  }
  requestAnimationFrame(startAnimate);
}

createBalls();

canvas.addEventListener('click', function (event) {
  let x = event.pageX - elemLeft,
    y = event.pageY - elemTop;

  ants.forEach(function (element, index) {
    if (
      y > element.posy - element.size &&
      y < element.posy + element.size &&
      x > element.posx - element.size &&
      x < element.posx + element.size
    ) {
      ants.splice(index, 1);
    }
  });
});

startAnimate();
