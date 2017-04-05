import Router from 'koa-router';

// auth routes
import local from './local';
import facebook from './facebook';
import google from './google';

const auth = new Router();

auth
  .use('/local', local.routes(), local.allowedMethods())
  .use('/facebook', facebook.routes())
  .use('/google', google.routes());

export default auth;
