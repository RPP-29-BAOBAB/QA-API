const express = require('express');

const router = express.Router();
const controller = require('../controllers/questions');

router.get('/', controller.getQuestions);
router.get('/:question_id/answers', controller.getAnswers);
router.post('/', controller.createQuestion);

module.exports = router;
