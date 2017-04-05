import { Strategy as FacebookStrategy } from 'passport-facebook';

const URL = `${process.env.IP}:${process.env.PORT}`;

const Strategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `http://${URL}/auth/facebook/callback`,
}, (accessToken, refreshToken, profile, done) => {
  const user = { username: profile.displayName, id: profile.id };
  done(null, user);
});

export default Strategy;
