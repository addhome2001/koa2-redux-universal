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
    // serverSideRender: true,
  },
  hot: {
    path: '/__webpack_hmr',
    reload: true,
  },
});
