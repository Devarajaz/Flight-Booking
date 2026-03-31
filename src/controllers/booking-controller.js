const { createBookingService } = require("../services/booking-services");

async function createBooking(req, res) {
  try {
    const booking = await createBookingService(req.body);

    return res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { createBooking };