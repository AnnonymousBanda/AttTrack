const { prisma } = require('../database')
const { catchAsync, AppError } = require('../utils/error.util')

const protect = catchAsync(async (req, res, next) => {
    const id = req.headers['x-user-id']

    if (!id) throw new AppError('Unauthorized Access', 401)

    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    })
    if (!user) throw new AppError('User not found!', 404)

    const courses = await prisma.course_attendance.findMany({
        where: {
            user_id: id,
        },
        include: {
            users: true,
            courses: true,
        }
    })

    const userCourses = []
    for (const c of courses) {
        if (c.users.semester === c.courses.semester)
            userCourses.push(c.courses)
    }

    req.user = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        branch: user.branch,
        batch: user.batch,
        image_url: user.image_url,
        roll_number: user.roll_number,
        semester: user.semester,
        courses: userCourses,
    }
    next()
})

module.exports = { protect }
