import { Strategy as LocalStrategy } from 'passport-local';
import { hashSync } from 'bcryptjs';

const Strategy = User =>
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (ctx, username, password, done) => {
    try {
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        const userInfo = {
          username,
          password: hashSync(password),
          email: ctx.body.email,
        };
        const newUser = await User.create(userInfo);

        if (newUser) {
          return done(null, newUser);
        }

        return done(null, userInfo);
      }
      return done(new Error('The username is already taken.'), false);
    } catch (e) {
      console.error(e);
      return done(new Error('Something went wrong with your Signin'), false);
    }
  });

export default Strategy;
