export class Robot {
  
  constructor(x, y, f) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get f() {
    return this._f;
  }

  set x(value) {
    if (typeof value !== 'number') {
      throw new Error('"x" must be a number.');
    }

    this._x = value;
  }

  set y(value) {
    if (typeof value !== 'number') {
      throw new Error('"y" must be a number.');
    }

    this._y = value;
  }

  set f(value) {
    if (typeof value !== 'string') {
      throw new Error('"f" must be a string.');
    }

    this._f = value;
  }

}
