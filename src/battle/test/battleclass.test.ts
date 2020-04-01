import { charmeleon, ivysaur } from "./sample-data";
import { Battle } from "../battle";
import { UserTurnType, AttemptToRunInput } from "../types";
import { Type } from "../../pokemon/elementaltype";

describe("Battle", function () {
  it("is created successfully", async function () {
    const battle = new Battle(charmeleon, ivysaur)
    await battle.initialize()
  });

  it("processes a round", async function() {
    const battle = new Battle(charmeleon, ivysaur);
    await battle.initialize();
    const output = battle.processRound(
      // {type: UserTurnType.ATTACK, input: {MoveIndex: 0}}, // rage
      {type: UserTurnType.ATTACK, input: {MoveIndex: 1}}, // ember
      // {type: UserTurnType.ATTACK, input: {MoveIndex: 2}}, // growl
      {type: UserTurnType.ATTACK, input: {MoveIndex: 1}}, // tackle
      // {type: UserTurnType.ATTACK, input: {MoveIndex: 0}}, // vine whip
      );
      console.log(output)
    // expect(output).toEqual("A")
    // expect(mask.stats().attack).toEqual(39 * 6/2)
  });

  it("returns stat change when expected", async function() {
    const battle = new Battle(charmeleon, ivysaur);
    await battle.initialize();
    const output = battle.processRound(
      {type: UserTurnType.ATTACK, input: {MoveIndex: 1}}, // ember
      {type: UserTurnType.ATTACK, input: {MoveIndex: 2}}, // growl
      );
      console.log(output.enemyTurnResult.MoveResult.statChangesToDefender)
    expect(output.enemyTurnResult.MoveResult.statChangesToDefender.attack).toEqual(-1)
  });

  it("correctly calculates damage to defender", async function () {
    const lowest = Battle.calculateDamageToDefender(
      65,
      Type.ICE,
      Type.ICE,
      Type.NONE,
      75,
      123,
      Type.DRAGON,
      Type.GROUND,
      163,
      99,
      85, // lowest range of random modifier
    )
    expect(lowest).toEqual(168)

    const highest = Battle.calculateDamageToDefender(
      65,
      Type.ICE,
      Type.ICE,
      Type.NONE,
      75,
      123,
      Type.DRAGON,
      Type.GROUND,
      163,
      99,
      100, // highest range of random modifier
    )
    expect(highest).toEqual(198)
  })

});
