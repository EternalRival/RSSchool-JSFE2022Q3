import utils from './utils';

const { pause } = utils;

export default class Tile {
  constructor(x, y, number) {
    Object.assign(this, {
      number,
      x: { initial: x, current: x },
      y: { initial: y, current: y },
    });
  }

  isRightPosition() {
    return this.x.initial === this.x.current && this.y.initial === this.y.current;
  }

  async move(emptyCell, timeout = 0.3) {
    const empty = emptyCell;
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
