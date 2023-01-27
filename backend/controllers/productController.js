const Product = require("../models/product.model");

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
   if(!product){
    return res.status(404).json({
        success:false,
        message:'Product does not exist'
    })
   }
   
    res.status(200).json({
      success: true,
      product,
    });
  };
  

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
   if(!product){
    return res.status(404).json({
        success:false,
        message:'Product does not exist'
    })
   }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
});
   
    res.status(200).json({
      success: true,
      product,
    });
  };

  

  exports.deleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
   if(!product){
    return res.status(404).json({
        success:false,
        message:'Product does not exist'
    })
   }
   
   await product.deleteOne();
   
    res.status(200).json({
      success: true,
      message:"Product deleted successfully!",
    });
  };
