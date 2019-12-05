require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seedData = require('./seedData');

async function seed() {
  connect();
  await mongoose.connection.dropDatabase();
  await seedData();
  await mongoose.connection.close();
}

seed();
