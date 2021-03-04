const express = require("express");
const router = express.Router();

const {
  getProduct,
  newProduct,
  getsingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/products").get(isAuthenticatedUser, getProduct);
router.route("/product/:id").get(getsingleProduct);

router.route("/admin/products/new").post(newProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);
module.exports = router;
