"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("airplanes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      airline: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      registration_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      economy_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      business_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      first_class_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("airplanes");
  },
};

