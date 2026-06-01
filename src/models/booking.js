'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Booking.hasOne(models.Payment, {
        foreignKey: 'bookingId'
      });

      Booking.belongsTo(models.Flight, {
        foreignKey: 'flightId'
      });
    }
  }

  Booking.init({
    userId: DataTypes.INTEGER,
    flightId: DataTypes.INTEGER,
    seats: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    status: DataTypes.ENUM(
      'PENDING',
      'CONFIRMED',
      'CANCELLED'
    ),

    paymentStatus: DataTypes.ENUM(
      'PENDING',
      'SUCCESS',
      'FAILED',
      'REFUNDED'
    )
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};