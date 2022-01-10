const {
  createUser,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  loginUser,
} = require("../services/authService");
const authValidator = require("../middlewares/authValidator");
const passport = require("passport");
require("../utils/authStrategy")(passport);
const _ = require("lodash");
const refreshTokenList = [];
require("dotenv").config();

exports.signup = async (req, res, next) => {
  try {
    if (
      req.body.email == "" ||
      req.body.password == "" ||
      req.body.username == ""
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const validateData = _.pick(req.body, ["username", "email", "password"]);
    console.log(validateData);
    
    //validator
    const userSchema = authValidator.signup;
    const validateResult = userSchema.validate(req.body, validateData);
    if (validateResult.error) {
      return res.status(400).json({
        message: validateResult.error.details[0].message,
      });
    }

    const user = await createUser(req.body);

    const { id , email } = user;
    const accessToken = generateAccessToken({ id , email });
    const refreshToken = generateRefreshToken({ id , email });
    refreshTokenList.push(refreshToken);
    res.json({
      message: "User has been created successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (req.body.email == "" || req.body.password == "") {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user = await loginUser(req.body);
    //validator
    const userSchema = authValidator.login;
    const validateResult = userSchema.validate(req.body, user);
    if (validateResult.error) {
      return res.status(400).json({
        message: validateResult.error.details[0].message,
      });
    }

    const { id , email } = user;
    const accessToken = generateAccessToken({ id , email });
    const refreshToken = generateRefreshToken({ id , email });
    refreshTokenList.push(refreshToken);
    res.json({
      message: "User has been logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUserId = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.json({
      message: "User has been fetched successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const index = refreshTokenList.indexOf(refreshToken);
    if (index > -1) {
      refreshTokenList.splice(index, 1);
    }
    res.json({
      message: "User has been logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const index = refreshTokenList.indexOf(refreshToken);
    if (index > -1) {
      const user = await verifyRefreshToken(refreshToken);
      const accessToken = generateAccessToken({ email: user.email });
      res.json({
        message: "User has been refreshed successfully",
        accessToken,
      });
    } else {
      res.status(401).json({
        message: "Invalid refresh token",
      });
    }
  } catch (err) {
    next(err);
  }
};
