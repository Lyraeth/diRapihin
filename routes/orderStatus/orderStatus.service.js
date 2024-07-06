const {
  findAllOrderStatuses,
  findUniqueOrderStatus,
  insertOrderStatus,
  editOrderStatus,
  deleteOrderStatus,
} = require("./orderStatus.repository");

const getAllOrderStatuses = async () => {
  const statuses = await findAllOrderStatuses();
  return statuses;
};

const getUniqueOrderStatus = async (id) => {
  const status = await findUniqueOrderStatus(id);
  if (!status) {
    throw Error("Order status not found");
  }
  return status;
};

const createOrderStatus = async (newStatusData) => {
  const status = await insertOrderStatus(newStatusData);
  return status;
};

const editOrderStatusById = async (id, statusData, adminId) => {
  await getUniqueOrderStatus(id);
  const updatedOrderStatusData = {
    ...statusData,
    updatedById: adminId,
  };
  const status = await editOrderStatus(id, updatedOrderStatusData);
  return status;
};

const deleteOrderStatusById = async (id) => {
  await getUniqueOrderStatus(id);
  await deleteOrderStatus(id);
};

module.exports = {
  getAllOrderStatuses,
  getUniqueOrderStatus,
  createOrderStatus,
  editOrderStatusById,
  deleteOrderStatusById,
};
