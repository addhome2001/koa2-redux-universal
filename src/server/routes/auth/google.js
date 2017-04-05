import Router from 'koa-router';
import passport from 'koa-passport';

const google = new Router();

google
  .get('/', (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/profile');
    }
    return passport.authenticate('google', { scope: ['profile'] })(ctx, next);
  })

  .get('/callback', (ctx, next) =>
    passport.authenticate('google', {
      failureRedirect: '/error',
    }, async (err, user) => {
      if (err) {
        ctx.status = 403;
        ctx.body = { message: 'Invalid username or password.' };
      } else {
        await ctx.login(user);
        ctx.redirect('/profile');
      }
    })(ctx, next),
  );

export default google;
