import { Strategy as FacebookStrategy } from 'passport-facebook';

import config from '../../../config';

const Strategy = new FacebookStrategy(
  {
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret: config.FACEBOOK_SECRET,
    callbackURL: `http://${config.HOST}:${config.PORT}/auth/facebook/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    const user = { username: profile.displayName, id: profile.id };
    done(null, user);
  },
);

export default Strategy;
