import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../../services/user';

const Strategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
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
    console.error(e);
    return done(new Error('Something went wrong with your Signin'), false);
  }
});

export default Strategy;
