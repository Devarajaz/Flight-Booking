const express = require('express');
const airplaneController = require('../controllers/airplane-controller');

const router = express.Router();

router.get("/", airplaneController.getAllAirplanes);
router.get("/:id", airplaneController.getAirplanesById);

module.exports = router;