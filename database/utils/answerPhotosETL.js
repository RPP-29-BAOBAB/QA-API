const AnswerPhoto = require('../models/answerPhotos');

const answersPhotosETL = async (data) => {
  await AnswerPhoto.bulkCreate(data);
};

module.exports = answersPhotosETL;
