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

        if (result.rows.length === 0) return []

        return result.rows
    }

    async create({ nome, senha, cargo }) {
        const result = await pool.query(userUtils.create(), [nome, senha, cargo])

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