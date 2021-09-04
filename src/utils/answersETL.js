const Answer = require('../models/answers');

let count = 1;

const answersETL = async (data) => {
  console.log('answers batch started: ', count);
  await Answer.bulkCreate(data, {
    logging: false,
  });
  console.log('answers batch written: ', count);
  count += 1;
};

module.exports = answersETL;
