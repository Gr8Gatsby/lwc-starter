'use strict';

const path = require('path');

const SOURCE_DIRECTORY = path.resolve(__dirname, '../src/client');
const DISTRIBUTION_DIRECTORY = path.resolve(__dirname, '../dist');

const __ENV__ = process.env.NODE_ENV || 'development';
const __PROD__ = __ENV__ === 'production';

module.exports = {
    SOURCE_DIRECTORY,
    DISTRIBUTION_DIRECTORY,

    __ENV__,
    __PROD__,
};