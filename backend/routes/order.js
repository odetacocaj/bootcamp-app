const express = require("express");
const router = express.Router();

const {
  newOrder,
  getMyOrders,
  getOrderDetails,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  isAuthorized,
} = require("../middlewares/userAuth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/orders/getMyOrders").get(isAuthenticatedUser, getMyOrders);

//Admin

router
  .route("/admin/getAllOrders")
  .get(isAuthenticatedUser, isAuthorized("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, isAuthorized("admin"), updateOrder)
  .delete(isAuthenticatedUser, isAuthorized("admin"),deleteOrder);

module.exports = router;
