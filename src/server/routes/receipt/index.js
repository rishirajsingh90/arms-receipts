"use strict";
const db = require('../../db');

exports.get = function(receiptId) {
  let query = receiptId ? { "_id": new db.createObjectId(receiptId) } : {};
  return db.getClient().collection('receipt').find(query);
};

exports.search = function(query) {
  query = new RegExp(query, "i");
  return db.getClient().collection('receipt').find({
    $or:
      [
        { "patientDetails.firstName": { $regex: query } },
        { "patientDetails.lastName": { $regex: query } },
        { "patientDetails.dob": { $regex: query } },
        { "description": { $regex: query } }
      ]
  });
};

exports.upsert = function(receipt) {
  return receipt._id ? updateReceipt(receipt) : insertReceipt(receipt);
};

exports.delete = function(receiptId) {
  let query = { "_id": new db.createObjectId(receiptId) };
  return db.getClient().collection('receipt').deleteOne(query);
};

function insertReceipt(receipt) {
  receipt.creationDate = getDate();
  return db.getClient().collection('receipt').insertOne(receipt);
}

function updateReceipt(receipt) {
  const id = receipt._id;
  delete receipt._id;
  receipt.updatedDate = getDate();
  return db.getClient().collection('receipt').updateOne(
    { _id: new db.createObjectId(id) },
    { $set: receipt }
  );
}

function getDate() {
  const date = new Date().toLocaleString('en-GB').split(',')[0];
  const tokens = date.split(',');
  if (tokens && tokens.length === 2) {
    return tokens[0];
  } else {
    return date;
  }
}
