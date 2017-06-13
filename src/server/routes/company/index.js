const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('company_fees').find({});
};

exports.put = function(companyFees) {
  return db.getClient().collection('company_fees').insertOne(companyFees);
};
