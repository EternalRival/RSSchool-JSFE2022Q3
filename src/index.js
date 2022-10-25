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
  constructor(parent) {
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
  }

  #raf;

  #cellBorder = 3;

  #shuffling = null;

  gridSize = null;

  matrix = null;

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

  setMatrix(matrix) {
    this.matrix = Array.from(
      Array(this.gridSize ** 2),
      (v, k) => new Tile(k % this.gridSize, Math.floor(k / this.gridSize), k + 1),
    );
    if (matrix) {
      for (let i = 0; i < this.matrix.length; i += 1) {
        this.matrix[i].x.current = matrix[i].x.current;
        this.matrix[i].y.current = matrix[i].y.current;
      }
    }
    this.renderField();
  }

  getEmptyCell() {
    return this.matrix[this.matrix.length - 1];
  }

  getActiveCellList() {
    const empty = this.getEmptyCell();
    const neighbors = this.matrix.filter((v) => v.isNextToEmptyCell(empty));
    return neighbors;
  }

  isPuzzleCompleted() {
    return (
      this.movesCounter !== 0 && !this.#shuffling && this.matrix.every((v) => v.isRightPosition())
    );
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
    if (tile.isRightPosition()) ctx.shadowBlur = border * 1.5;
    ctx.shadowColor = '#0f0';
    ctx.draw(cell, tile.isRightPosition() ? '#003300' : '#020');
    ctx.draw(cell, '#0f0', border);
    ctx.shadowBlur = 0;

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

    if (this.matrix) {
      this.matrix.forEach((v) => this.renderCell(v));
      this.saveGame('auto');
      if (this.isPuzzleCompleted()) this.finish();
    }
  }

  async shuffle() {
    time.current.clear();
    await pause(0.3);
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
        this.#shuffling = null;
        time.current.start();
      }
    }, timeout * 1000);
  }

  counterChange(n) {
    this.movesCounter = +(n ?? this.movesCounter + 1);
    moves.change(this.movesCounter);
  }

  start(num) {
    this.gridSize = num ?? 4;
    this.setMatrix();
    this.shuffle();
    this.movesCounter = 0;
    this.counterChange(`${this.movesCounter}`);
  }

  resume(type) {
    const load = (name) => _.ls.load(`gem-puzzle__${type}-save_${name}`);
    if (type === 'auto' && !_.ls.load('gem-puzzle__auto-save_gridSize')) {
      this.start();
      return;
    }
    if (type === 'manual' && !_.ls.load('gem-puzzle__manual-save_gridSize')) {
      return;
    }
    this.gridSize = load('gridSize');
    this.setMatrix(load('matrix'));
    time.current.setTime(load('time'));
    time.current.start();
    this.movesCounter = load('moves') ?? 0;
    this.counterChange(`${this.movesCounter}`);
    this.renderField();
  }

  finish() {
    const spent = time.current.getTime('short');
    const moves = this.movesCounter;
    const { gridSize } = this;
    const hoorayMessage = `Hooray! You solved the puzzle in ${spent} and ${moves} moves!`;

    time.current.clear();
    this.movesCounter = 0;
    this.counterChange(`${this.movesCounter}`);
    this.matrix = null;
    this.renderField();
    [
      'erdev__gem-puzzle__manual-save_moves',
      'erdev__gem-puzzle__manual-save_time',
      'erdev__gem-puzzle__manual-save_gridSize',
      'erdev__gem-puzzle__auto-save_moves',
      'erdev__gem-puzzle__auto-save_matrix',
      'erdev__gem-puzzle__auto-save_gridSize',
      'erdev__gem-puzzle__auto-save_time',
      'erdev__gem-puzzle__manual-save_matrix',
    ].forEach((v) => localStorage.removeItem(v));

    const blocker = new Element(document.body, 'div', 'blocker');
    const hoorayForm = new Element(this.wrapper, 'form', 'game__winner-form');
    const hoorayText = new Element(hoorayForm.el, 'div', 'game__hooray-text', hoorayMessage);
    const winnerInput = new Element(hoorayForm.el, 'input', 'game__winner-input', 'kekeke');
    winnerInput.el.placeholder = 'Enter your nickname…';
    hoorayForm.el.onsubmit = (e) => {
      // spent moves gridSize winnerInput
      const save = (data) => {
        const saved = _.ls.load('gem-puzzle__top-list') ?? [];
        _.ls.save('gem-puzzle__top-list', [...saved, data]);
      };
      save({
        mode: gridSize,
        name: winnerInput.el.value || 'Wanderer',
        moves,
        time: spent,
      });
      hoorayForm.destroy();
      blocker.destroy();
      this.start(this.gridSize);
      return false;
    };
  }

  zap() {
    const sound = new Audio(Sounds.moveSound);
    sound.volume = this.soundVolume[this.soundVolume.current].volume;
    sound.play();
  }

  canvasClickHandler(e) {
    if (!this.matrix) return; /* console.log('kek'); */
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

  saveGame(type) {
    const save = (name, data) => {
      _.ls.save(`gem-puzzle__${type}-save_${name}`, data);
    };
    save('time', time.current.getTime('raw'));
    save('matrix', this.matrix);
    save('moves', this.movesCounter);
    save('gridSize', this.gridSize);
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
time.counter = new Element(time.el, 'div', 'time__counter', '------------------');
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
  game.saveGame('manual');
}
function btnLoadHandler() {
  game.resume('manual');
}
function btnResultsHandler() {
  time.current.pause();
  const top = new Element(main.el, 'table', 'top__table');
  top.el.addEventListener('click', () => {
    time.current.start();
    top.destroy();
  });
  const list = _.ls.load('gem-puzzle__top-list');
  if (!list || list.length === 0) {
    top.el.click();
    return;
  }
  list.sort((a, b) => a.time.replace(':', '') - b.time.replace(':', ''));
  top.header = new Element(top.el, 'tr', 'top__record-theader');
  ['name', 'mode', 'time', 'moves'].forEach((v) => {
    new Element(top.header.el, 'th', 'top__record-th', v);
  });
  list.slice(0, 10).forEach((v) => {
    const record = new Element(top.el, 'tr', 'top__record');
    new Element(record.el, 'td', 'top__record-td', v.name);
    new Element(record.el, 'td', 'top__record-td', `${v.mode ?? 0}x${v.mode ?? 0}`);
    new Element(record.el, 'td', 'top__record-td', v.time);
    new Element(record.el, 'td', 'top__record-td', v.moves);
  });
}

menu.start = new Button(menu.el, 'restart', btnStartHandler);
menu.sound = new Button(menu.el, '', btnSoundHandler);
menu.sound.el.classList.add('menu__sound-button');
menu.sound.el.style.backgroundImage = game.soundVolume.getIcon();
menu.save = new Button(menu.el, 'Save', btnSaveHandler);
menu.load = new Button(menu.el, 'Load', btnLoadHandler);
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
// game.start();
game.resume('auto');
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
  game.saveGame('auto');
});
