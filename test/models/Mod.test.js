const mongoose = require('mongoose');
const Game = require('../../lib/models/Game');

describe('model test', () => {
  it('new Announcement', () => {
    const game = new Game({
      name: 'jimmy',
      score: 100,
      totalTime: 3600,
      timeOfDay: 1620,
      location: '1234321342',
      ip: '12345432'
    });
    expect(game.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'jimmy',
      score: 100,
      totalTime: 3600,
      timeOfDay: 1620,
      location: '1234321342',
      ip: '12345432'
    });
  });
});
