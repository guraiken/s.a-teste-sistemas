import pool from "../config/db.js"
import { userUtils } from "../utils/user-utils.js"

class UserRepository {
    async getAll() {
        const result = await pool.query(userUtils.getAll())

        if (result.rows.length === 0) {
            return []
        }

        return result.rows
    }

    async getByID(id) {
        const result = await pool.query(userUtils.getById(), [id])

        if (result.rows.length === 0) return null

        return result.rows[0]
    }

    async existeUsuario(email) {
        const result = await pool.query(userUtils.existeUsuario(), [email])
        return result.rows[0]
    }

    async create({ nome, email, senha, cargo }) {
        const result = await pool.query(userUtils.create(), [nome, email, senha, cargo])

        return result.rows[0]
    }

    async criarToken({ token, expiresAt, type, usuarioId }) {
        const result = await pool.query(userUtils.criarToken(), [token, expiresAt, type, usuarioId])
        return result.rows[0]
    }

    async delete(id) {
        const result = await pool.query(userUtils.delete(),[id])

        if (result.rows.length === 0) return []

        return result.rows
    }

    async put({ nome, senha, cargo }, id) {
        const result = await pool.query(userUtils.edit(),[nome, senha, cargo, id])

        if (result.rows.length === 0) return []

        return result.rows[0]
    }
}

export const userRepository = new UserRepository()