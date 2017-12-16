import Router from 'koa-router';

const register = new Router();

register
  .get('/', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/');
    } else {
      await next();
    }
  });

export default register;
