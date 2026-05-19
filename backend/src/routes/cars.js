import express from "express"
import { carController } from "../controllers/CarController.js"

export const carsRoute = express.Router()

carsRoute.get('/carros', async (req, res) => {
    return carController.getAll(req, res)
})

carsRoute.get('/carros/:id', async (req, res) => {
    return carController.getById(req, res)
})

carsRoute.put('/carros/:id', async (req, res) => {
    return carController.edit(req, res)
})

carsRoute.delete('/carros/:id', async (req, res) => {
    return carController.delete(req, res)
})

carsRoute.post('/carros', async (req, res) => {
    return carController.create(req, res)
})