require('dotenv').config();
const Sequelize = require('sequelize');
require('../models/questions');
require('../models/answers');
require('../models/answerPhotos');

const dbName = process.env.NODE_ENV === 'production' ? process.env.DB_NAME : process.env.DB_TEST_NAME;

const db = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: 3306,
});

(async () => {
  try {
    await db.authenticate();
    console.log(`connected to ${process.env.DB_NAME}`);
    await db.sync({
      logging: false,
    });
  } catch (err) {
    console.log(err);
  }
})();

module.exports = db;
