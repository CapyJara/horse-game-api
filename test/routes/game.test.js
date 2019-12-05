require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seeData = require('../utils/seedData');

beforeAll(() => connect());
beforeEach(() => mongoose.connection.dropDatabase());
beforeEach(() => seeData());
afterAll(() => mongoose.connection.close());

describe('game routes', () => {

  it('create a new game', () => {
    return request(app)
      .post('/api/v1/game')
      .send({
        name: 'jimmy',
        score: 100,
        totalTime: 3600,
        timeOfDay: 1620,
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'jimmy',
          score: 100,
          totalTime: 3600,
          timeOfDay: 1620,
          ip: {
            range: [1100616832, 1100616959],
            country: 'US',
            region: 'WA',
            eu: '0',
            timezone: 'America/Los_Angeles',
            city: 'Kalama',
            ll: [46.0112, -122.8166],
            metro: 820,
            area: 20
          }
        });
      });
  });

  it('finds top 100 games by score', () => {
    return request(app)
      .get('/api/v1/game/top/3')
      .then(res => {
        expect(res.body.length).toEqual(3);
        expect(res.body[0].score).toBeGreaterThanOrEqual(res.body[1].score);
        expect(res.body[1].score).toBeGreaterThanOrEqual(res.body[2].score);
        expect(res.body[0]).toEqual({
          name: expect.any(String),
          score: expect.any(Number)
        });
      });
  });

});
