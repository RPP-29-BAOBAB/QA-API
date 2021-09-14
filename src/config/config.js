const Sequelize = require('sequelize');
require('../models/questions');
require('../models/answers');
require('../models/answerPhotos');

const dbName = process.env.NODE_ENV === 'production' ? 'sdcqa' : 'sdcqa_test';

const db = new Sequelize(dbName, 'root', '', {
  dialect: 'mysql',
  hostname: 'localhost',
});

(async () => {
  try {
    await db.authenticate();
    console.log(`connected to ${dbName}`);
    await db.sync({
      logging: false,
    });
  } catch (err) {
    console.log(err);
  }
})();

module.exports = db;
