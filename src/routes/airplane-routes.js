const express = require('express');
const airplaneController = require('../controllers/airplane-controller');

const router = express.Router();

router.get("/", airplaneController.getAllAirplanes);

module.exports = router;