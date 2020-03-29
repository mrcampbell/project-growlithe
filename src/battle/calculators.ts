import { BattleMask } from "./types";
import { Move } from "../pokemon/types";

// todo: add modifier
function calculateDamage(attacker: BattleMask, defender: BattleMask, move: Move) {
  if (!move.power || move.power === 0) {
    return 0;
  }

  const a = (2 * attacker.level) / 5;
  const b =
    (move.power * attacker.stats().attack) /
    defender.stats().defense;
  const c = (a * b) / 50 + 2;
  return Math.floor(c);
}

export function getMoveResult(attacker, defender, move) {
  let response = {
    missed: false,
    attackerName: attacker.name,
    moveName: move.name,
    stat_changes: []
  } as any;
  // todo: determine if move missed

  const damageToDefender = calculateDamage(attacker, defender, move);
  response.damageToDefender = damageToDefender;
  // todo: calculate recoil
  // todo: calculate self-heal

  if (move.stat_changes && move.stat_changes.length > 0) {
    move.stat_changes.forEach(sc => {
      response.stat_changes.push({ stat: sc.stat.name, amount: sc.change });
    });
  }

  // todo: calculate status to attacker
  // todo: calculate stat change to attacker
  // todo: calculate stat change to defender
  return response;
}

// currently, just return fastest pokemon. In future, use move priority
export function getFirstMover(ally, enemy, allyMove, enemyMove) {
  return ally.stats.speed >= enemy.stats.speed;
}
