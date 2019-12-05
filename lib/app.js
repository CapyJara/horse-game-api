const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const expressip = require('express-ip');
const cors = require('cors');


app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(cors());
app.use(express.json());
app.use(expressip().getIpInfoMiddleware);

app.use('/api/v1/game', mongoConnection, require('./routes/game'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
