const Sequelize = require('sequelize');

const sequelize = new Sequelize('sdcqa', 'root', '', {
  dialect: 'mysql',
  hostname: 'localhost'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to mysql db')
  } catch (err) {
    console.log(err)
  }
})();


module.exports = sequelize;
