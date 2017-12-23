import { Strategy as LocalStrategy } from 'passport-local';

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
        const { email } = ctx.body;
        const userInfo = User.preSave({
          email,
          username,
          password,
        });
        const { id } = await User.create(userInfo);

        return done(null, {
          id,
          username,
          email,
        });
      }
      return done(new Error('The username is already taken.'), false);
    } catch (e) {
      console.error(e);
      return done(new Error('Something went wrong with your Signin'), false);
    }
  });

export default Strategy;
