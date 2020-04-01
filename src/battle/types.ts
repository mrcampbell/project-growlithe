import { HP, Pokemon } from "../pokemon/types";
import { getBattleMask } from "./battlemask";

export enum UserTurnType {
  ATTACK = "attack",
  USE_ITEM= "bag",
  SWAP_POKEMON= "pokemon",
  ATTEMPT_TO_RUN= "run",
}

export interface AttackInput {
  MoveIndex: number;
}

export interface UseItemInput {
  ItemID: String;
  PokemonID: String;
}

export interface SwapPokemonInput {
  PokemonToSwapInID: String;
}

export interface AttemptToRunInput {}

export interface UserTurn {
  type: UserTurnType;
  input: AttackInput | UseItemInput | SwapPokemonInput | AttemptToRunInput;
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