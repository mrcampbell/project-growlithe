import { UserTurn, UserTurnType, AttackInput } from "./types";
import { Pokemon, Move, ItemUsed, StatGroup } from "../pokemon/types";
import { getBattleMask, BattleMask, BattleStatGroup } from "./battlemask";
import { Type, TypeAdvantage, getTypeAdvantage } from '../pokemon/elementaltype';
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
}

export class Battle {
  ally: BattleMask;
  enemy: BattleMask;
  constructor(private pAlly: Pokemon, private pEnemy: Pokemon) { }

  async initialize(): Promise<any> {
    this.ally = await getBattleMask(this.pAlly);
    this.enemy = await getBattleMask(this.pEnemy);
  }

  processRound(allyTurn: UserTurn, enemyTurn: UserTurn): RoundTurnResult {
    const result = {} as RoundTurnResult;

    result.allyMovesFirst = Battle.getAllyMovesFirst(this.ally, this.enemy, allyTurn, enemyTurn)

    result.allyTurnResult = Battle.getUserTurnResult(
      allyTurn,
      this.ally,
      this.enemy
    );
    result.enemyTurnResult = Battle.getUserTurnResult(
      enemyTurn,
      this.enemy,
      this.ally
    );

    this.applyRoundResult(result);
    console.log(this.ally.hp, this.enemy.hp)
    return result;
  }

  // TODO: Make external service.  But temporary workaround
  private applyRoundResult(result: RoundTurnResult) {
    if (result.allyMovesFirst) {
      this.applyUserTurnResult(result.allyTurnResult, true)
      this.applyUserTurnResult(result.enemyTurnResult, false)
    } else {
      this.applyUserTurnResult(result.enemyTurnResult, false)
      this.applyUserTurnResult(result.allyTurnResult, true)
    }
  }

  private applyUserTurnResult(result: UserTurnResult, attackerIsAlly: boolean) {
    let attackerKey, defenderKey;

    if (attackerIsAlly) {
      attackerKey = 'ally'; // DANGEROUS.  This might be better done another way
      defenderKey = 'enemy';
    } else {
      attackerKey = 'enemy';
      defenderKey = 'ally';
    }

    if (result.TurnType === UserTurnType.ATTACK) {
      this[defenderKey].hp.change(-result.MoveResult.damageToDefender)
      result.MoveResult.statChangesToDefender;

      // todo: eeegh.
      for (let key of Object.keys(result.MoveResult.statChangesToDefender)) {
        this[defenderKey].stat_deltas[key] += result.MoveResult.statChangesToDefender[key];

        // todo: debug
        let delta = result.MoveResult.statChangesToDefender[key]
        if (delta > 0) {
          console.log(`${defenderKey}'s ${key} went down by ${delta} points`)
        }
        // end debug
      }
    }

  }


  static getUserTurnResult(
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
          result.MoveResult = Battle.getMoveResult(
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

  static getAllyMovesFirst(ally: BattleMask, enemy: BattleMask, allyTurn: UserTurn, enemyTurn: UserTurn): boolean {
    if (allyTurn.type === UserTurnType.USE_ITEM) {
      return true
    }

    // todo: add move priority,
    return ally.stats().speed > enemy.stats().speed;
  }

  static getMoveResult(
    attacker: BattleMask,
    defender: BattleMask,
    move: Move
  ): MoveResult {
    console.log(attacker.name + ' used ' + move.name)
    return {
      damageToAttacker: Battle.calculateDamageToAttacker(
        attacker,
        defender,
        move
      ),
      damageToDefender: Battle.calculateDamageToDefender(
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
      statChangesToAttacker: Battle.calculateStatChangeToAttacker(
        attacker,
        defender,
        move
      ),
      statChangesToDefender: Battle.calculateStatChangeToDefender(
        attacker,
        defender,
        move
      )
    } as MoveResult;
  }

  static calculateDamageToDefender(
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
  static calculateDamageToAttacker(
    attacker: BattleMask,
    defender: BattleMask,
    move: Move
  ): number {
    return 0;
  }

  static calculateStatChangeToDefender(
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

  static calculateStatChangeToAttacker(
    attacker: BattleMask,
    defender: BattleMask,
    move: Move
  ): BattleStatGroup {
    return {} as BattleStatGroup;
  }
}
