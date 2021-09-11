const app = require('../src/app');
const db = require('../src/config/config')
const request = require('supertest');

describe('GET answers', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/qa/questions/1/answers');
    expect(response.statusCode).toBe(200)
    await db.close()
  })
});

describe('GET questions', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app)
      .get('/qa/questions/')
      .send('product_id=1')
    expect(response.statusCode).toBe(200)
    await db.close()
  })
})
