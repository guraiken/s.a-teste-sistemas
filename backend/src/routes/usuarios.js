import express from "express"
import { usuariosServices } from "../services/usuarios.js";

export const usuariosRoute = express.Router()

usuariosRoute.get('/', async (req, res) => {
    try {
        const usuarios = await usuariosServices.getAll()
        if(!usuarios){
            return res.status(404).json("Não há nenhum usuário")
        } else {
            return res.status(200).json(usuarios)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json("Erro de servidor")
    }
})

usuariosRoute.get('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const [result] = await usuariosServices.getByID(id)
        if(!result) return res.status(404).json("Não há nenhum usuário com o id correspondente")
        else return res.status(200).json({data: result, message: "Usuário encontrado com sucesso!"})

    } catch (error) {
        console.error(error)
        return res.status(500).json("Erro de servidor")
    }
})

usuariosRoute.post('/', async (req, res) => {
    try {
        const body = req.body
        const result = await usuariosServices.create(body)
        return res.status(201).json({
            data: result,
            message: "Usuário cadastrado com sucesso!"
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json("Erro interno do servidor")
    }
})

usuariosRoute.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await usuariosServices.delete(id)
        if(result.length === 0){
            return res.status(404).json("Não há usuário para deletar")
        }else {
            return res.status(200).json({
                data: result,
                message: "Usuário deletado com sucesso!"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json("Erro de servidor")
    }
})

usuariosRoute.put('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const {nome, senha, cargo} = req.body
        
        if(!nome || !senha || !cargo){
            return res.status(400).json("Por favor preencha todos os campos")
        } else {
            const [result] = await usuariosServices.put({nome, senha, cargo}, id)
            return res.status(200).json({
                data: result,
                message: "Usuário atualizado com sucesso!"
            })
        }
        
    } catch (error) {
        console.error("Não foi possível editar o usuário", error)
        return res.status(500).json("Erro de servidor")
    }
})