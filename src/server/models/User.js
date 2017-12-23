module.exports = (sequelize, Sequelize) =>
  sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    about: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
    },
    last_login: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
