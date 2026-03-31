'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      flight_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "flights",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      seats_booked: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("CONFIRMED", "CANCELLED"),
        defaultValue: "CONFIRMED",
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("bookings");
  },
};
