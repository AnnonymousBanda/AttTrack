const { AppError } = require('../utils/error.util')

const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })

        if (error) {
            const errorDetails = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }))
            throw new AppError(
                `Validation failed: ${error.details.map(d => d.message).join(', ')}`,
                400,
                errorDetails
            )
        }

        req.body = value
        next()
    }
}

module.exports = validate
