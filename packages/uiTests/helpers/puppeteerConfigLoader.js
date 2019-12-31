/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const localConf = '../puppeteer.local.conf.js';
const defaultConf = '../puppeteer.default.conf';
let ret;
if (fs.existsSync(path.join(__dirname, localConf))) {
    ret = require(localConf);
} else {
    ret = require(defaultConf);
}

module.exports = ret;
