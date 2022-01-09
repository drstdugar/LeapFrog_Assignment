export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function clearCanvas(ctx, posx, posy, width, height) {
  ctx.clearRect(posx, posy, width, height);
}

export function calcSpeed(startTime, wordCount) {
  let time = (new Date() - startTime) / 1000;
  console.log(new Date(), startTime, (new Date() - startTime) / 1000);
  return Math.floor((wordCount / time) * 60);
}
