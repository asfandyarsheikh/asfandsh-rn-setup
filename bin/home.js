const {rn_dirs, projectDir, yamls, downloadFile} = require("../utils");
const path = require("path");
const fse = require("fs-extra");

function sculptImports(auth) {
  return `import React from 'react';
import {createTestScreen} from '@tisf/rn-screens';
`;
}

function sculptTest(auth) {
  return `
const HomeScreen = createTestScreen('HomeScreen');
`;
}

function sculptHome(auth) {
  return `
export default HomeScreen;
`;
}

async function fileChanges(auth) {
  const imports = sculptImports(auth);
  const test = sculptTest(auth);
  const ath = sculptHome(auth);

  const code = `${imports}${test}${ath}`;
  await fse.outputFile(path.join(rn_dirs.rn_screens, 'HomeScreen.tsx'), code);
}

async function home() {
  const auth = yamls.auth;
  projectDir();
  await fileChanges(auth);
}

module.exports = home;
