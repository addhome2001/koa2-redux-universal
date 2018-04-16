import Router from 'koa-router';

// auth routes
import facebook from './facebook';
import google from './google';
import local from './local-login';
import register from './local-register';

const auth = new Router();

auth
  .use('/login', local.routes(), local.allowedMethods())
  .use('/register', register.routes(), register.allowedMethods())
  .use('/facebook', facebook.routes())
  .use('/google', google.routes());

export default auth;
