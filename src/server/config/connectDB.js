export default async (db) => {
  try {
    await db.sequelize.sync();
    await console.log('Nice! Database looks fine');
  } catch (e) {
    console.log(e, 'Something went wrong with the Database Update!');
  }
};
