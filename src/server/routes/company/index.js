const db = require('../../db');

exports.get = function() {
  return db.query('select * from company left join company_fees on company.id=company_fees.company_id', null)
    .then(function (result, err) {
      if (err) {
        throw err;
      }
      return result.rows;
    });
};
