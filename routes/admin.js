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
    body("title")
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim()
      .withMessage("Please enter title more than 3 chars!"),
    body("imageUrl").isURL().withMessage("Please enter valid image url!"),
    body("price")
      .isFloat()
      .withMessage("Please enter a number in floating point!ß"),
    body("description")
      .isLength({ min: 5, max: 100 })
      .trim()
      .withMessage("Please enter description more than 5 chars!"),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title")
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim()
      .withMessage("Please enter title more than 3 chars!"),
    body("imageUrl").isURL().withMessage("Please enter valid image url!"),
    body("price")
      .isFloat()
      .withMessage("Please enter a number in floating point!ß"),
    body("description")
      .isLength({ min: 5, max: 100 })
      .trim()
      .withMessage("Please enter description more than 5 chars!"),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
