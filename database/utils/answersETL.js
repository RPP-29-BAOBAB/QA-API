const Answer = require('../models/answers');

const answersETL = (answersCSVData) => {
  answersCSVData.forEach((row) => {
    Answer.create({
      id: row[0],
      questionId: row[1],
      body: row[2],
      date_written: row[3],
      answerer_name: row[4],
      answerer_email: row[5],
      reported: row[6],
      helpful: row[7],
    });
  });
};

module.exports = answersETL;
