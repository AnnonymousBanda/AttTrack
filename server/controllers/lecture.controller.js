const { catchAsync } = require('../utils/error.util')

const getTodaySchedule = catchAsync(async (req, res) => {
	res.status(200).json({
		message: "Today's lecture schedule fetched successfully!",
		data: [],
	})
})

const addExtraClass = catchAsync(async (req, res) => {
	res.status(201).json({
		message: 'Extra class added successfully!',
		data: {},
	})
})

module.exports = { getTodaySchedule, addExtraClass }
