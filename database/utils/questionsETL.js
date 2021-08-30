const Question = require('../models/questions');

const questionsETL = async (data) => {
  await Question.bulkCreate(data);
};

module.exports = questionsETL;
