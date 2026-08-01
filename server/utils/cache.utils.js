const { redis } = require("../database");

const cacheBuilder = {
    user: (userId) => `user:${userId}:profile`,
    lectures: (userId, semester, date) => `user:${userId}:lectures:semester:${semester}:date:${date}`,
    attendanceBySemester: (userId, semester) => `user:${userId}:attendance:semester:${semester}`,
    attendanceByCourse: (userId, courseCode) => `user:${userId}:attendance:course:${courseCode}`,
}

const getCached = async (key) => {
    const cached = await redis.get(key);

    if (!cached) {
        return null;
    }

    return JSON.parse(cached);
}

const setCached = async (key, value) => {
    await redis.set(key, JSON.stringify(value), {
        EX: Number(process.env.TTL_CACHE) * 3600,
        NX: true,
    });
}

const deleteCached = async (keys) => {
    const deleted = await redis.del(keys);
    console.log("Deleted count:", deleted);
}

const deleteByPattern = async (pattern) => {
    let deleted = 0;
    let batch = [];

    for await (const key of redis.scanIterator({
        MATCH: pattern, COUNT: 100,
    })) {
        if (Array.isArray(key))
            batch.push(...key);
        else
            batch.push(key);

        if (batch.length >= 100) {
            deleted += await redis.del(batch);
            batch = [];
        }
    }

    if (batch.length)
        deleted += await redis.del(batch);
    console.log(`Deleted ${deleted} keys matching "${pattern}"`);

    return deleted;
};

module.exports = {
    cacheBuilder,
    getCached,
    setCached,
    deleteCached,
    deleteByPattern
}
