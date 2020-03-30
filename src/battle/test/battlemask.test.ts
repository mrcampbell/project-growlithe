import { getBattleMask, BattleMask } from "../battlemask";
import { charmeleon, ivysaur } from "./sample-data";
import { create } from '../../pokemon/create'

describe("BattleMask", function() {
  it("is created successfully", async function() {
    const mask: BattleMask = await getBattleMask(ivysaur)
    console.log(JSON.stringify(mask))
    expect(mask.moves[0].id).toEqual(99)
    expect(mask.moves[1].id).toEqual(52)
    expect(mask.moves[2].id).toEqual(63)
    expect(mask.moves[3].id).toEqual(45)
    expect(mask.hp.max).toEqual(67)
    expect(mask.hp.current).toEqual(67)
    expect(mask.stats().attack).toEqual(39)
  });

  it("it's stats reflect changes", async function() {
    const mask: BattleMask = await getBattleMask(charmeleon)
    mask.stat_deltas.defense -= 1; 
    mask.stat_deltas.attack += 4;
    expect(mask.stats().defense).toEqual(36 * 2/3)
    expect(mask.stats().attack).toEqual(39 * 6/2)
  });
});
