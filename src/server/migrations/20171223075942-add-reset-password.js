module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn('Users', 'resetPasswordToken', {
        type: Sequelize.STRING,
      })
      .then(() =>
        queryInterface.addColumn('Users', 'resetPasswordExpires', {
          type: Sequelize.DATE,
        }),
      );
  },
  down(queryInterface) {
    return queryInterface
      .removeColumn('Users', 'resetPasswordToken')
      .then(() => queryInterface.removeColumn('Users', 'resetPasswordExpires'));
  },
};
