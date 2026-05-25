import express from "express"
import { carController } from "../controllers/CarController.js"
import { authMiddleware } from "../middlewares/auth.js"

export const carsRoute = express.Router()

carsRoute.get('/carros', authMiddleware, async (req, res) => {
    return carController.getAll(req, res)
})

carsRoute.get('/carros/:id', authMiddleware, async (req, res) => {
    return carController.getById(req, res)
})

carsRoute.put('/carros/:id', authMiddleware, async (req, res) => {
    return carController.edit(req, res)
})

carsRoute.delete('/carros/:id', authMiddleware, async (req, res) => {
    return carController.delete(req, res)
})

carsRoute.post('/carros', authMiddleware, async (req, res) => {
    return carController.create(req, res)
})