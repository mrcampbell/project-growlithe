import { modifyStatByDelta } from "../types";

describe("test ComputeStats", function() {
  it("returns a stat that is normal without modifier", function() {
    const computed = modifyStatByDelta(100, 0)
    expect(computed).toEqual(100)
  });

  it("returns a stat lowered by one modifier", function() {
    const computed = modifyStatByDelta(100, -1)
    expect(Math.round(computed)).toEqual(Math.round(100 * 2/3))
  });

  it("returns a stat lowered by two modifier", function() {
    const computed = modifyStatByDelta(100, -2)
    expect(Math.round(computed)).toEqual(Math.round(100 * 2/4))
  });

  it("returns a stat raised by 6 modifier", function() {
    const computed = modifyStatByDelta(100, 6)
    expect(Math.round(computed)).toEqual(Math.round(100 * 8/2))
  });

  it("throws an error when input out of range", function() {
    expect(() => {
      modifyStatByDelta(100, 7)
    }).toThrow()
  });
});


