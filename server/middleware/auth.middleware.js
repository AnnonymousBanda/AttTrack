const jwt = require("jsonwebtoken");
const { prisma } = require("../database");
const { catchAsync, AppError } = require("../utils/error.util");

const protect = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        throw new AppError("Unauthenticated", 401);

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.users.findUnique({ where: { id: decoded.uid }, select: { id: true, branch: true, semester: true } });
    if (!user)
        throw new AppError("User Not Found", 401);

    req.user={ ...user };
    next()
});

module.exports = { protect };
