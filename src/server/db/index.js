const MongoClient = require('mongodb').MongoClient;
const dbUtils = require('../utils/db-utils');
const mongodb = require('mongodb');
const countries = require('./countries.json');
const mockAirline = require('./mockAirline.json');
const mockCarProvider = require('./mockCarProvider.json');
const mockCompany = require('./mockCompany.json');
const mockCompanyFees = require('./mockCompanyFees.json');
const mockReceipt = require('./mockReceipt.json');

var client;

exports.connect = function() {
  if (process.env.NODE_ENV === 'production') {
    MongoClient.connect(dbUtils.getDbConfig(), function (error, db) {
      client = db;
    });
  } else {
    const MongoInMemory = require('mongo-in-memory');
    const mongoServerInstance = new MongoInMemory();
    return mongoServerInstance.start((error, config) => {
      if (error) throw error;
      const uri = mongoServerInstance.getMongouri("arms");
      mongodb.connect(uri, function (error, db) {
        client = db;
        addMockData();
      });
    });
  }
};

function addMockData() {
  // airlines
  client.collection('airline').insertMany(mockAirline);
  client.collection('country').insertMany(countries);
  client.collection('company').insertMany(mockCompany);
  client.collection('company_fees').insertMany(mockCompanyFees);
  client.collection('receipt').insertMany(mockReceipt);
}

exports.setClient = function(database) {
  client = database;
};

exports.getClient = function() {
  return client;
};
