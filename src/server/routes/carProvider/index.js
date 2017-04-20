const db = require('../../db');

exports.get = function() {
  return db.query('select * from car_provider', null)
    .then(function (result, err) {
      if (err) {
        throw err;
      }
      return result.rows;
    });
};
