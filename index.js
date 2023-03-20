#!/usr/bin/env node

const f = {
    start: require("./bin/start"),
    setup: require("./bin/setup"),
    auth: require('./bin/auth'),
    secrets: require('./bin/secrets'),
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
    console.log("auth");
    await f.auth();
}

setup();
