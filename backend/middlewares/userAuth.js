const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("You must login to gain access!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

exports.isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Access denied!`, 403));
    }
    next();
  };
};
