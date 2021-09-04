const Question = require('../models/questions');
const format = require('../utils/formatQuestionResponse');

const getQuestions = async (req, res) => {
  const productId = req.query.product_id;
  const offset = req.query.page ? Number(req.query.page) : null;
  const limit = req.query.page ? Number(req.query.page) : null;

  const query = await Question.findAll({
    where: {
      product_id: productId,
    },
    limit,
    offset,
    include: { all: true, nested: true },
  });

  const response = format(query, productId);

  res.send(response);
};

module.exports = {
  getQuestions,
};
