const fs = require('fs');
const path = require('path');
const csvBatch = require('csv-batch');
const questionsETL = require('./questionsETL');
const answersETL = require('./answersETL');
const answersPhotosETL = require('./answerPhotosETL');
const db = require('../../src/db/config');

const questions = path.resolve(__dirname, '../../csv/questions.csv');
const answers = path.resolve(__dirname, '../../csv/answers.csv');
const answersPhotos = path.resolve(__dirname, '../../csv/answers_photos.csv');

const questionsStream = fs.createReadStream(questions);
const answersStream = fs.createReadStream(answers);
const answersPhotosStream = fs.createReadStream(answersPhotos);

const etlProcess = async () => {
  try {
    await db.authenticate();
    console.log('connected to db');
    await db.sync({
      logging: false,
    });
    const questionResults = await csvBatch(questionsStream, {
      batch: true,
      batchSize: 1000,
      batchExecution: (batch) => {
        questionsETL(batch);
      },
    });
    console.log(`Processed ${questionResults.totalRecords}`);

    const answerResults = await csvBatch(answersStream, {
      batch: true,
      batchSize: 1000,
      batchExecution: (batch) => {
        answersETL(batch);
      },
    });
    console.log(`Processed ${answerResults.totalRecords}`);

    const answerPhotosResults = await csvBatch(answersPhotosStream, {
      batch: true,
      batchSize: 1000,
      batchExecution: (batch) => {
        answersPhotosETL(batch);
      },
    });
    console.log(`Processed ${answerPhotosResults.totalRecords}`);
  } catch (err) {
    console.log(err);
  }
};

etlProcess();
