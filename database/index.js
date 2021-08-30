const db = require('./config/db.config');
require('./models/questions');
require('./models/answers');

db.sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
