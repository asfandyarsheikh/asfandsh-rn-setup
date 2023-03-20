const fs = require('fs');
const replace = require('replace-in-file');

async function regexReplace(files, reg, rep, already, callback){
  try {
    const filecont = await fs.promises.readFile(files, 'utf-8');
    if (already && filecont.includes(already)) {
      return;
    }
    let to = rep;
    if (callback) {
      to = input => callback(input.replace(reg, rep));
    }
    const results = await replace({
      files,
      from: reg,
      to,
    });
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
module.exports = {regexReplace};
