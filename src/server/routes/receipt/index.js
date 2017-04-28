"use strict";
const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('receipt').find({});
};

exports.add = function(receipt) {
  return addReceipt(receipt);
};

function addReceipt(receipt) {
  return db.getClient().collection('receipt').insertOne(receipt);
}
