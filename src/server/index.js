/* eslint-disable no-console */
import Koa from 'koa';
import 'css-modules-require-hook/preset';
import middlewares from './middlewares';
import router from './routes';
import render from './render';

const app = new Koa();
const PORT = process.env.PORT || 8000;
const DEV = process.env.DEV;

// middlewares
middlewares(app);

// dev middlewares
if (DEV) {
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
}

// router
app.use(router.routes(), router.allowedMethods());

// server-render
app.use(render);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}!`);
});

module.exports = app;
