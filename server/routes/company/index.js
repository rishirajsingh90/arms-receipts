const db = require('../../db');
const _ = require('lodash');

exports.get = function() {
  return db.query('select name from company', null)
    .then(function (result, err) {
      if (err) {
        throw err;
      }
      return _.map(result.rows, function (row) {
        return {
          text: row.name
        };
      });
    });
};