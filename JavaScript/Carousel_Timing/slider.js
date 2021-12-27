class Carousel {
  constructor(container, images, hold) {
    this.container = container;
    this.images = images;
    this.imageHeight = 400;
    this.imageWidth = 550;
    this.imageCount = this.images.children.length;
    this.current_pic = 0;
    this.dx = 0;
    this.hold = hold;
    this.offset = 10;
    this.left = false;
    self = this;

    this.create_Container();
    this.add_image();

    this.nav_button(40, 180, 0, '〈');
    this.nav_button(40, 180, 520, '〉');

    this.nav_dots(10, 10);

    this.set();
  }

  create_Container() {
    this.container.style.width = `${this.imageWidth}px`;
    this.container.style.height = `${this.imageHeight}px`;
    this.container.style.margin = '20px auto';
    this.container.style.overflow = 'hidden';
    this.container.style.position = 'relative';
  }

  add_image() {
    this.images.style.width = `${this.imageCount * this.imageWidth}px`;
    this.images.style.position = 'absolute';

    for (let i = 0; i < this.imageCount; i++) {
      const image = this.images.children[i];
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

    this.container.appendChild(nav_button);

    nav_button.addEventListener('click', () => {
      this.clear();
      if (symbol == '〈') {
        if (this.current_pic != 0) {
          this.left = true;
          requestAnimationFrame(this.transition);
          this.current_pic--;
          this.dot_transition(this.current_pic, this.current_pic + 1);
        }
      } else {
        if (this.current_pic != this.imageCount - 1) {
          this.left = false;
          requestAnimationFrame(this.transition);
          this.current_pic++;
          this.dot_transition(this.current_pic, this.current_pic - 1);
        } else {
          this.current_pic = 0;
          this.transition(false, 10);
          this.dot_transition(this.current_pic, this.imageCount - 1);
        }
      }
      this.set();
    });
  }

  nav_dots(size, margin) {
    const nav_dot_container = document.createElement('div');
    const top_offset = this.imageHeight - size - margin * 2;

    nav_dot_container.style.height = `${size}px`;
    nav_dot_container.style.top = `${top_offset}px`;
    nav_dot_container.style.position = 'absolute';
    nav_dot_container.style.left = '42%';

    this.container.appendChild(nav_dot_container);

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
        this.clear();
        this.auto = false;
        this.dot_transition(i, this.current_pic);
        if (i > this.current_pic) {
          this.left = false;
          requestAnimationFrame(this.transition);
          this.current_pic = i;
        }
        if (i < this.current_pic) {
          this.left = true;
          requestAnimationFrame(this.transition);
          this.current_pic = i;
        }
        this.set();
      });
    }
  }

  transition() {
    if (self.left) {
      if (self.dx != 0) {
        self.dx -= self.offset;
        self.images.style.left = `-${self.dx}px`;

        if (self.dx > self.current_pic * self.imageWidth)
          requestAnimationFrame(self.transition);
      }
    } else {
      if (self.current_pic != 0) {
        self.dx += self.offset;

        if (self.dx < self.current_pic * self.imageWidth)
          requestAnimationFrame(self.transition);
      } else {
        self.dx -= self.offset;

        if (self.dx >= 0) requestAnimationFrame(self.transition);
      }
      self.images.style.left = `-${self.dx}px`;
    }
  }

  dot_transition(current, prev) {
    const curr_dot = document.querySelector(`.dot${current}`);
    const prev_dot = document.querySelector(`.dot${prev}`);

    prev_dot.style.background = 'grey';
    curr_dot.style.background = 'white';
  }

  auto_transition() {
    if (this.current_pic < this.imageCount - 1) {
      this.left = false;
      requestAnimationFrame(this.transition);
      this.current_pic++;
      this.dot_transition(this.current_pic, this.current_pic - 1);
    } else {
      this.left = true;
      requestAnimationFrame(this.transition);
      this.current_pic = 0;
      this.dot_transition(this.current_pic, this.imageCount - 1);
    }
  }

  clear() {
    clearInterval(this.interval);
  }

  set() {
    this.interval = setInterval(() => this.auto_transition(), this.hold);
  }
}

let carousel1 = new Carousel(
  document.getElementById('container'),
  document.getElementById('images'),
  4000
);
