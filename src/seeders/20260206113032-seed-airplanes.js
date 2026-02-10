'use strict';
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

function toNumber(v) {
  if (v === undefined || v === null || v === "" || v === "NaN") return null;
  return Number(v);
}

module.exports = {
  async up(queryInterface) {
    const results = [];
    const filePath = path.resolve(__dirname, "../../airplanes.csv");

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            registration_number: row.registration_number.trim(),
            model: row.model.trim(),
            manufacturer: row.manufacturer.trim(),
            capacity: toNumber(row.capacity),
            airline_id: toNumber(row.airline_id), // FK
            created_at: new Date(),
            updated_at: new Date()
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log("Sample airplane:", results[0]); // debug

    await queryInterface.bulkInsert("airplanes", results);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("airplanes", null, {});
  }
};



