const fs = require('fs');
const {ensureFile} = require('fs-extra');
const util = require('util');
const stream = require('stream');
const axios = require("axios");
const {src} = require("./paths");
const pipeline = util.promisify(stream.pipeline);

const downloadFile = async (loc, pth) => {
  try {
    await ensureFile(pth);
    const request = await axios.get(loc, {
      responseType: 'stream',
    });
    await pipeline(request.data, fs.createWriteStream(pth));
    console.log(`download ${loc} successful`);
  } catch (error) {
    console.error('download pipeline failed', error);
  }
}

const projectDir = () => {
  try {
    process.chdir(src);
  } catch (error) {
    console.error('chdir failed', error);
  }
}

module.exports = {downloadFile, projectDir};
