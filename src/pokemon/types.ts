import { Type } from "./elementaltype";

export interface Item {

}

export interface ItemUsed {
  item_id: string;
  pokemon_id: string;
}

export interface Breed {
  id: number
  stats: StatGroup;
  base_experience: number
  height: number
  name: string;
  species: string
  type_one: string;
  type_two: string;
  abilities: any[];
  move_learns: MoveLearn[];
  version_group: string;
}

export interface MoveLearn {
  id: number;
  name: string;
  method: string;
  level: string;
}

export interface Pokemon {
  id: string;
  breed_id: number;
  type_one: Type;
  type_two: Type;
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

export interface Move {
  id: number;
  accuracy: number;
  damage_class: string;
  effect_chance: number | null;
  effect_entry: string;
  effect_entry_short: string;
  flavor_text: string;
  generation: string;
  ailment: string;
  ailment_chance: number;
  category: string;
  critical_hit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: number;
  max_turns: number;
  min_hits: number;
  min_turns: number;
  stat_chance: number;
  stat_changes: any
  name: string;
  target: string
  type: Type;
  power: number;
  priority: number;
  pp: number;
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