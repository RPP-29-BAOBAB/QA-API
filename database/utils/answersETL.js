const Answer = require('../models/answers');

const answersETL = async (data) => {
  await Answer.bulkCreate(data);
};

module.exports = answersETL;
