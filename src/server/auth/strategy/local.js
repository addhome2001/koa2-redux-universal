import { Strategy as LocalStrategy } from 'passport-local';

import users from '~/server/models/users';

const Strategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  // replace here by your authentication.
  const user = users.find(u =>
    u.username === username && u.password === password,
  );
  if (!user) {
    return done(
      new Error('User not found.'),
      false,
    );
  }
  return done(null, {
    username: user.username,
    id: user.id,
    email: user.email,
  });
});

export default Strategy;
