const { protect } = require('./auth.middleware');
const { getDBLectures, getSheetLectures, mergeDbSheeLectures } = require('./lectures.middleware');
const { httpCache } = require('./cache.middleware');

module.exports = { protect, getDBLectures, getSheetLectures, mergeDbSheeLectures, httpCache };
