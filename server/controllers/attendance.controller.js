const { prisma } = require('../database')
const { catchAsync, AppError } = require('../utils/error.util')

const createAttendanceLog = catchAsync(async (req, res) => {
    const { id: uid } = req.user
    const { course_code, lecture_date, start_time, end_time, status } = req.body

    const prismaOperations = []

    if (status !== 'cancelled') {
        const updateCounts = {}
        if (status === 'present') updateCounts.present_total = { increment: 1 }
        else if (status === 'absent')
            updateCounts.absent_total = { increment: 1 }
        else if (status === 'medical')
            updateCounts.medical_total = { increment: 1 }

        prismaOperations.push(
            prisma.course_attendance.update({
                where: {
                    user_id_course_code: {
                        user_id: uid,
                        course_code: course_code,
                    },
                },
                data: updateCounts,
            })
        )
    }

    prismaOperations.push(
        prisma.attendance_logs.create({
            data: {
                user_id: uid,
                course_code: course_code,
                lecture_date: lecture_date,
                start_time: start_time,
                end_time: end_time,
                status: status,
            },
        })
    )

    await prisma.$transaction(prismaOperations)

    const all_logs = await prisma.attendance_logs.findMany({
        where: {
            user_id: uid,
            course_code: course_code,
            lecture_date: lecture_date,
        },
    })

    res.status(201).json({
        message: 'Daily attendance marked successfully!',
        status: 201,
        data: all_logs,
    })
})

const adjustAttendanceTotals = catchAsync(async (req, res) => {
    const { id: uid } = req.user
    const { course_code, present_total, absent_total, medical_total } = req.body

    const existingRecord = await prisma.course_attendance.findUnique({
        where: {
            user_id_course_code: {
                user_id: uid,
                course_code: course_code,
            },
        },
    })

    if (!existingRecord)
        throw new AppError('Course attendance record not found!', 404)

    const updateData = {}
    if (present_total !== undefined) updateData.present_total = present_total
    if (absent_total !== undefined) updateData.absent_total = absent_total
    if (medical_total !== undefined) updateData.medical_total = medical_total

    await prisma.course_attendance.update({
        where: {
            user_id_course_code: {
                user_id: uid,
                course_code: course_code,
            },
        },
        data: updateData,
    })

    res.status(200).json({
        message: 'Attendance totals adjusted successfully!',
        status: 200,
    })
})

const getAttendanceReport = catchAsync(async (req, res) => {
    const { id: uid } = req.user
    const { course_code } = req.query

    const user = await prisma.users.findUnique({
        where: {
            id: uid,
        },
    })

    if (!user) throw new AppError('User not found!', 404)

    if (!course_code) {
        const allCourses = await prisma.course_attendance.findMany({
            where: {
                user_id: uid,
            },
            include: {
                courses: true,
            },
        })

        return res.status(200).json({
            message: 'Attendance report fetched successfully!',
            results: allCourses.length,
            data: allCourses,
        })
    }

    const courseAttendance = await prisma.course_attendance.findUnique({
        where: {
            user_id_course_code: {
                user_id: uid,
                course_code: course_code,
            },
        },
        include: {
            courses: true,
            attendance_logs: {
                orderBy: {
                    lecture_date: 'desc',
                },
            },
        },
    })

    if (!courseAttendance)
        throw new AppError('Course attendance record not found!', 404)

    res.status(200).json({
        status: 200,
        message: 'Attendance report fetched successfully!',
        data: courseAttendance,
    })
})

const updateAttendanceStatus = catchAsync(async (req, res) => {
    const { id: uid } = req.user
    const { log_id, status } = req.body

    const log = await prisma.attendance_logs.findUnique({
        where: {
            id: log_id,
        },
    })

    if (!log) throw new AppError('Log not found!', 404)

    if (log.user_id !== uid)
        throw new AppError('You are not authorized to update this log', 403)

    const oldStatus = log.status
    const course_code = log.course_code

    const updateCounts = {}

    if (oldStatus && oldStatus !== 'cancelled') {
        if (oldStatus === 'present')
            updateCounts.present_total = { decrement: 1 }
        else if (oldStatus === 'absent')
            updateCounts.absent_total = { decrement: 1 }
        else if (oldStatus === 'medical')
            updateCounts.medical_total = { decrement: 1 }
    }

    if (status !== 'cancelled') {
        if (status === 'present') updateCounts.present_total = { increment: 1 }
        else if (status === 'absent')
            updateCounts.absent_total = { increment: 1 }
        else if (status === 'medical')
            updateCounts.medical_total = { increment: 1 }
    }

    await prisma.$transaction(async (tx) => {
        await tx.attendance_logs.update({
            where: {
                id: log_id,
            },
            data: {
                status: status,
            },
        })

        if (Object.keys(updateCounts).length > 0) {
            await tx.course_attendance.update({
                where: {
                    user_id_course_code: {
                        user_id: uid,
                        course_code: course_code,
                    },
                },
                data: updateCounts,
            })
        }
    })

    res.status(200).json({
        message: 'Attendance status updated successfully!',
        status: 200,
    })
})

module.exports = {
    createAttendanceLog,
    adjustAttendanceTotals,
    getAttendanceReport,
    updateAttendanceStatus,
}
