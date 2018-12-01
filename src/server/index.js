import Koa from 'koa';
import path from 'path';
import Loadable from 'react-loadable';
import applyMiddleware from './applyMiddleware';
import config from './config';
import dbInstance from './models';
import { initLogger } from './core/utils/loggers';
import render from './core/render';

// register passport
import './config/passport';

import connectDB from './config/connectDB';

const app = new Koa();

// common middlewares
applyMiddleware(app, config);

if (config.DEV) {
  // server hot reload
  require('./config/serverWatcher')(path.resolve(__dirname, './core'));
  // webpack dev middlewares
  app.use(require('./config/webpack'));
} else {
  // enable compress
  app.use(require('koa-compress')());
}

// router
app.use(async (ctx, next) => {
  const routes = require('./core/routes').default;
  await routes.routes()(ctx, async () => {
    await routes.allowedMethods()(ctx, next);
  });
});

// server-render
app.use(render);

// connect to Database
Promise.all([Loadable.preloadAll(), connectDB(dbInstance)]).then(() => {
  app.listen(config.PORT, () => {
    initLogger.info(`Server is running at ${config.PORT}!`);
  });
});

module.exports = app;
