const AnswerPhoto = require('../models/answerPhotos');

const answersPhotoETL = (answersPhotoCSVData) => {
  answersPhotoCSVData.forEach((row) => {
    AnswerPhoto.create({
      id: row[0],
      answer_id: row[1],
      url: row[2],
    });
  });
};

module.exports = answersPhotoETL;
