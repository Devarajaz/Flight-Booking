const BookingService = require("../services/booking-service");

const bookingService = new BookingService();

class BookingController {

  async create(req, res) {

    try {

      const response =
        await bookingService.createBooking({

          userId: req.body.userId,

          flightId: req.body.flightId,

          seats: req.body.seats
        });

      return res.status(201).json({

        success: true,

        message: "Booking created successfully",

        data: response,

        error: {}

      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message: "Unable to create booking",

        data: {},

        error: error.message
      });
    }
  }
}

module.exports = BookingController;