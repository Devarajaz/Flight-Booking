'use strict';
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

module.exports = {
  async up(queryInterface) {
    const results = [];
    const filePath = path.resolve(__dirname, "../../airports.csv");

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            name: row.name?.trim(),
            iata_code: row.iata_code?.trim(), // must match DB
            city: row.city?.trim(),
            created_at: new Date(),
            updated_at: new Date()
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // ✅ remove duplicates inside CSV (by iata_code)
    const unique = [];
    const seen = new Set();

    for (const a of results) {
      if (!seen.has(a.iata_code)) {
        seen.add(a.iata_code);
        unique.push(a);
      }
    }

    // ✅ clear table before insert
    await queryInterface.bulkDelete("airports", null, {});

    // ✅ insert clean rows
    await queryInterface.bulkInsert("airports", unique);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("airports", null, {});
  }
};


