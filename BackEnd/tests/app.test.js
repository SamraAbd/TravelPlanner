// import request from 'supertest';
import  request  from 'supertest';
import app from '../src';
// import app from '../src/index.js';

describe('GET /', () => {
  test('should respond with 200 and contain title text', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Backend is running');
  });
});
