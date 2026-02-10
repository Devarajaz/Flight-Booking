'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('airplanes', 'airline_id', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'airlines',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
},

  async down(queryInterface) {
    await queryInterface.removeColumn("airplanes", "airline_id");
  }
};
