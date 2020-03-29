import { BattleMask, BattleStatGroup } from "./types";
import { Pokemon, Move, HP } from "../pokemon/types";

const moveService = require("../static/move");

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
    pokemon.stats as BattleStatGroup
  );
}
