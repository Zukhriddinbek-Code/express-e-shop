const path = require("path");

const express = require("express");

const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Please enter title more than 3 chars!")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "Please enter a number in floating point!").isFloat(),
    body("description", "Please enter description more than 5 chars!")
      .isLength({ min: 5, max: 100 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Please enter title more than 3 chars!")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "Please enter a number in floating point!").isFloat(),
    body("description", "Please enter description more than 5 chars!")
      .isLength({ min: 5, max: 100 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
