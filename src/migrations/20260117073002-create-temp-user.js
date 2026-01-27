'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("temp_users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },

      otp: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },

      otp_expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // Index for faster lookup
    await queryInterface.addIndex("temp_users", ["email"]);
    await queryInterface.addIndex("temp_users", ["otp"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("temp_users");
  },
};