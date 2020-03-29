import { getBattleMask } from "../battlemask";

const samplePokemon = {
  id: "p_zxshplyr1",
  breed_id: 5,
  iv: {
    hp: 13,
    attack: 9,
    defense: 11,
    special_attack: 6,
    special_defense: 12,
    speed: 8
  },
  ev: {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0
  },
  stats: {
    hp: 67,
    attack: 39,
    defense: 36,
    special_attack: 46,
    special_defense: 40,
    speed: 47
  },
  level: 25,
  name: "charmeleon",
  move_one_id: 99,
  move_two_id: 52,
  move_three_id: 63,
  move_four_id: 45
};

describe("test BattleMask", function() {
  it("battle mask runs successfully", async function() {
   
    const mask = await getBattleMask(samplePokemon)
    console.log(mask)
    expect(mask.moves[0].id).toEqual(99)
    expect(mask.moves[1].id).toEqual(52)
    expect(mask.moves[2].id).toEqual(63)
    expect(mask.moves[3].id).toEqual(45)
    expect(mask.hp.max).toEqual(67)
    expect(mask.hp.current).toEqual(67)
  });
});
