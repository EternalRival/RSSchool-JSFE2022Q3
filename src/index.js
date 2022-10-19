import "./styles/main.scss";
import utils from "./utils.js";
const DIV = "div";
class Element {
  constructor(parent, tag = DIV, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = content;
    parent.append(element);
    this.el = element;
  }
  destroy() {
    this.el.remove();
  }
}

class Button extends Element {
  constructor(parent, name, onClick) {
    super(parent, "button", "button", name);
    this.el.onclick = onClick;
  }
}
class Container extends Element {
  constructor(parent, className = "container") {
    super(parent, DIV, className);
  }
}
//parent, tag = DIV, className, content
const main = new Element(document.body, "main");
const buttons = new Container(main.el);
const info = new Container(main.el);
const game = new Container(main.el, "game");
const size = new Container(main.el);
const sizePicker = new Container(main.el);

buttons.start = new Button(buttons.el, "Shuffle and start");
buttons.save = new Button(buttons.el, "Stop");
buttons.stop = new Button(buttons.el, "Save");
buttons.results = new Button(buttons.el, "Results");

const moves = new Container(info.el);
moves.label = new Element(moves.el, DIV, "", "Moves:");
moves.counter = new Element(moves.el, DIV, "", "0");

const time = new Container(info.el);
time.label = new Element(time.el, DIV, "", "Time:");
time.counter = new Element(time.el, DIV, "", "00:00");

size.label = new Element(size.el, DIV, "", "Frame size:");
size.current = new Element(size.el, DIV, "", "4x4");

sizePicker.label = new Element(sizePicker.el, DIV, "", "Other sizes:");
sizePicker.options = new Container(sizePicker.el);
for (let i = 3; i <= 8; i++) {
  sizePicker.options[`x${i}`] = new Button(sizePicker.options.el, `${i}x${i}`);
}

class Tile {
  constructor(initialX, initialY, number) {
    Object.assign(this, {
      number,
      x: { initial: initialX, current: initialX },
      y: { initial: initialY, current: initialY },
    });
  }
  isRightPosition() {
    return (
      this.x.initial === this.x.current && this.y.initial === this.y.current
    );
  }
  renderTile(ctx, size, fieldWidth, fieldHeight) {
    const x = this.x.current;
    const y = this.y.current;
    const width = fieldWidth / size;
    const height = fieldHeight / size;
    const gap = 3;
    const tile = new Path2D();

    tile.roundRect(
      x * width + gap,
      y * height + gap,
      width - gap * 2,
      height - gap * 2,
      Math.min(width, height) / 8
    );
    ctx.fillStyle = "#bdd69b";
    ctx.fill(tile);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#7bae37";
    ctx.stroke(tile);
    ctx.font = Math.min(width, height) * 0.75 + "px beon";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(this.number, x * width + width / 2, y * height + height / 2);
  }
}
class Game extends Element {
  constructor(parent, size = 4) {
    super(parent, "canvas", "game-canvas", "Gem Puzzle");
    this.size = size;
    this.el.width = parent.offsetWidth;
    this.el.height = parent.offsetHeight;
    this.el.style.borderRadius =
      Math.min(this.el.width, this.el.height) * 0.04 + "px";
    this.ctx = this.el.getContext("2d");

    this.matrix = Array.from(
      Array(size ** 2),
      (v, k) => new Tile(k % 4, Math.floor(k / 4), ++k)
    );
    for (let i = 0; i < size ** 2 - 1; i++)
      this.matrix[i].renderTile(
        this.ctx,
        this.size,
        this.el.width,
        this.el.height
      );
  }
  isCompleted() {
    this.matrix.every(v => v.isRightPosition());
  }
}
game.canvas = new Game(game.el);
console.log(game.canvas);
