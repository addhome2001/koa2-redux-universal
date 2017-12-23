import Models from '../models';
import { hash, isValidUser } from '../utils/bcrypt';

const { User } = Models;

export default {
  login: async (username, password) => {
    const user = await User.findOne({
      where: { username },
    });

    if (user && isValidUser(password, user.password)) {
      await user.update({ last_login: new Date() });
      return user;
    }

    return null;
  },

  register: async (username, password, email) => {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      const userInfo = {
        email,
        username,
        password: hash(password),
      };
      const newUser = await User.create(userInfo);

      return newUser;
    }

    return null;
  },
};
