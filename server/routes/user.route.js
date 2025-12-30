const router = require('express').Router()

const { getUserData, registerUser, deleteSemesterData } = require('../controllers/user.controller')
const { protect } = require('../middlewear')

router.route('/me').get(protect, getUserData)
router.route('/register').post(registerUser)
router.route('/semester').delete(protect, deleteSemesterData)

module.exports = router
