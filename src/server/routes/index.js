import Router from 'koa-router';

// router
import auth from './auth';
import login from './login';
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

    .get('/about')

    .get('/error')

    .get('/logout', async (ctx) => {
      if (ctx.isAuthenticated()) {
        await ctx.logout();
        ctx.status = 200;
        ctx.body = { message: 'logout sucessful' };
        return;
      }
      ctx.status = 401;
      ctx.body = { message: '' };
    })

    .use('/auth', auth.routes(), auth.allowedMethods())
    .use('/login', login.routes(), login.allowedMethods())
    .use('/profile', profile.routes(), profile.allowedMethods());

export default router;
