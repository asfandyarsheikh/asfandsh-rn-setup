const path = require("path");

const src = path.join(process.env.INIT_CWD, 'mobile');
const dataPath = path.join(process.env.INIT_CWD, 'data');
const env = path.join(process.env.INIT_CWD, 'env');


module.exports = {src, dataPath, env};
