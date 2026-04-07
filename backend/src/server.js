import cors from "cors"
import express from "express"
import routes from "./routes/routes.js"
import pool from "./config/db.js"
import { usuariosRoute } from "./routes/usuarios.js"


const PORT = 3000

const app = express()
app.use(express.json())
app.use(cors())

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

app.use("/usuarios", usuariosRoute)

app.listen(PORT, ()=> {
    console.log("Rodando na porta: " + PORT)
})