function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function calcDistance(ball1, ball2) {
  let dx = ball1.posx - ball2.posx;
  let dy = ball1.posy - ball2.posy;
  return Math.sqrt(dx * dx + dy * dy);
}

export {getRandomInt, getRandomColor, calcDistance};
