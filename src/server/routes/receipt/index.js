const db = require('../../db');

exports.get = function() {
  return db.getClient().collection('receipt').find({});
};

exports.add = function(receipt) {
  return [
    addCaseFee(receipt.caseFees),
    addCarTransport(receipt.carTransport),
    addAirlineTickets(receipt.airlineTickets),
    addAircraftCharter(receipt.aircraftCharter)
  ];
};

function addCaseFee(caseFees) {
  return db.getClient().collection('case_fee').insertOne(caseFees);
}

function addCarTransport(carTransport) {
  return db.getClient().collection('car_transport').insertOne(carTransport);
}

function addAirlineTickets(airlineTickets) {
  return db.getClient().collection('airline_tickets').insertOne(airlineTickets);
}

function addAircraftCharter(aircraftCharter) {
  return db.getClient().collection('aircraft_charter').insertOne(aircraftCharter);
}
