const db = require('../../db');
const _ = require('lodash');

exports.get = function() {
  return db.getClient().collection('airline').find({});
};
