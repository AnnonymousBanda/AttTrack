const { catchAsync } = require('../utils/error.util')

const getUserData = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'User data retrieved successfully!',
	})
})

const registerUser = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'User registered successfully!',
	})
})

const deleteSemesterData = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'Semester data deleted successfully!',
	})
})

module.exports = { getUserData, registerUser, deleteSemesterData }
