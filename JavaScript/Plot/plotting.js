const points = [
  { x: 10, y: 20 },
  { x: 940, y: 140 },
  { x: 630, y: 20 },
  { x: 192, y: 456 },
  { x: 68, y: 312 },
  { x: 553, y: 285 },
  { x: 567, y: 234 },
  { x: 990, y: 445 },
  { x: 235, y: 345 },
];

const box_element = document.getElementById('box');

for (i = 0; i < points.length; i++) {
  const point = document.createElement('div');

  box_element.appendChild(point);

  point.style.width = '15px';
  point.style.height = '15px';
  point.style.borderRadius = '50%';
  point.style.background = 'blue';
  point.style.position = 'absolute';
  point.style.top = points[i].y + 'px';
  point.style.left = points[i].x + 'px';

  let counter = 0;

  point.addEventListener('click', e => {
    counter++;
    if (counter % 2 == 0) {
      point.style.border = 'none';
    } else {
      point.style.border = '2px solid red';
    }
  });
}
