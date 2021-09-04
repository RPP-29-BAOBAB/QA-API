const express = require('express');
const questions = require('./routes/questions');

const app = express();

app.use('/qa', questions);

app.listen(8080, () => {
  console.log('Listening on port 3000');
});
