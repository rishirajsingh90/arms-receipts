const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('ambulance_provider').find({});
};

exports.put = function(ambulanceProvider) {
  return db.getClient().collection('ambulance_provider').insertOne(ambulanceProvider);
};
