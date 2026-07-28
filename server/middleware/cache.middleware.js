const { redis } = require('../database');

const { catchAsync } = require("../utils/error.util");

const httpCache = (exp = 120) => {
    return catchAsync(async (req, res, next) => {
        const { id, semester } = req.user
        const base = req.baseUrl

        const params = new URLSearchParams(req.query);
        params.sort();
        const query = params.toString();

        const cacheKey = `${id}:${semester}:${base}:${query}`

        console.log(cacheKey)

        req.cache = {
            key: cacheKey,
            exp: exp * 60
        }

        if (req.method !== 'GET') {
            next()
            return
        }

        const cachedResponse = await redis.get(cacheKey)
        if (cachedResponse) {
            console.log("Cached Data Returned!")
            // return res.status(200).json(JSON.parse(cachedResponse))
        }

        next()
    })
}

module.exports = { httpCache }
