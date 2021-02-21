const Product = require("../models/product");
const dotenv = require("dotenv");
const products = require("../data/product.json");
const connectDatabase = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All products added");

    process.exit();
  } catch (err) {
    console.log("ERROR", err);
    process.exit();
  }
};

seedProducts();
