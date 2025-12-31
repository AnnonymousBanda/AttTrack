const { catchAsync, AppError } = require('../utils/error.util')
const { prisma } = require('../database')

const getTodaySchedule = catchAsync(async (req, res) => {
    const { uid, semester } = req.user

    let dateInput = req.query.date ? new Date(req.query.date) : new Date()
    const dateString = dateInput.toISOString().split('T')[0]
    const searchDate = new Date(dateString)

    const lectures = await prisma.attendance_logs.findMany({
        where: {
            user_id: uid,
            semester: semester,
            lecture_date: searchDate
        },
        include: {
            time_slots: true,
            courses: true
        }
    })

    res.status(200).json({
        message: "Lectures fetched successfully!",
        results: lectures.length,
        data: lectures
    })
})

const addExtraClass = catchAsync(async (req, res) => {
    const { uid, semester } = req.user
    const { course_code, date, start_time, end_time } = req.body

    if(!course_code || !date || !start_time || !end_time)
        throw new AppError('Please provide all required fields', 400)

    const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']

    const slot = await prisma.time_slots.findFirst({
        where: {
            day_of_week: days[new Date(date).getDay()],
            start_time: start_time,
            end_time: end_time
        }
    })

    if(!slot)
        throw new AppError('Slot not found!', 404, false)

    const course = await prisma.courses.findFirst({
        where: {
            course_code: course_code,
            semester: semester
        }
    })

    if(!course)
        throw new AppError('Course not found!', 404)

    await prisma.attendance_logs.create({
        data: {
            user_id: uid,
            semester: semester,
            slot_id: slot.id,
            course_code: course_code,
            lecture_date: new Date(date)
        }
    })

    res.status(201).json({
        message: 'Extra class added successfully!',
        status: 201,
        data: {
            user_id: uid,
            semester: semester,
            course_code: course_code,
            lecture_date: new Date(date),
            start_time: start_time,
            end_time: end_time,
            status: null
        }
    })
})

module.exports = { getTodaySchedule, addExtraClass }
