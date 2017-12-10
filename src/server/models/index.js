import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

export default (config) => {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,
      operatorsAliases: Sequelize.Op,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  );
  const db = {};

  fs.readdirSync(__dirname)
    .filter(file =>
      file.indexOf('.') !== 0 && file !== 'index.js',
    )
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    const model = db[modelName];
    return model.associate && model.associate(db);
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
