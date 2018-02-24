import Sequelize from 'sequelize';
import Models from '../models';
import { hash, isValidUser } from '../utils/bcrypt';

const { User } = Models;
const { Op } = Sequelize;

export default {
  login: async (email, password) => {
    const user = await User.findOne({
      where: { email },
    });

    if (user && !user.OAuthProvider && isValidUser(password, user.password)) {
      await user.update({ last_login: new Date() });
      return user;
    }

    return null;
  },

  register: async (username, email, password) => {
    const user = await User.findOne({
      where: { email },
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

  OAuthService: async (username, email, password, OAuthProvider) => {
    const user = await User.findOne({
      where: { email },
    });
    // TODO:
    // 如果已經存在這個會員，但用oauth註冊，或相反
    // 存在oauth會員，但是現有會員知道id登入，或相反

    if (!user) {
      const userInfo = {
        email,
        username,
        OAuthProvider,
        password: hash(password),
      };
      const newUser = await User.create(userInfo);

      return newUser;
    }

    if (user.OAuthProvider === OAuthProvider) {
      await user.update({ last_login: new Date() });
      return user;
    }

    return null;
  },

  forgot: async (email, token) => {
    const user = await User.findOne({
      where: { email },
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
