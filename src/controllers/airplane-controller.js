const catchAsync = require("../utils/catch-async");
const AirplaneServices = require("../services/airplane-services");

const getAllAirplanes = catchAsync(async (req, res) => {
    const airplanes = await AirplaneServices.getAllAirplanes();

    res.status(200).json({
        status: 'success',
        results: airplanes.length,
        data: airplanes,
    });
});

const getAirplanesById = catchAsync(async (req, res) => {
    const airplane = await AirplaneServices.getAirplanesById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: airplane,
    })
})

module.exports = { getAllAirplanes, getAirplanesById }