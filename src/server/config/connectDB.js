export default async (dbInstance) => {
  try {
    await dbInstance.sequelize.sync();
    await console.log('Nice! Database looks fine');
  } catch (e) {
    console.log(e, 'Something went wrong with the Database Update!');
  }
};
