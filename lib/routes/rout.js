const { Router } = require('express');
const Mod = require('../models/Mod');

module.exports = Router()
  .get('/', (req, res, next) => {
    const { name } = req.body;
    Mod
      .find()
      .then(res => res.send())
      .catch(next);
  });
