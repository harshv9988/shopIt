const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

//creating a product  => /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  let product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product successfiully created",
    product: product,
  });
});

//get all products => /api/v1/products
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query) // also I can only pass Product instead of Product.find()
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});

//getsingle product details => /api/v1/product/:id

exports.getsingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// update product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    console.log("body", req.body);

    res.status(200).json({
      success: true,
      price: req.body,
      product,
    });
  } catch (err) {
    console.log("Error in update", err);
  }
});

// delete product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});
