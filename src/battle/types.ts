import { HP } from "../pokemon/types";

enum BattleRoundInputType {
  ATTACK,
  USE_ITEM,
  SWAP_POKEMON,
  ATTEMPT_TO_RUN
}

interface AttackInput {
  MoveNumber: Number;
}

interface UseItemInput {
  ItemID: String;
  PokemonID: String;
}

interface SwapPokemonInput {
  PokemonToSwapInID: String;
}

interface AttemptToRunInput {}

interface UserTurn {
  type: BattleRoundInputType;
  input: AttackInput | UseItemInput | SwapPokemonInput | AttemptToRunInput;
}

export class BattleMask {
  constructor(
    public readonly name: string,
    public readonly level: number,
    public readonly hp: HP,
    public readonly moves: Move[],
    public readonly original_stats: BattleStatGroup,
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
      } as BattleStatGroup
    }    

  public moveCount(): number {
    return this.moves.length;
  }

  stat_deltas: BattleStatGroup; // todo: getters and setters. protect that shiz


  public stats(): ComputedStatGroup {
    return ComputeStats(this.original_stats, this.stat_deltas);
  }
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

export interface Move {
  id: number;
  accuracy: number;
  damage_class: string;
  effect_chance: number;
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
  name: string;
  power: number;
  pp: number;
  priority: number;
  stat_changes: StatChange[];
  target: string;
  type: string;
}

export interface StatChange {
  change: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

interface BattleState {
  ally: BattleMask;
}

class Battle {}

export function ComputeStats(original:BattleStatGroup, delta:BattleStatGroup): ComputedStatGroup {
  return {    
    attack: modifyStatByDelta(original.attack, delta.attack),
    defense: modifyStatByDelta(original.defense, delta.defense),
    special_attack: modifyStatByDelta(original.special_attack, delta.special_attack),
    special_defense: modifyStatByDelta(original.special_defense, delta.special_defense),
    speed: modifyStatByDelta(original.speed, delta.speed),
    accuracy: modifyStatByDelta(original.accuracy, delta.accuracy),
    evasion: modifyStatByDelta(original.evasion, delta.evasion),
  };
}

export function modifyStatByDelta(stat: number, delta: number): number {
  if (delta > 6 || delta < -6) {
    throw `argument out of range - delta: ${delta}`;
  }

  let modifier = 1;

  switch (delta) {
    case -6: modifier = 2/8; break;
    case -5: modifier = 2/7; break;
    case -4: modifier = 2/6; break;
    case -3: modifier = 2/5; break;
    case -2: modifier = 2/4; break;
    case -1: modifier = 2/3; break;
    case 0: modifier = 2/2; break;
    case 1: modifier = 3/2; break;
    case 2: modifier = 4/2; break;
    case 3: modifier = 5/2; break;
    case 4: modifier = 6/2; break;
    case 5: modifier = 7/2; break;
    case 6: modifier = 8/2; break;
  }

  return stat * modifier;
}