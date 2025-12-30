const protect = (req, res, next) => {
    req.user={ uid:1, semester:6 }
    next()
};

module.exports = { protect };
