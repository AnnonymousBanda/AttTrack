const { prisma } = require('../database')
const { catchAsync } = require('../utils/error.util')

const markAttendance = catchAsync(async (req, res) => {
    const { uid } = req.user
    const { course_code, lecture_date, start_time, end_time, status } = req.body

    if (!course_code || !lecture_date || !start_time || !end_time || !status)
        throw new AppError('Please provide all required fields', 400)

    if (!['present', 'absent', 'medical', 'cancelled'].includes(status))
        throw new AppError('Invalid status value', 400)

    const prismaOperations = []

    if (status !== 'cancelled') {
        const updateCounts = {}
        if (status === 'present') updateCounts.present_total = { increment: 1 }
        else if (status === 'absent') updateCounts.absent_total = { increment: 1 }
        else if (status === 'medical') updateCounts.medical_total = { increment: 1 }

        prismaOperations.push(
            prisma.course_attendance.update({
                where: {
                    user_id_course_code: {
                        user_id: uid,
                        course_code: course_code
                    }
                },
                data: updateCounts
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
            }
        })
    )

    await prisma.$transaction(prismaOperations)

    const all_logs = await prisma.attendance_logs.findMany({
        where: {
            user_id: uid,
            course_code: course_code,
            lecture_date: new Date(lecture_date)
        }
    })

    res.status(201).json({
        message: 'Daily attendance marked successfully!',
        status: 201,
        data: all_logs
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

	if(!course_code || present_total == null || absent_total == null || medical_total == null)
        throw new AppError('Please provide all required fields', 400)

	if(present_total < 0 || absent_total < 0 || medical_total < 0)
        throw new AppError('Attendance cannot be negative', 400)

	await prisma.course_attendance.update({
		where: {
            user_id_course_code: {
                user_id: uid,
                course_code: course_code
            }
        },
        data: {
            present_total: present_total,
            absent_total: absent_total,
            medical_total: medical_total
        }
    })

	res.status(200).json({
		message: 'Attendance totals adjusted successfully!',
		status: 200,
	})
})

const getAttendanceReport = catchAsync(async (req, res) => {
    const { uid, semester } = req.user;

    const data=await prisma.course_attendance.findMany({
        where: {
            user_id: uid,
			courses: {
            	semester: semester,
			}
        },
        include: {
            courses: true,
        },
    })

	res.status(200).json({
		message: 'Attendance report retrieved successfully!',
        status: 200,
		data: data
	})
})

const updateAttendanceLog = catchAsync(async (req, res) => {
    const { uid } = req.user
    const { attendance_log_id, new_status } = req.body

    if (!attendance_log_id || !new_status)
        throw new AppError('Please provide log ID and new status', 400)

    if (!['present', 'absent', 'medical', 'cancelled'].includes(new_status))
        throw new AppError('Invalid status value', 400)

    const oldLog = await prisma.attendance_logs.findUnique({
        where: { id: attendance_log_id },
    })

    if (!oldLog) throw new AppError('Attendance log not found', 404)
    
    if (oldLog.user_id !== uid) throw new AppError('Unauthorized access', 403)

    if (oldLog.status === 'cancelled')
        throw new AppError('Cannot update a lecture that has already been cancelled.', 400)

    if (oldLog.status === new_status)
		return res.status(200).json({
			message: 'Attendance already marked with the same status!',
			status: 200,
			data: oldLog
		})

    const updateCounts = {}
    if (oldLog.status === 'present') updateCounts.present_total = { decrement: 1 }
    else if (oldLog.status === 'absent') updateCounts.absent_total = { decrement: 1 }
    else if (oldLog.status === 'medical') updateCounts.medical_total = { decrement: 1 }
	
    if (new_status === 'present')
        updateCounts.present_total = { ...updateCounts.present_total, increment: 1 }
    else if (new_status === 'absent')
        updateCounts.absent_total = { ...updateCounts.absent_total, increment: 1 }
    else if (new_status === 'medical')
        updateCounts.medical_total = { ...updateCounts.medical_total, increment: 1 }

    const updatedLog = await prisma.$transaction(async (tx) => {
        if (Object.keys(updateCounts).length > 0) {
            await tx.course_attendance.update({
                where: {
                    user_id_course_code: {
                        user_id: uid,
                        course_code: oldLog.course_code
                    }
                },
                data: updateCounts
            })
        }
		
        return await tx.attendance_logs.update({
            where: { id: attendance_log_id },
            data: { status: new_status }
        })
    })

    res.status(200).json({
        message: 'Attendance updated successfully!',
        status: 200,
        data: updatedLog
    })
})

module.exports = {
	markAttendance,
	adjustAttendanceTotals,
	getAttendanceReport,
	updateAttendanceLog,
}
