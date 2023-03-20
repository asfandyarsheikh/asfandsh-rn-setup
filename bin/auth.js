const {rn_dirs, projectDir, yamls, downloadFile} = require("../utils");
const path = require("path");
const fse = require("fs-extra");
const {forEach} = require("lodash");

async function sculptImports(auth) {
  let onboard = '';
  if(auth.onboard) {
    onboard = ', createOnboardScreen';
  }
  return `
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthOnly} from '@tisf/rn-providers';
import {createRootScreen, createMobileScreen, createOtpScreen${onboard}} from '@tisf/rn-screens';

`;
}

async function sculptRoot(auth) {
  await downloadFile(auth.root.logo, path.join(rn_dirs.rn_images, 'logofull.png'));

  let list = '';

  forEach(auth.root.image, async (v, k) => {
    await downloadFile(v, path.join(rn_dirs.rn_images, k + `root${k}.jpg`));
    list += `        require('assets/images/root${0}.jpg'),
    `
  });

  return `
const RootScreen = createRootScreen({
  image: [
${list}],
  logo: require('assets/images/logofull.png'),
  line1: '${auth.root.line1}',
  line2: '${auth.root.line2}',
});

`;
}

async function sculptMobile(auth) {
  return `
const MobileScreen = createMobileScreen({
  countries: ${auth.mobile.countries},
  social: ${auth.mobile.social},
});

`;
}

async function sculptOtp(auth) {
  return `
const OtpScreen = createOtpScreen({
  digits: ${auth.otp.digits},
});

`;
}

async function sculptOnboard(auth) {
  if(!auth.onboard) {
    return;
  }
  let input = '';
  forEach(auth.onboard.slides, async (v, k) => {
    const split = v.split('|');
    await downloadFile(split[2], path.join(rn_dirs.rn_images, k + `onboard${k}.png`));
    input += `
  {
    title: '${split[0]}',
    text: '${split[1]}',
    image: require('assets/images/onboard${k}.png'),
  },    
`;
  });

  return `
const OnboardScreen = createOnboardScreen([${input}]);

`;
}

async function sculptAuth(auth) {
  let onboard = '';
  if(auth.onboard) {
    onboard = `
          <Stack.Screen name="RootScreen" component={OnboardScreen} />
    `;
  }

  return `
const Stack = createNativeStackNavigator();

function AuthScreen() {
  return (
    <AuthOnly unauth>
      <Stack.Navigator initialRouteName="RootScreen">
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="RootScreen" component={RootScreen} />${onboard}
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            title: '',
            headerShadowVisible: false,
            headerStyle: {},
          }}>
          <Stack.Screen name="MobileScreen" component={MobileScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </AuthOnly>
  );
}

export default AuthScreen;
`;
}

async function fileChanges(auth) {
  const imports = sculptImports(auth);
  const root = sculptRoot(auth);
  const mobile = sculptMobile(auth);
  const otp = sculptOtp(auth);
  const onboard = sculptOnboard(auth);
  const ath = sculptAuth(auth);

  const code = `${imports}${root}${mobile}${otp}${onboard}${ath}`;
  await fse.outputFile(path.join(rn_dirs.rn_screens, 'RootNavigator.tsx'), code);
}

async function auth() {
  const auth = yamls.auth;
  projectDir();
  await fileChanges(auth);
}

module.exports = auth;
