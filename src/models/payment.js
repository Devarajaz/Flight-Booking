'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Booking, {
        foreignKey: 'bookingId'
      });
    }
  }
  Payment.init({
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    razorpayOrderId: {
      type: DataTypes.STRING
    },

    razorpayOrderId: {
      type: DataTypes.STRING
    },

    razonpayPaymentId: { 
      type: DataTypes.STRING
    },

    razorpaySignature: {
      type: DataTypes.STRING
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
      'PENDING',
      'SUCCESS',
      'FAILED',
      'REFUNDED'
    ),
    defaultValue: 'PENDING'
  },

    paymentMethod: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};