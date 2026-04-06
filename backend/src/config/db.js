import { createPool } from "mysql2/promise.js"
import { env } from "../env.js"

const pool = createPool({
    host: env.host,
    database: env.database,
    port: env.port,
    password: env.password,
    user: env.user,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

export default pool