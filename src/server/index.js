import Koa from 'koa';
import Loadable from 'react-loadable';
import applyCommonMiddleware from './applyCommonMiddleware';
import applyMiddlewareBy from './applyMiddlewareBy';
import config from './config';
import dbInstance from './models';
import { initLogger } from './core/utils/loggers';

// register passport
import './config/passport';

import connectDB from './config/connectDB';

const app = new Koa();

// common middleware
applyCommonMiddleware(app, config);

// apply middleware by config
applyMiddlewareBy(app, config);

// router
app.use(async (ctx, next) => {
  const routes = require('./core/routes').default;
  await routes.routes()(ctx, async () => {
    await routes.allowedMethods()(ctx, next);
  });
});

// connect to Database
Promise.all([Loadable.preloadAll(), connectDB(dbInstance)]).then(() => {
  app.listen(config.PORT, () => {
    initLogger.info(`Server is running at ${config.PORT}!`);
  });
});

module.exports = app;
