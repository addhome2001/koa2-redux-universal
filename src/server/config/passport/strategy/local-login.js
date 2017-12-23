import { Strategy as LocalStrategy } from 'passport-local';

const Strategy = User =>
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    try {
      const user = await User.findOne({
        where: { username },
      });

      if (user && user.verify.bind(user, password)) {
        const { email, id } = user.get();

        await user.update({
          last_login: new Date(),
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
