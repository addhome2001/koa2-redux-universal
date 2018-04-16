import crypto from 'crypto';
import Router from 'koa-router';
import User from '../services/user';
import mailer from '../utils/mailer';

const forgot = new Router();

forgot
  .get('/', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/');
    } else {
      await next();
    }
  })
  .post('/', async (ctx) => {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await User.forgot(ctx.body.email, token);

    if (user) {
      await mailer.sendTokenMailer(ctx.host, user.email, token);
      ctx.status = 200;
      ctx.body = { message: 'The email has been sent sucessfully.' };
    } else {
      ctx.status = 501;
      ctx.body = { message: 'The email was not found.' };
    }
  });

export default forgot;
