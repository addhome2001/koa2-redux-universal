import csrf from 'koa-csrf';
import session from 'koa-generic-session';
import convert from 'koa-convert';
import etag from 'koa-etag';
import conditional from 'koa-conditional-get';
import onerror from 'koa-onerror';
import views from 'koa-views';
import body from 'koa-bodyparser';
import koaStatic from 'koa-static-server';
import passport from 'koa-passport';
import logger from 'koa-logger';
import path from 'path';
import auth from './auth';

module.exports = (app) => {
  // session
  app.keys = ['secret1', 'secret2', 'secret3'];
  app.use(convert(session()));

  // body parser
  app.use(body());

  // passport
  app.use(passport.initialize());
  app.use(passport.session());
  auth(passport);

  // view engine
  app.use(views(path.resolve(__dirname, 'views'), { extension: 'ejs' }));

  // static
  app.use(koaStatic({
    rootDir: path.resolve(__dirname, 'static'),
  }));

  app.use(conditional());
  app.use(etag());

  app.use(async (ctx, next) => {
    ctx.body = ctx.request.body;
    await next();
  });

  app.use(csrf());

  // logger
  app.use(logger());

  onerror(app);
};
