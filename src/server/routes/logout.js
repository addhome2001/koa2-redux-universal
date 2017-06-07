import Router from 'koa-router';

const logout = new Router();

logout
  .get('/', async (ctx) => {
    if (ctx.isAuthenticated()) {
      await ctx.logout();
      ctx.status = 200;
      ctx.body = { message: 'logout sucessful' };
    } else {
      ctx.status = 401;
      ctx.body = { message: '' };
    }
  });

export default logout;
