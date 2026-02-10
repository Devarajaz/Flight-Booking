'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("airplanes", "economy_seats");
    await queryInterface.removeColumn("airplanes", "business_seats");
    await queryInterface.removeColumn("airplanes", "first_class_seats");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("airplanes", "economy_seats", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn("airplanes", "business_seats", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn("airplanes", "first_class_seats", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  }
};

