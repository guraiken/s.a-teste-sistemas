import { userController } from "../../src/controllers/UserController.js"
import { userService } from "../../src/services/UserService.js"
import { describe, jest, test, expect, beforeEach } from "@jest/globals"

describe('UserController Tests', () => {
    let req, res

    beforeEach(() => {
        userService.logar = jest.fn()
        userService.getAll = jest.fn()
        userService.getById = jest.fn()
        userService.create = jest.fn()
        userService.edit = jest.fn()
        userService.delete = jest.fn()

        req = {
            params: {},
            body: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    describe('logar', () => {
        test('Deve retornar status 200 e tokens no login', async () => {
            const tokens = { tokenAcesso: 'access', tokenRefresh: 'refresh' }
            userService.logar.mockResolvedValue(tokens)

            await userController.logar(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                message: "Login realizado com sucesso!",
                data: tokens
            })
        })

        test('Deve retornar status 401 em erro de login', async () => {
            const error = new Error("Credenciais inválidas")
            userService.logar.mockRejectedValue(error)

            await userController.logar(req, res)

            expect(res.status).toHaveBeenCalledWith(401)
        })
    })

    describe('getAll', () => {
        test('Deve retornar status 200 e lista de usuários', async () => {
            const mockUsers = [{ id: 1, nome: 'João' }]
            userService.getAll.mockResolvedValue(mockUsers)

            await userController.getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                message: "Usuarios encontrados com sucesso!",
                data: mockUsers
            })
        })
    })

    describe('getById', () => {
        test('Deve retornar status 200 e o usuário', async () => {
            const mockUser = { id: 1, nome: 'João' }
            req.params.id = 1
            userService.getById.mockResolvedValue(mockUser)

            await userController.getById(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                data: mockUser,
                message: "Usuário encontrado com sucesso!"
            })
        })
    })

    describe('create', () => {
        test('Deve retornar status 201 e o novo usuário', async () => {
            const userData = { nome: 'João', email: 'joao@teste.com', senha: '123', cargo: 'ADMIN' }
            userService.create.mockResolvedValue({ id: 1, ...userData })

            req.body = userData
            await userController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
        })
    })

    describe('edit', () => {
        test('Deve retornar status 200 e o usuário editado', async () => {
            const id = 1
            const updateData = { nome: 'João Alterado' }
            req.params.id = id
            req.body = updateData
            userService.edit.mockResolvedValue({ id, ...updateData })

            await userController.edit(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    describe('delete', () => {
        test('Deve retornar status 200 ao deletar', async () => {
            const id = 1
            req.params.id = id
            userService.delete.mockResolvedValue([{ id }])

            await userController.delete(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
        })
    })
})
