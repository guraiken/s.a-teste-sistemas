import cors from "cors"
import express from "express"
import pool from "./config/db.js"
import { usuariosRoute } from "./routes/usuarios.js"
import { carrosRoute } from "./routes/carros.js"


const PORT = 3000

const app = express()
app.use(express.json())
app.use(cors())

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

app.use("/usuarios", usuariosRoute)
app.use("/usuarios", carrosRoute)

app.listen(PORT, ()=> {
    console.log("Rodando na porta: " + PORT)
})