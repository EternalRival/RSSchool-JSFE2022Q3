import "./styles/main.scss";
import utils from "./utils.js";
const DIV = "div";
const beon = new FontFace("beon", "url('beon.otf')");

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
class Tile {
  constructor(x, y, number) {
    Object.assign(this, {
      number,
      x: { initial: x, current: x },
      y: { initial: y, current: y },
    });
  }
  isRightPosition() {
    return (
      this.x.initial === this.x.current && this.y.initial === this.y.current
    );
  }
  async move(empty, timeout = 0.3) {
    if (this.isNextToEmptyCell(empty)) {
      [this.x.current, empty.x.current] = [empty.x.current, this.x.current];
      [this.y.current, empty.y.current] = [empty.y.current, this.y.current];
    }
    await pause(timeout);
  }
  isNextToEmptyCell(empty) {
    const [x0, y0] = [empty.x.current, empty.y.current];
    const [x1, y1] = [this.x.current, this.y.current];
    return (
      (x0 === x1 && (y0 + 1 === y1 || y0 === y1 + 1)) ||
      (y0 === y1 && (x0 + 1 === x1 || x0 === x1 + 1))
    );
  }
}
class Game {
  constructor(parent, gridSize = 4) {
    this.wrapper = document.createElement(DIV);
    this.wrapper.className = "game-wrapper";
    parent.append(this.wrapper);

    this.canvas = document.createElement("canvas");
    this.canvas.className = "game-canvas";
    this.wrapper.append(this.canvas);

    this.gridSize = gridSize;
    this.matrix = Array.from(
      Array(this.gridSize ** 2),
      (v, k) => new Tile(k % this.gridSize, Math.floor(k / this.gridSize), ++k)
    );
  }
  setMatrix(size) {
    this.gridSize = size;
    this.matrix = Array.from(
      Array(size ** 2),
      (v, k) => new Tile(k % size, Math.floor(k / size), ++k)
    );
    this.renderField();
  }
  getEmptyCell() {
    return this.matrix.at(-1);
  }
  getCtx() {
    return this.canvas.getContext("2d");
  }
  getFieldSize() {
    return {
      width: this.wrapper.offsetWidth,
      height: this.wrapper.offsetHeight,
    };
  }
  isCompleted() {
    this.matrix.every(v => v.isRightPosition());
  }
  draw(path, color, width) {
    //this.beginPath();
    if (width) {
      this.strokeStyle = color;
      this.lineWidth = width;
      this.stroke(path);
    } else {
      this.fillStyle = color;
      this.fill(path);
    }
  }
  #gap = 3;
  renderCell(tile) {
    const gap = this.#gap;
    const width = this.getFieldSize().width,
      height = this.getFieldSize().height;
    const size = this.gridSize;
    const ctx = this.getCtx();
    ctx.draw = this.draw;
    const cell = new Path2D();
    const [x, y] = [tile.x.current, tile.y.current];
    try {
      cell.roundRect(
        x * ((width - gap * 3) / size) + gap * 2.5,
        y * ((height - gap * 3) / size) + gap * 2.5,
        (width - gap * 3) / size - gap * 2,
        (height - gap * 3) / size - gap * 2,
        gap * 2.5
      );
    } catch (e) {
      cell.rect(
        x * ((width - gap * 3) / size) + gap * 2.5,
        y * ((height - gap * 3) / size) + gap * 2.5,
        (width - gap * 3) / size - gap * 2,
        (height - gap * 3) / size - gap * 2
      );
    }
    ctx.draw(cell, "#020");
    ctx.draw(cell, "#0f0", gap);

    ctx.font = Math.min(width / size, height / size) * 0.6 + "px beon";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = gap / 2;
    ctx.strokeText(
      tile.number,
      x * ((width - gap * 3) / size) +
        gap * 2.5 +
        ((width - gap * 3) / size - gap * 2) / 2,
      y * ((height - gap * 3) / size) +
        gap * 2.5 +
        ((height - gap * 3) / size - gap * 2) / 2
    );
    //todo заменить отрисовку пустой клетки
    if (tile === this.getEmptyCell()) {
      const emptyCell = new Path2D();
      emptyCell.rect(
        x * ((width - gap * 3) / size) + gap * 2.5,
        y * ((height - gap * 3) / size) + gap * 2.5,
        (width - gap * 3) / size - gap * 2,
        (height - gap * 3) / size - gap * 2
      );
      ctx.draw(emptyCell, "#020");
      ctx.draw(emptyCell, "#020", gap + 5);
    }
  }
  async renderField() {
    await beon.load();
    const { width, height } = this.getFieldSize();
    Object.assign(this.canvas, { width, height });
    const gap = this.#gap;
    const ctx = this.getCtx();
    ctx.draw = this.draw;
    //10 82 154 226
    const frame = new Path2D();
    frame.rect(gap / 2, gap / 2, width - gap, height - gap);
    ctx.draw(frame, "#020");
    ctx.draw(frame, "#0f0", gap);

    this.matrix.forEach(v => this.renderCell(v));
  }
  getActiveCellList() {
    const empty = this.getEmptyCell();
    const neighbors = this.matrix.filter(v => v.isNextToEmptyCell(empty));
    return neighbors;
  }
  #shuffling = false;
  async shuffle() {
    await pause(0.5);
    const timeout = 5 / this.matrix.length ** 2;
    const getRandomCell = arr => arr[utils.randomizer(0, arr.length - 1)];
    const isTotallyShuffled = arr =>
      arr.every(v => {
        return v.x.current !== v.x.initial || v.y.current !== v.y.initial;
      });

    let lastMoved;

    clearInterval(this.#shuffling);
    this.#shuffling = setInterval(() => {
      const activeCells = this.getActiveCellList().filter(v => v !== lastMoved);
      const untouchedCells = activeCells.filter(v => v.isRightPosition());
      lastMoved = getRandomCell(untouchedCells) || getRandomCell(activeCells);
     
      lastMoved.move(this.getEmptyCell(), timeout);
      this.renderCell(lastMoved);
      //todo переделатЬ!
      this.renderCell(this.getEmptyCell());

      if (isTotallyShuffled(this.matrix)) clearInterval(this.#shuffling);
    }, timeout * 1000);
  }
  start(num) {
    this.setMatrix(num);
    this.shuffle();
  }
}
const main = new Element(document.body, "main");
const buttons = new Container(main.el);
const info = new Container(main.el);
const game = new Game(main.el);
const size = new Container(main.el);
const sizePicker = new Container(main.el);
//!!!
console.log("game.getFieldSize()", game.getFieldSize());
game.start(4);
//!!!
buttons.start = new Button(buttons.el, "Shuffle & start");
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
size.current.el.style = "display: block; min-width:44px";

sizePicker.label = new Element(sizePicker.el, DIV, "", "Other sizes:");
sizePicker.options = new Container(sizePicker.el);
for (let i = 3; i <= 8; i++) {
  sizePicker.options[`x${i}`] = new Button(
    sizePicker.options.el,
    `${i}x${i}`,
    sizePickerHandler
  );
}

function sizePickerHandler() {
  size.current.el.textContent = this.textContent;
  game.start(this.textContent[0]);
}

async function pause(timeout) {
  return new Promise(_ => setTimeout(_, timeout * 1000));
}
