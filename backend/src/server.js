import cors from "cors"
import express from "express"
import pool from "./config/db.js"
import { usersRoute } from "./routes/usuarios.js"
import { carsRoute } from "./routes/cars.js"


const PORT = 3000

const app = express()
app.use(express.json())
app.use(cors())

app.use(usersRoute)
app.use(carsRoute)

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

app.listen(PORT, ()=> {
    console.log("Rodando na porta: " + PORT)
})