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

gameSchema.statics.topGames = function(num) {
  return this.aggregate([
    {
      '$sort': {
        'score': -1
      }
    }, 
    {
      '$limit': Number(num)
    }, 
    {
      '$project': {
        'name': 1, 
        'score': 1, 
        '_id': 0
      }
    }
  ]);
};

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
