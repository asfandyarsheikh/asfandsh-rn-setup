#!/usr/bin/env node

const f = {
    start: require("./bin/start"),
    setup: require("./bin/setup"),
    secrets: require('./bin/secrets'),
    auth: require('./bin/auth'),
    home: require('./bin/home'),
}

const argv = require('minimist')(process.argv.slice(2));

async function setup() {
    if(argv.s) {
        f[argv.s]();
        return
    }
    console.log("start");
    await f.start();
    console.log("setup");
    await f.setup();
    console.log("secrets");
    await f.secrets();
    console.log("auth");
    await f.auth();
    console.log("home");
    await f.home();
}

setup();
