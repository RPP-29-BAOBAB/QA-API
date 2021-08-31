const Sequelize = require('sequelize');
const db = require('../config/db.config');

const answerPhoto = db.define('answers_photos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  answer_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'answers',
      key: 'id',
    },
  },
  url: Sequelize.STRING,
});

module.exports = answerPhoto;
