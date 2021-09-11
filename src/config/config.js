const Sequelize = require('sequelize');
require('../models/questions');
require('../models/answers');
require('../models/answerPhotos');

const db = new Sequelize('sdcqa', 'root', '', {
  dialect: 'mysql',
  hostname: 'localhost',
});

(async () => {
  try {
    await db.authenticate();
    console.log('connected to mysql db');
    await db.sync({
      logging: false,
    });
    console.log('db synced');
  } catch (err) {
    console.log(err);
  }
})();

module.exports = db;
