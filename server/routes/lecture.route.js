const router = require('express').Router()

const { getTodaySchedule, addExtraClass } = require('../controllers/lecture.controller')
const { protect, getDBLectures, getSheetLectures, httpCache } = require('../middleware')
const validate = require('../middleware/validate')
const { addExtraClassSchema } = require('../utils/validationSchemas')

router.use(protect)
router.use(httpCache())

router.route('/').get(getDBLectures, getSheetLectures, getTodaySchedule)
router.route('/extra').post(addExtraClass)

module.exports = router
