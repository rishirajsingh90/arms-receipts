const MongoClient = require('mongodb').MongoClient;
const dbUtils = require('../utils/db-utils');
const mongodb = require('mongodb');
const countries = require('./mocks/countries.json');
const mockAirline = require('./mocks/airline.json');
const mockCarProvider = require('./mocks/carProvider.json');
const mockAmbulanceProvider = require('./mocks/ambulanceProvider.json');
const mockCompany = require('./mocks/company.json');
const mockCompanyFees = require('./mocks/companyFees.json');
const mockReceipt = require('./mocks/receipt.json');

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
      if (error) {
        throw error;
      }
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
  client.collection('car_provider').insertMany(mockCarProvider);
  client.collection('ambulance_provider').insertMany(mockAmbulanceProvider);
  client.collection('receipt').insertMany(mockReceipt);
}

exports.setClient = function(database) {
  client = database;
};

exports.getClient = function() {
  return client;
};

exports.createObjectId = function(id) {
  return new mongodb.ObjectID(id);
};
