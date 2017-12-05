import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import config from '../../../config';

const Strategy = new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_SECRET,
  callbackURL: `http://${config.HOST}:${config.PORT}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  const user = { username: profile.displayName, id: profile.id };
  done(null, user);
});

export default Strategy;
