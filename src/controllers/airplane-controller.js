const { Airplane } = require("../models/index");

const getAllAirplanes = async (req, res) => {
    const airplanes = await Airplane.findAll();
    res.status(200).json({
        status: 'success',
        results: airplanes.length,
        data: airplanes
    });
};

module.exports = { getAllAirplanes }