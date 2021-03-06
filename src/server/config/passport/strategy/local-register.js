import { Strategy as LocalStrategy } from 'passport-local';
import { authLogger } from '../../../core/utils/loggers';

const Strategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (ctx, username, password, done) => {
    const User = require('../../../core/services/user').default;

    try {
      const { email } = ctx.body;
      const user = await User.register(username, email, password);

      if (user) {
        return done(null, {
          id: user.id,
          username,
          email,
        });
      }

      return done(new Error('This email has been took.'), false);
    } catch (e) {
      authLogger.error(`Something went wrong with registration
        ${e}
      `);

      return done(
        new Error('Something went wrong with your registration'),
        false,
      );
    }
  },
);

export default Strategy;
