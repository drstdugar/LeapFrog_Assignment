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
  return Math.floor((wordCount / time) * 60);
}

export function checkScore(currScore, itemName) {
  let hScore = localStorage.getItem(itemName);

  if (hScore) {
    if (hScore < currScore) {
      localStorage.setItem(itemName, currScore);
    }
  } else {
    localStorage.setItem(itemName, currScore);
  }

  return localStorage.getItem(itemName);
}

export function cursor(index, length, className) {
  if (index < length) {
    let currId = '#letter' + (index + 1);
    let prevId;

    document.querySelector(currId).classList.add(className);

    if (index != 0) {
      prevId = '#letter' + index;
      document.querySelector(prevId).classList.remove(className);
    }
  }
}
