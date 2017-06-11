/* eslint-disable no-console, no-underscore-dangle, no-undef */
import Koa from 'koa';
import middlewares from './middlewares';
import router from './routes';
import render from './render';

const app = new Koa();

// middlewares
middlewares(app);

// dev middlewares
if (__DEV__) {
  const koaWebpack = require('koa-webpack');
  const config = require('../../webpack/dev');
  const devMiddlewares = koaWebpack({
    config,
    dev: {
      stats: {
        colors: true,
      },
      noInfo: false,
      quite: false,
      // serverSideRender: true,
    },
    hot: {
      path: '/__webpack_hmr',
      reload: true,
    },
  });
  app.use(devMiddlewares);
} else {
  // production middlewares
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
