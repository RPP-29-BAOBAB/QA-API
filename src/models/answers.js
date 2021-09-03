const Sequelize = require('sequelize');
const AnswerPhoto = require('./answerPhotos');
const db = require('../config/config');

const Answer = db.define('answer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  question_id: {
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

Answer.hasMany(AnswerPhoto, { foreignKey: 'answer_id' });

module.exports = Answer;