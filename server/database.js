const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const connectDB = async () => {
	const URI = process.env.DATABASE_URL

	try {
		await prisma.$connect()
        console.info(`[${new Date().toISOString()}] ✅ MySQL (Prisma) Connected`)
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
        console.warn(`[${new Date().toISOString()}] ⚠️ MySQL (Prisma) Disconnected`)
	} catch (error) {
		console.error(
			`[${new Date().toISOString()}] ❌ MongoDB Disconnection Error: ${error.message}`
		)
		process.exit(1)
	}
}

module.exports = { connectDB, disconnectDB, prisma }
