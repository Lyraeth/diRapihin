const express = require("express");
const controllerOrders = express.Router();
const authenticateTokenUser = require("../../middleware/authUser");

const {
  getAllOrders,
  getUniqueOrder,
  createOrder,
  editOrderById,
  deleteOrderById,
} = require("./orders.service");

controllerOrders.get("/", authenticateTokenUser, async (req, res) => {
  const orders = await getAllOrders();
  res.send(orders);
});

controllerOrders.get("/:id", authenticateTokenUser, async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getUniqueOrder(orderId);
    res.send(order);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

controllerOrders.post("/", authenticateTokenUser, async (req, res) => {
  try {
    const newOrderData = {
      ...req.body,
      userId: req.user.id,
    };
    const order = await createOrder(newOrderData);
    res.send({
      data: order,
      message: "Order created successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

controllerOrders.put("/:id", authenticateTokenUser, async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const order = await editOrderById(orderId, orderData, req.user.id);
    res.send({
      data: order,
      message: "Order updated successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

controllerOrders.delete("/:id", authenticateTokenUser, async (req, res) => {
  try {
    const orderId = req.params.id;
    await deleteOrderById(orderId);
    res.send("Order deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { controllerOrders };
