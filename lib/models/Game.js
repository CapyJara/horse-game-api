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
  date: {
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

gameSchema.statics.timeZones = function(label, numbers) {
  return this.aggregate([
    {
      '$match': {
        'totalTime': {
          '$lt': numbers[1], 
          '$gt': numbers[0]
        }
      }
    }, {
      '$group': {
        '_id': null, 
        'total': {
          '$sum': 1
        }
      }
    }, {
      '$project': {
        '_id': false
      }
    }
  ])
    .then(res => {
      if(res[0] === undefined) return { [label]: 0 };
      return { [label] : res[0].total };
    });
};

gameSchema.statics.averages = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': null, 
        'aveScore': { '$avg': '$score' }, 
        'aveTime': { '$avg': '$totalTime' }
      }
    }
  ]);
};

gameSchema.statics.leadersByTime = function(time) {
  const today =  new Date();
  const daysFromSunday = (today.getDay() + 1) * 1000 * 60 * 60 * 24;
  const hours = today.getHours() * 1000 * 60 * 60;
  const minutes = today.getMinutes() * 1000 * 60;
  const gamesWithinLast = {
    day: today.getTime() - hours - minutes,
    week: today.getTime() - daysFromSunday - hours - minutes
  };

  return this.aggregate([
    {
      '$match': {
        'date': {
          '$gt': gamesWithinLast[time]
        }
      }
    }
  ]);
};

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
