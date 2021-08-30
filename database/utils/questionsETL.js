const Question = require('../models/questions');

const questionsETL = (questionsCSVData) => {
  questionsCSVData.forEach((row) => {
    Question.create({
      id: row[0],
      product_id: row[1],
      body: row[2],
      date_written: row[3],
      asker_name: row[4],
      asker_email: row[5],
      reported: row[6],
      helpful: row[7],
    });
  });
};

module.exports = questionsETL;
