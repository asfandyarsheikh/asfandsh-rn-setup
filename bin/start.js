const util = require('util');
const {projectDir, rn_dirs} = require("../utils");
const path = require("path");
const fse = require("fs-extra");
const exec = util.promisify(require('child_process').exec);

async function fileChanges() {
    const code = `
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="RootScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootNavigator;
`;
    await fse.outputFile(path.join(rn_dirs.rn_screens, 'RootNavigator.tsx'), code);
}

async function start() {
    projectDir();
    const {stdout1, stderr1} = await exec(
        'npm i @tisf/rn-screens',
    );
    console.log('stdout:', stdout1);
    console.log('stderr:', stderr1);
    await fileChanges();
}

module.exports = start;
