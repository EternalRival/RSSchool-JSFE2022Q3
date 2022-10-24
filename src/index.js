import './styles/main.scss';
import _ from './js/utils';
import Element from './js/Element';
import Button from './js/Button';
import Tile from './js/Tile';
import Sounds from './js/Sounds';
import TimeCounter from './js/TimeCounter';

const { pause } = _;
const beon = new FontFace('beon', "url('beon.otf')");

class Game {
  constructor(parent, gridSize = 4) {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'game';
    parent.append(this.wrapper);

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'game__canvas';
    this.canvas.addEventListener('click', (e) => this.canvasClickHandler(e));
    const min = Math.min(window.innerHeight * 0.5, window.innerWidth * 0.9375);
    this.canvas.width = min;
    this.canvas.height = min;
    this.wrapper.style.width = `${min}px`;
    this.wrapper.style.height = `${min}px`;
    this.wrapper.append(this.canvas);

    this.gridSize = gridSize;
    this.matrix = Array.from(
      Array(this.gridSize ** 2),
      (v, k) => new Tile(k % this.gridSize, Math.floor(k / this.gridSize), k + 1),
    );
  }

  #raf;

  #cellBorder = 3;

  #shuffling = false;

  movesCounter = 0;

  soundVolume = {
    current: 'high',
    muted: { volume: 0 / 3, icon: Sounds.muted },
    none: { volume: 1 / 3, icon: Sounds.none },
    low: { volume: 2 / 3, icon: Sounds.low },
    high: { volume: 3 / 3, icon: Sounds.high },
    getIcon() {
      return `url(${this.getIconURL()})`;
    },
    getIconURL() {
      return this[this.current].icon;
    },
  };

  getCanvasSize() {
    const { height } = this.canvas;
    const { width } = this.canvas;
    return Math.min(height, width);
  }

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

  getActiveCellList() {
    const empty = this.getEmptyCell();
    const neighbors = this.matrix.filter((v) => v.isNextToEmptyCell(empty));
    return neighbors;
  }

  isPuzzleCompleted() {
    this.matrix.every((v) => v.isRightPosition());
  }

  getCtx() {
    return this.canvas.getContext('2d');
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

  getCellDrawInfo(x, y) {
    const border = this.#cellBorder;
    const cellSize = (this.getCanvasSize() - border * 3) / this.gridSize - border * 2;
    const x0 = x * ((this.getCanvasSize() - border * 3) / this.gridSize) + border * 2.5;
    const y0 = y * ((this.getCanvasSize() - border * 3) / this.gridSize) + border * 2.5;
    const x1 = x0 + cellSize;
    const y1 = y0 + cellSize;
    return {
      x0,
      y0,
      x1,
      y1,
      size: cellSize,
    };
  }

  renderCell(tile) {
    /* requestAnimationFrame(this.renderCell); */
    const border = this.#cellBorder;
    const size = this.getCanvasSize();

    const ctx = this.getCtx();
    ctx.draw = this.draw;
    const cell = new Path2D();
    const [x, y] = [tile.x.current, tile.y.current];
    const cellDrawInfo = this.getCellDrawInfo(x, y);
    if (tile === this.getEmptyCell()) {
      const emptyCell = new Path2D();
      emptyCell.rect(cellDrawInfo.x0, cellDrawInfo.y0, cellDrawInfo.size, cellDrawInfo.size);
      ctx.draw(emptyCell, '#020');
      ctx.draw(emptyCell, '#020', border + 0);
      return;
    }
    try {
      cell.roundRect(
        cellDrawInfo.x0,
        cellDrawInfo.y0,
        cellDrawInfo.size,
        cellDrawInfo.size,
        border * 2.5,
      );
    } catch (e) {
      cell.rect(cellDrawInfo.x0, cellDrawInfo.y0, cellDrawInfo.size, cellDrawInfo.size);
    }
    ctx.draw(cell, '#020');
    ctx.draw(cell, '#0f0', border);

    ctx.font = `${Math.min(size / this.gridSize, size / this.gridSize) * 0.6}px beon`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = border / 2;
    ctx.strokeText(
      tile.number,
      cellDrawInfo.x0 + cellDrawInfo.size / 2,
      cellDrawInfo.y0 + cellDrawInfo.size / 2,
    );
  }

  async renderField() {
    const size = this.getCanvasSize();
    await beon.load();
    const border = this.#cellBorder;
    const ctx = this.getCtx();
    ctx.draw = this.draw;
    // 10 82 154 226

    ctx.clearRect(0, 0, size, size);
    const frame = new Path2D();
    frame.rect(border / 2, border / 2, size - border, size - border);
    ctx.draw(frame, '#020');
    ctx.draw(frame, '#0f0', border);

    this.matrix.forEach((v) => this.renderCell(v));
    this.autoSave();
  }

  async shuffle() {
    time.current.clear();
    await pause(0.5);
    const timeout = 15 / this.matrix.length ** 2;
    const getRandomCell = (arr) => arr[_.randomizer(0, arr.length - 1)];
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

      if (isTotallyShuffled(this.matrix)) {
        clearInterval(this.#shuffling);
        time.current.start();
      }
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

  zap() {
    const sound = new Audio(Sounds.moveSound);
    sound.volume = this.soundVolume[this.soundVolume.current].volume;
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

  autoSave() {
    _.ls.save('gem-puzzle', {
      autoSave: {
        time: time.current.getTime('raw'),
        matrix: this.matrix,
        moves: this.movesCounter,
        gridSize: this.gridSize,
      },
    });
  }
}
const main = new Element(document.body, 'main', 'main flex column');
const header = new Element(main.el, 'div', 'header flex column');
const game = new Game(main.el);
const footer = new Element(main.el, 'div', 'footer flex column');

const bgText = new Element(main.el, 'div', 'bg-text');
bgText.el.innerText =
  'ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM\nCOPYRIGHT 2075-2077 ROBCO INDUSTRIES\n-Display 1-';
const menu = new Element(header.el, 'div', 'menu flex');
const info = new Element(header.el, 'div', 'game-info flex column');
const size = new Element(footer.el, 'div', 'size flex column');

const time = new Element(info.el, 'div', 'time flex');
time.label = new Element(time.el, 'div', 'time__label', 'Time:');
time.counter = new Element(time.el, 'div', 'time__counter', '00:00:00');
time.current = new TimeCounter(time.counter.el);

const moves = new Element(info.el, 'div', 'moves flex');
moves.label = new Element(moves.el, 'div', 'moves__label', 'Moves:');
moves.counter = new Element(moves.el, 'div', 'moves__counter', '0');
moves.change = function renderCounter(n) {
  this.counter.el.textContent = n;
};

size.info = new Element(size.el, 'div', 'size__container flex');
size.info.label = new Element(size.info.el, 'div', 'size__label', 'Frame size:');
size.info.current = new Element(size.info.el, 'div', 'size__current', '4x4');
size.options = new Element(size.el, 'div', 'size__options flex');

function btnStartHandler() {
  game.start(game.gridSize);
}
function btnSoundHandler() {
  switch (game.soundVolume.current) {
    case 'muted':
      game.soundVolume.current = 'none';
      break;
    case 'none':
      game.soundVolume.current = 'low';
      break;
    case 'low':
      game.soundVolume.current = 'high';
      break;
    default:
      game.soundVolume.current = 'muted';
  }
  this.style.backgroundImage = game.soundVolume.getIcon();
}
function btnSaveHandler() {
  time.current.pause(); // ! это не для того
}
function btnResultsHandler() {}

menu.start = new Button(menu.el, 'Shuffle & start', btnStartHandler);
menu.sound = new Button(menu.el, '', btnSoundHandler);
menu.sound.el.classList.add('menu__sound-button');
menu.sound.el.style.backgroundImage = game.soundVolume.getIcon();
menu.save = new Button(menu.el, 'Save', btnSaveHandler);
menu.results = new Button(menu.el, 'Top 10', btnResultsHandler);

function sizePickerHandler() {
  size.info.current.el.textContent = this.textContent;
  game.start(this.textContent[0]);
}

for (let i = 3; i <= 8; i += 1) {
  size.options[`x${i}`] = new Button(size.options.el, `${i}x${i}`, sizePickerHandler);
}

/* window.addEventListener('resize', () => {
  console.log('kek');
}); */
//
game.start(4);
//

window.addEventListener('resize', () => {
  const min = Math.min(window.innerHeight * 0.5, window.innerWidth * 0.9375);
  game.canvas.width = min;
  game.canvas.height = min;
  game.wrapper.style.width = `${min}px`;
  game.wrapper.style.height = `${min}px`;
  game.renderField();
});

time.counter.el.addEventListener('text-changed', () => {
  game.autoSave();
});
