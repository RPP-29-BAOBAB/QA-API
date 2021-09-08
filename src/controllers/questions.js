const Question = require('../models/questions');
const Answer = require('../models/answers');
const formatQuestions = require('../utils/formatQuestionResponse');
const formatAnswers = require('../utils/formatAnswerResponse');

const getQuestions = async (req, res) => {
  try {
    const productId = req.query.product_id;
    const limit = req.query.count ? Number(req.query.count) : 5;
    const offset = req.query.page ? (req.query.page - 1) * limit : 0;

    const questions = await Question.findAll({
      where: {
        product_id: productId,
      },
      limit,
      offset,
      include: { all: true, nested: true },
      logging: false,
    });

    const response = formatQuestions(questions, productId);

    res.send(response);
  } catch (err) {
    res.send(err.message);
  }
};

const getAnswers = async (req, res) => {
  try {
    const questionId = req.params.question_id;
    const limit = req.query.count ? Number(req.query.count) : 5;
    const offset = req.query.page ? (req.query.page - 1) * limit : 0;

    const answers = await Answer.findAll({
      where: {
        question_id: questionId,
        reported: 0,
      },
      limit,
      offset,
      include: { all: true, nested: true },
      logging: false,
    });
    const response = formatAnswers(answers, questionId, limit, req.query.page);
    res.send(response);
  } catch (err) {
    res.send(err.message);
  }
};

const createQuestion = async (req, res) => {
  try {
    const date = Date.parse(new Date());
    console.log('date:', date);
    await Question.create({
      product_id: req.body.product_id,
      body: req.body.body,
      date_written: date.toString(),
      asker_name: req.body.name,
      asker_email: req.body.email,
      reported: 0,
      helpful: 0,
    });
    res.sendStatus(201);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  getQuestions,
  getAnswers,
  createQuestion,
};
