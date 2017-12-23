/* eslint-disable no-console */
import Koa from 'koa';
import middlewares from './middlewares';
import router from './routes';
import render from './render';
import config from './config';
import dbInstance from './models';

// register passport
import './config/passport';
import connectDB from './config/connectDB';

const app = new Koa();

// common middlewares
middlewares(app, config);

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

// connect to Database
connectDB(dbInstance).then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server is running at ${config.PORT}!`);
  });
});

module.exports = app;
