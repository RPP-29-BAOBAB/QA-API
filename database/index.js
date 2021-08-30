const db = require('./config/db.config.js');
const Question = require('./models/questions.js');

db.sync()
  .then(result => console.log(result))
  .catch(err => console.log(err))