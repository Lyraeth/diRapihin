const { prisma } = require("../../config/prisma");

const findAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      admin: true,
      status: true,
    },
  });
  return orders;
};

const findUniqueOrder = async (id) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      admin: true,
      status: true,
    },
  });
  return order;
};

const insertOrder = async (orderData) => {
  const newOrder = await prisma.order.create({
    data: {
      userId: orderData.userId,
      orderDetails: orderData.orderDetails,
      status: {
        create: {
          status: "Created",
          updatedById: orderData.userId,
        },
      },
    },
  });
  return newOrder;
};

const editOrder = async (id, orderData) => {
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      orderDetails: orderData.orderDetails,
      adminId: orderData.adminId,
      status: {
        update: {
          where: {
            orderId: id,
          },
          data: {
            status: orderData.status,
            updatedById: orderData.updatedById,
          },
        },
      },
    },
  });
  return updatedOrder;
};

const deleteOrder = async (id) => {
  await prisma.orderStatus.deleteMany({ where: { orderId: id } });
  await prisma.order.delete({ where: { id } });
};

module.exports = {
  findAllOrders,
  findUniqueOrder,
  insertOrder,
  editOrder,
  deleteOrder,
};
