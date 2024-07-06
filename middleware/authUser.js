const jwt = require("jsonwebtoken");

function authenticateTokenUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authenticateTokenUser;
