import './styles/main.scss';
import utils from './js/utils';
import Element from './js/Element';
import Button from './js/Button';
import Container from './js/Container';
import Tile from './js/Tile';
import Sounds from './js/Sounds';

const DIV = 'div';
const { pause } = utils;
const beon = new FontFace('beon', "url('beon.otf')");

class Game {
  constructor(parent, gridSize = 4) {
    this.wrapper = document.createElement(DIV);
    this.wrapper.className = 'game-wrapper';
    parent.append(this.wrapper);

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'game-canvas';
    this.canvas.addEventListener('click', (e) => this.canvasClickHandler(e));
    this.wrapper.append(this.canvas);

    this.gridSize = gridSize;
    this.matrix = Array.from(
      Array(this.gridSize ** 2),
      (v, k) => new Tile(k % this.gridSize, Math.floor(k / this.gridSize), k + 1),
    );
  }

  #raf;

  movesCounter = 0;

  gameTimer = 0;

  setMatrix(size) {
    this.gridSize = size;
    this.matrix = Array.from(
      Array(size ** 2),
      (v, k) => new Tile(k % size, Math.floor(k / size), k + 1),
    );
    this.renderField();
  }

  getEmptyCell() {
    return this.matrix.at(-1);
  }

  getCtx() {
    return this.canvas.getContext('2d');
  }

  getFieldSize() {
    return {
      width: this.wrapper.offsetWidth,
      height: this.wrapper.offsetHeight,
    };
  }

  isCompleted() {
    this.matrix.every((v) => v.isRightPosition());
  }

  draw(path, color, width) {
    // this.beginPath();
    if (width) {
      this.strokeStyle = color;
      this.lineWidth = width;
      this.stroke(path);
    } else {
      this.fillStyle = color;
      this.fill(path);
    }
  }

  #cellBorder = 3;

  getCellDrawInfo(x, y) {
    const border = this.#cellBorder;
    const { width, height } = this.getFieldSize();
    const size = this.gridSize;
    const cellWidth = (width - border * 3) / size - border * 2;
    const cellHeight = (height - border * 3) / size - border * 2;
    const x0 = x * ((width - border * 3) / size) + border * 2.5;
    const y0 = y * ((height - border * 3) / size) + border * 2.5;
    const x1 = x0 + cellWidth;
    const y1 = y0 + cellHeight;
    return {
      x0,
      y0,
      x1,
      y1,
      width: cellWidth,
      height: cellHeight,
    };
  }

  renderCell(tile) {
    /* requestAnimationFrame(this.renderCell); */
    const border = this.#cellBorder;
    const { width, height } = this.getFieldSize();
    const ctx = this.getCtx();
    ctx.draw = this.draw;
    const cell = new Path2D();
    const [x, y] = [tile.x.current, tile.y.current];
    const cellDrawInfo = this.getCellDrawInfo(x, y);
    if (tile === this.getEmptyCell()) {
      const emptyCell = new Path2D();
      emptyCell.rect(cellDrawInfo.x0, cellDrawInfo.y0, cellDrawInfo.width, cellDrawInfo.height);
      ctx.draw(emptyCell, '#020');
      ctx.draw(emptyCell, '#020', border + 0);
      return;
    }
    try {
      cell.roundRect(
        cellDrawInfo.x0,
        cellDrawInfo.y0,
        cellDrawInfo.width,
        cellDrawInfo.height,
        border * 2.5,
      );
    } catch (e) {
      cell.rect(cellDrawInfo.x0, cellDrawInfo.y0, cellDrawInfo.width, cellDrawInfo.height);
    }
    ctx.draw(cell, '#020');
    ctx.draw(cell, '#0f0', border);

    ctx.font = `${Math.min(width / this.gridSize, height / this.gridSize) * 0.6}px beon`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = border / 2;
    ctx.strokeText(
      tile.number,
      cellDrawInfo.x0 + cellDrawInfo.width / 2,
      cellDrawInfo.y0 + cellDrawInfo.height / 2,
    );
  }

  async renderField() {
    await beon.load();
    const { width, height } = this.getFieldSize();
    Object.assign(this.canvas, { width, height });
    const gap = this.#cellBorder;
    const ctx = this.getCtx();
    ctx.draw = this.draw;

    // 10 82 154 226

    ctx.clearRect(0, 0, width, height);
    const frame = new Path2D();
    frame.rect(gap / 2, gap / 2, width - gap, height - gap);
    ctx.draw(frame, '#020');
    ctx.draw(frame, '#0f0', gap);

    this.matrix.forEach((v) => this.renderCell(v));
  }

  getActiveCellList() {
    const empty = this.getEmptyCell();
    const neighbors = this.matrix.filter((v) => v.isNextToEmptyCell(empty));
    return neighbors;
  }

  #shuffling = false;

  async shuffle() {
    await pause(0.5);
    const timeout = 15 / this.matrix.length ** 2;
    const getRandomCell = (arr) => arr[utils.randomizer(0, arr.length - 1)];
    const isTotallyShuffled = (arr) =>
      arr.every((v) => v.x.current !== v.x.initial || v.y.current !== v.y.initial);

    let lastMoved;

    clearInterval(this.#shuffling);
    this.#shuffling = setInterval(() => {
      const activeCells = this.getActiveCellList().filter((v) => v !== lastMoved);
      const untouchedCells = activeCells.filter((v) => v.isRightPosition());
      lastMoved = getRandomCell(untouchedCells) || getRandomCell(activeCells);

      lastMoved.move(this.getEmptyCell(), timeout);

      this.renderField();

      if (isTotallyShuffled(this.matrix)) clearInterval(this.#shuffling);
    }, timeout * 1000);
  }

  counterChange(n) {
    this.movesCounter = +(n ?? this.movesCounter + 1);
    moves.change(this.movesCounter);
  }

  start(num) {
    this.setMatrix(num);
    this.shuffle();
    this.movesCounter = 0;
    this.counterChange('0');
  }

  soundVolume = 1;

  zap() {
    const sound = new Audio(Sounds.moveSound);
    sound.volume = this.soundVolume;
    sound.play();
  }

  canvasClickHandler(e) {
    const isClicked = (x, y, x0, y0, x1, y1) => x > x0 && x < x1 && y > y0 && y < y1;
    const clickedIndex = this.matrix
      .map((v) => this.getCellDrawInfo(v.x.current, v.y.current))
      .findIndex((v) => isClicked(e.offsetX, e.offsetY, v.x0, v.y0, v.x1, v.y1));
    if (clickedIndex >= 0 && this.matrix[clickedIndex].isNextToEmptyCell(this.getEmptyCell())) {
      this.matrix[clickedIndex].move(this.getEmptyCell());
      this.counterChange();
      this.renderField();
      this.zap();
    }
  }
}
const main = new Element(document.body, 'main');
const buttons = new Container(main.el, 'container buttons-container');
const info = new Container(main.el);
const game = new Game(main.el);
const size = new Container(main.el);
const sizePicker = new Container(main.el);

function soundControlHandler() {
  switch (game.soundVolume) {
    case 0:
      game.soundVolume = 1 / 3;
      this.style.backgroundImage = `url(${Sounds.none})`;
      break;
    case 1 / 3:
      game.soundVolume = 2 / 3;
      this.style.backgroundImage = `url(${Sounds.low})`;
      break;
    case 2 / 3:
      game.soundVolume = 1;
      this.style.backgroundImage = `url(${Sounds.high})`;
      break;
    default:
      game.soundVolume = 0;
      this.style.backgroundImage = `url(${Sounds.x})`;
      break;
  }
}

buttons.start = new Button(buttons.el, 'Shuffle & start');
buttons.sound = new Button(buttons.el, '', soundControlHandler);
buttons.sound.el.style.backgroundImage = `url(${Sounds.high})`; // !
buttons.stop = new Button(buttons.el, 'Save');
buttons.results = new Button(buttons.el, 'Top 10');

const moves = new Container(info.el);
moves.label = new Element(moves.el, DIV, '', 'Moves:');
moves.counter = new Element(moves.el, DIV, '', '0');
moves.change = function renderCounter(n) {
  this.counter.el.textContent = n;
};

const time = new Container(info.el);
time.label = new Element(time.el, DIV, '', 'Time:');
time.counter = new Element(time.el, DIV, '', '00:00');

size.label = new Element(size.el, DIV, '', 'Frame size:');
size.current = new Element(size.el, DIV, '', '4x4');
size.current.el.style = 'display: block; min-width:44px';

sizePicker.label = new Element(sizePicker.el, DIV, '', 'Other sizes:');
sizePicker.options = new Container(sizePicker.el);

function sizePickerHandler() {
  size.current.el.textContent = this.textContent;
  game.start(this.textContent[0]);
}

for (let i = 3; i <= 8; i += 1) {
  sizePicker.options[`x${i}`] = new Button(sizePicker.options.el, `${i}x${i}`, sizePickerHandler);
}

//
console.log('game.getFieldSize()', game.getFieldSize());
game.start(4);
//
