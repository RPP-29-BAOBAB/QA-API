const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Answer = db.define('answer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  questionId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'questions',
      key: 'id',
    },
  },
  body: Sequelize.STRING,
  date_written: Sequelize.STRING,
  answerer_name: Sequelize.STRING,
  answerer_email: Sequelize.STRING,
  reported: Sequelize.INTEGER,
  helpful: Sequelize.INTEGER,
});

module.exports = Answer;
