require('dotenv/config')
const { PrismaMariaDb } = require('@prisma/adapter-mariadb')
const { PrismaClient } = require('./generated/client.js')

const adapter = new PrismaMariaDb({
    connectionLimit: 5,
    connectionUrl: process.env.DATABASE_URL,
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
