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
        const product = await createProduct(req.body);
        return res.json({
            message: "Product has been created successfully",
            product,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const reqDatas = _.pick(req.body, ["name", "price", "description", "image"]);

        console.log(req.params.id);
        reqDatas.productId = req.params.id;
        console.log(reqDatas);
        
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
        return res.json({
            message: "Product has been updated successfully",
            product,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        if (req.body.productId == "") {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }
        const product = await deleteProduct(req.body);
        return res.json({
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
    res.json({
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductsById = async (req, res, next) => {
  try {
    const product = await getProductsById(req.params.productId);
    if (!product) {
      throw new CreateError(400, "Product not found");
    }
    return res.json({
      message: "Product has been fetched successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};
