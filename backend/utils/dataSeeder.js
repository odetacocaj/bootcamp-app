const Product = require("../models/product.model");
const dotenv = require("dotenv");
const dbConnect = require("../config/dbConfig");

const products = require("../data/product");

dotenv.config({ path: "backend/config/config.env" });
dbConnect();

const seedProdData = async () => {
  try {
    await Product.deleteMany();
    console.log("Products deleted!");

    await Product.insertMany(products);
    console.log("Products added successfully!");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProdData();
