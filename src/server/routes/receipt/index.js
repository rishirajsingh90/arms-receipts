const db = require('../../db/index');

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
  return [
    addCaseFee(receipt.caseFees),
    addCarTransport(receipt.carTransport),
    addAirlineTickets(receipt.airlineTickets),
    addAircraftCharter(receipt.aircraftCharter)
  ];
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
    [airlineTickets.provider, airlineTickets.fromCity, airlineTickets.toCity, airlineTickets.flightClass,
      airlineTickets.startDate, airlineTickets.endDate, airlineTickets.amount]).then(function(result, err) {
    if (err) {
      throw err;
    }
  });
}

function addAircraftCharter(aircraftCharter) {
  return db.query('INSERT INTO airline_charter(airline_provider_id, aircraft_type, from_city, to_city, flying_time, start_date,' +
    ' end_date, amount)  VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    [aircraftCharter.provider, aircraftCharter.aircraftType, aircraftCharter.fromCity, aircraftCharter.toCity, aircraftCharter.flyingTime,
      aircraftCharter.startDate, aircraftCharter.endDate, aircraftCharter.amount]).then(function(result, err) {
    if (err) {
      throw err;
    }
  });
}