const { catchAsync, AppError } = require('../utils/error.util')

const getTodaySchedule = catchAsync(async (req, res) => {
    const { uid, semester } = req.user
    
    const user = await prisma.users.findUnique({
        where: {
            uid: uid
        }
    })

    if(!user)
		throw new AppError('User not found', 404)

    let { date } = req.query

    if(!date)
        date = new Date()
    date = new Date(date.toISOString().split('T')[0])

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const slot = await prisma.slots.findUnique({
        where: {
            day: days[date.getDay()]
        }
    })

    if(!slot)
		throw new AppError('Slot not found', 404)

    const lectures = await prisma.attendance_logs.findMany({
        where: {
            semester: semester,
            slot_id: slot.id,
            user_id: uid,
            lecture_date: date
        }
    })

	res.status(200).json({
		message: "Today's lecture schedule fetched successfully!",
		data: lectures,
	})
})

const addExtraClass = catchAsync(async (req, res) => {
    const { uid, semester } = req.user

    const user = await prisma.users.findUnique({
        where: {
            uid: uid
        }
    })

    if(!user)
        throw new AppError('User not found', 404)

    const { course_code, course_name, date, start_time, end_time } = req.body

    if(!course_code || !course_name || !date || !start_time || !end_time)
        throw new AppError('All fields are required', 400)

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const slot = await prisma.slots.findUnique({
        where: {
            day: days[date.getDay()]
        }
    })

    if(!slot)
        throw new AppError('Slot not found', 404)

    await prisma.attendance_logs.create({
        data: {
            user_id: uid,
            semester: semester,
            slot_id: slot.id,
            course_code: course_code,
            course_name: course_name,
            lecture_date: new Date(date),
        }
    })

	res.status(201).json({
		message: 'Extra class added successfully!',
        status: 201,
		data: {
            user_id: uid,
            semester: semester,
            slot_id: slot.id,
            course_code: course_code,
            course_name: course_name,
            lecture_date: new Date(date),
            start_time: start_time,
            end_time: end_time,
            status: null
        },
	})
})

module.exports = { getTodaySchedule, addExtraClass }
