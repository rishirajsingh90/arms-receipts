import find from 'lodash/find';
import update from 'immutability-helper';

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
  ticketPrice: 0,
  total: 0
};

let airlineCharterTotals = {
  providerRate: 0,
  total: 0
};

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
  caseFeeTotals = update(caseFees, {$merge: caseFeeTotals});
}

function calculateCarTransportTotals(carTransport, mileageRate) {
  carTransportTotals.mileagePrice = mileageRate * carTransport.distance || 0;
  carTransportTotals.providerRate = carTransport.amount || 0;
  carTransportTotals.total = carTransportTotals.providerRate + carTransportTotals.mileagePrice || 0;
  carTransportTotals = update(carTransport, {$merge: carTransportTotals});
}

function calculateAirlineTicketTotals(airlineTicket) {
  airlineTicketTotals.ticketPrice = airlineTicket.amount || 0;
  airlineTicketTotals.total = airlineTicketTotals.ticketPrice || 0;
  airlineTicketTotals = update(airlineTicket, {$merge: airlineTicketTotals});
}

function calculateAirlineCharterTotals(airlineCharter) {
  airlineCharterTotals.providerRate = airlineCharter.amount || 0;
  airlineCharterTotals.total = airlineCharterTotals.providerRate || 0;
  airlineCharterTotals = update(airlineCharter, {$merge: airlineCharterTotals});
}

function getReceipt(description) {
  return {
    description: description,
    caseFee: caseFeeTotals,
    carTransport: carTransportTotals,
    airlineTicket: airlineTicketTotals,
    airlineCharter: airlineCharterTotals,
    total: caseFeeTotals.total + carTransportTotals.total + airlineTicketTotals.total + airlineCharterTotals.total,
    email: 'rishis@arms.com' // TODO fix this
  };
}

const TotalsService = { calculateCaseFeeTotals, calculateCarTransportTotals, calculateAirlineTicketTotals,
  calculateAirlineCharterTotals, getReceipt };
export default TotalsService;

