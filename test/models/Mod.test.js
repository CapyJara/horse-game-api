const mongoose = require('mongoose');
const Game = require('../../lib/models/Game');

describe('model test', () => {
  it('new Announcement', () => {
    const game = new Game({
      name: 'jimmy',
      score: 100,
      totalTime: 3600,
      timeOfDay: 1620,
      ip: {
        thing: 'bla'
      }
    });
    expect(game.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'jimmy',
      score: 100,
      totalTime: 3600,
      timeOfDay: 1620,
      ip: expect.any(Object)
    });
  });
});
