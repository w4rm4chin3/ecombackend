const {
    updateUser,
    deleteUser,
    getAllUsers,
    getUser,
} = require("../services/userService");
  const passport = require("passport");
  require("../utils/authStrategy")(passport);
  require("dotenv").config();
  

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        const user = await updateUser({ userId, data });
        if (user) {
            res.json({
                message: "User has been updated successfully",
                user,
            });
        } else {
            throw CreateError(400, "User not found");
        }
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await deleteUser({ userId });
        if (user) {
            res.json({
                message: "User has been deleted successfully",
            });
        } else {
            throw CreateError(400, "User not found");
        }
    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await getUser({ userId });
        if (user) {
            res.json({
                message: "User has been found successfully",
                user,
            });
        } else {
            throw CreateError(400, "User not found");
        }
    } catch (err) {
        next(err);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        if (users) {
            res.json({
                message: "Users has been found successfully",
                users,
            });
        } else {
            throw CreateError(400, "Users not found");
        }
    } catch (err) {
        next(err);
    }
}