const Question = require('../../models/questions');

let count = 1;

const questionsETL = async (data) => {
  try {
    console.log('questions batch started: ', count);
    await Question.bulkCreate(data, {
      logging: false,
    });
    console.log('questions batch written: ', count);
    count += 1;
  } catch (err) {
    console.log(err);
  }
};

module.exports = questionsETL;
