const { prisma } = require('../database')
const { catchAsync, AppError } = require('../utils/error.util')

const cellrange = {
    1: 'A, B, C, D, E, F, G, H, I, J, K, L, M',
    2: 'O, P, Q, R, S, T, U, V, W, X, Y, Z, AA',
    3: 'AC, AD, AE, AF, AG, AH, AI, AJ, AK, AL, AM, AN, AO',
    4: 'AQ, AR, AS, AT, AU, AV, AW, AX, AY, AZ, BA, BB, BC',
    5: 'BE, BF, BG, BH, BI, BJ, BK, BL, BM, BN, BO, BP, BQ',
    6: 'BS, BT, BU, BV, BW, BX, BY, BZ, CA, CB, CC, CD, CE',
    7: 'CG, CH, CI, CJ, CK, CL, CM, CN, CO, CP, CQ, CR, CS',
    8: 'CU, CV, CW, CX, CY, CZ, DA, DB, DC, DD, DE, DF, DG',
}

const getDBLectures = catchAsync(async (req, res, next) => {
    const { uid, semester } = req.user

    let dateInput = req.query.date ? new Date(req.query.date) : new Date()
    const dateString = dateInput.toISOString().split('T')[0]
    const searchDate = new Date(dateString)

    const lectures = await prisma.attendance_logs.findMany({
        where: {
            user_id: uid,
            lecture_date: searchDate,
            courses: {
                semester: semester,
            },
        },
        include: {
            courses: true,
        },
        orderBy: {
            start_time: 'asc',
        },
    })

    const formatTime = (date) =>
        date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })

    const formattedLectures = lectures.map((lecture) => ({
        courseCode: lecture.courses.course_code,
        courseName: lecture.courses.course_name,
        from: formatTime(lecture.start_time),
        to: formatTime(lecture.end_time),
        status: lecture.status,
    }))
    
    req['DBLectures'] = formattedLectures
    next()
})

const getSheetLectures = catchAsync(async (req, res, next) => {
    const { semester, branch } = req.user

    let dateInput = req.query.date ? new Date(req.query.date) : new Date()
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    const dayNamesMap = {
        Sunday: 'sun',
        Monday: 'mon',
        Tuesday: 'tue',
        Wednesday: 'wed',
        Thursday: 'thu',
        Friday: 'fri',
        Saturday: 'sat',
    }
    const day = dayNamesMap[dayNames[dateInput.getDay()]]

    const lectures = await getLectures(semester, day, branch)

    req['SheetLectures'] = lectures
    next()
})

const getLectures = async (semester, day, branch) => {
    try {
        const id = process.env.GSHEET_ID
        const semCellRange = cellrange[semester]

        const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq=SELECT ${semCellRange}&sheet=${branch}`
        const response = await fetch(url)

        if (response.status !== 200) {
            throw new AppError('Failed to fetch lectures', 404)
        }

        const raw = await response.text()
        const json = JSON.parse(raw.substr(47).slice(0, -2))

        const timetable = extractTimetable(json)
        const lectures = timetable[day]
        
        const mergedlectures = mergeLectures(lectures)

        return mergedlectures
    } catch (error) {
        console.log('Error fetching lectures:', error)
        throw new AppError(error.message, 500)
    }
}

function extractTimetable(json) {
    const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

    const cols = json.table.cols.slice(1, 13)
    const rows = json.table.rows

    const lectures = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    }

    cols.forEach((col, colIndex) => {
        const label = col.label
        const [from, to] = label.split(' ')[0].split('-')

        const slotCourseCodes = label.split(' ').slice(1, 8)

        weekdays.forEach((day, dayIndex) => {
            const code = slotCourseCodes[dayIndex]
            if (!code) return

            const row = rows.find((r) => r.c[1] && r.c[1].v === code)
            if (!row) return

            const courseName = row.c[0]?.v

            lectures[day].push({
                courseCode: code,
                courseName: courseName,
                from,
                to,
                status: null,
            })
        })
    })

    return lectures
}

function mergeLectures(lectures) {
    if (!lectures.length) return []

    let merged = [lectures[0]]

    for (let i = 1; i < lectures.length; i++) {
        let prev = merged[merged.length - 1]
        let curr = lectures[i]

        if (prev.courseCode === curr.courseCode && prev.to === curr.from) {
            prev.to = curr.to
        } else {
            merged.push(curr)
        }
    }

    return merged
}

module.exports = { getDBLectures, getSheetLectures }
