import { hashSync } from 'bcryptjs';

const UsersModels = [{
  id: '1',
  username: 'username',
  email: 'username@mail.com',
  password: hashSync('password'),
}];

export default username =>
  Promise.resolve(UsersModels).then(users =>
    users.find(u => u.username === username),
  );
