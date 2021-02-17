const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://master:7sdanAp2YBn3ZyGG@localhost/bank?authSource=admin',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const mongodb = mongoose.connection;

module.exports = mongodb;
