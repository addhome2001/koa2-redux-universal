import passport from 'koa-passport';
import facebook from './strategy/facebook';
import google from './strategy/google';
import localLogin from './strategy/local-login';
import localRegister from './strategy/local-register';

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});
passport.use('local-login', localLogin);
passport.use('local-register', localRegister);
passport.use('google', google);
passport.use('facebook', facebook);
