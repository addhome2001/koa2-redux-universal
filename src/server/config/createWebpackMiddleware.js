const koaWebpack = require('koa-webpack');
const webpackConfig = require('../../../webpack/dev');

module.exports = function createWebpackMiddleware({ host }) {
  return koaWebpack({
    config: webpackConfig,
    devMiddleware: {
      publicPath: webpackConfig.output.publicPath,
    },
    hotClient: {
      host,
    },
  });
};
