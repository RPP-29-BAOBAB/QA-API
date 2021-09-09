const Sequelize = require('sequelize');
const db = require('../config/config');

const answerPhoto = db.define('answers_photos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  answer_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'answers',
      key: 'id',
    },
  },
  url: Sequelize.STRING,
},
{
  timestamps: false,
  indexes: [{
    name: 'answers_photos_answer_id_idx',
    fields: ['answer_id'],
  }],
});

module.exports = answerPhoto;
