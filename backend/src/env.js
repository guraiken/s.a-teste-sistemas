import "dotenv/config"

export const env = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    user: process.env.USER
}
