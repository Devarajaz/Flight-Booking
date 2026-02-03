const { Airplane } = require('../models/index');
const AppError = require("../utils/app-error");

class AirplaneService {
    static async getAllAirplanes() {
        const airplanes = await Airplane.findAll();

        if(!airplanes || airplanes.length === 0){
            throw new AppError("No airplanes found", 404);
        }

        return airplanes;
    }

    static async getAirplanesById(id) {
        const airplane = await Airplane.findByPk(id);

        if(!airplane){
            throw new AppError("Airplane not found", 404);
        }

        return airplane;
    }
}

module.exports = AirplaneService;