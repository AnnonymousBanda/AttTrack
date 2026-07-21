require('dotenv').config()
const { prisma } = require('../database.js')
const { attendance_logs_status } = require('../generated')

async function main() {
    // ==========================
    // Courses
    // ==========================

    await prisma.courses.createMany({
        skipDuplicates: true,
        data: [
            {
                course_code: 'CE3001',
                course_name: 'Structural Analysis',
                semester: 5,
                branch: 'Civil Engineering',
            },
            {
                course_code: 'CE3002',
                course_name: 'Concrete Technology',
                semester: 5,
                branch: 'Civil Engineering',
            },
            {
                course_code: 'ST3001',
                course_name: 'Advanced Structural Design',
                semester: 5,
                branch: 'Structural Engineering',
            },
        ],
    })

    // ==========================
    // Users
    // ==========================

    const ankit = await prisma.users.upsert({
        where: {
            roll_number: '2301CE03',
        },
        update: {},
        create: {
            oid: 'seed-ankit',
            email: 'ankit.bhagat@example.com',
            first_name: 'Ankit',
            last_name: 'Bhagat',
            roll_number: '2301CE03',
            branch: 'Civil Engineering',
            semester: 5,
            batch: 2023,
        },
    })

    const khushi = await prisma.users.upsert({
        where: {
            roll_number: '2302ST05',
        },
        update: {},
        create: {
            oid: 'seed-khushi',
            email: 'khushi.dwivedi@example.com',
            first_name: 'Khushi',
            last_name: 'Dwivedi',
            roll_number: '2302ST05',
            branch: 'Structural Engineering',
            semester: 5,
            batch: 2023,
        },
    })

    // ==========================
    // Course Attendance
    // ==========================

    await prisma.course_attendance.createMany({
        skipDuplicates: true,
        data: [
            {
                user_id: ankit.id,
                course_code: 'CE3001',
                present_total: 18,
                absent_total: 2,
                medical_total: 1,
                total_classes: 21,
            },
            {
                user_id: ankit.id,
                course_code: 'CE3002',
                present_total: 20,
                absent_total: 0,
                medical_total: 0,
                total_classes: 20,
            },
            {
                user_id: khushi.id,
                course_code: 'ST3001',
                present_total: 17,
                absent_total: 3,
                medical_total: 0,
                total_classes: 20,
            },
        ],
    })

    // ==========================
    // Attendance Logs
    // ==========================

    await prisma.attendance_logs.createMany({
        skipDuplicates: true,
        data: [
            {
                user_id: ankit.id,
                course_code: 'CE3001',
                lecture_date: new Date('2026-07-18'),
                start_time: new Date('2026-07-18T09:00:00'),
                end_time: new Date('2026-07-18T10:00:00'),
                status: attendance_logs_status.present,
            },
            {
                user_id: ankit.id,
                course_code: 'CE3001',
                lecture_date: new Date('2026-07-19'),
                start_time: new Date('2026-07-19T09:00:00'),
                end_time: new Date('2026-07-19T10:00:00'),
                status: attendance_logs_status.absent,
            },
            {
                user_id: khushi.id,
                course_code: 'ST3001',
                lecture_date: new Date('2026-07-18'),
                start_time: new Date('2026-07-18T11:00:00'),
                end_time: new Date('2026-07-18T12:00:00'),
                status: attendance_logs_status.present,
            },
        ],
    })

    console.log('✅ Database seeded successfully.')
}

main()
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
