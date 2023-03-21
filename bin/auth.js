const {rn_dirs, projectDir, yamls, downloadFile} = require("../utils");
const path = require("path");
const fse = require("fs-extra");
const {forEach} = require("lodash");

function sculptImports(auth) {
  let onboard = '';
  if(auth.onboard) {
    onboard = ', createOnboardScreen';
  }
  return `import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthOnly} from '@tisf/rn-providers';
import {createRootScreen, createMobileScreen, createOtpScreen${onboard}} from '@tisf/rn-screens';

`;
}

async function sculptRoot(auth) {
  const onboard = auth.onboard ? 'true' : 'false'
  await downloadFile(auth.root.logo, path.join(rn_dirs.rn_images, 'logofull.png'));

  const list = [];

  for(let k = 0; k < auth.root.image.length; k++) {
    const v = auth.root.image[k];
    await downloadFile(v, path.join(rn_dirs.rn_images, `root${k}.jpg`));
    list.push(`    require('../../assets/images/root${k}.jpg'),
`)
  }

  console.log("======================================");
  console.log(list);

  return `
const RootScreen = createRootScreen({
  image: [
${list.join('')}  ],
  logo: require('../../assets/images/logofull.png'),
  line1: '${auth.root.line1}',
  line2: '${auth.root.line2}',
  onboard: ${onboard},
});

`;
}

function sculptMobile(auth) {
  return `
const MobileScreen = createMobileScreen({
  countries: ${JSON.stringify(auth.mobile.countries)},
  social: ${auth.mobile.social},
});

`;
}

function sculptOtp(auth) {
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
  const list = [];

  for(let k = 0; k < auth.onboard.slides.length; k++) {
    const v = auth.onboard.slides[k];
    const split = v.split('|');
    await downloadFile(split[2], path.join(rn_dirs.rn_images, `onboard${k}.png`));
    list.push(`
  {
    title: '${split[0]}',
    text: '${split[1]}',
    image: require('../../assets/images/onboard${k}.png'),
  },`)
  }

  return `
const OnboardScreen = createOnboardScreen([${list.join('')}]);

`;
}

function sculptAuth(auth) {
  let onboard = '';
  if(auth.onboard) {
    onboard = `
          <Stack.Screen name="OnboardScreen" component={OnboardScreen} />`;
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
  const root = await sculptRoot(auth);
  const mobile = sculptMobile(auth);
  const otp = sculptOtp(auth);
  const onboard = await sculptOnboard(auth);
  const ath = sculptAuth(auth);

  const code = `${imports}${root}${mobile}${otp}${onboard}${ath}`;
  await fse.outputFile(path.join(rn_dirs.rn_screens, 'AuthScreen.tsx'), code);
}

async function auth() {
  const auth = yamls.auth;
  projectDir();
  await fileChanges(auth);
}

module.exports = auth;
