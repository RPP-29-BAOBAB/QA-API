const Answer = require('../../src/models/answers');

let count = 1;

const answersETL = async (data) => {
  try {
    console.log('answers batch started: ', count);
    await Answer.bulkCreate(data, {
      logging: false,
    });
    console.log('answers batch written: ', count);
    count += 1;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = answersETL;
