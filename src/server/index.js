import Koa from 'koa';
import Loadable from 'react-loadable';
import applyCommonMiddleware from './applyCommonMiddleware';
import applyMiddlewareBy from './applyMiddlewareBy';
import config from './config';
import { initLogger } from './core/utils/loggers';

const app = new Koa();

// common middleware
applyCommonMiddleware(app);

applyMiddlewareBy(app, config);

Loadable.preloadAll().then(() => {
  app.listen(config.PORT, () => {
    initLogger.info(`Server is running at ${config.PORT}!`);
  });
});

module.exports = app;
