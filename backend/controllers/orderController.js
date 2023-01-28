const Order = require("../models/order.model");
const Product = require("../models/product.model");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    tax,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body;

  const order=await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    tax,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt:Date.now(),
    user:req.user._id
  })
  res.status(200).json({
    success:true,
    order
  })
});

exports.getOrderDetails=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

exports.getMyOrders=catchAsyncErrors(async(req,res,next)=>{
    const myOrders=await Order.find({user:req.user.id})
      
    res.status(200).json({
        success:true,
        myOrders
    })
})


// Routes ku vetem Admini ka qasje

exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const allOrders=await Order.find();

    let totalOrdersAmount=0;
    allOrders.forEach(order=>{
        totalOrdersAmount+=order.totalPrice
    })
      
    res.status(200).json({
        success:true,
        totalOrdersAmount,
        allOrders
    })
})

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order has already been delivered', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStockAmount(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStockAmount(id,quantity){
    const product =await Product.findById(id);

    product.stock=product.stock-quantity

    await product.save({validateBeforeSave:false})
}

exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }
    await order.remove()
    res.status(200).json({
        success:true,

    })
})


