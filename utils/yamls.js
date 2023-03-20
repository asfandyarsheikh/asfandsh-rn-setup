const fs = require('fs');
const path = require("path");
const YAML = require("yaml");
const {dataPath} = require("./paths");

const yamls = {
  auth: YAML.parse(fs.readFileSync(path.join(dataPath, 'screen', 'auth.yaml'), 'utf8')),
};

module.exports = {yamls};
