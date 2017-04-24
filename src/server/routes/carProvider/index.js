const db = require('../../db');
const _ = require('lodash');

exports.get = function() {
  return db.getClient().collection('car_provider').find({});
};
