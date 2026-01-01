const router = require('express').Router()

const { getUserData, registerUser, deleteUserData, modifySemester, resetSemester, unenrollFromCourse } = require('../controllers/user.controller')
const { protect } = require('../middlewear')

router.route('/me').get(protect, getUserData)
router.route('/me').delete(protect, deleteUserData)
router.route('/register').post(registerUser)
router.route('/semester').patch(protect, modifySemester)
router.route('/semester/reset').post(protect, resetSemester)
router.route('/course/unenroll').post(protect, unenrollFromCourse)

module.exports = router
