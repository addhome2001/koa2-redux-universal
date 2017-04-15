import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcryptjs';

import Users from 'server/models/users';

const Strategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  // replace here by your authentication.
  Users(username).then((user) => {
    if (user) {
      return compare(password, user.password).then((result) => {
        if (result) {
          return done(null, {
            username: user.username,
            id: user.id,
            email: user.email,
          });
        }
        return done(new Error('Invalid Password.'), false);
      });
    }

    return done(new Error('User not found.'), false);
  });
});

export default Strategy;
