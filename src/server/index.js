import Koa from 'koa';
import Loadable from 'react-loadable';
import applyMiddleware from './applyMiddleware';
import applySSRConfig from './applySSRConfig';
import config from './config';
import { initLogger } from './core/utils/loggers';

const app = new Koa();

// common middleware
applyMiddleware(app);

// server-side render config
applySSRConfig(app, config);

Loadable.preloadAll().then(() => {
  app.listen(config.PORT, () => {
    initLogger.info(`Server is running at ${config.PORT}!`);
  });
});

module.exports = app;
