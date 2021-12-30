function clearCanvas(ctx, posx, posy, height, width) {
  ctx.clearRect(posx, posy, height, width);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export {clearCanvas, getRandomInt};
