import { carRepository } from "../repositories/CarRepository.js"

class CarService{
    constructor(repository){
        this.repository = repository
    }

    async getAll() {
        const cars = await this.repository.getAll()

        if (cars.length === 0) {
            throw new Error("Nenhum carro foi encontrado")
        }

        return cars
    }

    async getById(id){
        if (!id) throw new Error("ID não fornecido")

        const carExists = await this.repository.getById(id)

        if(!carExists || carExists.length === 0) throw new Error("Não foi possível encontrar o carro")

        return carExists
    }

    async create(carData) {
        if(!carData) throw new Error("Nenhum dado fornecido para o post")

        if(!carData.modelo || !carData.cor || !carData.valor || !carData.ano){
            throw new Error("Por favor preencha todos os campos")
        }

        const createdCar = await this.repository.create({
            modelo: carData.modelo,
            cor: carData.cor,
            valor: carData.valor,
            ano: carData.ano
        })

        return createdCar
    }

    async edit(id, {modelo, cor, valor, ano}){
        const carExists = await this.repository.getById(id)

        if(!carExists || carExists.length === 0) throw new Error("O carro não foi encontrado")

        const editedCar = await this.repository.put({modelo, cor, valor, ano}, id)

        return editedCar
    }

    async delete(id){
        const carExists = await this.repository.getById(id)

        if(!carExists  || carExists.length === 0) throw new Error("O carro não foi encontrado")

        const deletedCar = await this.repository.delete(id)

        return deletedCar
    }
}

export const carService = new CarService(carRepository)