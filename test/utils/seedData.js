const chance = require('chance').Chance();
const Game = require('../../lib/models/Game');


function seedGames(userCount = 150) {
  const games = [...Array(userCount)].map(() => ({
    name: chance.name(),
    score: Math.floor(Math.random() * Math.floor(2000)),
    totalTime: Math.floor(Math.random() * Math.floor(3600)),
    date: Date.now(),
    ip: {
      range: [1100616832, 1100616959],
      country: 'US',
      region: chance.state(),
      eu: '0',
      timezone: chance.timezone().utc,
      city: chance.city(),
      ll: [chance.latitude(), chance.longitude()],
      metro: Math.floor(Math.random() * Math.floor(10000000)),
      area: Math.floor(Math.random() * Math.floor(10000))
    }
  }));
  return Game.create(games);
}

module.exports = seedGames;
