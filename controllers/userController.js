const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../services/userService");
const passport = require("passport");
require("../utils/authStrategy")(passport);
require("dotenv").config();
const _ = require("lodash");

exports.updateUser = async (req, res, next) => {
  try {
    const userData = _.pick(req.body, ["username", "mobile", "email"]);
    userData.userId = req.params.id;
    console.log(userData);

    const user = await updateUser(userData);
    if (user) {
      return res.status(200).json({
        stauts: true,
        message: "User has been updated successfully",
        user,
      });
    } else {
      throw CreateError(400, "User not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await deleteUser({ userId });
    if (user) {
      return res.status(200).json({
        stauts: true,
        message: "User has been deleted successfully",
        user,
      });
    } else {
      throw CreateError(400, "User not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getUser({ userId });
    if (user) {
      return res.status(200).json({
        stauts: true,
        message: "User has been found successfully",
        user,
      });
    } else {
      throw CreateError(400, "User not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    if (users) {
        return res.status(200).json({
            stauts: true,
            message: "Users has been found successfully",
            users,
        });
    } else {
      throw CreateError(400, "Users not found");
    }
  } catch (err) {
    next(err);
  }
};
