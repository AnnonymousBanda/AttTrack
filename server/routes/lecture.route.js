const router = require('express').Router()

const { getTodaySchedule, addExtraClass } = require('../controllers/lecture.controller')
const { protect } = require('../middlewear')

router.use(protect)

router.route('/').get(getTodaySchedule)
router.route('/extra').post(addExtraClass)

module.exports = router
