import TextChanged from './Events';

export default class {
  constructor(el) {
    this.el = el;
  }

  #current = 0;

  #ticking;

  #isPaused = false;

  getTime(type) {
    if (type === 'raw') return this.#current;
    const pad = (v) => `${v}`.padStart(2, 0);
    const h = pad(Math.floor(this.#current / 60 / 60) % 24);
    const m = pad(Math.floor(this.#current / 60) % 60);
    const s = pad(Math.floor(this.#current) % 60);
    return `${h}:${m}:${s}`;
  }

  setTime(n) {
    this.#current = n;
  }

  start() {
    this.#ticking = setInterval(() => {
      this.setTime(this.#current + 1);
      this.#renderTime();
    }, 1000);
  }

  pause() {
    if (!this.#ticking) return;
    if (this.#isPaused) this.start();
    else clearInterval(this.#ticking);

    this.#isPaused = !this.#isPaused;
  }

  clear() {
    clearInterval(this.#ticking);
    this.#ticking = null;
    this.#isPaused = false;
    this.setTime(0);
    this.#renderTime();
  }

  #renderTime() {
    this.el.textContent = this.getTime();
    this.el.dispatchEvent(TextChanged);
  }
}
