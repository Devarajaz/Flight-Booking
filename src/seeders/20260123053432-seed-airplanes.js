"use strict";
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

module.exports = {
  async up(queryInterface, Sequelize) {
    const airplanes = [];
    const filePath = path.join(__dirname, "../../csv.csv");

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          airplanes.push({
            airline: row.airline,
            model: row.model,
            registration_number: row.registration_number,
            manufacturer: row.manufacturer,
            capacity: Number(row.capacity),
            economy_seats: Number(row.economy_seats),
            business_seats: Number(row.business_seats),
            first_class_seats: Number(row.first_class_seats),
            created_at: new Date(),
            updated_at: new Date(),
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    return queryInterface.bulkInsert("airplanes", airplanes);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("airplanes", null, {});
  },
};

