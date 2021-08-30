const Sequelize = require('sequelize');
const Answer = require('./answers');
const db = require('../config/db.config');

const Question = db.define('question', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  product_id: Sequelize.INTEGER,
  body: Sequelize.STRING,
  date_written: Sequelize.STRING,
  asker_name: Sequelize.STRING,
  asker_email: Sequelize.STRING,
  reported: Sequelize.INTEGER,
  helpful: Sequelize.INTEGER,
});

Question.hasMany(Answer);

module.exports = Question;
