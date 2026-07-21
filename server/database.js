require('dotenv/config')
const { PrismaMariaDb } = require('@prisma/adapter-mariadb')
const { PrismaClient } = require('./generated/client.js')

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
})

const prisma = new PrismaClient({ adapter })

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.info(
            `[${new Date().toISOString()}] ✅ MySQL (Prisma) Connected`
        )
    } catch (error) {
        console.error(
            `[${new Date().toISOString()}] ❌ MySQL Connection Error: ${error.message}`
        )
        process.exit(1)
    }
}

const disconnectDB = async () => {
    try {
        await prisma.$disconnect()
        console.warn(
            `[${new Date().toISOString()}] ⚠️ MySQL (Prisma) Disconnected`
        )
    } catch (error) {
        console.error(
            `[${new Date().toISOString()}] ❌ MySQL Disconnection Error: ${error.message}`
        )
        process.exit(1)
    }
}

module.exports = { connectDB, disconnectDB, prisma }
