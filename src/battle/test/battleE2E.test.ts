import { charmeleon, ivysaur } from "./sample-data";
import { BattleService } from "../battle";
import { UserTurnType } from "../types";
import { getBattleMask } from "../battlemask";

// note: this is seeded randoms
describe("Battle", function () {
  it("plays out correctly", async function () {

    let allyBattleMask = await getBattleMask(charmeleon);
    let enemyBattleMask = await getBattleMask(ivysaur);

    let result = BattleService.processRound(
      allyBattleMask,
      { type: UserTurnType.ATTACK, input: { MoveIndex: 0 } }, // rage
      enemyBattleMask,
      { type: UserTurnType.ATTACK, input: { MoveIndex: 0 } }, // vine whip
    )

    expect(result.ally.hp.current).toEqual(59)
    expect(result.enemy.hp.current).toEqual(59)

    result = BattleService.processRound(
      result.ally,
      { type: UserTurnType.ATTACK, input: { MoveIndex: 1 } }, // ember
      result.enemy,
      { type: UserTurnType.ATTACK, input: { MoveIndex: 2 } }, // growl
    )

    expect(result.ally.stat_deltas.attack).toEqual(-1);

    console.log(JSON.stringify(result.ally.stat_deltas, null, 2))
  });
})