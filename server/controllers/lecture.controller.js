const { catchAsync, AppError } = require('../utils/error.util')
const { prisma, redis } = require('../database')
const { createDateTime } = require('../utils/utils')

const getTodaySchedule = catchAsync(async (req, res, next) => {
    const combinedLectures = req['scheduledLectures'] || []

    const response = {
        message: 'Lectures fetched successfully!',
        status: 200,
        data: combinedLectures
    }

    await redis.set(req.cache.key, JSON.stringify(response), {
        EX: req.cache.exp,
        NX: true
    })

    res.status(200).json(response)
})

const addExtraClass = catchAsync(async (req, res) => {
    const { id, semester } = req.user
    const { course_code, lecture_date, start_time, end_time } = req.body

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
        throw new AppError('Start time must be before end time', 400)

    const old_logs = req.scheduledLectures.find((lecture) => {
        const existingStart = createDateTime(istDateStr, lecture.from);
        const existingEnd = createDateTime(istDateStr, lecture.to);

        return (
            existingStart < endDateTime &&
            existingEnd > startDateTime &&
            lecture.status !== "cancelled"
        );
    });

    if (old_logs)
        throw new AppError(
            'Lecture already exists for the given time range and date',
            400
        )

    await prisma.attendance_logs.create({
        data: {
            user_id: id,

            start_time: startDateTime,
            end_time: endDateTime,
            course_code: course_code,
            lecture_date: finalLectureDate,
        },
    })

    await redis.del(req.cache.key)
    await redis.del(`${req.cache.key}date=${lecture_date}`)

    console.log(`${req.cache.key}date=${lecture_date}`)

    res.status(201).json({
        message: 'Extra class added successfully!',
        status: 201,
        data: {
            user_id: id,

            semester: semester,
            course_code: course_code,
            lecture_date: finalLectureDate,
            start_time: startDateTime,
            end_time: endDateTime,
            status: null,
        },
    })
})

module.exports = { getTodaySchedule, addExtraClass }
