'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      seats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM(
          'PENDING',
          'CONFIRMED',
          'CANCELLED'
        ),
        defaultValue: 'PENDING'
      },

      paymentStatus: {
        type: Sequelize.ENUM(
          'PENDING',
          'SUCCESS',
          'FAILED',
          'REFUNDED'
        ),
        defaultValue: 'PENDING'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};