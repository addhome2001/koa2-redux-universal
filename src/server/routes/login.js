import Router from 'koa-router';

const login = new Router();

login
  .get('/', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/');
    } else {
      await next();
    }
  });

export default login;
