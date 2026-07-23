const { prisma } = require('../database')
const { catchAsync, AppError } = require('../utils/error.util')

const protect = catchAsync(async (req, res, next) => {
    const id = req.headers['x-user-id']

    if (!id) throw new AppError('Unauthorized Access', 401)

    const user = await prisma.users.findUnique({
        where: { id },
        select: { branch: true, semester: true },
    })
    if (!user) throw new AppError('User Not Found', 401)

    req.user = { id, ...user }
    next()
})

module.exports = { protect }
