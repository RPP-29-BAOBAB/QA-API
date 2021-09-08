const express = require('express');

const router = express.Router();
const controller = require('../controllers/questions');

router.get('/questions', controller.getQuestions);
router.get('/questions/:question_id/answers', controller.getAnswers);

module.exports = router;
