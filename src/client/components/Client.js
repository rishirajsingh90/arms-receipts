/* eslint-disable no-undef */
import 'whatwg-fetch';

function getReceipt(query, cb) {
  query = query ? query : '';
  return fetch(`/api/receipt?receiptId=${query}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function searchReceipts(query, cb) {
  query = query ? query : '';
  return fetch(`/api/search?query=${query}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getCompanies(cb) {
  return fetch(`/api/companies`, {
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getCountries(cb) {
  return fetch(`/api/countries`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getCarProviders(cb) {
  return fetch(`/api/car-providers`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getAmbulanceProviders(cb) {
  return fetch(`/api/ambulance-providers`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getAirlines(cb) {
  return fetch(`/api/airlines`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function upsertReceipt(receipt, cb) {
  return fetch(`/api/receipt`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(receipt)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function deleteReceipt(query, cb) {
  query = query ? query : '';
  return fetch(`/api/receipt?receiptId=${query}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { getReceipt, getCompanies, getCountries, getCarProviders, getAirlines, getAmbulanceProviders, upsertReceipt,
  deleteReceipt, searchReceipts };
export default Client;
