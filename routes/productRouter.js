const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.use("/all", getProducts);
router.put("/updateproduct/:id", updateProduct);
router.use("/:id", getProductsById);
router.post("/createProduct", createProduct);
router.delete("/deleteProduct", deleteProduct);

module.exports = router;
