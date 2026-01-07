const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { userRouter, lectureRouter, attendanceRouter } = require('./routes')
const {
	notFound,
	globalErrorHandler,
} = require('./controllers/error.controller')

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use('/api/user', userRouter)
app.use('/api/lectures', lectureRouter)
app.use('/api/attendance', attendanceRouter)

app.all('*', notFound)

app.use(globalErrorHandler)

module.exports = app
