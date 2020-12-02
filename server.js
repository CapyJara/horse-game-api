const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
require('dotenv').config({ path: `./.env.${ENV}` });
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`LISTENING on ${PORT}`);
});
