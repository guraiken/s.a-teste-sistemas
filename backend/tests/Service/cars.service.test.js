import { carService } from "../../src/services/CarService.js"
import { carRepository } from "../../src/repositories/CarRepository.js"
import { describe, jest, test, expect, beforeEach } from "@jest/globals"

describe('CarService Tests', () => {

    beforeEach(() => {
        carRepository.getAll = jest.fn()
        carRepository.getById = jest.fn()
        carRepository.create = jest.fn()
        carRepository.put = jest.fn()
        carRepository.delete = jest.fn()
    })

    describe('getAll', () => {
        test('Deve retornar todos os carros quando existirem', async () => {
            const mockCars = [{ id: 1, modelo: 'Civic' }]
            carRepository.getAll.mockResolvedValue(mockCars)

            const result = await carService.getAll()

            expect(result).toEqual(mockCars)
            expect(carRepository.getAll).toHaveBeenCalledTimes(1)
        })

        test('Deve lançar erro quando não houver carros', async () => {
            carRepository.getAll.mockResolvedValue([])

            await expect(carService.getAll()).rejects.toThrow("Nenhum carro foi encontrado")
        })
    })

    describe('getById', () => {
        test('Deve retornar um carro por ID', async () => {
            const mockCar = { id: 1, modelo: 'Civic' }
            carRepository.getById.mockResolvedValue(mockCar)

            const result = await carService.getById(1)

            expect(result).toEqual(mockCar)
            expect(carRepository.getById).toHaveBeenCalledWith(1)
        })

        test('Deve lançar erro se o ID não for fornecido', async () => {
            await expect(carService.getById()).rejects.toThrow("ID não fornecido")
        })

        test('Deve lançar erro se o carro não existir', async () => {
            carRepository.getById.mockResolvedValue(null)

            await expect(carService.getById(99)).rejects.toThrow("Não foi possível encontrar o carro")
        })
    })

    describe('create', () => {
        test('Deve criar um carro com sucesso', async () => {
            const carData = { modelo: 'Civic', cor: 'Preto', valor: 100000, ano: 2022 }
            const mockCreatedCar = { id: 1, ...carData }
            carRepository.create.mockResolvedValue(mockCreatedCar)

            const result = await carService.create(carData)

            expect(result).toEqual(mockCreatedCar)
            expect(carRepository.create).toHaveBeenCalledWith(carData)
        })

        test('Deve lançar erro se dados não forem fornecidos', async () => {
            await expect(carService.create()).rejects.toThrow("Nenhum dado fornecido para o post")
        })

        test('Deve lançar erro se faltar campos obrigatórios', async () => {
            const incompleteData = { modelo: 'Civic' }
            await expect(carService.create(incompleteData)).rejects.toThrow("Por favor preencha todos os campos")
        })
    })

    describe('edit', () => {
        test('Deve editar um carro com sucesso', async () => {
            const id = 1
            const editData = { modelo: 'Civic Novo', cor: 'Azul', valor: 110000, ano: 2023 }
            const mockUpdatedCar = { id, ...editData }

            carRepository.getById.mockResolvedValue({ id })
            carRepository.put.mockResolvedValue(mockUpdatedCar)

            const result = await carService.edit(id, editData)

            expect(result).toEqual(mockUpdatedCar)
            expect(carRepository.put).toHaveBeenCalledWith(editData, id)
        })

        test('Deve lançar erro se o carro não existir ao editar', async () => {
            carRepository.getById.mockResolvedValue(null)
            await expect(carService.edit(1, {})).rejects.toThrow("O carro não foi encontrado")
        })
    })

    describe('delete', () => {
        test('Deve deletar um carro com sucesso', async () => {
            const id = 1
            const mockDeletedCar = { id, modelo: 'Civic' }

            carRepository.getById.mockResolvedValue(mockDeletedCar)
            carRepository.delete.mockResolvedValue(mockDeletedCar)

            const result = await carService.delete(id)

            expect(result).toEqual(mockDeletedCar)
            expect(carRepository.delete).toHaveBeenCalledWith(id)
        })

        test('Deve lançar erro se o carro não existir ao deletar', async () => {
            carRepository.getById.mockResolvedValue(null)
            await expect(carService.delete(1)).rejects.toThrow("O carro não foi encontrado")
        })
    })
})
