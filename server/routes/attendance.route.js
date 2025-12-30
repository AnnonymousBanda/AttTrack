const router = require('express').Router()

const {
	markAttendance,
	adjustAttendanceTotals,
	getAttendanceReport,
	updateAttendanceLog,
} = require('../controllers/attendance.controller')
const { protect } = require('../middlewear')

router.use(protect)

router.route('/mark').post(markAttendance)
router.route('/adjust').patch(adjustAttendanceTotals)
router.route('/report').get(getAttendanceReport)
router.route('/log').patch(updateAttendanceLog)

module.exports = router
