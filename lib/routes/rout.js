const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, score, totalTime, timeOfDay, location, id } = req.body;
    Game
      .create({ name, score, totalTime, timeOfDay, location, id })
      .then(mod => res.send(mod))
      .catch(next);
  });
