const seedrandom = require('seedrandom');
const rng = seedrandom('yep');

export let randBetweenInclusive = (min: number, max: number): number => Math.floor(rng() * (max - min + 1) + min);
