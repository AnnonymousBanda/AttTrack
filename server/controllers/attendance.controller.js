const { prisma } = require('../database')
const { catchAsync, AppError } = require('../utils/error.util')

const createAttendanceLog = catchAsync(async (req, res) => {
    const { uid } = req.user
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
                lecture_date: new Date(lecture_date),
                start_time: new Date(`${lecture_date}T${start_time}`),
                end_time: new Date(`${lecture_date}T${end_time}`),
                status: status,
            },
        })
    )

    await prisma.$transaction(prismaOperations)

    const all_logs = await prisma.attendance_logs.findMany({
        where: {
            user_id: uid,
            course_code: course_code,
            lecture_date: new Date(lecture_date),
        },
    })

    res.status(201).json({
        message: 'Daily attendance marked successfully!',
        status: 201,
        data: all_logs,
    })
})

// const markAttendance = catchAsync(async (req, res) => {
//     const { uid, semester } = req.user
//     const { course_code, lecture_date, start_time, end_time, status } = req.body

//     // --- Validation ---
//     if (!course_code || !lecture_date || !start_time || !end_time || !status)
//         throw new AppError('Please provide all required fields', 400)

//     if (!['present', 'absent', 'medical', 'cancelled'].includes(status))
//         throw new AppError('Invalid status value', 400)

//     // --- The Interactive Transaction ---
//     const result = await prisma.$transaction(async (tx) => {

//         // 1. READ: Get current stats inside the transaction
//         // We use 'findUnique' on the composite unique key for better performance
//         const course_attendance = await tx.course_attendance.findUnique({
//             where: {
//                 user_id_course_code: {
//                     user_id: uid,
//                     course_code: course_code
//                 }
//             }
//         })

//         if (!course_attendance) {
//             throw new AppError('Course not found!', 404)
//         }

//         // 2. LOGIC: Calculate new values (Read-Modify-Write)
//         // We do NOT touch 'total_classes' as per your instruction
//         let newPresent = course_attendance.present_total
//         let newAbsent = course_attendance.absent_total
//         let newMedical = course_attendance.medical_total

//         if (status === 'present') newPresent += 1
//         else if (status === 'absent') newAbsent += 1
//         else if (status === 'medical') newMedical += 1
//         // If 'cancelled', we just log it but don't change any totals

//         // 3. WRITE: Update the course summary
//         await tx.course_attendance.update({
//             where: {
//                 user_id_course_code: {
//                     user_id: uid,
//                     course_code: course_code
//                 }
//             },
//             data: {
//                 present_total: newPresent,
//                 absent_total: newAbsent,
//                 medical_total: newMedical
//             }
//         })

//         // 4. WRITE: Create the daily log
//         const newLog = await tx.attendance_logs.create({
//             data: {
//                 user_id: uid,
//                 course_code: course_code,
//                 semester: semester,
//                 lecture_date: new Date(lecture_date),
//                 start_time: new Date(`${lecture_date}T${start_time}`),
//                 end_time: new Date(`${lecture_date}T${end_time}`),
//                 status: status
//             }
//         })

//         // 5. READ: Fetch updated logs list to return to user
//         // Doing this inside the transaction guarantees we see the data exactly as currently written
//         const all_logs_today = await tx.attendance_logs.findMany({
//             where: {
//                 user_id: uid,
//                 semester: semester,
//                 lecture_date: new Date(lecture_date)
//             }
//         })

//         return all_logs_today
//     })

//     // --- Response ---
//     res.status(201).json({
//         message: 'Daily attendance marked successfully!',
//         status: 201,
//         data: result // 'result' is whatever we returned from the transaction block
//     })
// })

const adjustAttendanceTotals = catchAsync(async (req, res) => {
    const { uid } = req.user
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
    const { uid } = req.user
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
    const { uid } = req.user
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
