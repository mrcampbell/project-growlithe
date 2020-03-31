import { randBetweenInclusive } from "../utils/random"
import id from "../utils/id";
import shuffle from "../utils/shuffle";
import { getBreed, getAllLearnableMovesForBreed } from "../static/breed";
import { Type } from "./elementaltype";
import { Breed, Move } from "./types";
const MAX_IV = 15;

export async function create(breedID: number, level: number, versionGroup: string, move_overrides?: number[]) {
  let breed: Breed;
  return new Promise(async (resolve, reject) => {

    await getBreed(breedID, versionGroup)
    .then(b => breed = b)
    .catch(err => {
      console.log(err)
      reject(err)
    }) // todo ??

    let moves: number[] = [];
    const moveOverridesProvided = move_overrides && move_overrides.length > 0;
    if (moveOverridesProvided) {
      const learnableMoves = getAllLearnableMovesForBreed(breedID, versionGroup);
      console.log(learnableMoves)

      move_overrides.forEach(mo => {
        learnableMoves.forEach(lm => {
          if (mo === lm.id) {
            moves.push(mo)
            // todo: break?
          }
        })
      })
    } else { 
      moves = getRandomMoves(breed, level)
    }

    if (moveOverridesProvided && moves.length === 0) {
      throw "unlearnable moves provided as overrides"
    }
    
    const iv = {
      hp: randBetweenInclusive(1, MAX_IV),
      attack: randBetweenInclusive(1, MAX_IV),
      defense: randBetweenInclusive(1, MAX_IV),
      special_attack: randBetweenInclusive(1, MAX_IV),
      special_defense: randBetweenInclusive(1, MAX_IV),
      speed: randBetweenInclusive(1, MAX_IV),
    }
    
    const ev = {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 0,
    }
    
    const stats = {
      hp: calcHP(level, breed.stats.hp, iv.hp, ev.hp),
      attack: calcStat(level, breed.stats.attack, iv.attack, ev.attack),
      defense: calcStat(level, breed.stats.defense, iv.defense, ev.defense),
      special_attack: calcStat(level, breed.stats.special_attack, iv.special_attack, ev.special_attack),
      special_defense: calcStat(level, breed.stats.special_defense, iv.special_defense, ev.special_defense),
      speed: calcStat(level, breed.stats.speed, iv.speed, ev.speed),
    }
    const p = {
      id: id('p'),
      breed_id: breedID,
      iv,
      ev,
      stats,
      level,
      name: breed.name,
      move_one_id: moves.length >= 1 ? moves[0] : 0,
      move_two_id: moves.length >= 2 ? moves[1] : 0,
      move_three_id: moves.length >= 3 ? moves[2] : 0,
      move_four_id: moves.length >= 4 ? moves[3] : 0,
      type_one: Type[breed.type_one.toUpperCase()],
      type_two: Type[breed.type_two.toUpperCase()],
    }

    resolve(p)
  })
}

function calcStat(level: number, base: number, iv: number, ev: number): number {
	let a, b, c;
	a = Math.floor(ev / 4)
	b = ((2 * base) + iv + a) * level
	c = Math.floor(b/100) + 5

	// todo: implement nature
	// return c * nature when done

	return c
}

function calcHP(level: number, base: number, iv: number, ev: number): number {
	return calcStat(level, base, iv, ev) + 5 + level
}

function getRandomMoves(breed, level) {
  let levelUpMoveLearns = [];
  breed.move_learns.forEach(m => {
    if (
      m.method === 'level-up'
      && m.level <= level
    ) {
      levelUpMoveLearns.push(m.id)
    }
  })
  
  if (levelUpMoveLearns.length > 4) {
    shuffle(levelUpMoveLearns)
  }
  
  return levelUpMoveLearns.slice(0, 4)
}