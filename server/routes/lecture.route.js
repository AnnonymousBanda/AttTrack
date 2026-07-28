const router = require('express').Router()

const { getTodaySchedule, addExtraClass } = require('../controllers/lecture.controller')
const { protect, getDBLectures, getSheetLectures, mergeDbSheeLectures, httpCache } = require('../middleware')
const validate = require('../middleware/validate')
const { addExtraClassSchema } = require('../utils/validationSchemas')

router.use(protect)

router.route('/').get(getDBLectures, getSheetLectures, mergeDbSheeLectures, getTodaySchedule)
router.route('/extra').post(getDBLectures, getSheetLectures, mergeDbSheeLectures, addExtraClass)

module.exports = router
