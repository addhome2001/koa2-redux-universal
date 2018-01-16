import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../../services/user';

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
      console.error(e);
      return done(new Error('Something went wrong with your Signin'), false);
    }
  },
);

export default Strategy;
