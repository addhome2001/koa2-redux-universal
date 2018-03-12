import Koa from 'koa';
import middlewares from './middlewares';
import render from './render';
import config from './config';
import { initLogger } from './utils/loggers';

const app = new Koa();

// common middlewares
middlewares(app);

if (config.DEV) {
  // server hot reload
  require('./config/watch')(__dirname);
  // webpack dev middlewares
  app.use(require('./config/webpack'));
}

// server-render
app.use(render);

app.listen(config.PORT, () => {
  initLogger.info(`Server is running at ${config.PORT}!`);
});

module.exports = app;
