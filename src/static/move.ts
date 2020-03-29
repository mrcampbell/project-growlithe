import { Move } from "../pokemon/types"

const file = require('./read-file')

const emptyMove = {
  "id": 0,
  "accuracy": 0,
  "damage_class": "special",
  "effect_chance": null,
  "effect_entry": "",
  "effect_entry_short": "",
  "flavor_text": "",
  "generation": "generation-i",
  "ailment": "none",
  "ailment_chance": 0,
  "category": "special",
  "critical_hit_rate": 0,
  "drain": 0,
  "flinch_chance": 0,
  "healing": 0,
  "max_hits": null,
  "max_turns": null,
  "min_hits": null,
  "min_turns": null,
  "stat_chance": 0,
  "name": "None",
  "target": "selected-pokemon",
  "type": "normal",
  power: 0,
  priority: 0,
  pp: 0,
  stat_changes: [],
}

module.exports.getMove = async (id): Promise<Move> => {
  if (id === 0 || !id) {
    return emptyMove
  }
  const fileData = getMoveFromFile(id)
  return summarize(fileData)
}

function getMoveFromFile(id) {
  const data = file.getDataFromFile("moves", id)
  return data;
}

function summarize(m): Move {
  const result = {} as Move;
  result.id = m.id;
  result.accuracy = m.accuracy;
  result.damage_class = m.damage_class.name;
  result.effect_chance = m.effect_chance;
  
  result.effect_entry = m.effect_entries[0].effect;
  result.effect_entry_short = m.effect_entries[0].short_effect;
  m.flavor_text_entries.forEach(fte => {
    if (fte.version_group.name === "ultra-sun-ultra-moon" &&
      fte.language.name === "en") {
      result.flavor_text = fte.flavor_text;
    }
  })

  result.generation = m.generation.name;
  result.ailment = m.meta.ailment ? m.meta.ailment.name : "none";
  result.ailment_chance = m.meta.ailment_chance;
  result.category = m.meta.category.name;
  result.critical_hit_rate = m.meta.crit_rate;
  result.drain = m.meta.drain;
  result.flinch_chance = m.meta.flinch_chance;
  result.healing = m.meta.healing;
  result.max_hits = m.meta.max_hits;
  result.max_turns = m.meta.max_turns;
  result.min_hits = m.meta.min_hits;
  result.min_turns = m.meta.min_turns;
  result.stat_chance = m.meta.stat_chance;
  result.name = m.meta.name;

  m.names.forEach(n => {
    if (n.language.name === "en") {
      result.name = n.name;
    }
  })

  result.power = m.power;
  result.pp = m.pp;
  result.priority = m.priority;
  result.stat_changes = m.stat_changes;
  result.target = m.target.name;
  result.type = m.type.name;

  return result;
}