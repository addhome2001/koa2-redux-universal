/* eslint-disable consistent-return */
import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.post('/', (ctx, next) =>
  passport.authenticate(
    'local-login',
    {
      failWithError: true,
    },
    async (err, user) => {
      if (err) {
        ctx.status = 401;
        ctx.body = { message: err.message };
      } else {
        await ctx.login(user);
        ctx.body = user;
      }
    },
  )(ctx, next),
);

export default router;
