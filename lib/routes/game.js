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
  .get('/stats', async(req, res, next) => {
    try {
      const gamePlayTimes = await Promise.all([
        Game.timeZones('One Minute', [0, 59]),
        Game.timeZones('Five Minutes', [60, 299]),
        Game.timeZones('Ten Minutes', [300, 599]),
        Game.timeZones('Thirty Minutes', [600, 1799]),
        Game.timeZones('One Hour', [1800, 3599]),
        Game.timeZones('Hour Plus', [3600, 9999999])
      ]);
      const longestGame = await Game.longestGame();
      const numberOfGames = await Game.numberOfGames();

      const secondsToHms = s => {
        let h = Math.floor(s / 3600);
        let m = Math.floor(s % 3600 / 60);
        return [h, m]; 
      };
      res.send({
        gamePlayTimes,
        longestGame: secondsToHms(longestGame[0].totalTime),
        numberOfGames:  numberOfGames[0].numberOfGames
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
