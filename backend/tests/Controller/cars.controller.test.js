import { carController } from "../../src/controllers/CarController.js"
import { carService } from "../../src/services/CarService.js"
import { describe, jest, test, expect, beforeEach } from "@jest/globals"

describe('CarController Tests', () => {
    let req, res

    beforeEach(() => {
        carService.getAll = jest.fn()
        carService.getById = jest.fn()
        carService.create = jest.fn()
        carService.edit = jest.fn()
        carService.delete = jest.fn()

        req = {
            params: {},
            body: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    describe('getAll', () => {
        test('Deve retornar status 200 e lista de carros', async () => {
            const mockCars = [{ id: 1, modelo: 'Civic' }]
            carService.getAll.mockResolvedValue(mockCars)

            await carController.getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                message: "Carros encontrados com sucesso!",
                data: mockCars
            })
        })

        test('Deve retornar status 404 quando houver erro', async () => {
            const error = new Error("Nenhum carro foi encontrado")
            carService.getAll.mockRejectedValue(error)

            await carController.getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({
                error: error,
                message: error.message
            })
        })
    })

    describe('getById', () => {
        test('Deve retornar status 200 e o carro', async () => {
            const mockCar = { id: 1, modelo: 'Civic' }
            req.params.id = 1
            carService.getById.mockResolvedValue(mockCar)

            await carController.getById(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                data: mockCar,
                message: "Carro encontrado com sucesso!"
            })
        })

        test('Deve retornar status 404 quando o carro não existir', async () => {
            const error = new Error("Não foi possível encontrar o carro")
            req.params.id = 99
            carService.getById.mockRejectedValue(error)

            await carController.getById(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({
                error: error,
                message: error.message
            })
        })
    })

    describe('create', () => {
        test('Deve retornar status 201 e o novo carro', async () => {
            const carData = { modelo: 'Civic', cor: 'Preto', valor: 100000, ano: 2022 }
            const mockCreatedCar = { id: 1, ...carData }
            req.body = carData
            carService.create.mockResolvedValue(mockCreatedCar)

            await carController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({
                data: mockCreatedCar,
                message: "Carro criado com sucesso!"
            })
        })

        test('Deve retornar status 404 quando houver erro na criação', async () => {
            const error = new Error("Por favor preencha todos os campos")
            req.body = {}
            carService.create.mockRejectedValue(error)

            await carController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({
                error: error,
                message: error.message
            })
        })
    })

    describe('edit', () => {
        test('Deve retornar status 200 e o carro editado', async () => {
            const id = 1
            const updateData = { modelo: 'Civic Alterado' }
            const mockUpdatedCar = { id, ...updateData }
            req.params.id = id
            req.body = updateData
            carService.edit.mockResolvedValue(mockUpdatedCar)

            await carController.edit(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                data: mockUpdatedCar,
                message: "O carro foi editado com sucesso!"
            })
        })
    })

    describe('delete', () => {
        test('Deve retornar status 200 e o carro deletado', async () => {
            const id = 1
            const mockDeletedCar = { id, modelo: 'Civic' }
            req.params.id = id
            carService.delete.mockResolvedValue(mockDeletedCar)

            await carController.delete(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                data: mockDeletedCar,
                message: "O carro foi excluído com sucesso"
            })
        })
    })
})
