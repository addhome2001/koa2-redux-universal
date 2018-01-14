import Router from 'koa-router';
import User from '../services/user';
import mailer from '../utils/mailer';

const reset = new Router();

reset
  .get('/:token', async (ctx, next) => {
    const user = await User.checkResetToken(ctx.params.token);

    if (user) {
      await next();
    } else {
      ctx.redirect('/');
    }
  })
  .post('/', async (ctx) => {
    const { password, token } = ctx.body;
    const user = await User.resetPassword(password, token);

    if (user) {
      await mailer.resetPasswordSuccessfully(user.username, user.email);
      ctx.status = 200;
      ctx.body = { message: 'The password has been reset successfully.' };
    } else {
      ctx.status = 501;
      ctx.body = { message: 'The token was expires.' };
    }
  });

export default reset;
