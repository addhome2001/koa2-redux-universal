/* eslint-disable no-console */
import Koa from 'koa';
import middlewares from './middlewares';
import router from './routes';
import render from './render';
import config from './config';
import models from './models';

import resgisterPassport from './config/passport';
import connectDB from './config/connectDB';

const app = new Koa();
const dbInstance = models(config.DB);

// common middlewares
middlewares(app, config);

// register passport
resgisterPassport(dbInstance.User);

// connect to Database
connectDB(dbInstance);

if (config.DEV) {
  // server hot reload
  require('./config/watch')(__dirname);
  // webpack dev middlewares
  app.use(require('./config/webpack'));
} else {
  // enable compress
  app.use(require('koa-compress')());
}

// router
app.use(router.routes(), router.allowedMethods());

// server-render
app.use(render);

app.listen(config.PORT, () => {
  console.log(`Server is running at ${config.PORT}!`);
});

module.exports = app;
