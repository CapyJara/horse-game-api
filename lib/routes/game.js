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
    const minuteValues = {
      one: [0, 59],
      five: [60, 299],
      ten: [300, 599],
      thirty: [600, 1799],
      hour: [1800, 3599],
      hourPlus: [3600, 9999999]
    };

    Promise.all([
      Game.graphs(minuteValues.one),
      Game.graphs(minuteValues.five),
      Game.graphs(minuteValues.ten),
      Game.graphs(minuteValues.thirty),
      Game.graphs(minuteValues.hour),
      Game.graphs(minuteValues.hourPlus)
    ])
      .then(result => res.send(result))
      .catch(next);
  })
;
