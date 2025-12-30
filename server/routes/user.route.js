const router = require('express').Router()

const { getUserData, registerUser, deleteUserData } = require('../controllers/user.controller')
const { protect } = require('../middlewear')

router.route('/me').get(protect, getUserData)
router.route('/me').delete(protect, deleteUserData)
router.route('/register').post(registerUser)

module.exports = router
