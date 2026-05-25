import { userService } from "../services/UserService.js";

class UserController {
    constructor(service) {
        this.service = userService
    }

    async logar(req, res) {
        try {
            const dadosUsuario = req.body
            const tokens = await this.service.logar(dadosUsuario)

            return res.status(200).json({
                message: "Login realizado com sucesso!",
                data: tokens
            })
        } catch (error) {
            return res.status(401).json({
                error,
                message: error.message
            })
        }
    }

    async getAll(req, res) {
        try {
            const users = await this.service.getAll()

            return res.status(200).json({
                message: "Usuarios encontrados com sucesso!",
                data: users
            })
        } catch (error) {
            return res.status(404).json({
                error,
                message: error.message
            })
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id

            const user = await this.service.getById(id)

            return res.status(200).json({
                data: user,
                message: "Usuário encontrado com sucesso!"
            })
        } catch (error) {
            return res.status(404).json({
                error,
                message: error.message
            })
        }
    }

    async create(req, res) {
        try {
            const userData = req.body

            const newUser = await this.service.create(userData)

            return res.status(201).json({
                data: newUser,
                message: "Usuário criado com sucesso!"
            })
        } catch (error) {
            return res.status(404).json({
                error,
                message: error.message
            })
        }
    }

    async edit(req, res) {
        try {
            const updatedData = req.body
            const id = req.params.id

            const updatedUser = await this.service.edit(id, updatedData)

            return res.status(200).json({
                data: updatedUser,
                message: "O usuário foi editado com sucesso!"
            })
        } catch (error) {
            return res.status(404).json({
                error,
                message: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id

            const deletedUser = await this.service.delete(id)

            return res.status(200).json({
                data: deletedUser,
                message: "O usuário foi excluído com sucesso"
            })
        } catch (error) {
            return res.status(404).json({
                error,
                message: error.message
            })
        }

    }
}

export const userController = new UserController(userService)