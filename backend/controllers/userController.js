const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/JsonWebToken");
const emailSender=require('../utils/emailSender');
const crypto=require('crypto');
const { send } = require("process");
const cloudinary = require('cloudinary');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const result=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:'avatars',
    width:150,
    crop:"scale"
  })
  const { name, email, password } = req.body;
  
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id ,
      url: result.secure_url,
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
    

    const resetURL=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message=`Your pasword reset token below: \n\n${resetURL}\n\n.If this is not per your request, please ignore this email.`
    try{
        await emailSender({
            email:user.email,
            subject:'Password reset request',
            message
        })
        res.status(200).json({
            status:true,
            message:`Email sent successfully to: ${user.email}`
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

exports.getMe=catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

exports.changePassword=catchAsyncErrors(async(req,res,next)=>{
    
    const user= await User.findById(req.user.id).select('+password');
    const verifyOldPassword=await user.comparePassword(req.body.oldPassword)
    if(!verifyOldPassword){
        return next(new ErrorHandler('Incorrect password',400));

    }
    user.password=req.body.password;
    await user.save();

    sendToken(user,200,res)
})

exports.updateUserData = catchAsyncErrors(async (req, res, next) => {
    const newData = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Access vetem per Admin

exports.allUsers=catchAsyncErrors(async (req, res, next) => {
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })
})


exports.getUserData=catchAsyncErrors(async (req, res, next) => {
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist!`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

exports.updateUserDataAdmin = catchAsyncErrors(async (req, res, next) => {
    const newData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.deleteUser=catchAsyncErrors(async (req, res, next) => {
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist!`))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        user
    })
})
