module.exports = (questions, productId) => {
  const response = {};
  response.product_id = productId;
  response.results = [];

  questions.forEach((question) => {
    const questionDate = new Date(Number(question.date_written)).toISOString();
    const reported = question.reported === 1;
    const responseObject = {
      question_id: question.id,
      question_body: question.body,
      question_date: questionDate,
      asker_name: question.asker_name,
      question_helpfullness: question.helpful,
      reported,
      answers: {},
    };

    if (question.answers.length) {
      question.answers.forEach((answer) => {
        const answerId = answer.id;
        const answerDate = new Date(Number(answer.date_written)).toISOString();
        responseObject.answers[answerId] = {
          id: answerId,
          body: answer.body,
          date: answerDate,
          answerer_name: answer.answerer_name,
          helpfulness: answer.helpful,
          photos: [],
        };
        if (answer.answers_photos.length) {
          answer.answers_photos.forEach((photo) => {
            responseObject.answers[answerId].photos.push(photo.url);
          });
        }
      });
    } else {
      responseObject.answers = [];
    }

    response.results.push(responseObject);
  });
  return response;
};
