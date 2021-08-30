const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const questionsETL = require('./questionsETL');
const answersETL = require('./answersETL');

const questions = path.resolve(__dirname, '../../csv/questions.csv');
const answers = path.resolve(__dirname, '../../csv/answers.csv');
const answersPhotos = path.resolve(__dirname, '../../csv/answers_photos.csv');

const questionsStream = fs.createReadStream(questions);
const answersStream = fs.createReadStream(answers);
const answerPhotosStream = fs.createReadStream(answersPhotos);

const questionsCSVData = [];
const answersCSVData = [];
const answersPhotosCSVData = [];

const questionsCSVStream = fastcsv.parse()
  .on('data', (data) => {
    questionsCSVData.push(data);
  })
  .on('end', () => {
    questionsCSVData.shift();
    questionsETL(questionsCSVData);
  });

const answersCSVStream = fastcsv.parse()
  .on('data', (data) => {
    answersCSVData.push(data);
  })
  .on('end', () => {
    answersCSVData.shift();
    answersETL(answersCSVData);
  });

questionsStream.pipe(questionsCSVStream);
answersStream.pipe(answersCSVStream);
