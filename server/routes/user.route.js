const router = require('express').Router()

const {
    getUserData,
    registerUser,
    deleteUserData,
    modifySemester,
    resetSemester,
    unenrollFromCourse,
    verifyUser,
} = require('../controllers/user.controller')
const { protect } = require('../middleware')
const validate = require('../middleware/validate')
const {
    registerSchema,
    modifySemesterSchema,
    unenrollSchema,
} = require('../utils/validationSchemas')

router.route('/verify').get(verifyUser)
router.route('/me').get(protect, getUserData)
router.route('/me').delete(protect, deleteUserData)
router.route('/register').post(registerUser)
router
    .route('/semester')
    .patch(protect, modifySemester)
router.route('/semester/reset').post(protect, resetSemester)
router
    .route('/course/unenroll')
    .post(protect, unenrollFromCourse)

module.exports = router
