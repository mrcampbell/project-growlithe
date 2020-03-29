const file = require('./read-file')

module.exports.getItem = async (id, version_group) => {
  const cacheData = await cache.get("items", id)
  const fileData = getItemFromFile(id)
  return summarize(fileData, version_group)
}

function getItemFromFile(id) {
  const data = file.getDataFromFile("items", id)
  return data;
}

function summarize(i, version_group) {
  let result = {}
  result.attributes = [];
  i.attributes.forEach(a => {
    result.attributes.push(a.name)
  })
  result.category = i.category.name
  result.cost = i.cost;

  result.effect_entry = i.effect_entries[0].effect;
  result.effect_entry_short = i.effect_entries[0].short_effect;

  // ultra-sun-ultra-moon is the latest version, and the description
  // isn't available for all earlier versions.
  // this doesn't affect much.  no spoilers
  i.flavor_text_entries.forEach(fte => {
    if (fte.version_group.name === "ultra-sun-ultra-moon" &&
      fte.language.name === "en") {
      result.flavor_text = fte.text;
    }
  })

  result.version_group = version_group;
  result.name = i.name;
  i.names.forEach(n => {
    if (n.language.name === "en") {
      result.display_name = n.name;
    }
  })

  result.sprites = i.sprites.default;

  return result;
}