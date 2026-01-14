const { catchAsync, AppError } = require('../utils/error.util')
const { prisma } = require('../database')

const getTodaySchedule = catchAsync(async (req, res, next) => {
    const { uid, semester } = req.user
    const DBLectures = req['DBLectures'] || []
    const SheetLectures = req['SheetLectures'] || []

    let combinedLectures = []

    for (const dblec of DBLectures) {
        const startTimeStr = dblec.start_time
        const endTimeStr = dblec.end_time
        const course_code = dblec.course_code

        const sheetlec = SheetLectures.find((slec) => {
            return (
                slec.from === startTimeStr &&
                slec.to === endTimeStr &&
                slec.courseCode === course_code
            )
        })

        if (sheetlec && dblec.status !== 'cancelled') {
            combinedLectures.push({
                ...dblec,
            })
        } else if (!sheetlec && dblec.status !== 'cancelled') {
            combinedLectures.push({
                ...dblec,
            })
        } else if (dblec.status !== 'cancelled') {
            combinedLectures.push({
                ...dblec,
            })
        }
    }

    for (const slec of SheetLectures) {
        const existsInDB = DBLectures.find((item) => {
            return (
                item.from === slec.from &&
                item.to === slec.to &&
                item.course_code === slec.course_code
            )
        })

        if (!existsInDB) {
            combinedLectures.push({ ...slec })
        }
    }

    await getCourses(req, res, next)
    const userCourses = req.courses || []
    console.log(combinedLectures)

    combinedLectures = combinedLectures.filter((lecture) => {
        return userCourses.some((course => course.course_code === lecture.courseCode))
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
    const { id:uid, semester } = req.user
    const courses = await prisma.course_attendance.findMany({
        where: {
            user_id: uid,
        },
    })

    req.courses = courses
})

const addExtraClass = catchAsync(async (req, res) => {
    const { uid, semester } = req.user
    const { course_code, lecture_date, start_time, end_time } = req.body

    const course = await prisma.course_attendance.findFirst({
        where: {
            course_code: course_code,
            user_id: uid,
        },
    })

    if (!course) throw new AppError('Course not found!', 404)

    const startDateTime = createDateTime(lecture_date, start_time)
    const endDateTime = createDateTime(lecture_date, end_time)

    if (startDateTime >= endDateTime)
        throw new AppError('Start time must be before end time', 400)

    const old_logs = await prisma.attendance_logs.findMany({
        where: {
            user_id: uid,
            lecture_date: new Date(lecture_date),
            start_time: {
                lt: endDateTime,
            },
            end_time: {
                gt: startDateTime,
            },
        },
        include: {
            courses: true,
        },
    })

    if (old_logs.length > 0)
        throw new AppError(
            'Lecture already exists for the given time range and date',
            400
        )

    await prisma.attendance_logs.create({
        data: {
            user_id: uid,
            start_time: startDateTime,
            end_time: endDateTime,
            course_code: course_code,
            lecture_date: new Date(lecture_date),
        },
    })

    res.status(201).json({
        message: 'Extra class added successfully!',
        status: 201,
        data: {
            user_id: uid,
            semester: semester,
            course_code: course_code,
            lecture_date: new Date(lecture_date),
            start_time: startDateTime,
            end_time: endDateTime,
            status: null,
        },
    })
})

const createDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr)
    const [hours, minutes] = timeStr.split(':').map(Number)

    const combined = new Date(date)
    combined.setHours(hours, minutes, 0, 0)
    return combined
}

module.exports = { getTodaySchedule, addExtraClass }
