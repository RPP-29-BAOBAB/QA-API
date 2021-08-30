const fs = require("fs");
const path = require('path')
const db = require('../config/db.config.js')
const fastcsv = require("fast-csv");
const Question = require('../models/questions.js');

let questions = path.resolve(__dirname, '../../csv/questions.csv')
let answers = path.resolve(__dirname, '../../csv/answers.csv')
let answers_photos = path.resolve(__dirname, '../../csv/answers_photos.csv')

let questionsStream = fs.createReadStream(questions)
let questionsCSVData = [];
let questionsCSVStream = fastcsv
.parse()
.on('data', data => {
  questionsCSVData.push(data)
})
.on('end', () => {
  questionsCSVData.shift();
  // add to questions to database
  questionsCSVData.forEach(row => {
    const rowData = Question.create({
      id: row[0],
      product_id: row[1],
      body: row[2],
      date_written: row[3],
      asker_name: row[4],
      asker_email: row[5],
      reported: row[6],
      helpful: row[7],
    })
  })


  // console.log('questionsCSVData:', questionsCSVData)
})

questionsStream.pipe(questionsCSVStream)