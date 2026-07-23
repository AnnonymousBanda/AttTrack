const { catchAsync, AppError } = require('../utils/error.util')
const { prisma } = require('../database')
const { createDateTime } = require('../utils/utils')

const getTodaySchedule = catchAsync(async (req, res, next) => {
    const DBLectures = req['DBLectures'] || []
    const SheetLectures = req['SheetLectures'] || []

    let combinedLectures = []

    for (const dblec of DBLectures) {
        if (dblec.status !== 'cancelled') {
            combinedLectures.push({
                ...dblec,
                from: dblec.start_time,
                to: dblec.end_time,
                courseCode: dblec.course_code
            })
        }
    }

    for (const slec of SheetLectures) {
        const existsInDB = DBLectures.find((item) => {
            return (
                item.start_time === slec.from &&
                item.end_time === slec.to &&
                item.course_code === slec.courseCode
            )
        })

        if (!existsInDB) {
            combinedLectures.push({
                ...slec,
                start_time: slec.from,
                end_time: slec.to,
                course_code: slec.courseCode
            })
        }
    }

    await getCourses(req, res, next)
    const userCourses = req.courses || []

    combinedLectures = combinedLectures.filter((lecture) => {
        return userCourses.some(
            (course) => course.course_code === lecture.courseCode
        )
    })

    combinedLectures.sort((a, b) => {
        const padTime = (timeStr) => timeStr.padStart(5, '0')
        return padTime(a.from).localeCompare(padTime(b.from))
    })

    res.status(200).json({
        message: 'Lectures fetched successfully!',
        status: 200,
        data: combinedLectures,
    })
})

const getCourses = catchAsync(async (req, res, next) => {
    const { id, semester } = req.user
    const courses = await prisma.course_attendance.findMany({
        where: {
            user_id: id,

        },
    })

    req.courses = courses
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

    const old_logs = await prisma.attendance_logs.findFirst({
        where: {
            user_id: id,

            lecture_date: finalLectureDate,
            start_time: {
                lt: endDateTime,
            },
            end_time: {
                gt: startDateTime,
            },
            status: { not: 'cancelled' },
        },
        include: {
            courses: true,
        },
    })

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
