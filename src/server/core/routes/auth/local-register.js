import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.post('/', (ctx, next) =>
  passport.authenticate(
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
  )(ctx, next),
);

export default router;
