import facebook from './strategy/facebook';
import google from './strategy/google';
import local from './strategy/local';

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use('local', local);
  passport.use('google', google);
  passport.use('facebook', facebook);
};
