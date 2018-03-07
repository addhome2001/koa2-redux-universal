module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'OAuthProvider', {
      type: Sequelize.STRING,
    });
  },
  down(queryInterface) {
    return queryInterface.removeColumn('Users', 'OAuthProvider');
  },
};
