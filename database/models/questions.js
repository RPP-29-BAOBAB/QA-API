const Sequelize = require('sequelize');
const db = require ('../config/db.config.js');

const Question = db.define('question', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  product_id: Sequelize.INTEGER,
  body: Sequelize.STRING,
  date_written: Sequelize.DATE,
  asker_name: Sequelize.STRING,
  asker_email: Sequelize.STRING,
  reported: Sequelize.INTEGER,
  helpful: Sequelize.INTEGER
})

module.exports = Question;
