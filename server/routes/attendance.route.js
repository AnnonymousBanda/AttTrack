const router = require('express').Router()

const {
	adjustAttendanceTotals,
	getAttendanceReport,
	createAttendanceLog,
	updateAttendanceStatus,
} = require('../controllers/attendance.controller')
const { protect } = require('../middlewear')

router.use(protect)

// router.route('/mark').post(markAttendance)
router.route('/adjust').patch(adjustAttendanceTotals)
router.route('/report').get(getAttendanceReport)
router.route('/log').post(createAttendanceLog)
router.route('/log/status').patch(updateAttendanceStatus)

module.exports = router
