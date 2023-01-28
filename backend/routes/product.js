const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  addReview,
  getAllReviews,
  deleteProductReview,
} = require("../controllers/productController");

const {isAuthenticatedUser,isAuthorized}=require("../middlewares/userAuth");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);

router.route("/admin/product/new").post(isAuthenticatedUser,isAuthorized('admin'),newProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,isAuthorized('admin'),updateProduct).delete(isAuthenticatedUser,isAuthorized('admin'),deleteProduct);
router.route('/review').delete(isAuthenticatedUser,isAuthorized('admin'),deleteProductReview);

router.route('/review').put(isAuthenticatedUser,addReview);
router.route('/getAllReviews').get(isAuthenticatedUser,getAllReviews);


module.exports = router;
