const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  isAuthorized,
} = require("../middlewares/userAuth");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  changePassword,
  updateUserData,
  allUsers,
  getUserData,
  updateUserDataAdmin,
  deleteUser,
} = require("../controllers/userController");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/getMe").get(isAuthenticatedUser, getMe);
router.route("/getMe/update").put(isAuthenticatedUser, updateUserData);

router
  .route("/admin/allUsers")
  .get(isAuthenticatedUser, isAuthorized("admin"), allUsers);
router
  .route("/admin/userData/:id")
  .get(isAuthenticatedUser, isAuthorized("admin"), getUserData)
  .put(isAuthenticatedUser, isAuthorized("admin"), updateUserDataAdmin)
  .delete(isAuthenticatedUser,isAuthorized('admin'),deleteUser)
module.exports = router;
