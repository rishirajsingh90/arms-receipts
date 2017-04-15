const express = require('express');
const receipt = require('./receipt/index');
const company = require('./company/index');
const countries = require('./country/index');
const carProvider = require('./carProvider/index');
const airline = require('./airline/index');
const bodyParser = require('body-parser');

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/api/companies', (req, res) => {
  company.get().then(function(response) {
    res.send(JSON.stringify(response));
  });
});

router.get('/api/receipt', (req, res) => {
  receipt.get().then(function(response) {
    res.send(JSON.stringify(response));
  });
});

router.post('/api/receipt', (req, res) => {
  receipt.add(req.body);
  res.send(200, 'Receipt created with id ');
});

router.get('/api/countries', (req, res) => {
  countries.get().then(function(response) {
    res.send(JSON.stringify(response));
  });
});

router.get('/api/car-providers', (req, res) => {
  carProvider.get().then(function(response) {
    res.send(JSON.stringify(response));
  });
});

router.get('/api/airlines', (req, res) => {
  airline.get().then(function(response) {
    res.send(JSON.stringify(response));
  });
});

module.exports = router;