require('dotenv/config')
const { PrismaMariaDb } = require('@prisma/adapter-mariadb')
const { PrismaClient } = require('./generated/client.js')

const { createClient } = require("redis")

const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    database: Number(process.env.REDIS_DB),
})
    .on("error", (err) => {
        console.error(
            `[${new Date().toISOString()}] Redis Error:`,
            err
        );
    });

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

        if (!redis.isOpen) {
            await redis.connect()
            console.info(
                `[${new Date().toISOString()}] ✅ Redis Connected`
            )
        }
        else
            console.info(
                `[${new Date().toISOString()}] 🟡 Redis Already Connected`
            )
    } catch (error) {
        console.error(
            `[${new Date().toISOString()}] ❌ Database Connection Error: ${error.message}`
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

        await redis.close()
        console.warn(
            `[${new Date().toISOString()}] ⚠️ Redis Disconnected`
        )
    } catch (error) {
        console.error(
            `[${new Date().toISOString()}] ❌ Database Disconnection Error: ${error.message}`
        )
        process.exit(1)
    }
}

module.exports = { connectDB, disconnectDB, prisma, redis }
