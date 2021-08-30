const Answer = require('../models/answers');
let count = 1;

const answersETL = async (data) => {
  if (count === 1) {
    console.log(data);
    count += 1;
  }
  // await Answer.bulkCreate(data);
};

module.exports = answersETL;
