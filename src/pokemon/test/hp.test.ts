import { HP } from "../types";

describe("test HP functions and limits", function() {
  it("constructor without `current` works correctly", function() {
    const hp = new HP(40);
    expect(hp.max).toEqual(40)
    expect(hp.current).toEqual(40)
  });

  it("constructor with `current` works correctly", function() {
    const hp = new HP(40, 25);
    expect(hp.max).toEqual(40)
    expect(hp.current).toEqual(25)
  });

  it("hp decrements correctly", function() {
    const hp = new HP(40);
    hp.change(-20)
    expect(hp.max).toEqual(40)
    expect(hp.current).toEqual(20)
  });

  it("hp increments correctly", function() {
    const hp = new HP(40, 25);
    hp.change(5)
    expect(hp.max).toEqual(40)
    expect(hp.current).toEqual(30)
  });

  it("hp does not decrement below 0", function() {
    const hp = new HP(40);
    hp.change(-60)
    expect(hp.max).toEqual(40)
    expect(hp.current).toEqual(0)
  });

  it("hp does not increment above max", function() {
    const hp = new HP(40, 25);
    hp.change(60)
    expect(hp.max).toEqual(40)
    expect(hp.current).toEqual(40)
  });
});


