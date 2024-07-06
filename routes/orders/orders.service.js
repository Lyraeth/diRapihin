const {
  findAllOrders,
  findUniqueOrder,
  insertOrder,
  editOrder,
  deleteOrder,
} = require("./orders.repository");

const getAllOrders = async () => {
  const orders = await findAllOrders();
  return orders;
};

const getUniqueOrder = async (id) => {
  const order = await findUniqueOrder(id);
  if (!order) {
    throw Error("Order not found");
  }
  return order;
};

const createOrder = async (newOrderData) => {
  const order = await insertOrder(newOrderData);
  return order;
};

const editOrderById = async (id, orderData, userId) => {
  await getUniqueOrder(id);
  const updatedOrderData = {
    ...orderData,
    updatedById: userId,
  };
  const order = await editOrder(id, updatedOrderData);
  return order;
};

const deleteOrderById = async (id) => {
  await getUniqueOrder(id);
  await deleteOrder(id);
};

module.exports = {
  getAllOrders,
  getUniqueOrder,
  createOrder,
  editOrderById,
  deleteOrderById,
};
