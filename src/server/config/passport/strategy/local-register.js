import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../../services/user';
import { authLogger } from '../../../utils/loggers';

const Strategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (ctx, username, password, done) => {
    try {
      const { email } = ctx.body;
      const user = await User.register(username, password, email);

      if (user) {
        return done(null, {
          id: user.id,
          username,
          email,
        });
      }
      return done(new Error('The username is already taken.'), false);
    } catch (e) {
      authLogger.error('Something went wrong with registration', e);
      return done(
        new Error('Something went wrong with your registration'),
        false,
      );
    }
  },
);

export default Strategy;
