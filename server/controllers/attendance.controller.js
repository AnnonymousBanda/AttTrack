const { catchAsync } = require('../utils/error.util')

const markAttendance = catchAsync(async (req, res) => {
	res.status(201).json({
		message: 'Daily attendance marked successfully!',
		data: {},
	})
})

const adjustAttendanceTotals = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'Attendance totals adjusted successfully!',
		data: {},
	})
})

const getAttendanceReport = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'Attendance report retrieved successfully!',
		report: {},
	})
})

const updateAttendanceLog = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'Attendance log updated successfully!',
		data: {},
	})
})

module.exports = {
	markAttendance,
	adjustAttendanceTotals,
	getAttendanceReport,
	updateAttendanceLog,
}
