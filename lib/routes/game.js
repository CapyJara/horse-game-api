const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, score, totalTime } = req.body;
    Game
      .create({ name, score, totalTime, date: Date.now(), ip: req.ipInfo })
      .then(mod => res.send(mod))
      .catch(next);
  })
  .get('/top/:num', (req, res, next) => {
    Game
      .topGames(req.params.num)
      .then(games => res.send(games))
      .catch(next);
  })
  .get('/graphs', async(req, res, next) => {
    try {
      const categories = await Promise.all([
        Game.timeZones('one', [0, 59]),
        Game.timeZones('five', [60, 299]),
        Game.timeZones('ten', [300, 599]),
        Game.timeZones('thirty', [600, 1799]),
        Game.timeZones('hour', [1800, 3599]),
        Game.timeZones('hourPlus', [3600, 9999999])
      ]);

      const averages = await Game
        .averages()
        .then(results => ({
          averageTime: results[0].aveTime,
          averageScore: results[0].aveScore
        }));

      res.send({
        categories,
        averages: averages
      });
    }
    catch(err) {
      next(err);
    }
  })
  .get('/gameswithindays/:last', async(req, res, next) => {
    Game
      .leadersByTime(req.params.last)
      .then(games => res.send(games))
      .catch(next);
  })
;
