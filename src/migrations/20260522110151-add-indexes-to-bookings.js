'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addIndex(
      'Bookings',
      ['flightId']
    );

    await queryInterface.addIndex(
      'Bookings',
      ['userId']
    );
    
    await queryInterface.addIndex(
      'Payments',
      ['bookingId']
    );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeIndex(
      'Bookings',
      ['flightId']
    );

    await queryInterface.removeIndex(
      'Bookings',
      ['userId']
    );

    await queryInterface.removeIndex(
      'Payments',
      ['bookingId']
    );
  }
};
