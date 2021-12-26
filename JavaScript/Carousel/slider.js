const container = document.getElementById('container');
const images = document.getElementById('images');

class Carousel {
  constructor(imageHeight, imageWidth) {
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.imageCount = images.children.length;
    this.current_pic = 0;
    this.dx = 0;

    this.create_Container();
    this.add_image();

    this.nav_button(40, 180, 0, '〈');
    this.nav_button(40, 180, 520, '〉');

    this.nav_dots(10, 10);
  }

  create_Container() {
    container.style.width = `${this.imageWidth}px`;
    container.style.height = `${this.imageHeight}px`;
    container.style.margin = '20px auto';
    container.style.overflow = 'hidden';
    container.style.position = 'relative';
  }

  add_image() {
    images.style.width = `${this.imageCount * this.imageWidth}px`;
    images.style.position = 'absolute';

    for (let i = 0; i < this.imageCount; i++) {
      const image = images.children[i];
      image.style.width = `${this.imageWidth}px`;
      image.style.height = `${this.imageHeight}px`;
      image.style.position = 'absolute';
      image.style.top = '0px';
      image.style.left = `${i * this.imageWidth}px`;
    }
  }

  nav_button(size, top_offset, left_offset, symbol) {
    const nav_button = document.createElement('button');

    nav_button.textContent = symbol;

    nav_button.style.fontSize = `${size}px`;
    nav_button.style.top = `${top_offset}px`;
    nav_button.style.left = `${left_offset}px`;
    nav_button.style.padding = '5px';
    nav_button.style.width = '30px';
    nav_button.style.position = 'absolute';
    nav_button.style.backgroundColor = 'transparent';
    nav_button.style.color = 'white';
    nav_button.style.border = 'none';
    nav_button.style.cursor = 'pointer';

    container.appendChild(nav_button);

    nav_button.addEventListener('click', () => {
      if (symbol == '〈') {
        if (this.current_pic != 0) {
          this.transition(true, 10, 10);
          this.current_pic--;
          this.dot_transition(this.current_pic, this.current_pic + 1);
        }
      } else {
        if (this.current_pic != this.imageCount - 1) {
          this.transition(false, 10, 10);
          this.current_pic++;
          this.dot_transition(this.current_pic, this.current_pic - 1);
        } else {
          this.current_pic = 0;
          this.transition(false, 10, 10);
          this.dot_transition(this.current_pic, this.imageCount - 1);
        }
      }
    });
  }

  nav_dots(size, margin) {
    const nav_dot_container = document.createElement('div');
    const top_offset = this.imageHeight - size - margin * 2;

    nav_dot_container.style.height = `${size}px`;
    nav_dot_container.style.top = `${top_offset}px`;
    nav_dot_container.style.position = 'absolute';
    nav_dot_container.style.left = '42%';

    container.appendChild(nav_dot_container);

    for (let i = 0; i < this.imageCount; i++) {
      const nav_dot = document.createElement('div');

      nav_dot.style.background = i == 0 ? 'white' : 'grey';
      nav_dot.style.height = `${size}px`;
      nav_dot.style.width = `${size}px`;
      nav_dot.style.margin = `${margin}px`;
      nav_dot.style.cursor = 'pointer';
      nav_dot.style.borderRadius = '50%';
      nav_dot.style.display = 'inline-block';
      nav_dot.classList.add(`dot${i}`);

      nav_dot_container.appendChild(nav_dot);

      nav_dot.addEventListener('click', () => {
        this.dot_transition(i, this.current_pic);
        if (i > this.current_pic) {
          this.transition(false, 10, 10);
          this.current_pic = i;
        }
        if (i < this.current_pic) {
          this.transition(true, 10, 10);
          this.current_pic = i;
        }
      });
    }
  }

  transition(left, speed, time) {
    if (left) {
      if (this.current_pic != 0) {
        const interval = setInterval(() => {
          this.dx -= speed;
          images.style.left = `-${this.dx}px`;

          if (this.dx <= this.current_pic * this.imageWidth)
            clearInterval(interval);
        }, time);
      }
    } else {
      const interval = setInterval(() => {
        if (this.current_pic != 0) {
          this.dx += speed;
          if (this.dx >= this.current_pic * this.imageWidth)
            clearInterval(interval);
        } else {
          this.dx -= speed;
          if (0 >= this.dx) clearInterval(interval);
        }
        images.style.left = `-${this.dx}px`;
      }, time);
    }
  }

  dot_transition(current, prev) {
    const curr_dot = document.querySelector(`.dot${current}`);
    const prev_dot = document.querySelector(`.dot${prev}`);

    prev_dot.style.background = 'grey';
    curr_dot.style.background = 'white';
  }
}

create_container = new Carousel(400, 550);
