const { prisma } = require("../../config/prisma");
const bcrypt = require("bcrypt");

const findAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const findUniqueUser = async (id) => {
  const uniqueUsers = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return uniqueUsers;
};

const insertUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const createUser = await prisma.user.create({
    data: {
      username: userData.username,
      password: hashedPassword,
      role: userData.role,
    },
  });

  return createUser;
};

const editUser = async (id, userData) => {
  let hashedPassword;
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(userData.password, salt);
  }

  const editUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: userData.email,
      password: hashedPassword,
      role: userData.role,
    },
  });

  return editUser;
};

const deleteUser = async (id) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findAllUsers,
  findUniqueUser,
  insertUser,
  editUser,
  deleteUser,
};
