import Router from 'koa-router';
import passport from 'koa-passport';

const register = new Router();

register.post('/', (ctx, next) => {
  if (ctx.assertCSRF(ctx.body)) {
    return passport.authenticate(
      'local-register',
      {
        failWithError: true,
      },
      async (err, user) => {
        if (err) {
          ctx.status = 403;
          ctx.body = { message: err.message };
        } else {
          await ctx.login(user);
          ctx.body = user;
        }
      },
    )(ctx, next);
  }
  ctx.status = 401;
  ctx.body = { message: 'Wrong csrf token.' };

  return null;
});

export default register;
