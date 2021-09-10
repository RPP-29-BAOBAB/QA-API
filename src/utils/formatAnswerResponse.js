module.exports = (answers, questionId, limit, page) => {
  const response = {};
  response.question = questionId;
  response.page = page || 0;
  response.count = answers.length;
  response.results = [];

  answers.forEach((answer) => {
    const answerDate = new Date(Number(answer.date_written)).toISOString();
    const answerObject = {
      answer_id: answer.id,
      body: answer.body,
      date: answerDate,
      answerer_name: answer.answerer_name,
      helpfulness: answer.helpful,
      photos: [],
    };

    if (answer.answers_photos.length) {
      answer.answers_photos.forEach((photo) => {
        const photoObject = {
          id: photo.id,
          url: photo.url,
        };
        answerObject.photos.push(photoObject);
      });
    }

    response.results.push(answerObject);
  });

  return response;
};
