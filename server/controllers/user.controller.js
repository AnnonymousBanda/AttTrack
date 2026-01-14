const { catchAsync, AppError } = require('../utils/error.util')
const { prisma } = require('../database')

const BRANCHES = require('./../utils/branches')

const getUserData = catchAsync(async (req, res) => {
    const { id: uid } = req.user

    const user = await prisma.users.findUnique({
        where: {
            id: uid,
        },
    })

    if (!user) throw new AppError('User not found!', 404)

    res.status(200).json({
        message: 'User data fetched successfully!',
        status: 200,
        data: {
            user: user,
        },
    })
})

// Get user data from Microsoft Graph API and check if registered
const verifyUser = catchAsync(async (req, res) => {
    await getMicrosoftUserData(req, res)
    const data = req.microsoftUserData
    console.log('Microsoft User Data:', data)
    const oid = data.id

    const user = await prisma.users.findUnique({
        where: {
            oid: oid,
        },
    })

    if (!user) {
        res.status(404).json({
            message: 'User not registered!',
            status: 404,
            data: {
                oid: oid,
                displayName: data.displayName,
                mail: data.mail,
                jobTitle: data.jobTitle,
            },
        })
        return
    }

    res.status(200).json({
        message: 'User data fetched successfully!',
        status: 200,
        data: {
            user: user,
        },
    })
})

const getMicrosoftUserData = catchAsync(async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1]
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    if (!response.ok) {
        throw new AppError(
            'Failed to fetch user data from Microsoft Graph API',
            500
        )
    }

    const data = await response.json()

    req.microsoftUserData = data
})

const registerUser = catchAsync(async (req, res) => {
    let {
        oid,
        email,
        first_name,
        last_name,
        branch,
        batch,
        image_url,
        roll_number,
        semester,
    } = req.body

    const existingUser = await prisma.users.findUnique({
        where: {
            oid: oid,
        },
    })

    if (existingUser) throw new AppError('User already registered!', 400)

    email = email.toLowerCase()
    roll_number = roll_number.toLowerCase()

    const VALID_BRANCHES = BRANCHES.split('_')
    if (!VALID_BRANCHES.includes(branch))
        throw new AppError('Invalid branch provided', 400)

    if (!email.includes(roll_number))
        throw new AppError('Roll number does not match with email', 400)

    let user = null
    await prisma.$transaction(async (tx) => {
        user = await tx.users.create({
            data: {
                oid,
                email,
                first_name,
                last_name,
                branch,
                batch,
                image_url,
                roll_number,
                semester,
            },
        })

        const courses = await tx.courses.findMany({
            where: {
                branch: branch,
                semester: semester,
            },
        })

        if (courses.length === 0)
            throw new AppError(
                'No courses found for the given branch and semester',
                400
            )

        let data = courses.map((c) => ({
                user_id: user.id,
                course_code: c.course_code,
                total_lectures: c.course_code.endsWith('L') ? 10 : 42,
            }))

        await tx.course_attendance.createMany({
            data: data,
            skipDuplicates: true,
        })
    })

    res.status(201).json({
        status: 201,
        message: 'User registered successfully!',
        data: {
            user: user,
        },
    })
})

const deleteUserData = catchAsync(async (req, res) => {
    const { id: uid } = req.user

    const user = await prisma.users.findUnique({
        where: {
            id: uid,
        },
    })

    if (!user) throw new AppError('User not found!', 404, false)

    await prisma.users.delete({
        where: {
            id: uid,
        },
    })

    res.status(200).json({
        message: 'Data deleted successfully!',
        status: 200,
    })
})

const modifySemester = catchAsync(async (req, res) => {
    const { id: uid, semester, branch } = req.user
    const { new_semester } = req.body

    if (new_semester === semester)
        throw new AppError('Semester Updated Successfully', 200)

    const user = await prisma.users.findUnique({
        where: {
            id: uid,
        },
    })

    if (!user) throw new AppError('User not found!', 404)

    const coursesEnrolled = await prisma.course_attendance.findMany({
        where: {
            user_id: uid,
            courses: {
                semester: new_semester,
            },
        },
        include: {
            courses: true,
        },
    })

    if (coursesEnrolled.length > 0) {
        await prisma.users.update({
            where: {
                id: uid,
            },
            data: {
                semester: new_semester,
            },
        })

        throw new AppError('Semester updated successfully', 200)
    }

    await prisma.$transaction(async (tx) => {
        const courses = await tx.courses.findMany({
            where: {
                branch: branch,
                semester: new_semester,
            },
        })

        if (courses.length === 0)
            throw new AppError(
                'No courses found for the given branch and semester',
                400
            )

        const data = courses.map((c) => ({
            user_id: uid,
            course_code: c.course_code,
        }))

        await tx.course_attendance.createMany({
            data: data,
        })

        await tx.users.update({
            where: {
                id: uid,
            },
            data: {
                semester: new_semester,
            },
        })
    })

    res.status(200).json({
        message: 'Semester updated successfully!',
        status: 200,
    })
})

const resetSemester = catchAsync(async (req, res) => {
    const { id: uid, semester, branch } = req.user

    await prisma.$transaction(async (tx) => {
        const courses = await tx.courses.findMany({
            where: {
                branch: branch,
                semester: semester,
            },
        })

        if (courses.length === 0)
        {
            await tx.course_attendance.deleteMany({
                where: {
                    user_id: uid,
                    course_code: { in: courses.map((c) => c.course_code) },
                },
            })

            await tx.attendance_logs.deleteMany({
                where: {
                    user_id: uid,
                    course_code: { in: courses.map((c) => c.course_code) },
                },
            })
        }

        const data = courses.map((c) => ({
            user_id: uid,
            course_code: c.course_code,
        }))

        await tx.course_attendance.createMany({
            data: data,
        })

    })

    res.status(200).json({
        message: 'Semester reset successfully!',
        status: 200,
    })
})

const unenrollFromCourse = catchAsync(async (req, res) => {
    const { id: uid } = req.user
    const { course_code } = req.body

    await prisma.$transaction(async (tx) => {
        await tx.attendance_logs.deleteMany({
            where: {
                user_id: uid,
                course_code: course_code,
            },
        })

        await tx.course_attendance.delete({
            where: {
                user_id_course_code: {
                    user_id: uid,
                    course_code: course_code,
                },
            },
        })
    })

    res.status(200).json({
        message: 'Unenrolled from course successfully!',
        status: 200,
    })
})

module.exports = {
    getUserData,
    registerUser,
    deleteUserData,
    modifySemester,
    resetSemester,
    unenrollFromCourse,
    verifyUser,
}
