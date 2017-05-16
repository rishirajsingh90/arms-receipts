import find from 'lodash/find';
import update from 'immutability-helper';

let patientDetails = {};

let caseFeeTotals = {
  type: 0,
  repatriation: 0,
  doctorEscort: 0,
  nurseEscort: 0,
  total: 0
};

let carTransportTotals = {
  providerRate: 0,
  mileagePrice: 0,
  total: 0
};

let airlineTicketTotals = {
};

let aircraftCharterTotals = {
  providerRate: 0,
  total: 0
};

let ambulanceFeeTotals = {
  providerRate: 0,
  mileagePrice: 0,
  total: 0
};

function setPatientDetails(details) {
  patientDetails = details;
}

function calculateCaseFeeTotals(caseFees) {
  const selectedCompany = find(caseFees.companies, function(company) {
    return caseFees.company === company.name;
  });
  if (!selectedCompany) {
    return;
  }
  if (caseFees.caseType === 'simple') {
    caseFeeTotals.type = selectedCompany.simple_fee || 0;
  } else if (caseFees.caseType === 'complex') {
    caseFeeTotals.type = selectedCompany.complex_fee || 0;
  } else {
    caseFeeTotals.type = caseFees.amount || 0;
  }
  if (caseFees.repatriation) {
    caseFeeTotals.repatriation = selectedCompany.repatriation || 0;
  }
  if (caseFees.doctorEscort) {
    caseFeeTotals.doctorEscort = selectedCompany.doctor_escort || 0;
  }
  if (caseFees.nurseEscort) {
    caseFeeTotals.nurseEscort = selectedCompany.nurse_scort || 0;
  }
  caseFeeTotals.total = caseFeeTotals.type + caseFeeTotals.repatriation +
    caseFeeTotals.doctorEscort + caseFeeTotals.nurseEscort || 0;
  caseFeeTotals = update(caseFees, { $merge: caseFeeTotals });
}

function calculateCarTransportTotals(carTransport, mileageRate) {
  carTransportTotals.mileagePrice = mileageRate * carTransport.distance || 0;
  carTransportTotals.total = carTransportTotals.mileagePrice || 0;
  carTransportTotals = update(carTransport, { $merge: carTransportTotals });
}

function calculateAirlineTicketTotals(airlineTicket) {
  airlineTicketTotals = airlineTicket;
}

function calculateAircraftCharterTotals(aircraftCharter) {
  const selectedAircraft = find(aircraftCharter.airlines, function(provider) {
    return aircraftCharter.provider === provider.name;
  });
  if (!selectedAircraft) {
    return;
  }
  aircraftCharterTotals.total = aircraftCharter.flyingTime * selectedAircraft.rate || 0;
  aircraftCharterTotals = update(aircraftCharter, { $merge: aircraftCharterTotals });
}

function calculateAmbulanceFeeTotals(ambulanceFee, mileageRate) {
  ambulanceFeeTotals.mileagePrice = mileageRate * ambulanceFee.distance || 0;
  ambulanceFeeTotals.total = carTransportTotals.mileagePrice || 0;
  ambulanceFeeTotals = update(ambulanceFee, { $merge: carTransportTotals });
}

function getReceipt(description) {
  return {
    description: description,
    patientDetails: patientDetails,
    caseFee: caseFeeTotals,
    carTransport: carTransportTotals,
    airlineTicket: airlineTicketTotals,
    aircraftCharter: aircraftCharterTotals,
    ambulanceFee: ambulanceFeeTotals,
    total: caseFeeTotals.total + carTransportTotals.total + airlineTicketTotals.total + aircraftCharterTotals.total + ambulanceFeeTotals.total,
    email: 'rishis@arms.com' // TODO fix this
  };
}

const TotalsService = { setPatientDetails, calculateCaseFeeTotals, calculateCarTransportTotals, calculateAirlineTicketTotals,
  calculateAircraftCharterTotals, calculateAmbulanceFeeTotals, getReceipt };
export default TotalsService;

