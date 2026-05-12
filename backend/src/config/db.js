import {Pool} from "pg";
import { env } from "../env.js"

console.log("Tentando conectar com:", {
    host: env.host,
    user: env.user,
    database: env.database
});

const pool = new Pool({
    host: env.host,
    database: env.database,
    port: env.port,
    password: env.password,
    user: env.user,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60
})


export default pool