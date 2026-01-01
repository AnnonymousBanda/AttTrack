const protect = (req, res, next) => {
    req.user={ uid:"10b5a2df-e6a3-11f0-b089-1068388d1b56", semester:5 }
    next()
};

module.exports = { protect };
