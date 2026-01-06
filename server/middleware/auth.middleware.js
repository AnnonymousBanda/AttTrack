const protect = (req, res, next) => {
    req.user={ uid:"e7033171-d1fa-4f46-b6ce-61cdf936140e", semester:5, branch:"Civil Engineering (4 Years, Bachelor of Technology)" }
    next()
};

module.exports = { protect };
