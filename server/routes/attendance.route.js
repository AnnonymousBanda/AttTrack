const router = require('express').Router()

const {
	adjustAttendanceTotals,
	getAttendanceReport,
	createAttendanceLog,
	updateAttendanceStatus,
} = require('../controllers/attendance.controller')
const { protect, httpCache } = require('../middleware')
const validate = require('../middleware/validate')
const { markAttendanceSchema, updateAttendanceStatusSchema, adjustAttendanceTotalsSchema } = require('../utils/validationSchemas')

router.use(protect)
router.use(httpCache())

router.route('/adjust').patch(validate(adjustAttendanceTotalsSchema), adjustAttendanceTotals)
router.route('/report').get(getAttendanceReport)
router.route('/log').post(validate(markAttendanceSchema), createAttendanceLog)
router.route('/log/status').patch(validate(updateAttendanceStatusSchema), updateAttendanceStatus)

module.exports = router
