import passport from 'koa-passport';
import facebook from './strategy/facebook';
import google from './strategy/google';
import login from './strategy/local-login';
import register from './strategy/local-register';

export default (User) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((id, done) => {
    done(null, id);
  });
  passport.use('local-login', login(User));
  passport.use('local-register', register(User));
  passport.use('google', google);
  passport.use('facebook', facebook);
};
