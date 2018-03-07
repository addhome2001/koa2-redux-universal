import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../../../services/user';
import config from '../../../config';
import { authLogger } from '../../../utils/loggers';

const Strategy = new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET,
    callbackURL: `http://${config.HOST}:${config.PORT}/auth/google/callback`,
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
      authLogger.error(`Google authentication went wrong. ${e}`);

      return done(['failedOauth', 'google'], false);
    }
  },
);

export default Strategy;
