const Question = require('../models/questions');

let count = 1;

const questionsETL = async (data) => {
  console.log('questions batch started: ', count);
  await Question.bulkCreate(data, {
    logging: false,
  });
  console.log('questions batch written: ', count);
  count += 1;
};

module.exports = questionsETL;
