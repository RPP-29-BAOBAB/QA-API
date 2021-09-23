const app = require('../src/app');
const db = require('../src/config/config');
const Question = require('../src/models/questions')
const request = require('supertest');


afterAll(async () => {
  await Question.destroy({where: {}, force: true })
  await db.close()
})

describe('Questions', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app)
      .get('/qa/questions/')
      .send('product_id=1')
    expect(response.statusCode).toBe(200)
  })

  test('it should contain a question after a post request is sent', (done) => {
    request(app)
      .post('/qa/questions')
      .set('Accept', 'application')
      .send({
        "body": "this is a new question",
        "name": "chris",
        "email": "test@test.com",
        "product_id": "1"
      })
      .expect(201)
      .then(() => {
        request(app)
          .get('/qa/questions?product_id=1')
          .then((res) => {
            expect(res.body.results[0].asker_name).toBe('chris')
            done()
          })
      })
  })
})

describe('GET answers', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/qa/questions/1/answers');
    expect(response.statusCode).toBe(200)
  })
});
