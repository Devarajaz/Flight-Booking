'use strict';
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

module.exports = {
  async up(queryInterface) {
    const results = [];
    const filePath = path.resolve(__dirname, "../../airlines_01.csv");

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            name: row.name?.trim(),
            code: row.code?.trim(),
            created_at: new Date(),
            updated_at: new Date()
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // ✅ Remove duplicates inside CSV itself
    const unique = [];
    const seen = new Set();

    for (const a of results) {
      if (!seen.has(a.name)) {
        seen.add(a.name);
        unique.push(a);
      }
    }

    // ✅ Clear table first (safe reseed)
    await queryInterface.bulkDelete("airlines", null, {});

    // ✅ Insert clean data
    await queryInterface.bulkInsert("airlines", unique);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("airlines", null, {});
  }
};


