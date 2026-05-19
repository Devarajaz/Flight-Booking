const { searchFlightsService } = require("../services/flight-services");

async function searchFlights(req, res) {
  try {
    const result = await searchFlightsService(req.body);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Flight search failed",
      error: error.message,
    });
  }
}

module.exports = {
  searchFlights,
};
