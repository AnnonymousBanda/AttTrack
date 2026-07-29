const { redis } = require("../database");

const cacheBuilder = {
    lectures: (id, semester, date) => `lectures:${id}:${semester}:${date}`,
    attendance: (id, semester) => `attendance:${id}:${semester}`,
    attendanceByCourseCode: (id, courseCode) => `attendance:${id}:${courseCode}`,
    users: (id) => `users:${id}`,
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

const deleteCached = async (...keys) => {
    const deleted = await redis.del(...keys);
    console.log("Deleted count:", deleted);
}

module.exports = {
    cacheBuilder,
    getCached,
    setCached,
    deleteCached,
}
