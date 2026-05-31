import pool from "../../src/config/db.js"
import { carRepository } from "../../src/repositories/CarRepository.js"
import {describe, jest, test, expect, beforeEach} from "@jest/globals"

describe('CT-01 - método get', () => {

    beforeEach(() => {
        pool.query = jest.fn()
    })

    describe("Todos os carros", () => {
        
        test("Retorna um array de carros", async () => {
            const todosCarros = [
                {id: 1, modelo: "Civic", cor: "Preto", valor: 100000, ano: 2022},
                {id: 2, modelo: "Corolla", cor: "Branco", valor: 110000, ano: 2023}
            ]

            pool.query.mockResolvedValueOnce({rows: todosCarros})

            const resultado = await carRepository.getAll()
            
            expect(Array.isArray(resultado)).toBe(true)
            expect(resultado.length).toBe(2)
            expect(resultado[0].modelo).toBe("Civic")
        })
    })

    describe("Retorna um único carro", () => {
        test("Retorna um carro único", async() => {
             const carroUnico = {id: 1, modelo: "Civic", cor: "Preto", valor: 100000, ano: 2022}

            const id = 1

            pool.query.mockResolvedValueOnce({rows: [carroUnico]})

            const resultado = await carRepository.getById(id)

            expect(typeof resultado).toBe('object')
            expect(resultado.modelo).toBe("Civic")
        })
    })
})

describe('CT-02 - método create', () => {
    beforeEach(() => {
        pool.query = jest.fn()
    })

    describe("Criando o carro", () => {
        
        test("Cria um objeto com sucesso e retorna o registro gerado", async () => {
            const dadosParaCriar = { modelo: "Fit", cor: "Cinza", valor: 80000, ano: 2021 }

            const mockResultadoBanco = [{ id: 3, ...dadosParaCriar }]
            
            pool.query.mockResolvedValueOnce({ rows: mockResultadoBanco })

            const resultado = await carRepository.create(dadosParaCriar)
            
            expect(resultado).toHaveProperty('id', 3)
            expect(resultado.modelo).toBe("Fit")
            expect(resultado.cor).toBe("Cinza")
            expect(resultado.valor).toBe(80000)
            expect(resultado.ano).toBe(2021)
        })
    })
})

describe('CT-03 - método put', () => {
    beforeEach(() => {
        pool.query = jest.fn()
    })

    describe("Editando o carro", () => {
        
        test("Edita um objeto com sucesso e retorna o registro atualizado", async () => {
            const id = 1
            const dadosParaEditar = { modelo: "Civic Alterado", cor: "Azul", valor: 105000, ano: 2022 }

            const mockResultadoBanco = [{ id, ...dadosParaEditar }]
            
            pool.query.mockResolvedValueOnce({ rows: mockResultadoBanco })

            const resultado = await carRepository.put(dadosParaEditar, id)
            
            expect(resultado).toHaveProperty('id', 1)
            expect(resultado.modelo).toBe("Civic Alterado")
            expect(resultado.cor).toBe("Azul")
            expect(resultado.valor).toBe(105000)
            expect(resultado.ano).toBe(2022)
        })
    })
})

describe('CT-04 - método delete', () => {
    beforeEach(() => {
        pool.query = jest.fn()
    })

    describe("Excluindo o carro", () => {
        
        test("Exclui um carro com sucesso e retorna o registro excluído", async () => {
            const id = 1
            const carroExcluido = [{ id: 1, modelo: "Civic", cor: "Preto", valor: 100000, ano: 2022 }]

            pool.query.mockResolvedValueOnce({ rows: carroExcluido })

            const resultado = await carRepository.delete(id)
            
            expect(resultado).toHaveLength(1)
            expect(resultado[0]).toHaveProperty('id', 1)
            expect(resultado[0].modelo).toBe("Civic")
        })
    })
})
