const {projectDir, env, rn_android, rn_dirs} = require("../utils");
const path = require("path");
const fse = require("fs-extra");
const fs = require("fs");

async function fileChanges() {
    const code = await fs.promises.readFile(path.join(env, 'google-services.json'), 'utf-8');
    await fse.outputFile(path.join(rn_android, 'app', 'google-services.json'), code);
}

async function fileChanges1() {
    const code = await fs.promises.readFile(path.join(env, 'env.ts'), 'utf-8');
    await fse.outputFile(path.join(rn_dirs.rn_shared, 'constants', 'env.ts'), code);
}

async function secrets() {
    projectDir();
    await fileChanges();
    await fileChanges1();
}

module.exports = secrets;
