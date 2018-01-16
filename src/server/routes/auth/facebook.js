import Router from 'koa-router';
import passport from 'koa-passport';

const facebook = new Router();

facebook
  .get('/', (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/profile');
    }
    return passport.authenticate('facebook')(ctx, next);
  })

  .get('/callback', (ctx, next) =>
    passport.authenticate(
      'facebook',
      {
        failureRedirect: '/error',
      },
      async (err, user) => {
        if (err) {
          ctx.status = 403;
          ctx.body = { message: 'Invalid username or password.' };
        } else {
          await ctx.login(user);
          ctx.redirect('/profile');
        }
      },
    )(ctx, next),
  );

export default facebook;
