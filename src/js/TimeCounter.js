export default class {
  constructor(el) {
    this.el = el;
  }

  #current = 0;

  #ticking;

  getTime() {
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
    this.clear();
    this.#ticking = setInterval(() => {
      this.setTime(this.#current + 1);
      this.#renderTime();
    }, 1000);
  }

  pause() {}

  clear() {
    clearInterval(this.#ticking);
    this.setTime(0);
    this.#renderTime();
  }

  #renderTime() {
    this.el.textContent = this.getTime();
  }
}
