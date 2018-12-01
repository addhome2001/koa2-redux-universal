import Koa from 'koa';
import path from 'path';
import Loadable from 'react-loadable';
import applyMiddleware from './applyMiddleware';
import config from './config';
import { initLogger } from './core/utils/loggers';
import render from './core/render';

const app = new Koa();

// common middleware
applyMiddleware(app);

if (config.DEV) {
  // server hot reload for the core directory
  require('./config/serverWatcher')(path.resolve(__dirname, './core'));
  // webpack dev middleware
  app.use(require('./config/webpack'));
}

// server-render
app.use(render);

Loadable.preloadAll().then(() => {
  app.listen(config.PORT, () => {
    initLogger.info(`Server is running at ${config.PORT}!`);
  });
});

module.exports = app;
