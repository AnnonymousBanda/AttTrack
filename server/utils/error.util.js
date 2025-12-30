const { disconnectDB } = require('../database')

class AppError extends Error {
	constructor(message, status) {
		super(message)
		this.status = status
		this.isOperational = true

		Error.captureStackTrace(this, this.constructor)
	}
}

const uncaughtException = () => {
	process.on('uncaughtException', async (err) => {
		console.log('UNCAUGHT EXCEPTION! Shutting down...')
		console.log(err.name + '! ' + err.message)

		if (process.env.NODE_ENV !== 'test') console.error(err)

		await disconnectDB()
		process.exit(1)
	})
}

const unhandledRejection = (server) => {
	process.on('unhandledRejection', async (err) => {
		console.log(err.name + '! ' + err.message)
		console.log('UNHANDLED REJECTION! Shutting down...')

		if (process.env.NODE_ENV !== 'test') console.error(err)

		await disconnectDB()
		server.close(() => {
			process.exit(1)
		})
	})
}

const gracefulShutdown = async (server) => {
	process.on('SIGINT', async () => {
    console.log('👋 SIGINT RECEIVED. Shutting down gracefully');
	await disconnectDB();

	server.close(() => {
		console.log('💥 Process terminated!')
		process.exit(0)
		})
	})
};

const catchAsync = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = { AppError, unhandledRejection, uncaughtException, gracefulShutdown, catchAsync }
