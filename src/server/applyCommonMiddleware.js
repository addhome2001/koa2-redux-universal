import path from 'path';
import CSRF from 'koa-csrf';
import session from 'koa-session';
import etag from 'koa-etag';
import conditional from 'koa-conditional-get';
import onerror from 'koa-onerror';
import views from 'koa-views';
import body from 'koa-bodyparser';
import serve from 'koa-static';
import passport from 'koa-passport';
import logger from 'koa-logger';
import redisStore from 'koa-redis';
import helmet from 'koa-helmet';

module.exports = (app, config) => {
  // session
  app.keys = ['secret1', 'secret2', 'secret3'];

  // store session in redis or memory
  app.use(
    session(
      {
        store: redisStore(config.SESSION_STORE),
      },
      app,
    ),
  );

  // body parser
  app.use(body());

  // helmet
  app.use(helmet());

  // passport
  app.use(passport.initialize());
  app.use(passport.session());

  // view engine
  app.use(views(path.resolve(__dirname, 'views'), { extension: 'ejs' }));

  // static
  app.use(serve(path.resolve(__dirname, 'static')));

  app.use(conditional());
  app.use(etag());

  app.use(async (ctx, next) => {
    ctx.body = ctx.request.body;
    await next();
  });

  // enable csrf
  app.use(new CSRF());

  // logger
  app.use(logger());

  onerror(app);
};
