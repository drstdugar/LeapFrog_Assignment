const box_element = document.getElementById('box');

const ball = document.createElement('div');

box_element.appendChild(ball);

ball.style.width = '80px';
ball.style.height = '80px';
ball.style.borderRadius = '50%';
ball.style.background = 'brown';
ball.style.alignSelf = 'center';
ball.style.position = 'absolute';
ball.style.top = '0px';
ball.style.left = '47%';

let moving = 10;
let up = true;

setInterval(() => {
  if (moving == 520 || moving == 0) {
    up = !up;
  }
  if (up) {
    moving += 10;
    ball.style.top = moving + 'px';
  } else {
    moving -= 10;
    ball.style.top = moving + 'px';
  }
}, 30);
