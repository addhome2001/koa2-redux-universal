import passport from 'koa-passport';
import facebook from './strategy/facebook';
import google from './strategy/google';
import login from './strategy/local-login';
import register from './strategy/local-register';

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});
passport.use('local-login', login);
passport.use('local-register', register);
passport.use('google', google);
passport.use('facebook', facebook);
