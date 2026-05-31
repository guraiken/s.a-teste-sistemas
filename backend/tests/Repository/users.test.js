import pool from "../../src/config/db.js"
import { userRepository } from "../../src/repositories/UserRepository.js"
import { describe, jest, test, expect, beforeEach } from "@jest/globals"

describe('User Repository Tests', () => {

    beforeEach(() => {
        pool.query = jest.fn()
    })

    describe("getAll", () => {
        test("Retorna um array de usuários", async () => {
            const mockUsers = [
                { id: 1, nome: "João", email: "joao@teste.com", cargo: "ADMIN" },
                { id: 2, nome: "Maria", email: "maria@teste.com", cargo: "VENDAS" }
            ]

            pool.query.mockResolvedValueOnce({ rows: mockUsers })

            const result = await userRepository.getAll()
            
            expect(Array.isArray(result)).toBe(true)
            expect(result.length).toBe(2)
            expect(result[0].nome).toBe("João")
        })
    })

    describe("getById", () => {
        test("Retorna um único usuário por ID", async () => {
            const mockUser = { id: 1, nome: "João", email: "joao@teste.com", cargo: "ADMIN" }

            pool.query.mockResolvedValueOnce({ rows: [mockUser] })

            const result = await userRepository.getById(1)

            expect(result).toEqual(mockUser)
            expect(result.nome).toBe("João")
        })

        test("Retorna null quando usuário não existe", async () => {
            pool.query.mockResolvedValueOnce({ rows: [] })

            const result = await userRepository.getById(99)

            expect(result).toBeNull()
        })
    })

    describe("existeUsuario", () => {
        test("Retorna o usuário se o email existir", async () => {
            const mockUser = { id: 1, email: "joao@teste.com" }
            pool.query.mockResolvedValueOnce({ rows: [mockUser] })

            const result = await userRepository.existeUsuario("joao@teste.com")

            expect(result).toEqual(mockUser)
        })
    })

    describe("create", () => {
        test("Cria um usuário com sucesso", async () => {
            const userData = { nome: "Novo", email: "novo@teste.com", senha: "123", cargo: "VENDAS" }
            const mockCreatedUser = { id: 3, ...userData }

            pool.query.mockResolvedValueOnce({ rows: [mockCreatedUser] })

            const result = await userRepository.create(userData)
            
            expect(result).toHaveProperty('id', 3)
            expect(result.nome).toBe("Novo")
        })
    })

    describe("delete", () => {
        test("Deleta um usuário com sucesso", async () => {
            const id = 1
            const mockDeletedUser = [{ id: 1, nome: "João" }]

            pool.query.mockResolvedValueOnce({ rows: mockDeletedUser })

            const result = await userRepository.delete(id)
            
            expect(result).toHaveLength(1)
            expect(result[0].id).toBe(1)
        })
    })

    describe("put", () => {
        test("Edita um usuário com sucesso", async () => {
            const id = 1
            const updateData = { nome: "João Alterado", senha: "456", cargo: "ADMIN" }
            const mockUpdatedUser = { id, ...updateData }

            pool.query.mockResolvedValueOnce({ rows: [mockUpdatedUser] })

            const result = await userRepository.put(updateData, id)
            
            expect(result.nome).toBe("João Alterado")
        })
    })
})
