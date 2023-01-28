const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Please enter a product name with max 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Please enter a product price with max 5 digits"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Select product category"],
    enum: {
      values: [
        "Chairs",
        "Sofas",
        "Lamps",
        "Tables",
        "Beds",
        "Rugs",
        "Kitchen appliances",
        "Decor",
        "Outdoor furniture",
      ],
      message: "Select existing product category",
    },
  },
  brand: {
    type: String,
    required: [true, "Select brand"],
  },
  stock: {
    type: Number,
    required: [true, "Enter number of products in stock"],
    maxLength: [5, "Stock number must not be longer than 5 digits"],
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
