const file = require('./read-file')

module.exports.getBreed = async (id, version_group) => {
  if (id === 0)  {
    throw Error("no breed with id 0")
  }
  const fileData = getBreedFromFile(id)
  return summarize(fileData, version_group)
}

function summarize(raw, version_group) {
  const summary = summarizeRawPokemon(raw);
  const moves = getMovesFromRawPokemon(raw, version_group)
  summary.move_learns = moves;
  summary.version_group = version_group;
  return summary;
}

function getBreedFromFile(id) {
  const data = file.getDataFromFile("breeds", id)
  return data;
}

function summarizeRawPokemon(p) {
  let result = {};
  result.stats = {};
  result.stats.speed = p.stats[0].base_stat
  result.stats.special_defense = p.stats[1].base_stat
  result.stats.special_attack = p.stats[2].base_stat
  result.stats.defense = p.stats[3].base_stat
  result.stats.attack = p.stats[4].base_stat
  result.stats.hp = p.stats[5].base_stat
  result.base_experience = p.base_experience;
  result.height = p.height;
  result.id = p.id;
  result.name = p.name;
  result.species = p.species.name;
  result.type_one = p.types.length == 2 ? p.types[1].type.name : p.types[0].type.name;
  result.type_two = p.types.length == 2 ? p.types[0].type.name : undefined;
  result.abilities = []

  p.abilities.forEach(a => {
    result.abilities.push({ name: a.ability.name, is_hidden: a.is_hidden })
  })
  return result
}

function getMovesFromRawPokemon(p, version_group) {
  let moves = [];
  const moveNumberRE = /move\/(\d+)\//
  let matches = [];
  p.moves.forEach(m => {
    m.version_group_details.forEach(vgd => {
      if (vgd.version_group.name === version_group) {

        matches = moveNumberRE.exec(m.move.url)
        let id = 0;
        let url = '';
        if (matches.length > 1) {
          id = parseInt(matches[1])
        }
        
        moves.push({id, name: m.move.name, method: vgd.move_learn_method.name, level: vgd.level_learned_at, url})
      }
    })
  })

  return moves;
}