const Question = require('../models/questions');
const Answer = require('../models/answers');
const AnswerPhoto = require('../models/answerPhotos');
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
    console.log('??????????????????????');
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

const createAnswer = async (req, res) => {
  try {
    const date = Date.parse(new Date());
    const newAnswer = await Answer.create({
      question_id: req.params.question_id,
      body: req.body.body,
      date_written: date.toString(),
      answerer_name: req.body.name,
      answerer_email: req.body.email,
      reported: 0,
      helpful: 0,
    });

    req.body.photos.forEach(async (photo) => {
      try {
        await AnswerPhoto.create({
          answer_id: newAnswer.id,
          url: photo,
        });
      } catch (err) {
        res.send(err.message);
      }
    });

    res.sendStatus(201);
  } catch (err) {
    res.send(err.message);
  }
};

const markQuestionAsHelpul = (async (req, res) => {
  try {
    await Question.increment({
      helpful: +1,
    }, {
      where: {
        id: req.params.question_id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.send(err.message);
  }
});

const markQuestionAsReported = (async (req, res) => {
  try {
    await Question.update({
      reported: 1,
    }, {
      where: {
        id: req.params.question_id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.send(err.message);
  }
});

const markAnswerAsHelpul = (async (req, res) => {
  try {
    await Answer.increment({
      helpful: +1,
    }, {
      where: {
        id: req.params.answer_id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.send(err.message);
  }
});

const markAnswerAsReported = (async (req, res) => {
  try {
    await Answer.update({
      reported: 1,
    }, {
      where: {
        id: req.params.answer_id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  getQuestions,
  getAnswers,
  createQuestion,
  createAnswer,
  markQuestionAsHelpul,
  markQuestionAsReported,
  markAnswerAsHelpul,
  markAnswerAsReported,
};
