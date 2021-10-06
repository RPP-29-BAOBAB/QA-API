const express = require('express');

const router = express.Router();
const controller = require('../controllers/questions');

router.get('/questions/nocache', controller.getQuestionsNoCache);
router.get('/questions/', controller.getQuestions);
router.get('/questions/:question_id/answers', controller.getAnswers);
router.post('/questions/', controller.createQuestion);
router.post('/questions/:question_id/answers', controller.createAnswer);
router.put('/questions/:question_id/helpful', controller.markQuestionAsHelpul);
router.put('/questions/:question_id/report', controller.markQuestionAsReported);
router.put('/answers/:answer_id/helpful', controller.markAnswerAsHelpul);
router.put('/answers/:answer_id/report', controller.markAnswerAsReported);

module.exports = router;
