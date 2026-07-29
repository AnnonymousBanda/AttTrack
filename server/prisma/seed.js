require('dotenv').config()
const { prisma } = require('../database.js')

async function main() {
    // ==========================
    // Courses
    // ==========================

    await prisma.courses.createMany({
        skipDuplicates: true,
        data: [
            {
                course_code: 'CE3201',
                course_name: 'Design of Steel Structures',
                semester: 6,
                branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            },
            {
                course_code: 'CE3202',
                course_name: 'Infrastructure Drawing and Estimation',
                semester: 6,
                branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            },
            {
                course_code: 'CE3203',
                course_name: 'Construction Planning and Management',
                semester: 6,
                branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            },
            {
                course_code: 'CE3204',
                course_name: 'Environmental Engineering - II',
                semester: 6,
                branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            },
            {
                course_code: 'CE3205',
                course_name: 'Water Resources Engineering - II',
                semester: 6,
                branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            },
            {
                course_code: 'CE3205L',
                course_name: 'Water Resources Engineering - II Lab',
                semester: 6,
                branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            },
            {
                course_code: 'CE3206',
                course_name: 'Transportation Engineering - II',
                semester: 6,
                branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            },
        ],
    })

    // ==========================
    // Users
    // ==========================

    const usersData = [
        {
            id: 'bde47a63-d9af-4738-88ce-b06331d36a70',
            oid: '8b459c02-5cea-430f-90a3-1edee2071a7d',
            email: 'ankit_2301ce03@iitp.ac.in',
            first_name: 'Ankit',
            last_name: 'Bhagat',
            roll_number: '2301ce03',
            branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            semester: 6,
            image_url: '',
            batch: 2023,
        },
        {
            id: '48503d97-6bf8-49d2-b3a3-1aa65453a479',
            oid: '8acf9233-0c83-40dd-9518-de0f28a1a5f7',
            email: 'akshat_2301ce02@iitp.ac.in',
            first_name: 'Akshat',
            last_name: 'Kumar Singh',
            roll_number: '2301ce02',
            branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            semester: 6,
            image_url: '',
            batch: 2023,
        },
        {
            id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c',
            oid: '92371753-b68f-425b-bd1d-13a0ef86f40e',
            email: 'khushi_2302st05@iitp.ac.in',
            first_name: 'Khushi',
            last_name: 'Dwivedi',
            roll_number: '2302st05',
            branch: 'Civil Engineering (4 Years, Bachelor of Technology)',
            semester: 6,
            image_url: '',
            batch: 2023,
        },
    ]

    for (const userData of usersData) {
        await prisma.users.upsert({
            where: {
                roll_number: userData.roll_number,
            },
            update: {},
            create: userData,
        })
    }

    // ==========================
    // Course Attendance
    // ==========================

    await prisma.course_attendance.createMany({
        skipDuplicates: true,
        data: [
            { user_id: '00caf249-c39c-4ff8-8da4-d6620bb34604', course_code: 'CE3201', present_total: 20, absent_total: 4, medical_total: 0, total_classes: 42 },
            { user_id: '00caf249-c39c-4ff8-8da4-d6620bb34604', course_code: 'CE3202', present_total: 13, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: '00caf249-c39c-4ff8-8da4-d6620bb34604', course_code: 'CE3203', present_total: 22, absent_total: 3, medical_total: 0, total_classes: 42 },
            { user_id: '00caf249-c39c-4ff8-8da4-d6620bb34604', course_code: 'CE3204', present_total: 21, absent_total: 3, medical_total: 0, total_classes: 42 },
            { user_id: '00caf249-c39c-4ff8-8da4-d6620bb34604', course_code: 'CE3205', present_total: 6, absent_total: 2, medical_total: 0, total_classes: 42 },
            { user_id: '00caf249-c39c-4ff8-8da4-d6620bb34604', course_code: 'CE3205L', present_total: 7, absent_total: 0, medical_total: 0, total_classes: 10 },
            { user_id: '00caf249-c39c-4ff8-8da4-d6620bb34604', course_code: 'CE3206', present_total: 19, absent_total: 1, medical_total: 0, total_classes: 42 },

            { user_id: '48503d97-6bf8-49d2-b3a3-1aa65453a479', course_code: 'CE3201', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: '48503d97-6bf8-49d2-b3a3-1aa65453a479', course_code: 'CE3202', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: '48503d97-6bf8-49d2-b3a3-1aa65453a479', course_code: 'CE3203', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: '48503d97-6bf8-49d2-b3a3-1aa65453a479', course_code: 'CE3204', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: '48503d97-6bf8-49d2-b3a3-1aa65453a479', course_code: 'CE3205', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: '48503d97-6bf8-49d2-b3a3-1aa65453a479', course_code: 'CE3205L', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 10 },
            { user_id: '48503d97-6bf8-49d2-b3a3-1aa65453a479', course_code: 'CE3206', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },

            { user_id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c', course_code: 'CE3201', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c', course_code: 'CE3202', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c', course_code: 'CE3203', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c', course_code: 'CE3204', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c', course_code: 'CE3205', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
            { user_id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c', course_code: 'CE3205L', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 10 },
            { user_id: 'a79a3ed6-85dd-433a-b8f8-d133f30e246c', course_code: 'CE3206', present_total: 0, absent_total: 0, medical_total: 0, total_classes: 42 },
        ],
    })

    console.log('✅ Database seeded successfully')
}

main()
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
