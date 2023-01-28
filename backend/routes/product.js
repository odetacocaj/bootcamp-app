const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {isAuthenticatedUser,isAuthorized}=require("../middlewares/userAuth");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/admin/product/new").post(isAuthenticatedUser,isAuthorized('admin'),newProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,isAuthorized('admin'),updateProduct).delete(isAuthenticatedUser,isAuthorized('admin'),deleteProduct);

module.exports = router;
