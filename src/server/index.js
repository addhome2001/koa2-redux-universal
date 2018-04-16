import Koa from 'koa';
import path from 'path';
import middlewares from './middlewares';
import config from './config';
import dbInstance from './models';
import { initLogger } from './core/utils/loggers';

// register passport
import './config/passport';

import connectDB from './config/connectDB';

const app = new Koa();

// common middlewares
middlewares(app, config);

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
app.use(async (ctx) => {
  await require('./core/render').default(ctx);
});

// connect to Database
connectDB(dbInstance).then(() => {
  app.listen(config.PORT, () => {
    initLogger.info(`Server is running at ${config.PORT}!`);
  });
});

module.exports = app;
