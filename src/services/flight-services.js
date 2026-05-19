const { Flight, Airline, Airplane, Airport, Sequelize } = require("../models");
const { Op } = Sequelize;

async function searchFlightsService(data) {

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
  } = data;

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
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    
    whereClause.departure_time = {
    [Op.gte]: start,
    [Op.lt]: end,
   };
  }

  // Sorting
  let order = [];
  if (sort === "price_asc") order.push(["ticket_cost", "ASC"]);
  if (sort === "price_desc") order.push(["ticket_cost", "DESC"]);
  if (sort === "time_asc") order.push(["departure_time", "ASC"]);

  const allFlights = await Flight.findAll();

  // DB Query
  const flights = await Flight.findAndCountAll({
    where: Object.assign(
    {},
    whereClause,

    from
      ? {
          "$fromAirport.city$": {
            [Op.iLike]: "%" + from + "%",
          },
        }
      : {},

    to
      ? {
          "$toAirport.city$": {
            [Op.iLike]: "%" + to + "%",
          },
        }
      : {}
  ),

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
    required: true,
    attributes: ["id", "name", "city", "iata_code"],
  },
  {
    model: Airport,
    as: "toAirport",
    required: true,
    attributes: ["id", "name", "city", "iata_code"],
  },
],

    order,
    limit: Number(limit),
    offset: Number(offset),
  });

  return {
    total: flights.count,
    flights: flights.rows,
    page: Number(page),
    totalPages: Math.ceil(flights.count / limit),
    data: flights.rows,
  };
}

module.exports = {
  searchFlightsService,
};
