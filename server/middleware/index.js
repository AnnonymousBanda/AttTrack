const { protect } = require('./auth.middleware');
const { getDBLectures, getSheetLectures } = require('./lectures.middleware');
const { httpCache } = require('./cache.middleware');

module.exports = { protect, getDBLectures, getSheetLectures, httpCache };
