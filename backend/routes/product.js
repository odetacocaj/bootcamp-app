const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {isAuthenticatedUser}=require("../middlewares/userAuth");

router.route("/products").get(isAuthenticatedUser,getProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/admin/product/new").post(newProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
