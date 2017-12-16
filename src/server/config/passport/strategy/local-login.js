import { Strategy as LocalStrategy } from 'passport-local';

import { isValidUser } from '../utils';

const Strategy = User =>
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    try {
      const user = await User.findOne({
        where: { username },
      });

      if (user && isValidUser(password, user.password)) {
        const { email, id } = user.get();

        await User.update({
          last_login: new Date(),
        }, {
          where: { username },
        });

        return done(null, {
          id,
          username,
          email,
        });
      }

      return done(new Error('User or password is invalid.'), false);
    } catch (e) {
      console.error(e);
      return done(new Error('Something went wrong with your Signin'), false);
    }
  });

export default Strategy;
