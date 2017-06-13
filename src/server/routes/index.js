const express = require('express');
const receipt = require('./receipt');
const company = require('./company');
const countries = require('./country');
const carProvider = require('./carProvider');
const ambulanceProvider = require('./ambulanceProvider');
const airline = require('./airline');
const bodyParser = require('body-parser');

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/companies', (req, res) => {
  company.get().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
});

router.put('/companies', (req, res) => {
  company.put(req.body).then(function(response) {
    res.status(200).send(JSON.stringify({
      message: 'Company added with id ' + response.insertedId
    }));
  });
});

router.get('/receipt', (req, res) => {
  receipt.get(req.query.receiptId).toArray(function(err, result) {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
});

router.delete('/receipt', (req, res) => {
  receipt.delete(req.query.receiptId).then(function(response) {
    res.status(200).send(JSON.stringify({
      message: 'Receipt deleted with id ' + req.query.receiptId
    }));
  });
});

router.post('/receipt', (req, res) => {
  receipt.upsert(req.body).then(function(response) {
    res.status(200).send(JSON.stringify({
      message: 'Receipt upserted with id ' + response.insertedId ? req.body._id : response.updatedId.toHexString()
    }));
  });
});

router.get('/search', (req, res) => {
  receipt.search(req.query.query).toArray(function(err, result) {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
});

router.get('/countries', (req, res) => {
  countries.get().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
});

router.get('/car-providers', (req, res) => {
  carProvider.get().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
});

router.put('/car-providers', (req, res) => {
  carProvider.put(req.body).then(function(response) {
    res.status(200).send(JSON.stringify({
      message: 'Car provider added with id ' + response.insertedId
    }));
  });
});

router.get('/ambulance-providers', (req, res) => {
  ambulanceProvider.get().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
});

router.put('/ambulance-providers', (req, res) => {
  ambulanceProvider.put(req.body).then(function(response) {
    res.status(200).send(JSON.stringify({
      message: 'Ambulance provider added with id ' + response.insertedId
    }));
  });
});

router.get('/airlines', (req, res) => {
  airline.get().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(result));
  });
});

router.put('/airlines', (req, res) => {
  airline.put(req.body).then(function(response) {
    res.status(200).send(JSON.stringify({
      message: 'Airline added with id ' + response.insertedId
    }));
  });
});

module.exports = router;
