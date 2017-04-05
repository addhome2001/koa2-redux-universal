import Router from 'koa-router';

const profile = new Router();

profile
  .get('/', (ctx, next) => {
    if (ctx.isUnauthenticated()) {
      return ctx.redirect('/');
    }
    return next();
  });

export default profile;
