import { Pokemon } from "../../pokemon/types";
import { Type } from "../../pokemon/elementaltype";

export let charmeleon: Pokemon = {
  id: "p_zxshplyr1",
  breed_id: 5,
  type_one: Type.FIRE,
  type_two: Type.NONE,
  iv: {
    hp: 13,
    attack: 9,
    defense: 11,
    special_attack: 6,
    special_defense: 12,
    speed: 8
  },
  ev: {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0
  },
  stats: {
    hp: 67,
    attack: 39,
    defense: 36,
    special_attack: 46,
    special_defense: 40,
    speed: 47
  },
  level: 25,
  name: "charmeleon",
  move_one_id: 99,
  move_two_id: 52,
  move_three_id: 63,
  move_four_id: 45
};

export const ivysaur: Pokemon = {
  id: 'p_e3b6shib7',
  breed_id: 2,
  type_one: Type.GRASS,
  type_two: Type.POISON,
  iv: {
    hp: 4,
    attack: 11,
    defense: 5,
    special_attack: 2,
    special_defense: 9,
    speed: 12
  },
  ev: {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0
  },
  stats: {
    hp: 66,
    attack: 38,
    defense: 37,
    special_attack: 45,
    special_defense: 47,
    speed: 38
  },
  level: 25,
  name: 'ivysaur',
  move_one_id: 22,
  move_two_id: 33,
  move_three_id: 45,
  move_four_id: 77
}

export const wartortle: Pokemon = {
  id: 'p_i384i6sgk',
  breed_id: 8,
  type_one: Type.WATER,
  type_two: Type.NONE,
  iv: {
    hp: 12,
    attack: 5,
    defense: 11,
    special_attack: 1,
    special_defense: 3,
    speed: 6
  },
  ev: {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0
  },
  stats: {
    hp: 67,
    attack: 37,
    defense: 47,
    special_attack: 37,
    special_defense: 45,
    speed: 35
  },
  level: 25,
  name: 'wartortle',
  move_one_id: 55,
  move_two_id: 33,
  move_three_id: 145,
  move_four_id: 145
}

// export const charmeleon_battle_mask =  {"name":"charmeleon","level":25,"hp":{"max":67,"_current":67},"moves":[{"id":99,"accuracy":100,"damage_class":"physical","effect_chance":null,"effect_entry":"Inflicts regular damage.  Every time the user is hit after it uses this move but before its next action, its Attack raises by one stage.","effect_entry_short":"If the user is hit after using this move, its Attack rises by one stage.","flavor_text":"As long as this move is in use, the power of rage\nraises the Attack stat each time the user is hit\nin battle.","generation":"generation-i","ailment":"none","ailment_chance":0,"category":"damage","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Rage","power":20,"pp":20,"priority":0,"stat_changes":[],"target":"selected-pokemon","type":"normal"},{"id":52,"accuracy":100,"damage_class":"special","effect_chance":10,"effect_entry":"Inflicts regular damage.  Has a $effect_chance% chance to burn the target.","effect_entry_short":"Has a $effect_chance% chance to burn the target.","flavor_text":"The target is attacked with small flames. This may\nalso leave the target with a burn.","generation":"generation-i","ailment":"burn","ailment_chance":10,"category":"damage+ailment","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Ember","power":40,"pp":25,"priority":0,"stat_changes":[],"target":"selected-pokemon","type":"fire"},{"id":63,"accuracy":90,"damage_class":"special","effect_chance":null,"effect_entry":"Inflicts regular damage.  User loses its next turn to \"recharge\", and cannot attack or switch out during that turn.","effect_entry_short":"User foregoes its next turn to recharge.","flavor_text":"The target is attacked with a powerful beam.\nThe user can’t move on the next turn.","generation":"generation-i","ailment":"none","ailment_chance":0,"category":"damage","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Hyper Beam","power":150,"pp":5,"priority":0,"stat_changes":[],"target":"selected-pokemon","type":"normal"},{"id":45,"accuracy":100,"damage_class":"status","effect_chance":null,"effect_entry":"Lowers the target's Attack by one stage.","effect_entry_short":"Lowers the target's Attack by one stage.","flavor_text":"The user growls in an endearing way, making\nopposing Pokémon less wary. This lowers their\nAttack stat.","generation":"generation-i","ailment":"none","ailment_chance":0,"category":"net-good-stats","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Growl","power":null,"pp":40,"priority":0,"stat_changes":[{"change":-1,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}}],"target":"all-opponents","type":"normal"}],"original_stats":{"hp":67,"attack":39,"defense":36,"special_attack":46,"special_defense":40,"speed":47},"stat_deltas":{"hp":0,"attack":0,"defense":0,"special_attack":0,"special_defense":0,"speed":0,"accuracy":0,"evasion":0}}
// export const ivysaur_battle_mask = {"name":"ivysaur","level":25,"hp":{"max":66,"_current":66},"moves":[{"id":22,"accuracy":100,"damage_class":"physical","effect_chance":null,"effect_entry":"Inflicts regular damage.","effect_entry_short":"Inflicts regular damage with no additional effect.","flavor_text":"The target is struck with slender, whiplike vines to\ninflict damage.","generation":"generation-i","ailment":"none","ailment_chance":0,"category":"damage","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Vine Whip","power":45,"pp":25,"priority":0,"stat_changes":[],"target":"selected-pokemon","type":"grass"},{"id":33,"accuracy":100,"damage_class":"physical","effect_chance":null,"effect_entry":"Inflicts regular damage.","effect_entry_short":"Inflicts regular damage with no additional effect.","flavor_text":"A physical attack in which the user charges and\nslams into the target with its whole body.","generation":"generation-i","ailment":"none","ailment_chance":0,"category":"damage","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Tackle","power":40,"pp":35,"priority":0,"stat_changes":[],"target":"selected-pokemon","type":"normal"},{"id":45,"accuracy":100,"damage_class":"status","effect_chance":null,"effect_entry":"Lowers the target's Attack by one stage.","effect_entry_short":"Lowers the target's Attack by one stage.","flavor_text":"The user growls in an endearing way, making\nopposing Pokémon less wary. This lowers their\nAttack stat.","generation":"generation-i","ailment":"none","ailment_chance":0,"category":"net-good-stats","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Growl","power":null,"pp":40,"priority":0,"stat_changes":[{"change":-1,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}}],"target":"all-opponents","type":"normal"},{"id":77,"accuracy":75,"damage_class":"status","effect_chance":null,"effect_entry":"Poisons the target.","effect_entry_short":"Poisons the target.","flavor_text":"The user scatters a cloud of poisonous dust that\npoisons the target.","generation":"generation-i","ailment":"poison","ailment_chance":0,"category":"ailment","critical_hit_rate":0,"drain":0,"flinch_chance":0,"healing":0,"max_hits":null,"max_turns":null,"min_hits":null,"min_turns":null,"stat_chance":0,"name":"Poison Powder","power":null,"pp":35,"priority":0,"stat_changes":[],"target":"selected-pokemon","type":"poison"}],"original_stats":{"hp":66,"attack":38,"defense":37,"special_attack":45,"special_defense":47,"speed":38},"stat_deltas":{"hp":0,"attack":0,"defense":0,"special_attack":0,"special_defense":0,"speed":0,"accuracy":0,"evasion":0}}