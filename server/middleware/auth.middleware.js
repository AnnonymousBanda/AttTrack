const { prisma } = require('../database')
const { catchAsync, AppError } = require('../utils/error.util')

const protect = catchAsync(async (req, res, next) => {
    const uid = '63172f97-fd11-412e-9801-987d594af3e8'//'2d544716-b58e-4daf-a605-d08907a5d479'//req.headers['x-user-id']

    if (!uid) throw new AppError('Unauthorized Access', 401)

    const user = await prisma.users.findUnique({
        where: { id: uid },
        select: { branch: true, semester: true },
    })
    if (!user) throw new AppError('User Not Found', 401)

    req.user = { id: uid, ...user }
    next()
})

module.exports = { protect }
