'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("airplanes", {
       id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
       registration_number: { type: Sequelize.STRING, allowNull: false, unique: true },
       model: { type: Sequelize.STRING },
       manufacturer: { type: Sequelize.STRING },
       capacity: { type: Sequelize.INTEGER },
       airline_id: {
          type: Sequelize.INTEGER,
          references: { model: "airlines", key: "id" }
  },
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
