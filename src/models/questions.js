const Sequelize = require('sequelize');
const Answer = require('./answers');
const db = require('../config/config');

const Question = db.define('question', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: Sequelize.INTEGER,
  body: Sequelize.STRING,
  date_written: Sequelize.STRING,
  asker_name: Sequelize.STRING,
  asker_email: Sequelize.STRING,
  reported: Sequelize.INTEGER,
  helpful: Sequelize.INTEGER,
},
{
  timestamps: false,
  indexes: [{
    unique: true,
    name: 'questions_product_id_idx',
    fields: ['product_id'],
  }],
});

Question.hasMany(Answer, { foreignKey: 'question_id' });

module.exports = Question;
