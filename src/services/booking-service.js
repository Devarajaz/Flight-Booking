const { sequelize, Flight, Booking, Payment } = require("../models");

class BookingService {

  async createBooking(data) {

    const transaction =
      await sequelize.transaction();

    try {

      // STEP 1 — lock flight row
      const flight =
        await Flight.findByPk(
          data.flightId,
          {
            transaction,
            lock: transaction.LOCK.UPDATE
          }
        );

      // STEP 2 — validate flight
      if (!flight) {
        throw new Error("Flight not found");
      }

      // STEP 3 — check seats
      if (flight.totalSeats < data.seats) {
        throw new Error("Insufficient seats available");
      }

      // STEP 4 — calculate amount
      const totalAmount =
        flight.ticket_cost * data.seats;

      // STEP 5 — reduce seats
      flight.totalSeats =
        flight.totalSeats - data.seats;

      await flight.save({ transaction });

      // STEP 6 — create booking
      const booking =
        await Booking.create({

          userId: data.userId,

          flightId: data.flightId,

          seats: data.seats,

          totalAmount,

          status: "PENDING",

          paymentStatus: "PENDING"

        }, { transaction });

      // STEP 7 — create payment row
      await Payment.create({

        bookingId: booking.id,

        amount: totalAmount,

        status: "PENDING"

      }, { transaction });

      // STEP 8 — commit
      await transaction.commit();

      return booking;

    } catch (error) {

      // rollback everything
      await transaction.rollback();

      throw error;
    }
  }
}

module.exports = BookingService;