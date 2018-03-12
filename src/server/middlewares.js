import path from 'path';
import onerror from 'koa-onerror';
import views from 'koa-views';
import serve from 'koa-static';
import logger from 'koa-logger';

module.exports = (app) => {
  // view engine
  app.use(views(path.resolve(__dirname, 'views'), { extension: 'ejs' }));

  // static
  app.use(serve(path.resolve(__dirname, 'static')));

  // logger
  app.use(logger());

  onerror(app);
};
