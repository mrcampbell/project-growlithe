export interface Pokemon {
  id: string;
  breed_id: number;
  iv: StatGroup;
  ev: StatGroup;
  stats: StatGroup;
  level: number;
  name: string;
  move_one_id: number;
  move_two_id: number;
  move_three_id: number;
  move_four_id: number;
}

export interface StatGroup {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}


export class HP {

  constructor(max: number, current?:number) {
    this.max = max;
    if (current) {
      this._current = current;
    } else {
      this._current = max;
    }
  }

  readonly max: number

  _current: number;
  get current(): number {
    return this._current;
  }

  change(value: number) {
    this._current += value;
    if (this._current > this.max) {
      this._current = this.max;
    } else if (this._current < 0) {
      this._current = 0;
    }
  }
}