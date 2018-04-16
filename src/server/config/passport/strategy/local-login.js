import { Strategy as LocalStrategy } from 'passport-local';
import { authLogger } from '../../../core/utils/loggers';

const Strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    const User = require('../../../core/services/user').default;

    try {
      const user = await User.login(email, password);

      if (user) {
        const { id, username } = user.get();
        return done(null, {
          id,
          username,
          email,
        });
      }

      return done(new Error('Email or password is invalid.'), false);
    } catch (e) {
      authLogger.error(`Something went wrong with Login
        ${e}
      `);
      return done(new Error('Something went wrong with your Signing'), false);
    }
  },
);

export default Strategy;
