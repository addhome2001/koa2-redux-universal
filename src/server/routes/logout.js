import Router from 'koa-router';

const logout = new Router();

logout
  .get('/', async (ctx) => {
    if (ctx.isAuthenticated()) {
      await ctx.logout();
      ctx.status = 200;
      ctx.body = { message: 'Logout sucessfully.' };
    } else {
      ctx.status = 401;
    }
  });

export default logout;
