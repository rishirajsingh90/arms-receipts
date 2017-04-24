const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('car_provider').find({});
};
