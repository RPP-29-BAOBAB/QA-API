require('dotenv').config()
const express = require('express');
const questions = require('./routes/questions');

const app = express();

app.use(express.json());
app.use('/qa', questions);

module.exports = app;
