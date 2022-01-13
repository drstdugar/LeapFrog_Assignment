export function setBackground(canvas, play) {
  canvas.style.background = play
    ? "url('./assets/images/snowballs_images/snowballs_background.jpg')"
    : "url('./assets/images/snowballs_images/snowballs_SS.png')";
  canvas.style.backgroundRepeat = play ? 'repeat-x' : 'no-repeat';
  canvas.style.backgroundSize = play ? 'contain' : 'cover';
}
