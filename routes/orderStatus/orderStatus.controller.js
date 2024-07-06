const express = require("express");
const controllerOrderStatuses = express.Router();

const {
  getAllOrderStatuses,
  getUniqueOrderStatus,
  createOrderStatus,
  editOrderStatusById,
  deleteOrderStatusById,
} = require("./orderStatus.service");

controllerOrderStatuses.get("/", async (req, res) => {
  const statuses = await getAllOrderStatuses();
  res.send(statuses);
});

controllerOrderStatuses.get("/:id", async (req, res) => {
  try {
    const statusId = req.params.id;
    const status = await getUniqueOrderStatus(statusId);
    res.send(status);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

controllerOrderStatuses.post("/", async (req, res) => {
  try {
    const newStatusData = req.body;
    const status = await createOrderStatus(newStatusData);
    res.send({
      data: status,
      message: "Order status created successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

controllerOrderStatuses.put("/:id", async (req, res) => {
  try {
    const statusId = req.params.id;
    const statusData = req.body;
    const status = await editOrderStatusById(statusId, statusData, req.user.id);
    res.send({
      data: status,
      message: "Order status updated successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

controllerOrderStatuses.delete("/:id", async (req, res) => {
  try {
    const statusId = req.params.id;
    await deleteOrderStatusById(statusId);
    res.send("Order status deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { controllerOrderStatuses };
