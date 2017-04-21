import find from 'lodash/find';

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
    return caseFees.company === company.key;
  });
  if (caseFees.caseType === 'simple') {
    caseFeeTotals.type = selectedCompany.simple_fee || 0;
  } else if (caseFees.caseType === 'complex') {
    caseFeeTotals.type = selectedCompany.complex_fee || 0;
  } else {
    caseFeeTotals.type = selectedCompany.amount || 0;
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
}

function calculateCarTransportTotals(carTransport, mileageRate) {
  carTransportTotals.mileagePrice = mileageRate * carTransport.distance;
  carTransportTotals.providerRate = carTransport.amount;
  carTransportTotals.total = carTransportTotals.providerRate + carTransportTotals.mileageRate;
}

function calculateAirlineTicketTotals(airlineTicket) {
  airlineTicketTotals.ticketPrice = airlineTicket.amount;
  airlineTicketTotals.total = airlineTicketTotals.ticketPrice;
}

function calculateAirlineCharterTotals(airlineCharter) {
  airlineCharterTotals.providerRate = airlineCharter.amount;
  airlineCharterTotals.total = airlineCharterTotals.ticketPrice;
}

function getCaseFeeAmounts() {
  return caseFeeTotals;
}

function getCarTransportTotals() {
  return carTransportTotals;
}

function getAirlineTicketTotals() {
  return airlineTicketTotals;
}

function getAirlineCharterTotals() {
  return airlineCharterTotals;
}

const TotalsService = { calculateCaseFeeTotals, calculateCarTransportTotals, calculateAirlineTicketTotals,
  calculateAirlineCharterTotals, getCaseFeeAmounts, getCarTransportTotals, getAirlineTicketTotals, getAirlineCharterTotals };
export default TotalsService;

