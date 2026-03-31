const { Flight, Airline, Airplane, Airport, Sequelize } = require("../models");
const { Op } = Sequelize;

async function searchFlightsService(query) {
  const {
    from,
    to,
    date,
    airline,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 10,
  } = query;

  // Pagination
  const offset = (page - 1) * limit;

  // WHERE conditions
  let whereClause = {};

  // Airline filter
  if (airline) {
    whereClause.airline_id = airline;
  }

  // Price filter
  if (minPrice || maxPrice) {
    whereClause.ticket_cost = {};
    if (minPrice) whereClause.ticket_cost[Op.gte] = minPrice;
    if (maxPrice) whereClause.ticket_cost[Op.lte] = maxPrice;
  }

  // Date filter
  if (date) {
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);

    whereClause.departure_time = {
      [Op.between]: [start, end],
    };
  }

  // Sorting
  let order = [];
  if (sort === "price_asc") order.push(["ticket_cost", "ASC"]);
  if (sort === "price_desc") order.push(["ticket_cost", "DESC"]);
  if (sort === "time_asc") order.push(["departure_time", "ASC"]);

  // DB Query
  const flights = await Flight.findAndCountAll({
    where: whereClause,

    include: [
      {
        model: Airline,
        as: "airline",
        attributes: ["id", "name", "code"],
      },
      {
        model: Airplane,
        as: "airplane",
        attributes: ["id", "model", "capacity"],
      },
      {
        model: Airport,
        as: "fromAirport",
        attributes: ["id", "name", "iata_code", "city"],
        where: from ? { iata_code: from } : undefined,
        required: !!from,
      },
      {
        model: Airport,
        as: "toAirport",
        attributes: ["id", "name", "iata_code", "city"],
        where: to ? { iata_code: to } : undefined,
        required: !!to,
      },
    ],

    order,
    limit: Number(limit),
    offset: Number(offset),
  });

  return {
    total: flights.count,
    page: Number(page),
    totalPages: Math.ceil(flights.count / limit),
    data: flights.rows,
  };
}

module.exports = {
  searchFlightsService,
};
