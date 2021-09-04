const Sequelize = require('sequelize');

const db = new Sequelize('sdcqa', 'root', '', {
  dialect: 'mysql',
  hostname: 'localhost',
});

(async () => {
  try {
    await db.authenticate();
    console.log('connected to mysql db');
  } catch (err) {
    console.log(err);
  }
})();

module.exports = db;
