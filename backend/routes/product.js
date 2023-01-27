const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/admin/product/new").post(newProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
