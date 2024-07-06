const { prisma } = require("../../config/prisma");

const findAllOrderStatuses = async () => {
  const statuses = await prisma.orderStatus.findMany({
    include: {
      order: true,
      updatedBy: true,
    },
  });
  return statuses;
};

const findUniqueOrderStatus = async (id) => {
  const status = await prisma.orderStatus.findUnique({
    where: { id },
    include: {
      order: true,
      updatedBy: true,
    },
  });
  return status;
};

const insertOrderStatus = async (statusData) => {
  const newStatus = await prisma.orderStatus.create({
    data: {
      orderId: statusData.orderId,
      status: statusData.status,
      updatedById: statusData.updatedById,
    },
  });
  return newStatus;
};

const editOrderStatus = async (id, statusData) => {
  const updatedStatus = await prisma.orderStatus.update({
    where: { id },
    data: {
      status: statusData.status,
      updatedById: statusData.updatedById,
    },
  });
  return updatedStatus;
};

const deleteOrderStatus = async (id) => {
  await prisma.orderStatus.delete({ where: { id } });
};

module.exports = {
  findAllOrderStatuses,
  findUniqueOrderStatus,
  insertOrderStatus,
  editOrderStatus,
  deleteOrderStatus,
};
