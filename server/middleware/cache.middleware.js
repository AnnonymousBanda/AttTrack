const { redis } = require('../database');

const { catchAsync } = require("../utils/error.util");

const httpCache = (exp = 120) => {
    return catchAsync(async (req, res, next) => {
        if (req.method !== 'GET') {
            next()
            return
        }

        const { id, semester } = req.user
        const base = req.baseUrl
        const query = req.originalUrl.split('?')[1] || ''
        const cacheKey = `${id}:${semester}:${base}:${query}`

        console.log(cacheKey)

        const cachedResponse = await redis.get(cacheKey)

        if (cachedResponse)
            return res.status(200).json(JSON.parse(cachedResponse))

        req.cache = {
            key: cacheKey,
            exp: exp * 60
        }

        next()
    })
}

module.exports = { httpCache }
