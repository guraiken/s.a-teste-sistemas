import { carService } from "../services/CarService";

class CarController {
    constructor(service) {
        this.service = carService
    }

    async getAll(req, res) {
        try {
            const cars = await this.service.getAll()

            return res.status(200).json({
                message: "Carros encontrados com sucesso!",
                data: cars
            })
        } catch (error) {
            return res.status(404).json({
                error,
                message: error.message
            })
        }
    }

}

export const carController = new CarController(carService)