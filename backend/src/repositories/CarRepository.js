import pool from "../config/db.js"
import { carUtils } from "../utils/car-utils.js"

class CarRepository {
    async getAll() {
        const result = await pool.query(carUtils.getAll())

        return result.rows
    }

    async getById(id) {
        const result = await pool.query(carUtils.getById(), [id])

        if (result.rows.length === 0) return []

        return result.rows
    }

    async create({ modelo, cor, valor, ano }) {
        const result = await pool.query(carUtils.create(), [modelo, cor, valor, ano])

        return result.rows[0]
    }

    async delete(id) {
        const result = await pool.query(carUtils.delete(),[id])

        if (result.rows.length === 0) return []

        return result.rows
    }

    async put({ modelo, cor, valor, ano }, id) {
        const result = await pool.query(carUtils.edit(), [modelo, cor, valor, ano, id])

        if (result.rows.length === 0) return []

        return result.rows[0]
    }
}

export const carRepository = new CarRepository()