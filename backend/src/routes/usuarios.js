import express from "express"
import { userController } from "../controllers/UserController.js"
import { authMiddleware } from "../middlewares/auth.js"

export const usersRoute = express.Router()

usersRoute.post('/login', async (req, res) => {
    return userController.logar(req, res)
})

usersRoute.get('/usuarios', authMiddleware, async (req, res) => {
    return userController.getAll(req, res)
})

usersRoute.get('/usuarios/:id', authMiddleware, async (req, res) => {
    return userController.getById(req, res)
})

usersRoute.put('/usuarios/:id', authMiddleware, async (req, res) => {
    return userController.edit(req, res)
})

usersRoute.delete('/usuarios/:id', authMiddleware, async (req, res) => {
    return userController.delete(req, res)
})

usersRoute.post('/usuarios', async (req, res) => {
    return userController.create(req, res)
})