require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authenticateTokenUser = require("./middleware/authUser");
const authenticateTokenAdmin = require("./middleware/authAdmin");
const { controllerUsers } = require("./routes/users/users.controller");
const { controllerOrders } = require("./routes/orders/orders.controller");
const {
  controllerOrderStatuses,
} = require("./routes/orderStatus/orderStatus.controller");
const { loginController } = require("./routes/auth/login");

// Routes
app.get("/", async (req, res) => {
  res.send("Welcome to diRapihin");
});

// Controller
app.use("/api/users", controllerUsers);
app.use("/api/orders", authenticateTokenUser, controllerOrders);
app.use("/api/order-statuses", authenticateTokenAdmin, controllerOrderStatuses);
app.use("/login", loginController);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at ${PORT}`);
});

module.exports = app;
