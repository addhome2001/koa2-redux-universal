import path from 'path';
import render from './core/render';

module.exports = async function applyMiddlewareBy(app, config) {
  if (config.DEV) {
    const createWebpackMiddleware = require('./config/createWebpackMiddleware');
    const useServerWatcher = require('./config/useServerWatcher');

    // server hot reload for the core directory
    useServerWatcher(path.resolve(__dirname, './core'));

    // use webpack
    const webpackMiddleware = await createWebpackMiddleware({
      host: config.HOST,
    });
    await app.use(webpackMiddleware);
  } else {
    await app.use(require('koa-compress')());
  }

  // server-render
  await app.use(render);
};
