import find from 'lodash/find';

let patientDetails = {};
let caseFeesTotals = {};
let carTransportTotals = {};
let airlineTicketTotals = {};
let aircraftCharterTotals = {};
let ambulanceFeeTotals = {};

function initTotals() {

  patientDetails = {};

  caseFeesTotals = {
    type: 0,
    repatriation: 0,
    doctorEscort: 0,
    nurseEscort: 0,
    total: 0
  };

  carTransportTotals = {
    providerRate: 0,
    mileagePrice: 0,
    total: 0
  };

  airlineTicketTotals = {
    amount: 0,
    total: 0
  };

  aircraftCharterTotals = {
    providerRate: 0,
    total: 0
  };

  ambulanceFeeTotals = {
    providerRate: 0,
    mileagePrice: 0,
    total: 0
  };
}

function setPatientDetails(details) {
  patientDetails = details;
}

function calculateCaseFeeTotals(caseFees, companies) {
  const selectedCompany = find(companies ? companies : caseFees.companies, function(company) {
    return caseFees.company === company.name;
  });
  if (!selectedCompany) {
    caseFeesTotals.total = 0;
    return;
  }
  if (caseFees.caseType === 'simple') {
    caseFees.type = selectedCompany.simple_fee || 0;
  } else if (caseFees.caseType === 'complex') {
    caseFees.type = selectedCompany.complex_fee || 0;
  } else {
    caseFees.type = caseFees.amount || 0;
  }
  caseFees.repatriation = caseFees.repatriation ? selectedCompany.repatriation : 0;
  caseFees.doctorEscort = caseFees.doctorEscort ? selectedCompany.doctor_escort : 0;
  caseFees.nurseEscort = caseFees.nurseEscort ? selectedCompany.nurse_escort : 0;
  caseFees.total = caseFees.type + caseFees.repatriation +
    caseFees.doctorEscort + caseFees.nurseEscort || 0;
  caseFeesTotals = caseFees;
}

function calculateCarTransportTotals(carTransport, mileageRate) {
  carTransport.mileagePrice = mileageRate * carTransport.distance || 0;
  carTransport.total = carTransport.mileagePrice || 0;
  carTransportTotals = carTransport;
}

function calculateAirlineTicketTotals(airlineTicket) {
  airlineTicket.total = airlineTicket.amount;
  airlineTicketTotals = airlineTicket;
}

function calculateAircraftCharterTotals(aircraftCharter, airlines) {
  const selectedAircraft = find(airlines? airlines : aircraftCharter.airlines, function(provider) {
    return aircraftCharter.provider === provider.value;
  });
  if (!selectedAircraft) {
    aircraftCharterTotals.total = 0;
    return;
  }
  aircraftCharter.total = aircraftCharter.flyingTime * selectedAircraft.rate || 0;
  aircraftCharterTotals = aircraftCharter;
}

function calculateAmbulanceFeeTotals(ambulanceFee, mileageRate) {
  ambulanceFee.mileagePrice = mileageRate * ambulanceFee.distance || 0;
  ambulanceFee.total = ambulanceFee.mileagePrice || 0;
  ambulanceFeeTotals = ambulanceFee;
}

function buildReceipt(_id, description, receipt, companies, airlines) {

  initTotals();

  setPatientDetails(receipt.patientDetails);

  calculateCaseFeeTotals(receipt.caseFee, companies);
  calculateCarTransportTotals(receipt.carTransport, 1.5); // TODO fix this once you add in config,
                                                          // also pull out doc/nurse escort fees,
                                                          // default to 950 and 650 respectively
  calculateAirlineTicketTotals(receipt.airlineTicket);
  calculateAircraftCharterTotals(receipt.aircraftCharter, airlines);
  calculateAmbulanceFeeTotals(receipt.ambulanceFee, 4.5); // TODO fix this once you add in config,
                                                          // also pull out doc/nurse escort fees,
                                                          // default to 950 and 650 respectively
  // scrub unneeded data
  return {
    _id: _id || undefined,
    description: description,
    patientDetails: {
      dob: patientDetails.dob,
      firstName: patientDetails.firstName,
      lastName: patientDetails.lastName
    },
    caseFee: {
      amount: caseFeesTotals.amount || 0,
      caseType: caseFeesTotals.caseType,
      company: caseFeesTotals.company,
      country: caseFeesTotals.country,
      doctorEscort: caseFeesTotals.doctorEscort,
      nurseEscort: caseFeesTotals.nurseEscort,
      repatriation: caseFeesTotals.repatriation,
      total: caseFeesTotals.total,
      type: caseFeesTotals.type
    },
    carTransport: {
      distance: carTransportTotals.distance,
      endDate: carTransportTotals.endDate,
      fromCity: carTransportTotals.fromCity,
      mileagePrice: carTransportTotals.mileagePrice,
      provider: carTransportTotals.provider,
      startDate: carTransportTotals.startDate,
      toCity: carTransportTotals.toCity,
      total: carTransportTotals.total
    },
    airlineTicket: {
      amount: airlineTicketTotals.total || 0,
      endDate: airlineTicketTotals.endDate,
      flightClass: airlineTicketTotals.flightClass,
      fromCity: airlineTicketTotals.fromCity,
      provider: airlineTicketTotals.provider,
      startDate: airlineTicketTotals.startDate,
      toCity: airlineTicketTotals.toCity,
      total: airlineTicketTotals.total
    },
    aircraftCharter: {
      aircraftType: aircraftCharterTotals.aircraftType,
      endDate: aircraftCharterTotals.endDate,
      flyingTime: aircraftCharterTotals.flyingTime,
      fromCity: aircraftCharterTotals.fromCity,
      provider: aircraftCharterTotals.provider,
      startDate: aircraftCharterTotals.startDate,
      toCity: aircraftCharterTotals.toCity,
      total: aircraftCharterTotals.total || 0
    },
    ambulanceFee: {
      distance: ambulanceFeeTotals.distance,
      endDate: ambulanceFeeTotals.endDate,
      fromCity: ambulanceFeeTotals.fromCity,
      mileagePrice: ambulanceFeeTotals.mileagePrice,
      provider: ambulanceFeeTotals.provider,
      startDate: ambulanceFeeTotals.startDate,
      toCity: ambulanceFeeTotals.toCity,
      total: ambulanceFeeTotals.total || 0
    },
    total: caseFeesTotals.total + carTransportTotals.total + airlineTicketTotals.total + aircraftCharterTotals.total + ambulanceFeeTotals.total,
    email: 'rishis@arms.com' // TODO fix this
  };
}

const TotalsService = { setPatientDetails, calculateCaseFeeTotals, calculateCarTransportTotals, calculateAirlineTicketTotals,
  calculateAircraftCharterTotals, calculateAmbulanceFeeTotals, buildReceipt, initTotals };
export default TotalsService;

