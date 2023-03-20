const {rn_dirs, projectDir} = require("../utils");
const fse = require("fs-extra");
const path = require("path");

async function fileChanges() {
    const code = `
import React from 'react';

import {AppWrapper} from '@tisf/rn-providers';
import RootNavigator from './screens/RootNavigator';
import {AppInfo} from './shared/constants/env';

function App(): JSX.Element {
  return (
    <AppWrapper appInfo={AppInfo}>
      <RootNavigator />
    </AppWrapper>
  );
}

export default App; 
`;
    await fse.outputFile(path.join(rn_dirs.rn_shared, 'constants', 'env.ts'), code);
}

async function fileChanges1() {
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
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootNavigator;
`;
    await fse.outputFile(path.join(rn_dirs.rn_screens, 'RootNavigator.tsx'), code);
}

async function setup() {
    projectDir();
    await fileChanges();
    await fileChanges1();
}

module.exports = setup;
