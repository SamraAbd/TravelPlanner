const request = require('supertest');
const app = require('../src/index');

describe('GET /', () => {
  test('should respond with 200 and contain title text', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<h1>Travel Planner Web App</h1>');
  });
});
