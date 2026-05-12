import pool from "../config/db.js"

class carrosServices {
    async getAll() {
        const result = await pool.query("SELECT * FROM carros")

        if (result.rows.length === 0) {
            return []
        }

        console.log("res service", result.rows)
        return result.rows
    }

    async getByID(id) {
        const result = await pool.query(
            "SELECT * FROM carros WHERE id = $1",
            [id]
        )

        if (result.rows.length === 0) return []

        return result.rows
    }

    async create({ modelo, cor, valor, ano }) {
        const result = await pool.query(
            "INSERT INTO carros (modelo, cor, valor, ano) VALUES ($1, $2, $3, $4) RETURNING *",
            [modelo, cor, valor, ano]
        )

        return result.rows[0]
    }

    async delete(id) {
        const result = await pool.query(
            "DELETE FROM carros WHERE id = $1 RETURNING *",
            [id]
        )

        if (result.rows.length === 0) return []

        return result.rows
    }

    async put({ modelo, cor, valor, ano }, id) {
        if (!id) {
            throw new Error("ID não fornecido")
        }

        const result = await pool.query(
            `UPDATE carros 
             SET modelo = $1, cor = $2, valor = $3, ano = $4 
             WHERE id = $5 
             RETURNING *`,
            [modelo, cor, valor, ano, id]
        )

        if (result.rows.length === 0) return []

        return result.rows[0]
    }
}

export const carrosService = new carrosServices()