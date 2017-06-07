import Router from 'koa-router';

// router
import auth from './auth';
import login from './login';
import logout from './logout';
import profile from './profile';

const router = new Router();

router
  .get('/', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/profile');
    } else {
      await next();
    }
  })

  .use('/auth', auth.routes(), auth.allowedMethods())
  .use('/login', login.routes(), login.allowedMethods())
  .use('/logout', logout.routes(), logout.allowedMethods())
  .use('/profile', profile.routes(), profile.allowedMethods());

export default router;
