import express from "express"
import { carrosService } from "../services/carros.js"

export const carrosRoute = express.Router()

carrosRoute.get('/', async (req, res) => {
    try {
        const carros = await carrosService.getAll()
        if(!carros){
            res.status(404).json("Não há nenhum usuário")
        } else {
            res.status(200).json(carros)
        }
    } catch (error) {
        console.error(error)
    }
})

carrosRoute.get('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const [result] = await carrosService.getByID(id)
        if(!result) return res.status(404).json("Não há nenhum carro com o id correspondente")
        else return res.status(200).json({data: result, message: "Carro encontrado com sucesso!"})

    } catch (error) {
        console.error(error)
        res.status(500).json("Erro de servidor")
    }
})

carrosRoute.post('/', async (req, res) => {
    try {
        const body = req.body
        const result = await carrosService.create(body)
        res.status(201).json({
            data: result,
            message: "Carro cadastrado com sucesso!"
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json("Erro interno do servidor")
    }
})

carrosRoute.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await carrosService.delete(id)
        if(result.length === 0){
            res.status(404).json("Não há carro para deletar")
        }else {
            res.status(200).json({
                data: result,
                message: "Carro deletado com sucesso!"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Erro de servidor")
    }
})

carrosRoute.put('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const {modelo, cor, valor, ano} = req.body
        
        if(!modelo || !cor || !valor || !ano){
            res.status(400).json("Por favor preencha todos os campos")
        } else {
            const [result] = await carrosService.put(modelo, cor, valor, ano, id)
            res.status(200).json({
                data: result,
                message: "Atualização dos dados do carro feita com sucesso!"
            })
        }
        
    } catch (error) {
        console.error("Não foi possível editar o carro", error)
    }
})