import { charmeleon, ivysaur } from "./sample-data";
import { Battle } from "../battle";
import { UserTurnType } from "../types";

// note: this is seeded randoms
describe("Battle", function () {
  it("plays out correctly", async function () {
    const battle = new Battle(charmeleon, ivysaur)
    await battle.initialize()
    let result = battle.processRound(
      { type: UserTurnType.ATTACK, input: { MoveIndex: 0 } }, // rage
      { type: UserTurnType.ATTACK, input: { MoveIndex: 0 } } // vine whip
    )

    expect(battle.ally.hp.current).toEqual(59)
    expect(battle.enemy.hp.current).toEqual(59)

    result = battle.processRound(
      { type: UserTurnType.ATTACK, input: { MoveIndex: 1 } }, // ember
      { type: UserTurnType.ATTACK, input: { MoveIndex: 2 } } // growl
    )

    expect(battle.ally.stat_deltas.attack).toEqual(-1);

    console.log(JSON.stringify(battle.ally.stat_deltas, null, 2))
  });
})