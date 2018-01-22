const koaWebpack = require('koa-webpack');
const config = require('../../../webpack/dev');

module.exports = koaWebpack({
  config,
  dev: {
    stats: {
      colors: true,
    },
    noInfo: false,
    quite: false,
  },
  hot: {
    host: '0.0.0.0',
  },
});
