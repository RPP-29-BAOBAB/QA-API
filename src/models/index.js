const db = require('../config/config');
require('./questions');
require('./answers');
require('./answerPhotos');

db.sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
