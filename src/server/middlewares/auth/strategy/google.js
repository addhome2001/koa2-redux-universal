/* eslint-disable no-undef */
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const Strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: `http://${URL}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  const user = { username: profile.displayName, id: profile.id };
  done(null, user);
});

export default Strategy;
