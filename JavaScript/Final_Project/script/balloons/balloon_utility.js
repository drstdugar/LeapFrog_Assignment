import {Balloon} from './balloon.js';
import {getRandomInt} from '../utilities.js';

export function setBackground(canvas) {
  canvas.style.background =
    "url('./assets/images/balloon-images/balloon_background.jpg')";
  canvas.style.backgroundRepeat = 'repeat-x';
  canvas.style.backgroundSize = 'contain';
}

export function createBalloons(gameSpeed, letters) {
  let balloons = [];
  balloons.push(
    new Balloon(10, getRandomInt(5, 100), 150, 70, 'Start', gameSpeed, true)
  );

  for (let i = 0; i < letters.length; i++) {
    let balloon = new Balloon(
      (i + 1) * 220,
      getRandomInt(5, 100),
      150,
      70,
      letters[i],
      gameSpeed
    );

    balloons.push(balloon);
  }

  balloons.push(
    new Balloon(
      (letters.length + 1) * 220,
      getRandomInt(5, 100),
      150,
      60,
      'End',
      gameSpeed,
      true
    )
  );

  return balloons;
}

export function drawBalloons(ctx, balloons, char) {
  balloons.forEach((balloon, i) => {
    if (i === 0) {
      balloon.draw(ctx, char);
    } else {
      balloon.draw(ctx);
    }
  });
}

export function manageDisplay() {
  document.querySelector('.speed-overlay').style.display = 'none';
  document.querySelector('.speed-lives').style.display = 'block';
}

export function checkScore(currScore) {
  let hScore = localStorage.getItem('balloonHighScore');

  if (hScore) {
    if (hScore < currScore) {
      localStorage.setItem('balloonHighScore', currScore);
    }
  } else {
    localStorage.setItem('balloonHighScore', currScore);
  }

  return localStorage.getItem('balloonHighScore');
}
