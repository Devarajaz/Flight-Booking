const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flight-controller");

router.post("/search", flightController.searchFlights);

module.exports = router;
