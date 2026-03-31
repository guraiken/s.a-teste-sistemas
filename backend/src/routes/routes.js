import { Router } from "express";

const routes = Router()

routes.get('/usuarios', (req, res) => {
    console.log(data)
})

routes.post('/cadastro', async (req, res) => {
    const data = req.body
    
    res.status(201).json({
        data: data,
        message: "usuario criado com sucesso"
    })
})

export default routes