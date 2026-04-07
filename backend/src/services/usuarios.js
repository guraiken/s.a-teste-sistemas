import pool from "../config/db.js"

class UsuariosServices {
    async getAll(){
        const [rows] = await pool.query("SELECT * FROM usuarios")
        if(rows.length === 0){
            return null
        }
        console.log("res service", rows);
        
        return rows
    }

    async getByID(id){
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id=?", [id])
        if(rows.length === 0) return null

        return rows
    }
    
    async create(data){
        const res = await pool.query("INSERT INTO usuarios (nome, senha, cargo) VALUES (?, ?, ?)", [data.nome, data.senha, data.cargo])
    }

}

export const usuariosServices = new UsuariosServices()