const util = require('util');
const {projectDir} = require("../utils");
const exec = util.promisify(require('child_process').exec);

async function start() {
    projectDir();
    const {stdout1, stderr1} = await exec(
        'npm i @tisf/rn-screens',
    );
    console.log('stdout:', stdout1);
    console.log('stderr:', stderr1);
}

module.exports = start;
