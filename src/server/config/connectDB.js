import { initLogger } from '../utils/loggers';

export default async (db) => {
  try {
    await db.sequelize.sync();
    await initLogger.info('Nice! Database looks fine');
  } catch (e) {
    initLogger.error(`Something went wrong with the Database!
      ${e}
    `);
  }
};
