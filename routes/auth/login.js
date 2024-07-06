const express = require("express");
const loginController = express.Router();
const { prisma } = require("../../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginController.post("/", async (req, res) => {
  const { username, password } = req.body;

  const checkUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!checkUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!checkUser.password) {
    return res.status(404).json({
      message: "Password not set",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, checkUser.password);

  if (isPasswordValid) {
    const payload = {
      id: checkUser.id,
      username: checkUser.username,
      role: checkUser.role,
    };

    const secret = process.env.JWT_SECRET;

    const expires = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, { expiresIn: expires });

    res.cookie("token", token, { httpOnly: true }).send({
      message: "Login successful",
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
});

module.exports = { loginController };
