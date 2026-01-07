const { protect } = require('./auth.middleware');
const { getDBLectures, getSheetLectures } = require('./lectures.middleware');

module.exports = { protect, getDBLectures, getSheetLectures };