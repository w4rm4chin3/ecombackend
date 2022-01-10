const {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const passport = require("passport");
require("../utils/authStrategy")(passport);
const _ = require("lodash");
require("dotenv").config();

exports.createProduct = async (req, res, next) => {
  console.log("the create product is working");
  console.log(req.body);
  try {
    if (
      req.body.name == "" ||
      req.body.price == "" ||
      req.body.description == "" ||
      req.body.image == ""
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const data = req.body;
    if (req.file) data.image = req.file.filename;
    const product = await createProduct(data);
    return res.status(200).json({
      status: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const reqDatas = _.pick(req.body, [
      "name",
      "price",
      "description",
      "image",
    ]);
    reqDatas.productId = req.params.id;
    if (
      req.body.name == "" ||
      req.body.price == "" ||
      req.body.description == "" ||
      req.body.image == ""
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const product = await updateProduct(reqDatas);
    return res.status(200).json({
      status: true,
      message: "Product has been updated successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await deleteProduct({ productId });
    return res.status(200).json({
      status: true,
      message: "Product has been deleted successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProducts();
    res.status(200).json({
      status: true,
      message: "Products has been fetched successfully",
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getProductsById({ id });
    if (!product) {
      throw new CreateError(400, "Product not found");
    }
    return res.status(200).json({
      status: true,
      message: "Product has been fetched successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};
