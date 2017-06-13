const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('airline').find({});
};

exports.put = function(airline) {
  return db.getClient().collection('airline').insertOne(airline);
};
