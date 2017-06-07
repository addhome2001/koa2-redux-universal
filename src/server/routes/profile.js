import Router from 'koa-router';

const profile = new Router();

profile
  .get('/', async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
      ctx.redirect('/');
    } else {
      await next();
    }
  });

export default profile;
