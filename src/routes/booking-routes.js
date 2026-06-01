const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking-controller");

const bookingController = new BookingController();

router.post("/", bookingController.create);

module.exports = router;