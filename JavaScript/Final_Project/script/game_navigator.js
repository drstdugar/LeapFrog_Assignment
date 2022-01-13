const balloonBtn = document.getElementById('balloon-btn');
const snowballBtn = document.getElementById('snowball-btn');
const typingMode = document.getElementById('type-mode');

typingMode.addEventListener('click', () => (location.href = './index.html'));

balloonBtn.addEventListener('click', () => {
  location.href = './balloons.html';
});

snowballBtn.addEventListener('click', () => {
  location.href = './snowballs.html';
});
