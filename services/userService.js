const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const CreateError = require("http-errors");
const logger = require("../utils/logger");
require("dotenv").config();

exports.updateUser = async ({ userId, username, mobile, email }) => {
  try {
    const userDataId = parseInt(userId);
    const user = await prisma.user.update({
      where: {
        id : userDataId
      },
      data: {
        username: username,
        mobile: mobile,
        email: email,
      },
    });

    if (user) {
      return user;
    } else {
      throw CreateError(400, "User not found");
    }
  } catch (err) {
    logger.error(err);
    throw CreateError(400, err.message);
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    if (users) {
      return users;
    } else {
      throw CreateError(400, "User not found");
    }
  } catch (err) {
    logger.error(err);
    throw CreateError(400, err.message);
  }
};

exports.getUser = async ({ userId }) => {
  try {
    //convert a string to integer
    const userIdInt = parseInt(userId);
    const user = await prisma.user.findUnique({
      where: {
        id: userIdInt,
      },
    });

    if (user) {
      return user;
    } else {
      throw CreateError(400, "User not found");
    }
  } catch (err) {
    logger.error(err);
    throw CreateError(400, err.message);
  }
};

exports.deleteUser = async ({ userId }) => {
  try {
    const userIdInt = parseInt(userId);
    const user = await prisma.user.delete({
      where: {
        id: userIdInt
      },
    });

    if (user) {
      return user;
    } else {
      throw CreateError(400, "User not found");
    }
  } catch (err) {
    logger.error(err);
    throw CreateError(400, err.message);
  }
};
