const router = require('express').Router()

const {
	adjustAttendanceTotals,
	getAttendanceReport,
	createAttendanceLog,
	updateAttendanceStatus,
} = require('../controllers/attendance.controller')
const { protect, httpCache, mergeDbSheeLectures, getSheetLectures, getDBLectures } = require('../middleware')
const validate = require('../middleware/validate')
const { markAttendanceSchema, updateAttendanceStatusSchema, adjustAttendanceTotalsSchema } = require('../utils/validationSchemas')

router.use(protect)

router.route('/adjust').patch(adjustAttendanceTotals)
router.route('/report').get(getAttendanceReport)
router.route('/log').post(getDBLectures, getSheetLectures, mergeDbSheeLectures, createAttendanceLog)
router.route('/log/status').patch(updateAttendanceStatus)

module.exports = router
