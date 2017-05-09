"use strict";
const db = require('../../db');

exports.get = function(receiptId) {
  let query = receiptId ? { "_id": receiptId } : {};
  return db.getClient().collection('receipt').find(query);
};

exports.add = function(receipt) {
  return addReceipt(receipt);
};

function addReceipt(receipt) {
  return db.getClient().collection('receipt').insertOne(receipt);
}
