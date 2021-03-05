const express = require("express");
const router = express.Router();

const {
  getProduct,
  newProduct,
  getsingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProduct);
router.route("/product/:id").get(getsingleProduct);

router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(deleteProduct);
module.exports = router;
