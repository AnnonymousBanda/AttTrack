const router = require('express').Router()

const {
	adjustAttendanceTotals,
	getAttendanceReport,
	createAttendanceLog,
	updateAttendanceStatus,
} = require('../controllers/attendance.controller')
const { protect } = require('../middleware')
const validate = require('../middleware/validate')
const { markAttendanceSchema, updateAttendanceStatusSchema, adjustAttendanceTotalsSchema } = require('../utils/validationSchemas')

router.use(protect)

router.route('/adjust').patch(validate(adjustAttendanceTotalsSchema), adjustAttendanceTotals)
router.route('/report').get(getAttendanceReport)
router.route('/log').post( createAttendanceLog)
router.route('/log/status').patch(validate(updateAttendanceStatusSchema), updateAttendanceStatus)

module.exports = router
