import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../../../services/user';
import config from '../../../config';
import { authLogger } from '../../../utils/loggers';

const Strategy = new FacebookStrategy(
  {
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret: config.FACEBOOK_SECRET,
    callbackURL: `http://${config.HOST}:${config.PORT}/auth/facebook/callback`,
    profileFields: ['email', 'displayName'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const {
        displayName: username,
        id,
        emails: [{ value: email }],
        provider,
      } = profile;

      const user = await User.OAuthService(username, email, id, provider);

      if (user) {
        return done(null, { id, username, email });
      }

      return done(['duplicateEmail', email], false);
    } catch (e) {
      authLogger.error(`Facebook authentication went wrong. ${e}`);

      return done(['failedOauth', 'facebook'], false);
    }
  },
);

export default Strategy;
