import pool from "../config/db.js";
import express from "express"
import { usuariosServices } from "../services/usuarios.js";

export const usuariosRoute = express.Router()

usuariosRoute.get('/', async (req, res) => {
    try {
        const usuarios = await usuariosServices.getAll()
        if(!usuarios){
            res.status(404).json("Não há nenhum usuário")
        } else {
            res.status(200).json(usuarios)
        }
    } catch (error) {
        console.error(error)
    }
})

usuariosRoute.get('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const [result] = await usuariosServices.getByID(id)
        if(!result) return json.status(404).json("Não há nenhum usuário com o id correspondente")
        else return json.status(200).json({data: result, message: "Usuário encontrado com sucesso!"})

    } catch (error) {
        console.error(error)
        res.status(500).json("Erro de servidor")
    }
})

usuariosRoute.post('/', async (req, res) => {
    try {
        const body = req.body
        const result = await usuariosServices.create(body)
        res.status(201).json({
            data: result,
            message: "Usuário cadastrado com sucesso!"
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json("Erro interno do servidor")
    }
})

usuariosRoute.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await pool.query("DELETE FROM usuarios WHERE id=?", [id])
        if(result.length === 0){
            res.status(404).json("Não há usuário para deletar")
        }else {
            res.status(200).json({
                data: result,
                message: "Usuário deletado com sucesso!"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Erro de servidor")
    }
})

usuariosRoute.put('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const {nome, senha, cargo} = req.body

        if(!nome || !senha || !cargo){
            res.status(400).json("Por favor preencha todos os campos")
        } else {
            const [result] = await pool.query('UPDATE usuarios SET nome = ?, senha = ?, cargo = ? WHERE id = ?', [nome, senha, cargo, id])
            res.status(200).json({
                data: result,
                message: "Atualização de usuário feita com sucesso!"
            })
        }
        
    } catch (error) {
        console.error("Não foi possível editar o usuário", error)
    }
})