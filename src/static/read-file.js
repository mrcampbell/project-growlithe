const path = require('path');
const fs = require('fs');

module.exports.getDataFromFile = (dir, id) => {
  const filename = path.join(__dirname, "..", "..", "data", dir, `${id}.json`)
  if (!fs.existsSync(filename)) {
    throw Error(`Object ${dir} with id: ${id} not found`)
  }

  const bytes = fs.readFileSync(filename)
  return JSON.parse(bytes)
}