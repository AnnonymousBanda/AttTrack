const router = require('express').Router()

const { getTodaySchedule, addExtraClass } = require('../controllers/lecture.controller')
const { protect } = require('../middlewear')
const validate = require('../middlewear/validate')
const { addExtraClassSchema } = require('../utils/validationSchemas')

router.use(protect)

router.route('/').get(getTodaySchedule)
router.route('/extra').post(validate(addExtraClassSchema), addExtraClass)

module.exports = router
