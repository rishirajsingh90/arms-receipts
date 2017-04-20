const db = require('../../db');

exports.get = function() {
  return db.query('select * from country', null)
    .then(function (result, err) {
      if (err) {
        throw err;
      }
      return result.rows;
    });
};
