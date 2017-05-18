"use strict";
const db = require('../../db');

exports.get = function(receiptId) {
  let query = receiptId ? { "_id": new db.createObjectId(receiptId) } : {};
  return db.getClient().collection('receipt').find(query);
};

exports.upsert = function(receipt) {
  return receipt._id ? updateReceipt(receipt) : insertReceipt(receipt);
};

function insertReceipt(receipt) {
  return db.getClient().collection('receipt').insertOne(receipt);
}

function updateReceipt(receipt) {
  const id = receipt._id;
  delete receipt._id;
  return db.getClient().collection('receipt').updateOne(
    { _id: new db.createObjectId(id) },
    { $set: receipt }
  );
}
