const express = require('express');

const router = express.Router();
const controller = require('../controllers/questions');

router.get('/questions', controller.getQuestions);

module.exports = router;
