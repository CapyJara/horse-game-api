const mongoose = require('mongoose');
const Game = require('../../lib/models/Game');

describe('model test', () => {
  it('new Announcement', () => {
    const game = new Game({
      name: 'jimmy',
      score: 100,
      totalTime: 3600,
      date: Date.now(),
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
    expect(game.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'jimmy',
      score: 100,
      totalTime: 3600,
      date: expect.any(Number),
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
