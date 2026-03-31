const { Booking, Flight, sequelize } = require("../models");

function generatePNR() {
  return "PNR" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function createBookingService({ flight_number, seats, user_email }) {
  const t = await sequelize.transaction();

  try {
    // ✅ Validation
    if (!flight_number || !seats || !user_email) {
      throw new Error("Missing required fields");
    }

    if (seats <= 0) {
      throw new Error("Seats must be greater than 0");
    }

    // ✅ Lock flight row
    const flight = await Flight.findOne({
      where: { flight_number },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!flight) {
      throw new Error("Flight not found");
    }

    if (flight.available_seats < seats) {
      throw new Error("Not enough seats");
    }

    // ✅ Deduct seats
    flight.available_seats -= seats;
    await flight.save({ transaction: t });

    // ✅ Calculate price
    const total_price = seats * flight.ticket_cost;

    // ✅ Create booking
    const booking = await Booking.create(
      {
        user_email,
        flight_id: flight.id,
        seats_booked: seats,
        total_price,
        status: "CONFIRMED",
        pnr: generatePNR(), // optional column
      },
      { transaction: t }
    );

    await t.commit();

    return booking;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = {
  createBookingService,
};
