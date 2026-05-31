import { userService } from "../../src/services/UserService.js"
import { userRepository } from "../../src/repositories/UserRepository.js"
import { describe, jest, test, expect, beforeEach } from "@jest/globals"
import bcrypt from "bcrypt"

describe('UserService Tests', () => {

    beforeEach(() => {
        userRepository.getAll = jest.fn()
        userRepository.getById = jest.fn()
        userRepository.existeUsuario = jest.fn()
        userRepository.create = jest.fn()
        userRepository.put = jest.fn()
        userRepository.delete = jest.fn()
        userRepository.criarToken = jest.fn()
    })

    describe('getAll', () => {
        test('Deve retornar todos os usuários', async () => {
            const mockUsers = [{ id: 1, nome: 'João' }]
            userRepository.getAll.mockResolvedValue(mockUsers)

            const result = await userService.getAll()

            expect(result).toEqual(mockUsers)
        })

        test('Deve lançar erro quando não houver usuários', async () => {
            userRepository.getAll.mockResolvedValue([])

            await expect(userService.getAll()).rejects.toThrow("Nenhum usuário foi encontrado")
        })
    })

    describe('getById', () => {
        test('Deve retornar um usuário por ID', async () => {
            const mockUser = { id: 1, nome: 'João' }
            userRepository.getById.mockResolvedValue(mockUser)

            const result = await userService.getById(1)

            expect(result).toEqual(mockUser)
        })

        test('Deve lançar erro se o usuário não existir', async () => {
            userRepository.getById.mockResolvedValue(null)

            await expect(userService.getById(99)).rejects.toThrow("Não foi possível encontrar o usuário")
        })
    })

    describe('create', () => {
        test('Deve criar um usuário com sucesso', async () => {
            const userData = { nome: 'João', email: 'joao@teste.com', senha: '123', cargo: 'ADMIN' }
            const mockCreatedUser = { id: 1, ...userData, senha: 'hashed_password' }
            
            userRepository.create.mockResolvedValue(mockCreatedUser)

            const result = await userService.create(userData)

            expect(result).toEqual(mockCreatedUser)
            expect(userRepository.create).toHaveBeenCalled()
        })

        test('Deve lançar erro se faltar campos', async () => {
            await expect(userService.create({ nome: 'João' })).rejects.toThrow("Por favor preencha todos os campos")
        })
    })

    describe('edit', () => {
        test('Deve editar um usuário com sucesso', async () => {
            const id = 1
            const updateData = { nome: 'João Alterado', senha: '456', cargo: 'VENDAS' }
            userRepository.getById.mockResolvedValue({ id })
            userRepository.put.mockResolvedValue({ id, ...updateData })

            const result = await userService.edit(id, updateData)

            expect(result.nome).toBe('João Alterado')
        })
    })

    describe('delete', () => {
        test('Deve deletar um usuário com sucesso', async () => {
            const id = 1
            userRepository.getById.mockResolvedValue({ id })
            userRepository.delete.mockResolvedValue([{ id }])

            const result = await userService.delete(id)

            expect(result).toHaveLength(1)
        })
    })

    describe('logar', () => {
        test('Deve realizar login com sucesso', async () => {
            const loginData = { email: 'joao@teste.com', senha: '123' }
            const hashedPassword = await bcrypt.hash('123', 10)
            const mockUser = { id: 1, nome: 'João', email: 'joao@teste.com', senha: hashedPassword }

            userRepository.existeUsuario.mockResolvedValue(mockUser)
            userRepository.criarToken.mockResolvedValue({ id: 1 })

            const result = await userService.logar(loginData)

            expect(result).toHaveProperty('tokenAcesso')
            expect(result).toHaveProperty('tokenRefresh')
        })

        test('Deve lançar erro com credenciais inválidas', async () => {
            userRepository.existeUsuario.mockResolvedValue(null)

            await expect(userService.logar({ email: 'errado@teste.com', senha: '123' })).rejects.toThrow("Credenciais inválidas")
        })
    })
})
