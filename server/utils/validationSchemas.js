const Joi = require('joi')

const registerSchema = Joi.object({
    oid: Joi.string().required().messages({
        'string.empty': 'OID is required',
        'any.required': 'OID is required'
    }),
    email: Joi.string()
        .email()
        .required()
        .custom((value, helpers) => {
            if (!value.toLowerCase().endsWith('@iitp.ac.in')) {
                return helpers.error('any.invalid')
            }
            return value
        })
        .messages({
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
            'any.invalid': 'Email must end with @iitp.ac.in'
        }),
    first_name: Joi.string().required().messages({
        'string.empty': 'First name is required',
        'any.required': 'First name is required'
    }),
    last_name: Joi.string().optional().allow(null, '').messages({
        'string.empty': 'Last name must be a string'
    }),
    roll_number: Joi.string()
        .alphanum()
        .required()
        .messages({
            'string.alphanum': 'Roll number must be alphanumeric',
            'string.empty': 'Roll number is required',
            'any.required': 'Roll number is required'
        }),
    batch: Joi.string()
        .length(4)
        .pattern(/^\d{4}$/)
        .required()
        .messages({
            'string.length': 'Batch must be exactly 4 digits',
            'string.pattern.base': 'Batch must be exactly 4 digits (e.g., 2025)',
            'string.empty': 'Batch is required',
            'any.required': 'Batch is required'
        }),
    semester: Joi.number()
        .integer()
        .min(1)
        .max(10)
        .required()
        .messages({
            'number.base': 'Semester must be a number',
            'number.min': 'Semester must be between 1 and 10',
            'number.max': 'Semester must be between 1 and 10',
            'any.required': 'Semester is required'
        }),
    branch: Joi.string().required().messages({
        'string.empty': 'Branch is required',
        'any.required': 'Branch is required'
    }),
    image_url: Joi.string().optional().allow(null, '').uri().messages({
        'string.uri': 'Image URL must be a valid URI'
    })
})

const modifySemesterSchema = Joi.object({
    new_semester: Joi.number()
        .integer()
        .min(1)
        .max(10)
        .required()
        .messages({
            'number.base': 'Semester must be a number',
            'number.min': 'Semester must be between 1 and 10',
            'number.max': 'Semester must be between 1 and 10',
            'any.required': 'New semester is required'
        })
})

const unenrollSchema = Joi.object({
    course_code: Joi.string()
        .max(6)
        .required()
        .messages({
            'string.max': 'Course code must not exceed 6 characters',
            'string.empty': 'Course code is required',
            'any.required': 'Course code is required'
        })
})

// Mark Attendance Schema
const markAttendanceSchema = Joi.object({
    course_code: Joi.string()
        .max(6)
        .required()
        .messages({
            'string.max': 'Course code must not exceed 6 characters',
            'string.empty': 'Course code is required',
            'any.required': 'Course code is required'
        }),
    lecture_date: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Lecture date must be a valid date',
            'date.format': 'Lecture date must be in ISO format (YYYY-MM-DD)',
            'any.required': 'Lecture date is required'
        }),
    start_time: Joi.string()
        .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
        .required()
        .messages({
            'string.pattern.base': 'Start time must be in HH:MM or HH:MM:SS format',
            'string.empty': 'Start time is required',
            'any.required': 'Start time is required'
        }),
    end_time: Joi.string()
        .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
        .required()
        .messages({
            'string.pattern.base': 'End time must be in HH:MM or HH:MM:SS format',
            'string.empty': 'End time is required',
            'any.required': 'End time is required'
        }),
    status: Joi.string()
        .valid('present', 'absent', 'medical', 'cancelled')
        .required()
        .messages({
            'any.only': 'Status must be one of: present, absent, medical, cancelled',
            'string.empty': 'Status is required',
            'any.required': 'Status is required'
        })
})

const updateAttendanceStatusSchema = Joi.object({
    log_id: Joi.string()
        .required()
        .messages({
            'string.empty': 'Log ID is required',
            'any.required': 'Log ID is required'
        }),
    status: Joi.string()
        .valid('present', 'absent', 'medical', 'cancelled')
        .required()
        .messages({
            'any.only': 'Status must be one of: present, absent, medical, cancelled',
            'string.empty': 'Status is required',
            'any.required': 'Status is required'
        })
})

const adjustAttendanceTotalsSchema = Joi.object({
    course_code: Joi.string()
        .max(6)
        .required()
        .messages({
            'string.max': 'Course code must not exceed 6 characters',
            'string.empty': 'Course code is required',
            'any.required': 'Course code is required'
        }),
    present_total: Joi.number().integer().min(0).optional(),
    absent_total: Joi.number().integer().min(0).optional(),
    medical_total: Joi.number().integer().min(0).optional(),
    total_classes: Joi.number().integer().min(0).optional()
})

const addExtraClassSchema = Joi.object({
    course_code: Joi.string()
        .max(6)
        .required()
        .messages({
            'string.max': 'Course code must not exceed 6 characters',
            'string.empty': 'Course code is required',
            'any.required': 'Course code is required'
        }),
    lecture_date: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Lecture date must be a valid date',
            'date.format': 'Lecture date must be in ISO format (YYYY-MM-DD)',
            'any.required': 'Lecture date is required'
        }),
    start_time: Joi.string()
        .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
        .required()
        .messages({
            'string.pattern.base': 'Start time must be in HH:MM or HH:MM:SS format',
            'string.empty': 'Start time is required',
            'any.required': 'Start time is required'
        }),
    end_time: Joi.string()
        .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
        .required()
        .messages({
            'string.pattern.base': 'End time must be in HH:MM or HH:MM:SS format',
            'string.empty': 'End time is required',
            'any.required': 'End time is required'
        })
})

module.exports = {
    registerSchema,
    modifySemesterSchema,
    unenrollSchema,
    markAttendanceSchema,
    updateAttendanceStatusSchema,
    adjustAttendanceTotalsSchema,
    addExtraClassSchema
}
