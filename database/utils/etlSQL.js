const fs = require('fs');
const path = require('path');
const csvBatch = require('csv-batch');
const questionsETL = require('./questionsETL');
const answersETL = require('./answersETL');
const answersPhotosETL = require('./answerPhotosETL');

const questions = path.resolve(__dirname, '../../csv/questions.csv');
const answers = path.resolve(__dirname, '../../csv/answers.csv');
const answersPhotos = path.resolve(__dirname, '../../csv/answers_photos.csv');

const questionsStream = fs.createReadStream(questions);
const answersStream = fs.createReadStream(answers);
const answersPhotosStream = fs.createReadStream(answersPhotos);

csvBatch(questionsStream, {
  batch: true,
  batchSize: 100000,
  batchExecution: (batch) => {
    questionsETL(batch);
  },
}).then((results) => {
  console.log(`Processed ${results.totalRecords}`);
});

// csvBatch(answersStream, {
//   batch: true,
//   batchSize: 10000,
//   batchExecution: (batch) => {
//     answersETL(batch);
//   },
// }).then((results) => {
//   console.log(`Processed ${results.totalRecords}`);
// });
