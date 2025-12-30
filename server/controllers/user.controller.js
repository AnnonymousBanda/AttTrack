const { catchAsync, AppError } = require('../utils/error.util')

const { prisma } = require('../database')

const getUserData = catchAsync(async (req, res) => {
	const { uid } = req.user

	const user = await prisma.users.findUnique({
		where: {
		uid: uid
		}
	})

	if(!user)
		throw new AppError('User not found', 404)

	res.status(200).json({
		message: 'Data fetched successfully!',
		status: 200, 
		data: {
			name: user.first_name + ' ' + user.last_name,
			...user
		}
	})
})

const registerUser = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'User registered successfully!',
	})
})

const deleteUserData = catchAsync(async (req, res) => {
	const { uid } = req.user

	const user = await prisma.users.findUnique({
		where: {
		uid: uid
		}
	})

	if(!user)
		throw new AppError('User not found', 404)

	await prisma.users.delete({
        where: {
            uid: req.user.uid
        }
    })

	res.status(200).json({
		message: 'Data deleted successfully!',
		status: 200,
	})
})

module.exports = { getUserData, registerUser, deleteUserData }
