/* eslint-disable no-underscore-dangle, no-undef, import/no-dynamic-require */
const path = require('path');

// resolve server entry point
const entryPoint = path.resolve(__dirname, '../', process.env.ENTRY, 'server');

// setting global constant
global.__DEV__ = process.env.NODE_ENV !== 'production';
global.PORT = process.env.PORT || 8000;

// require hook compiles CSS Modules in runtime
require('css-modules-require-hook/preset');

// require server entry point
require(entryPoint);
