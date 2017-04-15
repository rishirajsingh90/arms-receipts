const db = require('../../db');
const _ = require('lodash');

exports.get = function() {
  return db.query('select * from car_provider', null)
    .then(function (result, err) {
      if (err) {
        throw err;
      }
      return _.map(result.rows, function (row) {
        return {
          key: row.id,
          value: row.name,
          text: row.name
        };
      });
    });
};