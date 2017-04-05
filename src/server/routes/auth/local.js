/* eslint-disable consistent-return */
import Router from 'koa-router';
import passport from 'koa-passport';

const local = new Router();

local
  .post('/', (ctx, next) => {
    if (ctx.assertCSRF(ctx.body)) {
      return passport.authenticate('local', {
        failWithError: true,
      }, async (err, user) => {
        if (err) {
          ctx.status = 403;
          ctx.body = { message: err.message };
        } else {
          await ctx.login(user);
          ctx.body = user;
        }
      })(ctx, next);
    }
    ctx.status = 401;
    ctx.body = { message: 'Wrong csrf token.' };
  });

export default local;
