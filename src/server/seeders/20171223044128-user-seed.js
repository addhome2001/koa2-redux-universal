module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      username: 'username',
      about: 'I am basic user.',
      email: 'username@mail.com',
      password: 'password',
      last_login: new Date(),
    }], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
