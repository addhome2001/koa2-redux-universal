import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../../services/user';
import { authLogger } from '../../../utils/loggers';

const Strategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await User.login(username, password);

      if (user) {
        const { email, id } = user.get();
        return done(null, {
          id,
          username,
          email,
        });
      }

      return done(new Error('User or password is invalid.'), false);
    } catch (e) {
      authLogger.error('Something went wrong with Login', e);
      return done(new Error('Something went wrong with your Signing'), false);
    }
  },
);

export default Strategy;
