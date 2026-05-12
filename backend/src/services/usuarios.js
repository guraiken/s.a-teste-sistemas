import pool from "../config/db.js"

class UsuariosServices {
    async getAll() {
        const result = await pool.query("SELECT * FROM usuarios")

        if (result.rows.length === 0) {
            return []
        }

        console.log("res service", result.rows)
        return result.rows
    }

    async getByID(id) {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        )

        if (result.rows.length === 0) return []

        return result.rows
    }

    async create({ nome, senha, cargo }) {
        const result = await pool.query(
            "INSERT INTO usuarios (nome, senha, cargo) VALUES ($1, $2, $3) RETURNING *",
            [nome, senha, cargo]
        )

        return result.rows[0]
    }

    async delete(id) {
        const result = await pool.query(
            "DELETE FROM usuarios WHERE id = $1 RETURNING *",
            [id]
        )

        if (result.rows.length === 0) return []

        return result.rows
    }

    async put({ nome, senha, cargo }, id) {
        if (!id) {
            throw new Error("ID não fornecido")
        }

        const result = await pool.query(
            `UPDATE usuarios 
             SET nome = $1, senha = $2, cargo = $3 
             WHERE id = $4 
             RETURNING *`,
            [nome, senha, cargo, id]
        )

        if (result.rows.length === 0) return []

        return result.rows[0]
    }
}

export const usuariosServices = new UsuariosServices()