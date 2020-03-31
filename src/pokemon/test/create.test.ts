import { create } from "../create";

describe("PokemonCreate", function () {
  it("creates correctly", async function () {
    const pokemon = await create(25, 15, "yellow")
    console.log(pokemon)
    // expect(pokemon.current).toEqual(40)
  });
  it("creates with move overrides correctly", async function () {
    const pokemon = await create(25, 15, "yellow", [38, 86, 92, 129])
    console.log(pokemon)
    // expect(pokemon.current).toEqual(40)
  });
});