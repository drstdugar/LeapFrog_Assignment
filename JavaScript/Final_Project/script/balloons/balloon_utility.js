import {Balloon} from './balloon.js';
import {getRandomInt} from '../utilities.js';
import {constants} from '../constants.js';

export function setBackground(canvas, play) {
  canvas.style.background = play
    ? "url('./assets/images/balloon-images/balloon_background.jpg')"
    : "url('./assets/images/balloon-images/balloons_SS.png')";
  canvas.style.backgroundRepeat = play ? 'repeat-x' : 'no-repeat';
  canvas.style.backgroundSize = play ? 'contain' : 'cover';
}

export function createBalloons(gameSpeed, letters) {
  let balloons = [];
  balloons.push(
    new Balloon(
      10,
      getRandomInt(5, 100),
      constants.BALLOON_WIDTH,
      constants.BALLOON_HEIGHT,
      'Start',
      gameSpeed,
      true
    )
  );

  for (let i = 0; i < letters.length; i++) {
    let balloon = new Balloon(
      (i + 1) * 220,
      getRandomInt(5, 100),
      constants.BALLOON_WIDTH,
      constants.BALLOON_HEIGHT,
      letters[i],
      gameSpeed
    );

    balloons.push(balloon);
  }

  balloons.push(
    new Balloon(
      (letters.length + 1) * 220,
      getRandomInt(5, 100),
      constants.BALLOON_WIDTH,
      constants.BALLOON_HEIGHT,
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
      balloon.set(ctx, char);
    } else {
      balloon.set(ctx);
    }
  });
}

export function manageDisplay() {
  document.querySelector('.speed-overlay').style.display = 'none';
  document.querySelector('.speed-lives').style.display = 'block';
}
