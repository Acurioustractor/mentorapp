const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

router.get('/', (req, res) => {
  const csvPath = path.join(__dirname, '../../Data/Digital assets-AIME Values.csv');
  try {
    const csvFile = fs.readFileSync(csvPath, 'utf8');
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => res.json(results.data),
      error: (err) => res.status(500).json({ error: err.message })
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 