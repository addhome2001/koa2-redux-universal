import path from 'path';
import render from './core/render';

module.exports = async function applySSRConfig(app, config) {
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
  }

  // server-render
  await app.use(render);
};
