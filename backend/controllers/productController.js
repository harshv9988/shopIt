const Product = require("../models/product");

//creating a product

exports.newProduct = async (req, res, next) => {
  let product = Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product successfiully created",
    product: product,
  });
};

exports.getProduct = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This route will show all products in database.",
  });
};
