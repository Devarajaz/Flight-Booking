'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        flight_number: { type: Sequelize.STRING },
        airline_id: { type: Sequelize.INTEGER, references: { model: "airlines", key: "id" }},
        from_airport_id: { type: Sequelize.INTEGER, references: { model: "airports", key: "id" }},
        to_airport_id: { type: Sequelize.INTEGER, references: { model: "airports", key: "id" }},
        departure_time: Sequelize.DATE,
        arrival_time: Sequelize.DATE,
        ticket_cost: Sequelize.INTEGER,
        created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
        updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") }
});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
