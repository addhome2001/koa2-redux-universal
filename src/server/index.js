import Koa from 'koa';
import path from 'path';
import middlewares from './middlewares';
import config from './config';
import { initLogger } from './core/utils/loggers';

const app = new Koa();

// common middlewares
middlewares(app);

if (config.DEV) {
  // server hot reload for the core directory
  require('./config/serverWatcher')(path.resolve(__dirname, './core'));
  // webpack dev middlewares
  app.use(require('./config/webpack'));
}

// server-render
app.use(async (ctx) => {
  await require('./core/render').default(ctx);
});

app.listen(config.PORT, () => {
  initLogger.info(`Server is running at ${config.PORT}!`);
});

module.exports = app;
