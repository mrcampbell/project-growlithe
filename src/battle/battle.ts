import { UserTurn, UserTurnType, AttackInput } from "./types";
import { Pokemon, Move, ItemUsed, StatGroup } from "../pokemon/types";
import { getBattleMask, BattleMask, BattleStatGroup } from "./battlemask";
import { Type, getTypeAdvantage } from '../pokemon/elementaltype';
import { randBetweenInclusive } from "../utils/random";

export class UserTurnResult {
  TurnType: UserTurnType;
  MoveUsed: Move;
  MoveResult: MoveResult;
  ItemUsed: ItemUsed;
  AttemptToFlee: boolean;
}

export class MoveResult {
  damageToAttacker: number;
  statChangesToAttacker: BattleStatGroup;

  damageToDefender: number;
  statChangesToDefender: BattleStatGroup;
}

export class RoundTurnResult {
  allyMovesFirst: boolean;
  allyTurnResult: UserTurnResult;
  enemyTurnResult: UserTurnResult;
  ally: BattleMask;
  enemy: BattleMask;
}

export class BattleService {
  constructor() { }

  public static processRound(allyBattleMask: BattleMask, allyTurn: UserTurn, enemyBattleMask: BattleMask, enemyTurn: UserTurn): RoundTurnResult {
    const result = {} as RoundTurnResult;

    result.allyMovesFirst = BattleService.getAllyMovesFirst(allyBattleMask, enemyBattleMask, allyTurn, enemyTurn)

    result.allyTurnResult = BattleService.getUserTurnResult(
      allyTurn,
      allyBattleMask,
      enemyBattleMask
    );
    result.enemyTurnResult = BattleService.getUserTurnResult(
      enemyTurn,
      enemyBattleMask,
      allyBattleMask,
    );

    const {ally, enemy} = BattleService.applyRoundResult(result, allyBattleMask, enemyBattleMask);
    result.ally = ally;
    result.enemy = enemy;

    return result;
  }

  private static applyRoundResult(result: RoundTurnResult, ally: BattleMask, enemy: BattleMask) {
    if (result.allyMovesFirst) {
      let {ally: allyAfterFirst, enemy: enemyAfterFirst} = BattleService.applyUserTurnResult(result.allyTurnResult, true, ally, enemy)
      return BattleService.applyUserTurnResult(result.enemyTurnResult, false, allyAfterFirst, enemyAfterFirst)
    } else {
      let {ally: allyAfterFirst, enemy: enemyAfterFirst} = BattleService.applyUserTurnResult(result.enemyTurnResult, false, ally, enemy)
      return BattleService.applyUserTurnResult(result.allyTurnResult, true, ally, enemy)
    }
  }

  private static applyUserTurnResult(result: UserTurnResult, attackerIsAlly: boolean, allyBattleMask: BattleMask, enemyBattleMask: BattleMask) {
    const response = {
      ally: allyBattleMask,
      enemy: enemyBattleMask,
    }
    let attackerKey, defenderKey;

    if (attackerIsAlly) {
      attackerKey = 'ally'; // DANGEROUS.  This might be better done another way
      defenderKey = 'enemy';
    } else {
      attackerKey = 'enemy';
      defenderKey = 'ally';
    }

    if (result.TurnType === UserTurnType.ATTACK) {
      response[defenderKey].hp.change(-result.MoveResult.damageToDefender)
      result.MoveResult.statChangesToDefender;

      // todo: eeegh.
      for (let key of Object.keys(result.MoveResult.statChangesToDefender)) {
        response[defenderKey].stat_deltas[key] += result.MoveResult.statChangesToDefender[key];

        // todo: debug
        let delta = result.MoveResult.statChangesToDefender[key]
        if (delta != 0) {
          console.log(`${defenderKey}'s ${key} went ${delta > 0 ? 'up' : 'down'} by ${delta} points`)
        }
        // end debug
      }
    }

    return response
  }

  private static getUserTurnResult(
    turn: UserTurn,
    attacker: BattleMask,
    defender: BattleMask
  ): UserTurnResult {
    const result = {} as UserTurnResult;
    switch (turn.type) {
      case UserTurnType.ATTACK:
        {
          let moveInput = turn.input as AttackInput;
          let moveUsed = attacker.moves[moveInput.MoveIndex]; // todo: error check
          result.MoveResult = BattleService.getMoveResult(
            attacker,
            defender,
            moveUsed
          );
        }
        break;
      case UserTurnType.SWAP_POKEMON:
        {
        }
        break;
      case UserTurnType.USE_ITEM:
        {
        }
        break;
      case UserTurnType.ATTEMPT_TO_RUN:
        {
        }
        break;
    }

    result.TurnType = turn.type;
    return result;
  }

  private static getAllyMovesFirst(ally: BattleMask, enemy: BattleMask, allyTurn: UserTurn, enemyTurn: UserTurn): boolean {
    if (allyTurn.type === UserTurnType.USE_ITEM) {
      return true
    }

    // todo: add move priority,
    return ally.stats().speed > enemy.stats().speed;
  }

  private static getMoveResult(
    attacker: BattleMask,
    defender: BattleMask,
    move: Move
  ): MoveResult {
    console.log(attacker.name + ' used ' + move.name)
    return {
      damageToAttacker: BattleService.calculateDamageToAttacker(
        attacker,
        defender,
        move
      ),
      damageToDefender: BattleService.calculateDamageToDefender(
        move.power,
        move.type,
        attacker.type_one,
        attacker.type_two,
        attacker.level,
        attacker.stats().attack,
        defender.type_one,
        defender.type_two,
        defender.stats().defense,
        randBetweenInclusive(0, 100),
        randBetweenInclusive(85, 100),
      ), // todo: add special atk/def if special
      statChangesToAttacker: BattleService.calculateStatChangeToAttacker(
        attacker,
        defender,
        move
      ),
      statChangesToDefender: BattleService.calculateStatChangeToDefender(
        attacker,
        defender,
        move
      )
    } as MoveResult;
  }

  private static calculateDamageToDefender(
    movePower: number,
    moveType: Type,
    attackerTypeOne: Type,
    attackerTypeTwo: Type,
    attackerLevel: number,
    attackerAttack: number,
    defenderTypeOne: Type,
    defenderTypeTwo: Type,
    defenderDefense: number,
    criticalRandom: number,
    randomModifier: number,
  ): number {
    if (!movePower || movePower === 0) {
      return 0;
    }

    if (randomModifier > 100 || randomModifier < 85) {
      throw "random modifier out of range (85..100 inclusive): " + randomModifier
    }

    // todo: highest modifier (85.."100") is off
    const a = Math.round((Math.round(2 * attackerLevel) / 5)) + 2;
    const b = Math.round(Math.round(movePower * attackerAttack) / defenderDefense);
    const initial = Math.floor(Math.round(a * b) / 50) + 2;

    const critical = (criticalRandom <= 7) ? 2.0 : 1.0;
    const stab = (attackerTypeOne === moveType || attackerTypeTwo === moveType) ? 1.5 : 1;
    const typeAdvantageOne = getTypeAdvantage(moveType, defenderTypeOne)
    const typeAdvantageTwo = getTypeAdvantage(moveType, defenderTypeTwo)
    const typeAdvantage = (typeAdvantageOne * typeAdvantageTwo);
    const modifier = critical * (randomModifier / 100) * stab * typeAdvantage;
    console.log({ modifier, critical, randomModifier, stab, typeAdvantage })
    return Math.round(initial * modifier);
  }

  // todo: calculate recoil
  private static calculateDamageToAttacker(
    attacker: BattleMask,
    defender: BattleMask,
    move: Move
  ): number {
    return 0;
  }

  private static calculateStatChangeToDefender(
    attacker: BattleMask,
    defender: BattleMask,
    move: Move
  ): BattleStatGroup {
    const result = {
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 0,
      accuracy: 0,
      evasion: 0,
    } as BattleStatGroup;
    if (move.stat_chance === 0 && move.stat_changes.length > 0) {
      move.stat_changes.forEach(sc => {
        console.log(sc, sc.stat.name, sc.change)
        result[sc.stat.name] += sc.change
      })
    }
    return result;
  }

  // todo: this
  private static calculateStatChangeToAttacker(
    attacker: BattleMask,
    defender: BattleMask,
    move: Move
  ): BattleStatGroup {
    return {} as BattleStatGroup;
  }
}
