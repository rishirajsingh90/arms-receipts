const express = require('express');
const receipt = require('./receipt');
const company = require('./company');

const router = express.Router();

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

module.exports = router;