import { Strategy as LocalStrategy } from 'passport-local';

import isValidUser from '../isValidUser';

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
        const { username: name, email, id } = user.get();
        return done(null, {
          id,
          username: name,
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
