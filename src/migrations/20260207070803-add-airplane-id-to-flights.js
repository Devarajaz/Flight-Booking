'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("flights", "airplane_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "airplanes",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("flights", "airplane_id");
  }
};

