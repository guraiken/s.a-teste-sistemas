import pool from "../../src/config/db.js"
import { carRepository } from "../../src/repositories/CarRepository.js" // 1. Adicionada a extensão .js aqui
import {describe, jest, test} from "@jest/globals"

describe('CT-01 - método get', () => {

    beforeEach(() => {
        pool.query = jest.fn()
    })

    // 2. Removido o 'async' do describe, ele deve ser síncrono
    describe("Todos os carros", () => {
        
        // 3. Criamos um bloco 'it' (ou 'test') assíncrono para rodar o teste de fato
        test("Retorna um array de carros", async () => {
            const todosUsuarios = [
                {id: 1, nome: "Teste", senha: "teste", cargo: "VENDAS"},
                {id: 2, nome: "Teste1", senha: "teste1", cargo: "ADMIN"}
            ]

            // Configura o mock antes de chamar a função
            pool.query.mockResolvedValueOnce({rows: todosUsuarios})

            // Executa o método do repositório
            const resultado = await carRepository.getAll()
            
            // Faz a checagem que você aprendeu!
            expect(Array.isArray(resultado)).toBe(true)
            expect(resultado.length).toBeGreaterThan(0)
        })
    })
    describe("Retorna um único carro", () => {
        test("Retorna um carro único", async() => {
             const usuarioUnico = [
                {id: 1, nome: "Teste", senha: "teste", cargo: "VENDAS"}
            ]

            const id = 1

            pool.query.mockResolvedValueOnce({rows: usuarioUnico})

            const resultado = await carRepository.getById(id)

            expect(Array.isArray(resultado)).toBe(true)
            expect(resultado).toHaveLength(1)
        })
    })
})

describe('CT-02 - método create', () => {
    beforeEach(() => {
        pool.query = jest.fn()
    })

    describe("Criando o carro", () => {
        
        test("Cria um objeto com sucesso e retorna o registro gerado", async () => {
            // 1. Dados que você envia para cadastrar (sem ID, pois o banco gera)
            const dadosParaCriar = { modelo: "Teste", cor: "teste", valor: 300, ano: "2020" }

            // 2. O que o banco de dados simula retornar (com o ID gerado dentro de 'rows')
            const mockResultadoBanco = [{ id: 1, ...dadosParaCriar }]
            
            // Correção aqui: envolvendo o retorno em { rows: ... }
            pool.query.mockResolvedValueOnce({ rows: mockResultadoBanco })

            // 3. Executa o método passando apenas os dados do novo registro
            const resultado = await carRepository.create(dadosParaCriar)
            
            expect(resultado).toHaveProperty('id', 1)
            expect(resultado.modelo).toBe("Teste")
            expect(resultado.cor).toBe("teste")
            expect(resultado.valor).toBe(300)
            expect(resultado.ano).toBe("2020")
        })
    })
})

describe('CT-03 - método put', () => {
    beforeEach(() => {
        pool.query = jest.fn()
    })

    describe("Editando o carro", () => {
        
        test("Cria um objeto com sucesso e retorna o registro gerado", async () => {
            // 1. Dados que você envia para cadastrar (sem ID, pois o banco gera)
            const dadosParaEditar = { modelo: "Teste", cor: "teste", valor: 300, ano: "2020" }

            // 2. O que o banco de dados simula retornar (com o ID gerado dentro de 'rows')
            const mockResultadoBanco = [{ id: 1, ...dadosParaEditar }]
            
            // Correção aqui: envolvendo o retorno em { rows: ... }
            pool.query.mockResolvedValueOnce({ rows: mockResultadoBanco })

            // 3. Executa o método passando apenas os dados do novo registro
            const resultado = await carRepository.put(dadosParaCriar)
            
            expect(resultado).toHaveProperty('id', 1)
            expect(resultado.modelo).toBe("Teste")
            expect(resultado.cor).toBe("teste")
            expect(resultado.valor).toBe(300)
            expect(resultado.ano).toBe("2020")
        })
    })
})

