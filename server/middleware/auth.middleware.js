const protect = (req, res, next) => {
    req.user={ uid:"63172f97-fd11-412e-9801-987d594af3e8", semester:5, branch:"Civil Engineering (4 Years, Bachelor of Technology)" }
    next()
};

module.exports = { protect };
