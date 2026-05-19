import express from "express"
import { userController } from "../controllers/UserController.js"

export const usersRoute = express.Router()

usersRoute.get('/usuarios', async (req, res) => {
    return userController.getAll(req, res)
})

usersRoute.get('/usuarios/:id', async (req, res) => {
    return userController.getById(req, res)
})

usersRoute.put('/usuarios/:id', async (req, res) => {
    return userController.edit(req, res)
})

usersRoute.delete('/usuarios/:id', async (req, res) => {
    return userController.delete(req, res)
})

usersRoute.post('/usuarios', async (req, res) => {
    return userController.create(req, res)
})