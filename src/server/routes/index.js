const express = require('express');
const receipt = require('./receipt');
const company = require('./company');
const countries = require('./country');
const carProvider = require('./carProvider');
const airline = require('./airline');
const bodyParser = require('body-parser');

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/api/companies', (req, res) => {
  company.get().toArray(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.get('/api/receipt', (req, res) => {
  receipt.get().toArray(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.post('/api/receipt', (req, res) => {
  receipt.add(req.body).then(function(response) {
    res.status(200).send(JSON.stringify({
      message: 'Receipt created with id ' + response.insertedId.toHexString()
    }));
  });
});

router.get('/api/countries', (req, res) => {
  countries.get().toArray(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.get('/api/car-providers', (req, res) => {
  carProvider.get().toArray(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.get('/api/airlines', (req, res) => {
  airline.get().toArray(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
