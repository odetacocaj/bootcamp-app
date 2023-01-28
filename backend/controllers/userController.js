const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/JsonWebToken");
const emailSender=require('../utils/emailSender');
const crypto=require('crypto')

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kccvibpsuiusmwfepb3m",
      url: "https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png",
    },
  });
 sendToken(user,200,res)
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required to login!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  sendToken(user,200,res)

});

exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User does not exist!", 404));
    }

    const resetToken=user.getPswResetToken();
    await user.save({ validateBeforeSave: false });
    

    const resetURL=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const msg=`Your pasword reset token below: \n\n${resetURL}\n\n.If this is not per your request, please ignore this email.`
    try{
        await emailSender({
            email:user.email,
            subject:'Password reset request',
            msg
        })
        res.status(200).json({
            status:true,
            msg:`Email sent successfully to: ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }




})

exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now())
    })
    res.status(200).json({
        success:true,
        message:'Logged out successfully!'
    })
})

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
   const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    
    if(!user){
        return next(new ErrorHandler('Invalid password reset token!',400))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400))
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
     user.resetPasswordExpire=undefined;

     await user.save();

     sendToken(user,200,res)

})