import { Pokemon, Move, HP } from "../pokemon/types";
import { Type } from "../pokemon/elementaltype";

const moveService = require("../static/move");


export class BattleMask {
  constructor(
    public readonly name: string,
    public readonly level: number,
    public readonly hp: HP,
    public readonly moves: Move[],
    public readonly original_stats: BattleStatGroup,
    public readonly type_one: Type,
    public readonly type_two: Type,
  ) {
    this.stat_deltas = {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 0,
      accuracy: 0,
      evasion: 0
    } as BattleStatGroup;
  }

  public moveCount(): number {
    return this.moves.length;
  }

  stat_deltas: BattleStatGroup; // todo: getters and setters. protect that shiz

  public stats(): ComputedStatGroup {
    return ComputeStats(this.original_stats, this.stat_deltas);
  }
}

export function ComputeStats(
  original: BattleStatGroup,
  delta: BattleStatGroup
): ComputedStatGroup {
  return {
    attack: modifyStatByDelta(original.attack, delta.attack),
    defense: modifyStatByDelta(original.defense, delta.defense),
    special_attack: modifyStatByDelta(
      original.special_attack,
      delta.special_attack
    ),
    special_defense: modifyStatByDelta(
      original.special_defense,
      delta.special_defense
    ),
    speed: modifyStatByDelta(original.speed, delta.speed),
    accuracy: modifyStatByDelta(original.accuracy, delta.accuracy),
    evasion: modifyStatByDelta(original.evasion, delta.evasion)
  };
}

export function modifyStatByDelta(stat: number, delta: number): number {
  if (delta > 6 || delta < -6) {
    throw `argument out of range - delta: ${delta}`;
  }

  let modifier = 1;

  switch (delta) {
    case -6:
      modifier = 2 / 8;
      break;
    case -5:
      modifier = 2 / 7;
      break;
    case -4:
      modifier = 2 / 6;
      break;
    case -3:
      modifier = 2 / 5;
      break;
    case -2:
      modifier = 2 / 4;
      break;
    case -1:
      modifier = 2 / 3;
      break;
    case 0:
      modifier = 2 / 2;
      break;
    case 1:
      modifier = 3 / 2;
      break;
    case 2:
      modifier = 4 / 2;
      break;
    case 3:
      modifier = 5 / 2;
      break;
    case 4:
      modifier = 6 / 2;
      break;
    case 5:
      modifier = 7 / 2;
      break;
    case 6:
      modifier = 8 / 2;
      break;
  }

  return stat * modifier;
}


export interface BattleStatGroup {
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  accuracy: number;
  evasion: number;
}

export interface ComputedStatGroup {
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  accuracy: number;
  evasion: number;
}

export interface BattleStatGroup {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  accuracy: number;
  evasion: number;
}

export async function getBattleMask(pokemon: Pokemon): Promise<BattleMask> {
  return new BattleMask(
    pokemon.name,
    pokemon.level,
    new HP(pokemon.stats.hp), // todo: read current hp as well
    [
      await moveService.getMove(pokemon.move_one_id),
      await moveService.getMove(pokemon.move_two_id),
      await moveService.getMove(pokemon.move_three_id),
      await moveService.getMove(pokemon.move_four_id)
    ],
    {accuracy: 0, evasion: 0, ...pokemon.stats} as BattleStatGroup,
    pokemon.type_one,
    pokemon.type_two,
  );
}
