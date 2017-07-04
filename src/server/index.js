/* eslint-disable no-console, no-underscore-dangle, no-undef */
import Koa from 'koa';
import middlewares from './middlewares';
import router from './routes';
import render from './render';

const app = new Koa();

// common middlewares
middlewares(app);

if (__DEV__) {
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

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}!`);
});

module.exports = app;
