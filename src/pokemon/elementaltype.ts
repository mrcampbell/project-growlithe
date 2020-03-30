export enum TypeAdvantage {
  Strong = 2.0,
  Weak = 0.5,
  Normal = 1.0,
  None = 0,
}
export enum Type {
  NONE = "none",
  BUG = "bug",
  DARK = "dark",
  DRAGON = "dragon",
  ELECTRIC = "electric",
  FAIRY = "fairy",
  FIGHTING = "fighting",
  FIRE = "fire",
  FLYING = "flying",
  GHOST = "ghost",
  GRASS = "grass",
  GROUND = "ground",
  ICE = "ice",
  NORMAL = "normal",
  POISON = "poison",
  PSYCHIC = "psychic",
  ROCK = "rock",
  STEEL = "steel",
  WATER = "water",
}

export function getTypeAdvantage(atk: Type, def: Type): TypeAdvantage {
  switch (atk) {
    case Type.NORMAL:
      switch (def) {
        case Type.ROCK:
        case Type.STEEL:
          return TypeAdvantage.Weak;
        case Type.GHOST:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.FIGHTING:
      switch (def) {
        case Type.NORMAL:
        case Type.ROCK:
        case Type.STEEL:
        case Type.ICE:
        case Type.DARK:
          return TypeAdvantage.Strong;
        case Type.FLYING:
        case Type.POISON:
        case Type.BUG:
        case Type.PSYCHIC:
        case Type.FAIRY:
          return TypeAdvantage.Weak;
        case Type.GHOST:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.FLYING:
      switch (def) {
        case Type.FIGHTING:
        case Type.BUG:
        case Type.GRASS:
          return TypeAdvantage.Strong;
        case Type.ROCK:
        case Type.STEEL:
        case Type.ELECTRIC:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.POISON:
      switch (def) {
        case Type.GRASS:
        case Type.FAIRY:
          return TypeAdvantage.Strong;
        case Type.POISON:
        case Type.GROUND:
        case Type.ROCK:
        case Type.GHOST:
          return TypeAdvantage.Weak;
        case Type.STEEL:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.GROUND:
      switch (def) {
        case Type.POISON:
        case Type.ROCK:
        case Type.STEEL:
        case Type.FIRE:
        case Type.ELECTRIC:
          return TypeAdvantage.Strong;
        case Type.BUG:
        case Type.GRASS:
          return TypeAdvantage.Weak;
        case Type.FLYING:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.ROCK:
      switch (def) {
        case Type.FLYING:
        case Type.BUG:
        case Type.FIRE:
        case Type.ICE:
          return TypeAdvantage.Strong;
        case Type.FIGHTING:
        case Type.GROUND:
        case Type.STEEL:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.BUG:
      switch (def) {
        case Type.GRASS:
        case Type.PSYCHIC:
        case Type.DARK:
          return TypeAdvantage.Strong;
        case Type.FIGHTING:
        case Type.FLYING:
        case Type.POISON:
        case Type.GHOST:
        case Type.STEEL:
        case Type.FIRE:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.GHOST:
      switch (def) {
        case Type.GHOST:
        case Type.PSYCHIC:
          return TypeAdvantage.Strong;
        case Type.DARK:
          return TypeAdvantage.Weak;
        case Type.NORMAL:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.STEEL:
      switch (def) {
        case Type.ROCK:
        case Type.ICE:
        case Type.FAIRY:
          return TypeAdvantage.Strong;
        case Type.STEEL:
        case Type.FIRE:
        case Type.WATER:
        case Type.ELECTRIC:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.FIRE:
      switch (def) {
        case Type.BUG:
        case Type.STEEL:
        case Type.GRASS:
        case Type.ICE:
          return TypeAdvantage.Strong;
        case Type.ROCK:
        case Type.FIRE:
        case Type.WATER:
        case Type.DRAGON:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.WATER:
      switch (def) {
        case Type.GROUND:
        case Type.ROCK:
        case Type.FIRE:
          return TypeAdvantage.Strong;
        case Type.WATER:
        case Type.GRASS:
        case Type.DRAGON:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.GRASS:
      switch (def) {
        case Type.GROUND:
        case Type.ROCK:
        case Type.WATER:
          return TypeAdvantage.Strong;
        case Type.FLYING:
        case Type.POISON:
        case Type.BUG:
        case Type.STEEL:
        case Type.FIRE:
        case Type.GRASS:
        case Type.DRAGON:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.ELECTRIC:
      switch (def) {
        case Type.FLYING:
        case Type.WATER:
          return TypeAdvantage.Strong;
        case Type.GRASS:
        case Type.ELECTRIC:
        case Type.DRAGON:
          return TypeAdvantage.Weak;
        case Type.GROUND:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.PSYCHIC:
      switch (def) {
        case Type.FIGHTING:
        case Type.POISON:
          return TypeAdvantage.Strong;
        case Type.STEEL:
        case Type.PSYCHIC:
          return TypeAdvantage.Weak;
        case Type.DARK:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.ICE:
      switch (def) {
        case Type.FLYING:
        case Type.GROUND:
        case Type.GRASS:
        case Type.DRAGON:
          return TypeAdvantage.Strong;
        case Type.STEEL:
        case Type.FIRE:
        case Type.WATER:
        case Type.ICE:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.DRAGON:
      switch (def) {
        case Type.DRAGON:
          return TypeAdvantage.Strong;
        case Type.STEEL:
          return TypeAdvantage.Weak;
        case Type.FAIRY:
          return TypeAdvantage.None;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.DARK:
      switch (def) {
        case Type.GHOST:
        case Type.PSYCHIC:
          return TypeAdvantage.Strong;
        case Type.FIGHTING:
        case Type.DARK:
        case Type.FAIRY:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    case Type.FAIRY:
      switch (def) {
        case Type.FIGHTING:
        case Type.DRAGON:
        case Type.DARK:
          return TypeAdvantage.Strong;
        case Type.POISON:
        case Type.STEEL:
        case Type.FIRE:
          return TypeAdvantage.Weak;
        default:
          return TypeAdvantage.Normal;
      }
    default:
      return TypeAdvantage.Normal;
  }
}
