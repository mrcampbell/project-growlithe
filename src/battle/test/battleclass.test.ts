import { charmeleon, ivysaur } from "./sample-data";
import { Battle } from "../battle";

describe("Battle", function() {
  it("is created successfully", async function() {
    const battle = new Battle(charmeleon, ivysaur)

    await battle.initialize()
  });

  // it("it's stats reflect changes", async function() {
  //   const mask: Batt = await getBattleMask(charmeleon)
  //   mask.stat_deltas.defense -= 1; 
  //   mask.stat_deltas.attack += 4;
  //   expect(mask.stats().defense).toEqual(36 * 2/3)
  //   expect(mask.stats().attack).toEqual(39 * 6/2)
  // });

});
