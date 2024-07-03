const jwt = require("jsonwebtoken");
const { prisma } = require("../config/prisma");

async function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userFromDb = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (userFromDb.role !== "Admin") {
      return res.status(403).send({ message: "Forbidden" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).send({ message: "Invalid token" });
    }
    res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = authenticateToken;
