import Router from 'koa-router';
import passport from 'koa-passport';

const google = new Router();

google
  .get('/', (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/profile');
    }

    return passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    })(ctx, next);
  })

  .get('/callback', (ctx, next) =>
    passport.authenticate(
      'google',
      {
        failureRedirect: '/error',
      },
      async (err, user) => {
        if (err) {
          if (Array.isArray(err)) {
            ctx.redirect(`/error/${err.join('/')}`);
          } else {
            ctx.redirect('/error');
          }
        } else {
          await ctx.login(user);
          ctx.redirect('/profile');
        }
      },
    )(ctx, next),
  );

export default google;
