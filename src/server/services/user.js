import Sequelize from 'sequelize';
import Models from '../models';
import { hash, isValidUser } from '../utils/bcrypt';

const { User } = Models;
const { Op } = Sequelize;

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

  forgot: async (username, token) => {
    const user = await User.findOne({
      where: { username },
    });

    if (user) {
      await user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      });
      return user;
    }

    return null;
  },

  checkResetToken: async (token) => {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (user) return user;

    return null;
  },

  resetPassword: async (password, token) => {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (user) {
      await user.update({
        resetPasswordToken: null,
        resetPasswordExpires: null,
        password: hash(password),
      });
      return user;
    }

    return null;
  },
};
