const { prisma, redis } = require('../database')
const { catchAsync, AppError } = require('../utils/error.util')
const { createDateTime } = require('../utils/date.utils')
const { cacheBuilder } = require('../utils/cache.utils')

const createAttendanceLog = catchAsync(async (req, res) => {
    const { id, semester } = req.user
    const { course_code, lecture_date, start_time, end_time, status } = req.body

    const course = await prisma.course_attendance.findFirst({
        where: {
            course_code: course_code,
            user_id: id,

        },
    })

    if (!course) throw new AppError('You are not enrolled in this course!', 404)

    const lectureDateObj = new Date(lecture_date)
    const istDateStr = lectureDateObj.toLocaleString('en-CA', { timeZone: 'Asia/Kolkata' }).split(',')[0]
    const finalLectureDate = new Date(istDateStr)

    const startDateTime = createDateTime(istDateStr, start_time)
    const endDateTime = createDateTime(istDateStr, end_time)

    if (startDateTime >= endDateTime)
        throw new AppError('Invalid class time', 400)

    const conflictsLog = await prisma.attendance_logs.findFirst({
        where: {
            user_id: id,

            lecture_date: finalLectureDate,
            AND: [
                {
                    start_time: {
                        lt: endDateTime,
                    },
                },
                {
                    end_time: {
                        gt: startDateTime,
                    },
                },
                {
                    status: {
                        not: 'cancelled'
                    }
                }
            ],
        },
    })
    if (conflictsLog)
        throw new AppError('Time is overlapping with an existing lecture', 400)

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
                        user_id: id,

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
                user_id: id,

                course_code: course_code,
                lecture_date: finalLectureDate,
                start_time: startDateTime,
                end_time: endDateTime,
                status: status,
            },
        })
    )

    await prisma.$transaction(prismaOperations)

    // const all_logs = await prisma.attendance_logs.findMany({
    //     where: {
    //         user_id: id,
    //         lecture_date: finalLectureDate,
    //         courses: {
    //             semester: semester,
    //         },
    //     },
    //     orderBy: {
    //         start_time: 'asc',
    //     },
    //     include: {
    //         courses: true,
    //     },
    // })

    const lectureKey = cacheBuilder.lectures(id, semester, lecture_date)
    const attendanceKey = cacheBuilder.attendance(id, semester)
    const attendanceByCourseKey = cacheBuilder.attendanceByCourseCode(id, course_code);
    await redis.del(lectureKey, attendanceKey, attendanceByCourseKey)

    console.log(lectureKey + " deleted lectures")
    console.log(attendanceKey + " deleted attendance")
    console.log(attendanceByCourseKey + " deleted attendance by course")

    res.status(201).json({
        message: 'Daily attendance marked successfully!',
        status: 201,
        // data: all_logs,
    })
})

const adjustAttendanceTotals = catchAsync(async (req, res) => {
    const { id, semester } = req.user
    const { course_code, present_total, absent_total, medical_total, total_classes } = req.body

    const existingRecord = await prisma.course_attendance.findUnique({
        where: {
            user_id_course_code: {
                user_id: id,

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
    if (total_classes !== undefined) updateData.total_classes = total_classes

    await prisma.course_attendance.update({
        where: {
            user_id_course_code: {
                user_id: id,

                course_code: course_code,
            },
        },
        data: updateData,
    })

    const attendanceKey = cacheBuilder.attendance(id, semester);
    const attendanceByCourseKey = cacheBuilder.attendanceByCourseCode(id, course_code);
    await redis.del(attendanceKey, attendanceByCourseKey);

    console.log(attendanceKey + " deleted attendance")
    console.log(attendanceByCourseKey + " deleted attendance by course")

    res.status(200).json({
        message: 'Attendance totals adjusted successfully!',
        status: 200,
    })
})

const getAttendanceReport = catchAsync(async (req, res) => {
    const { id, semester } = req.user
    const { course_code } = req.query

    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    })

    if (!user) throw new AppError('User not found!', 404)

    if (!course_code) {
        const key = cacheBuilder.attendance(id, semester)

        const cached = await getCached(key);
        if (cached)
            return res.json(cached);

        const allCourses = await prisma.course_attendance.findMany({
            where: {
                user_id: id,
                courses: {
                    semester: semester,
                },
            },
            include: {
                courses: true,
            },
        })

        const response = {
            message: 'Attendance report fetched successfully!',
            results: allCourses.length,
            data: allCourses,
        }

        await redis.set(key, JSON.stringify(response), {
            EX: process.env.TTL_CACHE * 3600,
            NX: true,
        })

        return res.status(200).json(response)
    }

    const course = user.courses.some(course => course.course_code === course_code)

    if (!course)
        throw new AppError('Course attendance record not found!', 404)

    const key = cacheBuilder.attendanceByCourseCode(id, course_code);

    const cached = await getCached(key);
    if (cached)
        return res.json(cached);

    const courseAttendance = await prisma.course_attendance.findUnique({
        where: {
            user_id_course_code: {
                user_id: id,

                course_code: course_code,
            },
        },
        include: {
            courses: true,
        },
    })

    const response = {
        status: 200,
        message: 'Attendance report fetched successfully!',
        data: courseAttendance,
    }

    await redis.set(key, JSON.stringify(response), {
        EX: process.env.TTL_CACHE * 3600,
        NX: true,
    })

    res.status(200).json(response)
})

const updateAttendanceStatus = catchAsync(async (req, res) => {
    const { id, semester } = req.user
    const { log_id, status } = req.body

    const log = await prisma.attendance_logs.findUnique({
        where: {
            id: log_id,
        },
    })

    if (!log) throw new AppError('Log not found!', 404)

    if (log.user_id !== id)
        throw new AppError('You are not authorized to update this log', 403)

    if (log.status === 'cancelled')
        throw new AppError("Can't update cancelled lecture", 400)

    const oldStatus = log.status
    const course_code = log.course_code

    const updateCounts = {}

    if (oldStatus === 'present')
        updateCounts.present_total = { decrement: 1 }
    else if (oldStatus === 'absent')
        updateCounts.absent_total = { decrement: 1 }
    else if (oldStatus === 'medical')
        updateCounts.medical_total = { decrement: 1 }

    if (status === 'present')
        updateCounts.present_total = { increment: 1 }
    else if (status === 'absent')
        updateCounts.absent_total = { increment: 1 }
    else if (status === 'medical')
        updateCounts.medical_total = { increment: 1 }

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
                        user_id: id,

                        course_code: course_code,
                    },
                },
                data: updateCounts,
            })
        }
    })

    // const lectures = await prisma.attendance_logs.findMany({
    //     where: {
    //         user_id: id,

    //         lecture_date: log.lecture_date,
    //         courses: {
    //             semester: semester,
    //         },
    //     },
    //     orderBy: {
    //         start_time: 'asc',
    //     },
    //     include: {
    //         courses: true,
    //     },
    // })

    const lectureKey = cacheBuilder.lectures(id, semester, log.lecture_date)
    const attendanceKey = cacheBuilder.attendance(id, semester)
    const attendanceByCourseKey = cacheBuilder.attendanceByCourseCode(id, course_code);
    await redis.del(lectureKey, attendanceKey, attendanceByCourseKey)

    console.log(lectureKey + " deleted lectures")
    console.log(attendanceKey + " deleted attendance")
    console.log(attendanceByCourseKey + " deleted attendance by course")

    res.status(200).json({
        message: 'Attendance status updated successfully!',
        status: 200,
        //data: lectures,
    })
})

module.exports = {
    createAttendanceLog,
    adjustAttendanceTotals,
    getAttendanceReport,
    updateAttendanceStatus,
}
