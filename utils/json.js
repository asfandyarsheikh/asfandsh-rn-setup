const fs = require('fs');

const jsonMerge = async (pth, obj) => {
  const file = await fs.promises.readFile(pth, 'utf-8');
  const json = JSON.parse(file);
  const output = Object.assign({}, json, obj)
  await fs.promises.writeFile(pth, JSON.stringify(output, null, 2));
  return output;
}

module.exports = {jsonMerge};
