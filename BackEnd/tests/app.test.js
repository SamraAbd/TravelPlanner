const request = require('supertest');
const app = require('../src/index');  // index.js-i import et

describe('GET /', () => {
  test('should respond with a 200 status code and "Hello, World!"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Hello, World!');
  });
});