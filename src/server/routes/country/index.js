const db = require('../../db/index');
const _ = require('lodash');

exports.get = function() {
  return db.query('select * from country', null)
    .then(function (result, err) {
      if (err) {
        throw err;
      }
      return _.map(result.rows, function (row) {
        return {
          key: row.id,
          value: row.value,
          text: row.value
        };
      });
    });
};