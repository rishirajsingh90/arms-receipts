const db = require('../../db');

exports.get = function() {
  return db.query('select * from receipt left join person on receipt.creator_id=person.id', null)
    .then(function(result, err) {
      if (err) {
        throw err;
      }
      return result.rows;
    });
};

exports.add = function() {

};

function addCaseFee() {
  
}