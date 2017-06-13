const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('car_provider').find({});
};

exports.put = function(carProvider) {
  return db.getClient().collection('car_provider').insertOne(carProvider);
};
