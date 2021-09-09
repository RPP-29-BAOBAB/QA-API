const AnswerPhoto = require('../models/answerPhotos');

let count = 1;

const answersPhotosETL = async (data) => {
  try {
    console.log('answersPhotos batch started: ', count);
    await AnswerPhoto.bulkCreate(data, {
      logging: false,
    });
    console.log('answersPhotos batch written: ', count);
    count += 1;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = answersPhotosETL;
