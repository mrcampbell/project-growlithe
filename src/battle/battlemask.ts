import { BattleMask } from "./types";

const moveService = require('../static/move');

export async function getBattleMask(pokemon): Promise<BattleMask> {
  const mask = { moves: []} as any;
  mask.moves.push(await moveService.getMove(pokemon.move_one_id))
  mask.moves.push(await moveService.getMove(pokemon.move_two_id))
  mask.moves.push(await moveService.getMove(pokemon.move_three_id))
  mask.moves.push(await moveService.getMove(pokemon.move_four_id))
  // todo: read hp from persistent storage
  mask.hp = {max: pokemon.stats.hp, current: pokemon.stats.hp}
  mask.stat_deltas = {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
    accuracy: 0,
    evasion: 0,
  }
  mask.stats = Object.assign({}, pokemon.stats)
  mask.computed_stats = Object.assign({}, pokemon.stats)

  mask.getStat = (name) => {
    return {
      delta: mask.stat_deltas[name],
      base: mask.stats[name],
      computed: mask.computed_stats[name],
      canGoAnyLower: (mask.stat_deltas[name] === -6) ? false : true,
      canGoAnyHigher: (mask.stat_deltas[name] === 6) ? false : true,
    }
  }

  mask.name = pokemon.name;
  mask.level = pokemon.level

  return mask
}

// todo: add modifier
function calculateDamage(attacker, defender, move) {
  if (!move.power || move.power === 0) {
    return 0
  }

  const a = (2 * attacker.level/5)
  const b = move.power * attacker.getStat('attack').computed / attacker.getStat('defense').computed
  const c = (a * b / 50) + 2;
  return Math.floor(c);
}

export function applyStatChange(mask, stat, amount) {
  let currentDelta = mask.stat_deltas[stat];

  let newDelta = currentDelta += amount;
  if (newDelta > 6) {
    newDelta = 6;
  }

  if (newDelta <= -6) {
    newDelta = -6
  }

  let modifier = 1;
  

  mask.stat_deltas[stat] = newDelta;
  mask.computed_stats[stat] = mask.stats[stat] * modifier;
  return mask
}

export function getMoveResult(attacker, defender, move) {
  let response = {
    missed: false,
    attackerName: attacker.name,
    moveName: move.name,
    stat_changes: [],
  } as any;
  // todo: determine if move missed

  const damageToDefender = calculateDamage(attacker, defender, move)
  response.damageToDefender = damageToDefender;
  // todo: calculate recoil
  // todo: calculate self-heal

  if (move.stat_changes && move.stat_changes.length > 0) {
    move.stat_changes.forEach(sc => {
      response.stat_changes.push({stat: sc.stat.name, amount: sc.change});
    })
  }

  // todo: calculate status to attacker
  // todo: calculate stat change to attacker
  // todo: calculate stat change to defender
  return response
}

// currently, just return fastest pokemon. In future, use move priority
export function getFirstMover(ally, enemy, allyMove, enemyMove) {
  return ally.stats.speed >= enemy.stats.speed;
}