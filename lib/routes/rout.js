const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, score, totalTime, timeOfDay, location } = req.body;
    Game
      .create({ name, score, totalTime, timeOfDay, location, ip: req.ipInfo })
      .then(mod => res.send(mod))
      .catch(next);
  });
