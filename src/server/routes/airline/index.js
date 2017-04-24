const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('airline').find({});
};
