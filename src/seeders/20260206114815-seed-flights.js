'use strict';
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

function parseDate(value) {
  if (!value) return null;
  const [datePart, timePart] = value.split(" ");
  const [dd, mm, yyyy] = datePart.split("-");
  return new Date(`${yyyy}-${mm}-${dd}T${timePart}:00`);
}

function toNumber(v) {
  if (v === undefined || v === null || v === "" || v === "NaN") return null;
  return Number(v);
}

module.exports = {
  async up(queryInterface) {
    const results = [];
    const filePath = path.resolve(__dirname, "../../flights.csv");

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            flight_number: row.flight_number?.trim(),
            airline_id: toNumber(row.airline_id),
            airplane_id: toNumber(row.airplane_id),
            from_airport_id: toNumber(row.from_airport_id),
            to_airport_id: toNumber(row.to_airport_id),
            departure_time: parseDate(row.departure_time),
            arrival_time: parseDate(row.arrival_time),
            ticket_cost: toNumber(row.ticket_cost),
            created_at: new Date(),
            updated_at: new Date()
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log("Sample row:", results[0]); // debug

    await queryInterface.bulkInsert("flights", results);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("flights", null, {});
  }
};



