const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  },
  timeOfDay: {
    type: Number,
    required: true
  },
  ip: {
    type: Object,
    required: true
  },
}, {
  versionKey: false
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
