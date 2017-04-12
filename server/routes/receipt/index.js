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

exports.add = function(receipt) {
  addCaseFee(receipt.caseFees);
  addCarTransport(receipt.carTransport);
  addAirlineTickets(receipt.airlineTickets);
  addAirlineCharter(receipt.airlineCharter);
};

function addCaseFee(caseFees) {
  return db.query('INSERT INTO case_fee(case_type, company_id, amount) VALUES($1, $2, $3)',
    [caseFees.caseType, caseFees.company, caseFees.amount]).then(function(result, err) {
    if (err) {
      throw err;
    }
  });
}

function addCarTransport(carTransport) {
  return db.query('INSERT INTO car_transport(car_provider_id, from_city, to_city, distance, start_date, end_date, amount)' +
    ' VALUES($1, $2, $3, $4, $5, $6, $7)',
    [carTransport.provider, carTransport.fromCity, carTransport.toCity, carTransport.distance, carTransport.startDate,
      carTransport.endDate, carTransport.amount]).then(function(result, err) {
    if (err) {
      throw err;
    }
  });
}

function addAirlineTickets(airlineTickets) {
  return db.query('INSERT INTO airline_tickets(airline_id, from_city, to_city, ticket_class, start_date, end_date, amount)' +
    ' VALUES($1, $2, $3, $4, $5, $6, $7)',
    [airlineTickets.airline, airlineTickets.fromCity, airlineTickets.toCity, airlineTickets.ticketClass,
      airlineTickets.startDate, airlineTickets.endDate, airlineTickets.amount]).then(function(result, err) {
    if (err) {
      throw err;
    }
  });
}

function addAirlineCharter(airlineCharter) {
  return db.query('INSERT INTO airline_charter(airline_provider_id, aircraft_type, from_city, to_city, flying_time, start_date,' +
    ' end_date, amount)  VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    [airlineCharter.airline, airlineCharter.aircraftType, airlineCharter.fromCity, airlineCharter.toCity, airlineCharter.flyingTime,
      airlineCharter.startDate, airlineCharter.endDate, airlineCharter.amount]).then(function(result, err) {
    if (err) {
      throw err;
    }
  });
}