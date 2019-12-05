require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

beforeAll(() => connect());
beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

describe('route tests', () => {

  it('create a new mod', () => {
    return request(app)
      .post('/api/v1/rout')
      .send({
        name: 'jimmy',
        score: 100,
        totalTime: 3600,
        timeOfDay: 1620,
        location: '1234321342',
        ip: '12345432'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'jimmy',
          score: 100,
          totalTime: 3600,
          timeOfDay: 1620,
          location: '1234321342',
          ip: '12345432'
        });
      });
  });
});
