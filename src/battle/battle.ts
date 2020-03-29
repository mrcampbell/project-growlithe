import { BattleMask, UserTurn, UserInputType } from "./types";
import { Pokemon } from "../pokemon/types";
import { getBattleMask } from "./battlemask";

export class Battle {
  ally: BattleMask;
  enemy: BattleMask;
  constructor(private pAlly: Pokemon, private pEnemy: Pokemon) {}

  async initialize(): Promise<any> {
    this.ally = await getBattleMask(this.pAlly);
    this.enemy = await getBattleMask(this.pEnemy);
  }

  processRound(allyTurn: UserTurn, enemyTurn: UserTurn): any {
    switch (allyTurn.type) {
      case UserInputType.ATTACK: {
        return "A"
      }; break;
      case UserInputType.SWAP_POKEMON: {
        return "S"
      }; break;
      case UserInputType.USE_ITEM: {
        return "U"
      }; break;
      case UserInputType.ATTEMPT_TO_RUN: {
        return "R"
      }; break;
    }
  }
}